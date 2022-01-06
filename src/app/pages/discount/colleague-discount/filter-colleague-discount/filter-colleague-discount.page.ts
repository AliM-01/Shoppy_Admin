import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ColleagueDiscountService } from '@app_services/discount/colleague-discount/colleague-discount.service';
import { ColleagueDiscountModel, FilterColleagueDiscountModel } from '@app_models/discount/colleague-discount/_index';
import { ColleagueDiscountDataServer } from '@app_models/discount/colleague-discount/colleague-discount-data-server';
import { DefineColleagueDiscountDialog } from '../define-colleague-discount/define-colleague-discount.dialog';
import { EditColleagueDiscountDialog } from '../edit-colleague-discount/edit-colleague-discount.dialog';
import { MatSort } from '@angular/material/sort';
import { PagingDataSortIdOrder, PagingDataSortCreationDateOrder } from '@app_models/common/IPaging';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-filter-colleague-discount',
  templateUrl: './filter-colleague-discount.page.html'
})
export class FilterColleagueDiscountPage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filterProductIdInput') filterProductIdInput: ElementRef;
  @ViewChild('filterProductTitleInput') filterProductTitleInput: ElementRef;
  displayedColumns: string[] = ['id', 'product', 'productId', 'rate', 'state','creationDate', 'commands'];
  dataServer: ColleagueDiscountDataServer;
  dataSource: MatTableDataSource<ColleagueDiscountModel> = new MatTableDataSource<ColleagueDiscountModel>([]);
  isDataSourceLoaded: boolean = false;
  filterColleagueDiscounts: FilterColleagueDiscountModel = new FilterColleagueDiscountModel(0, '', [], 1, 5, PagingDataSortCreationDateOrder.DES, PagingDataSortIdOrder.NotSelected);

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private ColleagueDiscountService: ColleagueDiscountService
  ) {
    this.pageTitle.setTitle('مدیریت تخفیفات مشتریان');
  }

  ngOnInit(): void {
    this.dataServer = new ColleagueDiscountDataServer(this.ColleagueDiscountService);
    this.dataServer.loadColleagueDiscounts(this.filterColleagueDiscounts);
    this.dataSource = new MatTableDataSource<ColleagueDiscountModel>(this.dataServer.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.dataSource.data.length === 0) {
      this.isDataSourceLoaded = false;
    }
  }

  ngAfterViewInit() {

    setInterval(() => {
      if (this.isDataSourceLoaded === false) {
        this.dataSource = new MatTableDataSource<ColleagueDiscountModel>(this.dataServer.data);
        this.dataSource.sort = this.sort;
        this.paginator.pageIndex = (this.dataServer.pageId - 1);
        this.paginator.length = this.dataServer.resultsLength;
        this.paginator.pageSize = this.filterColleagueDiscounts.takePage;

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
              this.filterColleagueDiscounts.sortIdOrder = PagingDataSortIdOrder.ASC;
            } else {
              this.filterColleagueDiscounts.sortIdOrder = PagingDataSortIdOrder.DES;
            }
          }

          if (change.active === 'creationDate') {

            if (change.direction === 'asc') {
              this.filterColleagueDiscounts.sortCreationDateOrder = PagingDataSortCreationDateOrder.ASC;
            } else {
              this.filterColleagueDiscounts.sortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
            }
          }

          this.loadColleagueDiscountsPage()
        })
      )
      .subscribe();

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
  }
  
  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;

    if (this.filterColleagueDiscounts.takePage !== size) {
      page = 1;
    }
    const sortDate: PagingDataSortCreationDateOrder = this.filterColleagueDiscounts.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterColleagueDiscounts.sortIdOrder;

    this.filterColleagueDiscounts = new FilterColleagueDiscountModel(
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
    const dialogRef = this.dialog.open(DefineColleagueDiscountDialog, {
      width: '600px',
      height: '700px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(EditColleagueDiscountDialog, {
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
    const sortDate: PagingDataSortCreationDateOrder = this.filterColleagueDiscounts.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterColleagueDiscounts.sortIdOrder;

    this.filterColleagueDiscounts = new FilterColleagueDiscountModel(
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
    this.paginator.pageSize = this.filterColleagueDiscounts.takePage;
  }

  removeColleagueDiscount(id: number) {
    this.ColleagueDiscountService.removeColleagueDiscount(id).subscribe((res) => {
      if (res.status === 'success') {
        this.ngOnInit();
      }
    });
  }

  restoreColleagueDiscount(id: number) {
    this.ColleagueDiscountService.restoreColleagueDiscount(id).subscribe((res) => {
      if (res.status === 'success') {
        this.ngOnInit();
      }
    });
  }

  deleteColleagueDiscount(id: number) {
    this.ColleagueDiscountService.deleteColleagueDiscount(id).subscribe((res) => {
      if (res.status === 'success') {
        this.ngOnInit();
      }
    });
  }

}
