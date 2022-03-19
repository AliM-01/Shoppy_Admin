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
import { ArticleCategoryModel } from '@app_models/blog/article-category/article-category';
import { ArticleCategoryDataServer } from '@app_models/blog/article-category/article-category-data-server';
import { FilterArticleCategoryModel } from '@app_models/blog/article-category/filter-article-category';
import { ArticleCategoryService } from '@app_services/blog/article-category/article-category.service';
import { CreateArticleCategoryDialog } from '../create-article-category/create-article-category.dialog';
import { EditArticleCategoryDialog } from '../edit-article-category/edit-article-category.dialog';

@Component({
  selector: 'app-filter-article-category',
  templateUrl: './filter-article-category.page.html'
})
export class FilterArticleCategoryPage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filterInput') input: ElementRef;
  displayedColumns: string[] = ['thumbnailImage', 'title', 'creationDate', 'commands'];
  thumbnailBasePath: string = `${environment.articleCategoryBaseImagePath}/`;
  dataServer: ArticleCategoryDataServer;
  dataSource: MatTableDataSource<ArticleCategoryModel> = new MatTableDataSource<ArticleCategoryModel>([]);
  isDataSourceLoaded: boolean = false;
  filterArticleCategories: FilterArticleCategoryModel = new FilterArticleCategoryModel('', [], 1, 5, PagingDataSortCreationDateOrder.DES, PagingDataSortIdOrder.NotSelected);

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private articleCategoryService: ArticleCategoryService
  ) {
    this.pageTitle.setTitle('مدیریت دسته بندی مقالات');
  }

  ngOnInit(): void {
    this.dataServer = new ArticleCategoryDataServer(this.articleCategoryService);
    this.dataServer.loadArticleCategories(this.filterArticleCategories);
    this.dataSource = new MatTableDataSource<ArticleCategoryModel>(this.dataServer.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.dataSource.data.length === 0) {
      this.isDataSourceLoaded = false;
    }
  }

  ngAfterViewInit() {

    setInterval(() => {
      if (this.isDataSourceLoaded === false) {
        this.dataSource = new MatTableDataSource<ArticleCategoryModel>(this.dataServer.data);
        this.dataSource.sort = this.sort;
        this.paginator.pageIndex = (this.dataServer.pageId - 1);
        this.paginator.length = this.dataServer.resultsLength;
        this.paginator.pageSize = this.filterArticleCategories.takePage;

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
              this.filterArticleCategories.sortIdOrder = PagingDataSortIdOrder.ASC;
            } else {
              this.filterArticleCategories.sortIdOrder = PagingDataSortIdOrder.DES;
            }
          }

          if (change.active === 'creationDate') {

            if (change.direction === 'asc') {
              this.filterArticleCategories.sortCreationDateOrder = PagingDataSortCreationDateOrder.ASC;
            } else {
              this.filterArticleCategories.sortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
            }
          }

          this.loadArticleCategoriesPage()
        })
      )
      .subscribe();

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadArticleCategoriesPage();
        })
      )
      .subscribe();

  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;

    if (this.filterArticleCategories.takePage !== size) {
      page = 1;
    }
    const sortDate: PagingDataSortCreationDateOrder = this.filterArticleCategories.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterArticleCategories.sortIdOrder;

    this.filterArticleCategories = new FilterArticleCategoryModel(
      this.input.nativeElement.value,
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
    const dialogRef = this.dialog.open(CreateArticleCategoryDialog, {
      width: '600px',
      height: '700px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(EditArticleCategoryDialog, {
      width: '600px',
      height: '700px',
      data: {
        id: id
      }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  loadArticleCategoriesPage() {
    const sortDate: PagingDataSortCreationDateOrder = this.filterArticleCategories.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterArticleCategories.sortIdOrder;

    this.filterArticleCategories = new FilterArticleCategoryModel(
      this.input.nativeElement.value,
      [],
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize,
      sortDate,
      sortId
    );

    this.ngOnInit();
    this.paginator.length = this.dataServer.resultsLength;
    this.paginator.pageSize = this.filterArticleCategories.takePage;
  }

  deleteArticleCategory(id: string) {
    this.articleCategoryService.deleteArticleCategory(id).subscribe((res) => {
      if (res.status === 'success') {
        this.ngOnInit();
      }
    });
  }

}
