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
import { CreateInventoryComponent } from '../create-inventory/create-inventory.component';

@Component({
  selector: 'app-filter-colleague-discount',
  templateUrl: './filter-inventory.component.html'
})
export class FilterInventoryComponent implements OnInit, AfterViewInit {

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

  // setfilterInStockInput(checked: boolean){
  //   console.log('lll');

  //   this.filterInStockInputChecked = checked;
  //   this.loadInventoriesPage();
  // }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateInventoryComponent, {
      width: '450px',
      height: '350px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  //
  // openEditDialog(id:number): void {
  //   const dialogRef = this.dialog.open(EditInventoryComponent, {
  //     width: '600px',
  //     height: '700px',
  //     data: {
  //       id: id
  //     }
  //   }).afterClosed().subscribe(() => {
  //     this.ngOnInit();
  //   });
  // }

  loadInventoriesPage() {
    console.log(this.filterInStockInputChecked);

    this.filterInventory = new FilterInventoryModel(this.filterProductIdInput.nativeElement.value,
      this.inStockState, []);
    this.dataSource.loadInventories(this.filterInventory);
  }

  // removeInventory(id: number) {
  //   this.inventoryService.removeInventory(id).subscribe((res) => {
  //     if (res.status === 'success') {
  //
  //
  //       this.ngOnInit();
  //
  //       this.toastr.success(res.message, 'موفقیت', {timeOut: 1500});

  //     }
  //   },
  //     (error) => {
  //       if (error instanceof HttpErrorResponse) {
  //         this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });

  //     }
  //   );
  // }
  //
  // restoreInventory(id: number) {
  //   this.inventoryService.restoreInventory(id).subscribe((res) => {
  //     if (res.status === 'success') {
  //
  //
  //       this.ngOnInit();
  //
  //        this.toastr.success(res.message, 'موفقیت', {timeOut: 1500});
  //     }
  //   },
  //     (error) => {
  //       if (error instanceof HttpErrorResponse) {
  //         this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
  //       }
  //     }
  //   );
  // }

}
