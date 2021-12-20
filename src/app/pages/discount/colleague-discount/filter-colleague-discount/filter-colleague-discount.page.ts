import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { ColleagueDiscountService } from '@app_services/discount/colleague-discount/colleague-discount.service';
import { FilterColleagueDiscountModel } from '@app_models/discount/colleague-discount/_index';
import { ColleagueDiscountDataSource } from '@app_models/discount/colleague-discount/colleague-discount-data-source';
import { DefineColleagueDiscountComponent } from '../define-colleague-discount/define-colleague-discount.component';
import { EditColleagueDiscountComponent } from '../edit-colleague-discount/edit-colleague-discount.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-filter-colleague-discount',
  templateUrl: './filter-colleague-discount.page.html'
})
export class FilterColleagueDiscountPage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterProductIdInput') filterProductIdInput: ElementRef;
  @ViewChild('filterProductTitleInput') filterProductTitleInput: ElementRef;
  displayedColumns: string[] = ['id', 'product', 'productId', 'rate', 'state', 'commands'];
  dataSource: ColleagueDiscountDataSource;
  filterColleagueDiscounts: FilterColleagueDiscountModel = new FilterColleagueDiscountModel(0, '', []);

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private ColleagueDiscountService: ColleagueDiscountService,
    private toastr: ToastrService
  ) {
    this.pageTitle.setTitle('مدیریت تخفیفات مشتریان');
  }

  ngOnInit(): void {
    this.dataSource = new ColleagueDiscountDataSource(this.ColleagueDiscountService);
    this.dataSource.loadColleagueDiscounts(this.filterColleagueDiscounts);
  }

  ngAfterViewInit() {

    fromEvent(this.filterProductIdInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadColleagueDiscountsPage();
        })
      )
      .subscribe();

    fromEvent(this.filterProductTitleInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadColleagueDiscountsPage();
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.loadColleagueDiscountsPage())
      )
      .subscribe();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DefineColleagueDiscountComponent, {
      width: '600px',
      height: '700px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(EditColleagueDiscountComponent, {
      width: '600px',
      height: '700px',
      data: {
        id: id
      }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  loadColleagueDiscountsPage() {
    this.filterColleagueDiscounts = new FilterColleagueDiscountModel(this.filterProductIdInput.nativeElement.value,
      this.filterProductTitleInput.nativeElement.value, []);
    this.dataSource.loadColleagueDiscounts(this.filterColleagueDiscounts);
  }

  removeColleagueDiscount(id: number) {
    this.ColleagueDiscountService.removeColleagueDiscount(id).subscribe((res) => {
      if (res.status === 'success') {


        this.ngOnInit();

        this.toastr.toastrConfig.tapToDismiss = false;
        this.toastr.toastrConfig.autoDismiss = true;
        this.toastr.toastrConfig.timeOut = 1500;

        this.toastr.success(res.message, 'موفقیت');
      }
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.toastrConfig.tapToDismiss = false;
          this.toastr.toastrConfig.autoDismiss = true;
          this.toastr.toastrConfig.timeOut = 2500;

          this.toastr.error(error.error.message, 'خطا');
        }
      }
    );
  }

  restoreColleagueDiscount(id: number) {
    this.ColleagueDiscountService.restoreColleagueDiscount(id).subscribe((res) => {
      if (res.status === 'success') {


        this.ngOnInit();

        this.toastr.success(res.message, 'موفقیت', { timeOut: 1500 });

      }
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });

        }
      }
    );
  }

  deleteColleagueDiscount(id: number) {
    this.ColleagueDiscountService.deleteColleagueDiscount(id).subscribe((res) => {
      if (res.status === 'success') {


        this.ngOnInit();

        this.toastr.toastrConfig.tapToDismiss = false;
        this.toastr.toastrConfig.autoDismiss = true;
        this.toastr.toastrConfig.timeOut = 1500;

        this.toastr.success(res.message, 'موفقیت');
      }
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.toastrConfig.tapToDismiss = false;
          this.toastr.toastrConfig.autoDismiss = true;
          this.toastr.toastrConfig.timeOut = 2500;

          this.toastr.error(error.error.message, 'خطا');
        }
      }
    );
  }

}
