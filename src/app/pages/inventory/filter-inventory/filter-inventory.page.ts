import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { FilterInventoryInStockStateEnum, FilterInventoryModel } from "@app_models/inventory/filter-inventory";
import { InventoryDataServer } from "@app_models/inventory/inventory-data-server";
import { InventoryService } from "@app_services/inventory/inventory.service";
import { CreateInventoryDialog } from '../create-inventory-dialog/create-inventory.dialog';
import { EditInventoryDialog } from '../edit-inventory/edit-inventory.dialog';
import { IncreaseInventoryDialog } from '../increase-inventory/increase-inventory.dialog';
import { ReduceInventoryDialog } from '../reduce-inventory/reduce-inventory.dialog';
import { InventoryOperationDialog } from '../inventory-operations/inventory-operations.dialog';
import { MatSort } from '@angular/material/sort';
import { InventoryModel } from '@app_models/inventory/inventory';
import { MatTableDataSource } from '@angular/material/table';
import { PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from '@app_models/common/IPaging';

@Component({
  selector: 'app-filter-colleague-discount',
  templateUrl: './filter-inventory.page.html'
})
export class FilterInventoryPage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filterProductIdInput') filterProductIdInput: ElementRef;
  filterInStockInputChecked: string = 'true';
  displayedColumns: string[] = ['id', 'product', 'productId', 'state', 'unitPrice', 'currentCount', 'creationDate', 'commands'];
  inStockState: FilterInventoryInStockStateEnum = FilterInventoryInStockStateEnum.All;
  dataServer: InventoryDataServer;
  dataSource: MatTableDataSource<InventoryModel> = new MatTableDataSource<InventoryModel>([]);
  isDataSourceLoaded: boolean = false;
  filterInventory: FilterInventoryModel = new FilterInventoryModel(0, FilterInventoryInStockStateEnum.All, [], 1, 5, PagingDataSortCreationDateOrder.DES, PagingDataSortIdOrder.NotSelected);

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private inventoryService: InventoryService,
    private toastr: ToastrService
  ) {
    this.pageTitle.setTitle('مدیریت انبار');
  }

  ngOnInit(): void {
    this.dataServer = new InventoryDataServer(this.inventoryService);
    this.dataServer.loadInventories(this.filterInventory);
    this.dataSource = new MatTableDataSource<InventoryModel>(this.dataServer.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.dataSource.data.length === 0) {
      this.isDataSourceLoaded = false;
    }
  }

  ngAfterViewInit() {

    setInterval(() => {
      if (this.isDataSourceLoaded === false) {
        this.dataSource = new MatTableDataSource<InventoryModel>(this.dataServer.data);
        this.dataSource.sort = this.sort;
        this.paginator.pageIndex = (this.dataServer.pageId - 1);
        this.paginator.length = this.dataServer.resultsLength;
        this.paginator.pageSize = this.filterInventory.takePage;

        if (this.dataSource.data.length !== 0) {
          this.isDataSourceLoaded = true;
        } else {
          this.isDataSourceLoaded = false;
        }
      }

    }, 1000)

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.sort.sortChange
      .pipe(
        tap(change => {

          if (change.active === 'id') {

            if (change.direction === 'asc') {
              this.filterInventory.sortIdOrder = PagingDataSortIdOrder.ASC;
            } else {
              this.filterInventory.sortIdOrder = PagingDataSortIdOrder.DES;
            }
          }

          if (change.active === 'creationDate') {

            if (change.direction === 'asc') {
              this.filterInventory.sortCreationDateOrder = PagingDataSortCreationDateOrder.ASC;
            } else {
              this.filterInventory.sortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
            }
          }

          this.loadInventoriesPage()
        })
      )
      .subscribe();


    fromEvent(this.filterProductIdInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadInventoriesPage();
        })
      )
      .subscribe();
  }
  
  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;

    if (this.filterInventory.takePage !== size) {
      page = 1;
    }
    const sortDate: PagingDataSortCreationDateOrder = this.filterInventory.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterInventory.sortIdOrder;

    this.filterInventory = new FilterInventoryModel(
      this.filterProductIdInput.nativeElement.value,
      this.inStockState,
      [],
      page,
      size,
      sortDate,
      sortId
    );
    this.ngOnInit();
    this.paginator.pageSize = size;
  }

  setInStockState(state: number) {
    this.inStockState = state;
    this.loadInventoriesPage();
  }

  loadInventoriesPage() {
    const sortDate: PagingDataSortCreationDateOrder = this.filterInventory.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterInventory.sortIdOrder;

    this.filterInventory = new FilterInventoryModel(
      this.filterProductIdInput.nativeElement.value,
      this.inStockState,
      [],
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize,
      sortDate,
      sortId
    );

    this.ngOnInit();
    this.paginator.length = this.dataServer.resultsLength;
    this.paginator.pageSize = this.filterInventory.takePage;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateInventoryDialog, {
      width: '450px',
      height: '350px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }


  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(EditInventoryDialog, {
      width: '450px',
      height: '350px',
      data: {
        id: id
      }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openIncreaseDialog(id: number): void {
    const dialogRef = this.dialog.open(IncreaseInventoryDialog, {
      width: '450px',
      height: '350px',
      data: {
        id: id
      }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openReduceDialog(id: number): void {
    const dialogRef = this.dialog.open(ReduceInventoryDialog, {
      width: '450px',
      height: '425px',
      data: {
        id: id
      }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  
  openOperationsDialog(id: number): void {
    const dialogRef = this.dialog.open(InventoryOperationDialog, {
      width: '950px',
      height: '800px',
      data: {
        id: id
      }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  } 

}
