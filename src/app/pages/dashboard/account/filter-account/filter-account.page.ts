import {Component, AfterViewInit, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {PagingDataSortIdOrder, PagingDataSortCreationDateOrder} from '@app_models/_common/_index';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {AccountModel} from '@app_models/account/account';
import {AccountDataServer} from '@app_models/account/account-data-server';
import {FilterAccountModel} from '@app_models/account/filter-account';
import {AccountService} from '@app_services/account/account.service';
import {environment} from '@app_env';

@Component({
  selector: 'app-filter-account',
  templateUrl: './filter-account.page.html'
})
export class FilterAccountPage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filterNameInput') nameInput: ElementRef;
  @ViewChild('filterEmailInput') emailInput: ElementRef;
  displayedColumns: string[] = ['id', 'avatar', 'name', 'role', 'email', 'registerDate', 'commands'];
  avatarBasePath = `${environment.avatarBaseImagePath}/`;
  dataServer: AccountDataServer;
  dataSource: MatTableDataSource<AccountModel> = new MatTableDataSource<AccountModel>([]);
  isDataSourceLoaded = false;
  filterModel: FilterAccountModel = new FilterAccountModel('', '', [], 1, 15, PagingDataSortCreationDateOrder.DES, PagingDataSortIdOrder.NotSelected);

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private accountService: AccountService
  ) {
    this.pageTitle.setTitle('مدیریت کاربران');
  }

  ngOnInit(): void {
    this.dataServer = new AccountDataServer(this.accountService);
    this.dataServer.load(this.filterModel);
    this.dataSource = new MatTableDataSource<AccountModel>(this.dataServer.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.dataSource.data.length === 0) {
      this.isDataSourceLoaded = false;
    }
  }

  ngAfterViewInit(): void {

    setInterval(() => {
      if (this.isDataSourceLoaded === false) {
        this.dataSource = new MatTableDataSource<AccountModel>(this.dataServer.data);
        this.dataSource.sort = this.sort;
        this.paginator.pageIndex = (this.dataServer.pageId - 1);
        this.paginator.length = this.dataServer.resultsLength;
        this.paginator.pageSize = this.filterModel.takePage;

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
              this.filterModel.sortIdOrder = PagingDataSortIdOrder.ASC;
            } else {
              this.filterModel.sortIdOrder = PagingDataSortIdOrder.DES;
            }
          }

          if (change.active === 'creationDate') {

            if (change.direction === 'asc') {
              this.filterModel.sortCreationDateOrder = PagingDataSortCreationDateOrder.ASC;
            } else {
              this.filterModel.sortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
            }
          }

          this.load()
        })
      )
      .subscribe();

    fromEvent(this.nameInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(1500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.load();
        })
      )
      .subscribe();

    fromEvent(this.emailInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(1500),
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

    if (this.filterModel.takePage !== size) {
      page = 1;
    }
    const sortDate: PagingDataSortCreationDateOrder = this.filterModel.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterModel.sortIdOrder;

    this.filterModel = new FilterAccountModel(
      this.nameInput.nativeElement.value,
      this.emailInput.nativeElement.value,
      [],
      page,
      size,
      sortDate,
      sortId
    );
    this.ngOnInit();
    this.paginator.pageSize = size;
  }

  private load(): void {
    const sortDate: PagingDataSortCreationDateOrder = this.filterModel.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterModel.sortIdOrder;

    this.filterModel = new FilterAccountModel(
      this.nameInput.nativeElement.value,
      this.emailInput.nativeElement.value,
      [],
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize,
      sortDate,
      sortId
    );

    this.ngOnInit();
    this.paginator.length = this.dataServer.resultsLength;
    this.paginator.pageSize = this.filterModel.takePage;
  }

}
