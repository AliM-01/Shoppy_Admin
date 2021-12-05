import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { CustomerDiscountService } from '@app_services/discount/customer-discount/customer-discount.service';
import { FilterCustomerDiscountModel } from '@app_models/discount/customer-discount/_index';
import { CustomerDiscountDataSource } from '@app_models/discount/customer-discount/customer-discount-data-source';
import { DefineCustomerDiscountComponentDialog } from '../define-customer-discount-dialog/define-customer-discount.dialog.component';

@Component({
  selector: 'app-filter-customer-discount',
  templateUrl: './filter-customer-discount.component.html'
})
export class FilterCustomerDiscountComponent implements OnInit, AfterViewInit {

  //#region properties

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterProductIdInput') filterProductIdInput: ElementRef;
  @ViewChild('filterProductTitleInput') filterProductTitleInput: ElementRef;
  displayedColumns: string[] = ['id', 'product', 'description', 'rate', 'startDate',
     'endDate', 'state', 'commands'];
  dataSource: CustomerDiscountDataSource;
  filterCustomerDiscounts: FilterCustomerDiscountModel = new FilterCustomerDiscountModel(0, '', []);

  //#endregion

  //#region Ctor

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private customerDiscountService: CustomerDiscountService,
    private toastr: ToastrService
  ) { 
    this.pageTitle.setTitle('مدیریت تخفیفات محصولات');
  }

  //#endregion

  //#region ngOnInit

  ngOnInit(): void {
    this.dataSource = new CustomerDiscountDataSource(this.customerDiscountService);
    this.dataSource.loadCustomerDiscounts(this.filterCustomerDiscounts);
  }

  //#endregion

  //#region ngAfterViewInit

  ngAfterViewInit() {

    fromEvent(this.filterProductIdInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadCustomerDiscountsPage();
        })
      )
      .subscribe();

    fromEvent(this.filterProductTitleInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadCustomerDiscountsPage();
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.loadCustomerDiscountsPage())
      )
      .subscribe();
  }

  //#endregion

  //#region openCreateDialog

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DefineCustomerDiscountComponentDialog, {
      width: '600px',
      height: '700px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  //#endregion

  //#region openEditDialog

  // openEditDialog(id:number): void {
  //   const dialogRef = this.dialog.open(EditCustomerDiscountComponent, {
  //     width: '600px',
  //     height: '700px',
  //     data: {
  //       id: id
  //     }
  //   }).afterClosed().subscribe(() => {
  //     this.ngOnInit();
  //   });
  // }

  //#endregion

  //#region loadCustomerDiscountsPage

  loadCustomerDiscountsPage() {
    this.filterCustomerDiscounts = new FilterCustomerDiscountModel(this.filterProductIdInput.nativeElement.value,
      this.filterProductTitleInput.nativeElement.value, []);
    this.dataSource.loadCustomerDiscounts(this.filterCustomerDiscounts);
  }

  //#endregion

  //#region deleteCustomerDiscount

  // deleteCustomerDiscount(id: number) {
  //   this.customerDiscountService.deleteCustomerDiscount(id).subscribe((res) => {
  //     if (res.status === 'success') {


  //       this.ngOnInit();

  //       this.toastr.toastrConfig.tapToDismiss = false;
  //       this.toastr.toastrConfig.autoDismiss = true;
  //       this.toastr.toastrConfig.timeOut = 1500;

  //       this.toastr.success(res.message, 'موفقیت');
  //     }
  //   },
  //     (error) => {
  //       if (error instanceof HttpErrorResponse) {
  //         this.toastr.toastrConfig.tapToDismiss = false;
  //         this.toastr.toastrConfig.autoDismiss = true;
  //         this.toastr.toastrConfig.timeOut = 2500;

  //         this.toastr.error(error.error.message, 'خطا');
  //       }
  //     }
  //   );
  // }

  //#endregion
}
