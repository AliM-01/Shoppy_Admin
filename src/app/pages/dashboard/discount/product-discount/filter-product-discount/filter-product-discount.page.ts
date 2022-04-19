import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ProductDiscountService } from '@app_services/discount/product-discount/product-discount.service';
import { ProductDiscountModel, FilterProductDiscountModel } from '@app_models/discount/product-discount/_index';
import { ProductDiscountDataServer } from '@app_models/discount/product-discount/product-discount-data-server';
import { DefineProductDiscountDialog } from '../define-product-discount-dialog/define-product-discount.dialog';
import { EditProductDiscountDialog } from '../edit-product-discount-dialog/edit-product-discount.dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from '@app_models/_common/_index';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialog } from '@app_components/confirm-dialog/confirm.dialog';
import { IConfirmDialogConfig } from '@app_models/_common/IConfirmDialogConfig';

@Component({
  selector: 'app-filter-product-discount',
  templateUrl: './filter-product-discount.page.html'
})
export class FilterProductDiscountPage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filterProductIdInput') filterProductIdInput: ElementRef;
  @ViewChild('filterProductTitleInput') filterProductTitleInput: ElementRef;
  displayedColumns: string[] = ['product', 'rate', 'startDate',
    'endDate', 'state', 'commands'];
  dataServer: ProductDiscountDataServer;
  dataSource: MatTableDataSource<ProductDiscountModel> = new MatTableDataSource<ProductDiscountModel>([]);
  isDataSourceLoaded: boolean = false;
  filterProductDiscounts: FilterProductDiscountModel = new FilterProductDiscountModel("", '', [], 1, 5, PagingDataSortCreationDateOrder.DES, PagingDataSortIdOrder.NotSelected);

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private productDiscountService: ProductDiscountService
  ) {
    this.pageTitle.setTitle('مدیریت تخفیفات محصولات');
  }

  ngOnInit(): void {
    this.dataServer = new ProductDiscountDataServer(this.productDiscountService);
    this.dataServer.loadProductDiscounts(this.filterProductDiscounts);
    this.dataSource = new MatTableDataSource<ProductDiscountModel>(this.dataServer.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.dataSource.data.length === 0) {
      this.isDataSourceLoaded = false;
    }
  }

  ngAfterViewInit() {

    setInterval(() => {
      if (this.isDataSourceLoaded === false) {
        this.dataSource = new MatTableDataSource<ProductDiscountModel>(this.dataServer.data);
        this.dataSource.sort = this.sort;
        this.paginator.pageIndex = (this.dataServer.pageId - 1);
        this.paginator.length = this.dataServer.resultsLength;
        this.paginator.pageSize = this.filterProductDiscounts.takePage;

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
              this.filterProductDiscounts.sortIdOrder = PagingDataSortIdOrder.ASC;
            } else {
              this.filterProductDiscounts.sortIdOrder = PagingDataSortIdOrder.DES;
            }
          }

          if (change.active === 'creationDate') {

            if (change.direction === 'asc') {
              this.filterProductDiscounts.sortCreationDateOrder = PagingDataSortCreationDateOrder.ASC;
            } else {
              this.filterProductDiscounts.sortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
            }
          }

          this.loadProductDiscountsPage()
        })
      )
      .subscribe();

    fromEvent(this.filterProductIdInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadProductDiscountsPage();
        })
      )
      .subscribe();

    fromEvent(this.filterProductTitleInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadProductDiscountsPage();
        })
      )
      .subscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;

    if (this.filterProductDiscounts.takePage !== size) {
      page = 1;
    }
    const sortDate: PagingDataSortCreationDateOrder = this.filterProductDiscounts.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterProductDiscounts.sortIdOrder;

    this.filterProductDiscounts = new FilterProductDiscountModel(
      this.filterProductIdInput.nativeElement.value,
      this.filterProductTitleInput.nativeElement.value,
      [],
      page,
      size,
      sortDate,
      sortId
    );
    this.ngOnInit();
    this.paginator.pageSize = size;
  }


  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DefineProductDiscountDialog, {
      width: '600px',
      height: '700px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(EditProductDiscountDialog, {
      width: '600px',
      height: '700px',
      data: {
        id: id
      }
    }).afterClosed().subscribe(result => {
      if(!result)
        return;

      this.ngOnInit();
    });
  }

  loadProductDiscountsPage() {
    const sortDate: PagingDataSortCreationDateOrder = this.filterProductDiscounts.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterProductDiscounts.sortIdOrder;

    this.filterProductDiscounts = new FilterProductDiscountModel(
      this.filterProductIdInput.nativeElement.value,
      this.filterProductTitleInput.nativeElement.value,
      [],
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize,
      sortDate,
      sortId
    );

    this.ngOnInit();
    this.paginator.length = this.dataServer.resultsLength;
    this.paginator.pageSize = this.filterProductDiscounts.takePage;
  }

  deleteProductDiscount(id: string) {

    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '300px',
      height: '300px',
      data: <IConfirmDialogConfig>{
        message: "آیا از حذف این تخفیف اطمینان دارید ؟",
        title: "حذف تخفیف",
        cancelBtnMessage: "بستن",
        submitBtnMessage: "حذف"
      }
    }).afterClosed().subscribe(result => {
      if (!result)
        return;

      this.productDiscountService.deleteProductDiscount(id).subscribe((res) => {

        if (res.status === 200) {
          this.ngOnInit();
        }

      });
    });
  }

}
