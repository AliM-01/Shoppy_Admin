import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { FilterInventoryInStockStateEnum, FilterInventoryModel } from "@app_models/inventory/filter-inventory";
import { InventoryDataSource } from "@app_models/inventory/inventory-data-source";
import { InventoryService } from "@app_services/inventory/inventory.service";
import { CreateInventoryDialog } from '../create-inventory/create-inventory.dialog';
import { EditInventoryDialog } from '../edit-inventory/edit-inventory.dialog';
import { IncreaseInventoryDialog } from '../increase-inventory/increase-inventory.dialog';
import { ReduceInventoryDialog } from '../reduce-inventory/reduce-inventory.dialog';
import { InventoryOperationDialog } from '../inventory-operations/inventory-operations.dialog';

@Component({
  selector: 'app-filter-colleague-discount',
  templateUrl: './filter-inventory.page.html'
})
export class FilterInventoryPage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterProductIdInput') filterProductIdInput: ElementRef;
  filterInStockInputChecked: string = 'true';
  displayedColumns: string[] = ['id', 'product', 'productId', 'state', 'unitPrice', 'currentCount', 'creationDate', 'commands'];
  dataSource: InventoryDataSource;
  inStockState: FilterInventoryInStockStateEnum = FilterInventoryInStockStateEnum.All;
  filterInventory: FilterInventoryModel = new FilterInventoryModel(0, FilterInventoryInStockStateEnum.All, []);

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private inventoryService: InventoryService,
    private toastr: ToastrService
  ) {
    this.pageTitle.setTitle('مدیریت انبار');
  }

  ngOnInit(): void {
    this.dataSource = new InventoryDataSource(this.inventoryService);
    this.dataSource.loadInventories(this.filterInventory);
  }

  ngAfterViewInit() {

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

    this.paginator.page
      .pipe(
        tap(() => this.loadInventoriesPage())
      )
      .subscribe();
  }

  setInStockState(state: number) {
    this.inStockState = state;
    this.loadInventoriesPage();
  }

  loadInventoriesPage() {
    this.filterInventory = new FilterInventoryModel(this.filterProductIdInput.nativeElement.value,
      this.inStockState, []);
    this.dataSource.loadInventories(this.filterInventory);
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
