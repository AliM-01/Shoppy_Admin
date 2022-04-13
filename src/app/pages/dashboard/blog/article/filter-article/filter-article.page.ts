import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@environments/environment';
import { Title } from '@angular/platform-browser';
import { PagingDataSortIdOrder, PagingDataSortCreationDateOrder } from '@app_models/_common/IPaging';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ArticleModel } from '@app_models/blog/article/article';
import { ArticleDataServer } from '@app_models/blog/article/article-data-server';
import { FilterArticleModel } from '@app_models/blog/article/filter-article';
import { ArticleService } from '@app_services/blog/article/article.service';

@Component({
  selector: 'app-filter-article',
  templateUrl: './filter-article.page.html'
})
export class FilterArticlePage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filterInput') input: ElementRef;
  @ViewChild('filterCategoryInput') categoryInput: ElementRef;
  displayedColumns: string[] = ['thumbnailImage', 'title', 'summary', 'category', 'creationDate', 'commands'];
  thumbnailBasePath: string = `${environment.articleBaseImagePath}/thumbnail/`;
  dataServer: ArticleDataServer;
  dataSource: MatTableDataSource<ArticleModel> = new MatTableDataSource<ArticleModel>([]);
  isDataSourceLoaded: boolean = false;
  filterArticles: FilterArticleModel = new FilterArticleModel('', '', [], 1, 5, PagingDataSortCreationDateOrder.DES, PagingDataSortIdOrder.NotSelected);

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private articleService: ArticleService
  ) {
    this.pageTitle.setTitle('مدیریت دسته بندی مقالات');
  }

  ngOnInit(): void {
    this.dataServer = new ArticleDataServer(this.articleService);
    this.dataServer.loadArticles(this.filterArticles);
    this.dataSource = new MatTableDataSource<ArticleModel>(this.dataServer.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.dataSource.data.length === 0) {
      this.isDataSourceLoaded = false;
    }
  }

  ngAfterViewInit() {

    setInterval(() => {
      if (this.isDataSourceLoaded === false) {
        this.dataSource = new MatTableDataSource<ArticleModel>(this.dataServer.data);
        this.dataSource.sort = this.sort;
        this.paginator.pageIndex = (this.dataServer.pageId - 1);
        this.paginator.length = this.dataServer.resultsLength;
        this.paginator.pageSize = this.filterArticles.takePage;

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
              this.filterArticles.sortIdOrder = PagingDataSortIdOrder.ASC;
            } else {
              this.filterArticles.sortIdOrder = PagingDataSortIdOrder.DES;
            }
          }

          if (change.active === 'creationDate') {

            if (change.direction === 'asc') {
              this.filterArticles.sortCreationDateOrder = PagingDataSortCreationDateOrder.ASC;
            } else {
              this.filterArticles.sortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
            }
          }

          this.loadArticlesPage()
        })
      )
      .subscribe();

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadArticlesPage();
        })
      )
      .subscribe();

      fromEvent(this.categoryInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadArticlesPage();
        })
      )
      .subscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;

    if (this.filterArticles.takePage !== size) {
      page = 1;
    }
    const sortDate: PagingDataSortCreationDateOrder = this.filterArticles.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterArticles.sortIdOrder;

    this.filterArticles = new FilterArticleModel(
      this.input.nativeElement.value,
      this.categoryInput.nativeElement.value,
      [],
      page,
      size,
      sortDate,
      sortId
    );
    this.ngOnInit();
    this.paginator.pageSize = size;
  }

  // openCreateDialog(): void {
  //   const dialogRef = this.dialog.open(CreateArticleDialog, {
  //     width: '600px',
  //     height: '700px'
  //   }).afterClosed().subscribe(() => {
  //     this.ngOnInit();
  //   });
  // }

  // openEditDialog(id: number): void {
  //   const dialogRef = this.dialog.open(EditArticleDialog, {
  //     width: '600px',
  //     height: '700px',
  //     data: {
  //       id: id
  //     }
  //   }).afterClosed().subscribe(() => {
  //     this.ngOnInit();
  //   });
  // }

  loadArticlesPage() {
    const sortDate: PagingDataSortCreationDateOrder = this.filterArticles.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterArticles.sortIdOrder;

    this.filterArticles = new FilterArticleModel(
      this.input.nativeElement.value,
      this.input.nativeElement.value,
      [],
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize,
      sortDate,
      sortId
    );

    this.ngOnInit();
    this.paginator.length = this.dataServer.resultsLength;
    this.paginator.pageSize = this.filterArticles.takePage;
  }

  deleteArticle(id: string) {
    this.articleService.deleteArticle(id).subscribe((res) => {
      if (res.status === 200) {
        this.ngOnInit();
      }
    });
  }

}
