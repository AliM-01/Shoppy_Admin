import {Component, AfterViewInit, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {DiscountCodeService} from '@app_services/discount/discount-code/discount-code.service';
import {DiscountCodeModel, FilterDiscountCodeModel} from '@app_models/discount/discount-code/_index';
import {DiscountCodeDataServer} from '@app_models/discount/discount-code/discount-code-data-server';
import {DefineDiscountCodeDialog} from '../define-discount-code-dialog/define-discount-code.dialog';
import {EditDiscountCodeDialog} from '../edit-discount-code-dialog/edit-discount-code.dialog';
import {MatTableDataSource} from '@angular/material/table';
import {PagingDataSortCreationDateOrder, PagingDataSortIdOrder} from '@app_models/_common/_index';
import {MatSort} from '@angular/material/sort';
import {ConfirmDialog} from '@app_components/confirm-dialog/confirm.dialog';
import {IConfirmDialogConfig} from '@app_models/_common/IConfirmDialogConfig';

@Component({
  selector: 'app-filter-discount-code',
  templateUrl: './filter-discount-code.page.html'
})
export class FilterDiscountCodePage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filterInput') filterInput: ElementRef;
  displayedColumns: string[] = ['code', 'rate', 'startDate',
    'endDate', 'state', 'commands'];
  dataServer: DiscountCodeDataServer;
  dataSource: MatTableDataSource<DiscountCodeModel> = new MatTableDataSource<DiscountCodeModel>([]);
  isDataSourceLoaded = false;
  filterDiscountCodes: FilterDiscountCodeModel = new FilterDiscountCodeModel("", [], 1, 5, PagingDataSortCreationDateOrder.DES, PagingDataSortIdOrder.NotSelected);

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private discountCodeService: DiscountCodeService
  ) {
    this.pageTitle.setTitle('مدیریت کد های تخفیف');
  }

  ngOnInit(): void {
    this.dataServer = new DiscountCodeDataServer(this.discountCodeService);
    this.dataServer.loadDiscountCodes(this.filterDiscountCodes);
    this.dataSource = new MatTableDataSource<DiscountCodeModel>(this.dataServer.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.dataSource.data.length === 0) {
      this.isDataSourceLoaded = false;
    }
  }

  ngAfterViewInit(): void {

    setInterval(() => {
      if (this.isDataSourceLoaded === false) {
        this.dataSource = new MatTableDataSource<DiscountCodeModel>(this.dataServer.data);
        this.dataSource.sort = this.sort;
        this.paginator.pageIndex = (this.dataServer.pageId - 1);
        this.paginator.length = this.dataServer.resultsLength;
        this.paginator.pageSize = this.filterDiscountCodes.takePage;

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
              this.filterDiscountCodes.sortIdOrder = PagingDataSortIdOrder.ASC;
            } else {
              this.filterDiscountCodes.sortIdOrder = PagingDataSortIdOrder.DES;
            }
          }

          if (change.active === 'creationDate') {

            if (change.direction === 'asc') {
              this.filterDiscountCodes.sortCreationDateOrder = PagingDataSortCreationDateOrder.ASC;
            } else {
              this.filterDiscountCodes.sortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
            }
          }

          this.load()
        })
      )
      .subscribe();

    fromEvent(this.filterInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.load();
        })
      )
      .subscribe();
  }

  onPaginateChange(event: PageEvent): void {
    let page = event.pageIndex;
    const size = event.pageSize;

    page = page + 1;

    if (this.filterDiscountCodes.takePage !== size) {
      page = 1;
    }
    const sortDate: PagingDataSortCreationDateOrder = this.filterDiscountCodes.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterDiscountCodes.sortIdOrder;

    this.filterDiscountCodes = new FilterDiscountCodeModel(
      this.filterInput.nativeElement.value,
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
    this.dialog.open(DefineDiscountCodeDialog, {
      width: '600px',
      height: '700px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openEditDialog(id: number): void {
    this.dialog.open(EditDiscountCodeDialog, {
      width: '600px',
      height: '700px',
      data: {
        id: id
      }
    }).afterClosed().subscribe(result => {
      if (!result)
        return;

      this.ngOnInit();
    });
  }

  load(): void {
    const sortDate: PagingDataSortCreationDateOrder = this.filterDiscountCodes.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterDiscountCodes.sortIdOrder;

    this.filterDiscountCodes = new FilterDiscountCodeModel(
      this.filterInput.nativeElement.value,
      [],
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize,
      sortDate,
      sortId
    );

    this.ngOnInit();
    this.paginator.length = this.dataServer.resultsLength;
    this.paginator.pageSize = this.filterDiscountCodes.takePage;
  }

  deleteDiscountCode(id: string): void {

    this.dialog.open(ConfirmDialog, {
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

      this.discountCodeService.deleteDiscountCode(id).subscribe((res) => {

        if (res.status === 200) {
          this.ngOnInit();
        }

      });
    });
  }

}
