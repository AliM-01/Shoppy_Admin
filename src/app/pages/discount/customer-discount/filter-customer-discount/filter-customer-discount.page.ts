import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { CustomerDiscountService } from '@app_services/discount/customer-discount/customer-discount.service';
import { CustomerDiscountModel, FilterCustomerDiscountModel } from '@app_models/discount/customer-discount/_index';
import { CustomerDiscountDataServer } from '@app_models/discount/customer-discount/customer-discount-data-server';
import { DefineCustomerDiscountDialog } from '../define-customer-discount-dialog/define-customer-discount.dialog';
import { EditCustomerDiscountDialog } from '../edit-customer-discount-dialog/edit-customer-discount.dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from '@app_models/common/IPaging';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-filter-customer-discount',
  templateUrl: './filter-customer-discount.page.html'
})
export class FilterCustomerDiscountPage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filterProductIdInput') filterProductIdInput: ElementRef;
  @ViewChild('filterProductTitleInput') filterProductTitleInput: ElementRef;
  displayedColumns: string[] = ['id', 'product', 'description', 'rate', 'startDate',
    'endDate', 'state', 'commands'];
  dataServer: CustomerDiscountDataServer;
  dataSource: MatTableDataSource<CustomerDiscountModel> = new MatTableDataSource<CustomerDiscountModel>([]);
  isDataSourceLoaded: boolean = false;
  filterCustomerDiscounts: FilterCustomerDiscountModel = new FilterCustomerDiscountModel(0, '', [], 1, 5, PagingDataSortCreationDateOrder.DES, PagingDataSortIdOrder.NotSelected);

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private customerDiscountService: CustomerDiscountService
  ) {
    this.pageTitle.setTitle('مدیریت تخفیفات محصولات');
  }

  ngOnInit(): void {
    this.dataServer = new CustomerDiscountDataServer(this.customerDiscountService);
    this.dataServer.loadCustomerDiscounts(this.filterCustomerDiscounts);
    this.dataSource = new MatTableDataSource<CustomerDiscountModel>(this.dataServer.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.dataSource.data.length === 0) {
      this.isDataSourceLoaded = false;
    }
  }

  ngAfterViewInit() {

    setInterval(() => {
      if (this.isDataSourceLoaded === false) {
        this.dataSource = new MatTableDataSource<CustomerDiscountModel>(this.dataServer.data);
        this.dataSource.sort = this.sort;
        this.paginator.pageIndex = (this.dataServer.pageId - 1);
        this.paginator.length = this.dataServer.resultsLength;
        this.paginator.pageSize = this.filterCustomerDiscounts.takePage;

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
              this.filterCustomerDiscounts.sortIdOrder = PagingDataSortIdOrder.ASC;
            } else {
              this.filterCustomerDiscounts.sortIdOrder = PagingDataSortIdOrder.DES;
            }
          }

          if (change.active === 'creationDate') {

            if (change.direction === 'asc') {
              this.filterCustomerDiscounts.sortCreationDateOrder = PagingDataSortCreationDateOrder.ASC;
            } else {
              this.filterCustomerDiscounts.sortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
            }
          }

          this.loadCustomerDiscountsPage()
        })
      )
      .subscribe();

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
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;

    if (this.filterCustomerDiscounts.takePage !== size) {
      page = 1;
    }
    const sortDate: PagingDataSortCreationDateOrder = this.filterCustomerDiscounts.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterCustomerDiscounts.sortIdOrder;

    this.filterCustomerDiscounts = new FilterCustomerDiscountModel(
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
    const dialogRef = this.dialog.open(DefineCustomerDiscountDialog, {
      width: '600px',
      height: '700px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(EditCustomerDiscountDialog, {
      width: '600px',
      height: '700px',
      data: {
        id: id
      }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  loadCustomerDiscountsPage() {
    const sortDate: PagingDataSortCreationDateOrder = this.filterCustomerDiscounts.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterCustomerDiscounts.sortIdOrder;

    this.filterCustomerDiscounts = new FilterCustomerDiscountModel(
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
    this.paginator.pageSize = this.filterCustomerDiscounts.takePage;
  }

  deleteCustomerDiscount(id: number) {
    this.customerDiscountService.deleteCustomerDiscount(id).subscribe((res) => {

      if (res.status === 'success') {
        this.ngOnInit();
      }

    });
  }

}
