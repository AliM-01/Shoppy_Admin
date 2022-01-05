import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProductCategoryDataServer, FilterProductCategoryModel, ProductCategoryModel } from '@app_models/shop/product-category/_index';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductCategoryDialog } from '../create-product-category/create-product-category.dialog';
import { EditProductCategoryDialog } from '../edit-product-category/edit-product-category.dialog';
import { environment } from '@environments/environment';
import { Title } from '@angular/platform-browser';
import { PagingDataSortIdOrder, PagingDataSortCreationDateOrder } from '@app_models/common/IPaging';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-filter-product-category',
  templateUrl: './filter-product-category.page.html'
})
export class FilterProductCategoryPage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filterInput') input: ElementRef;
  displayedColumns: string[] = ['id', 'thumbnailImage', 'title', 'creationDate', 'productsCount', 'commands'];
  thumbnailBasePath: string = `${environment.productCategoryBaseImagePath}/thumbnail/`;
  dataServer: ProductCategoryDataServer;
  dataSource: MatTableDataSource<ProductCategoryModel> = new MatTableDataSource<ProductCategoryModel>([]);
  isDataSourceLoaded: boolean = false;
  filterProductCategories: FilterProductCategoryModel = new FilterProductCategoryModel('', [], 1, 5, PagingDataSortCreationDateOrder.DES, PagingDataSortIdOrder.NotSelected);

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private productCategoryService: ProductCategoryService
  ) {
    this.pageTitle.setTitle('مدیریت دسته بندی محصولات');
  }

  ngOnInit(): void {
    this.dataServer = new ProductCategoryDataServer(this.productCategoryService);
    this.dataServer.loadProductCategories(this.filterProductCategories);
    this.dataSource = new MatTableDataSource<ProductCategoryModel>(this.dataServer.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.dataSource.data.length === 0) {
      this.isDataSourceLoaded = false;
    }
  }

  ngAfterViewInit() {

    setInterval(() => {
      if (this.isDataSourceLoaded === false) {
        this.dataSource = new MatTableDataSource<ProductCategoryModel>(this.dataServer.data);
        this.dataSource.sort = this.sort;
        this.paginator.pageIndex = (this.dataServer.pageId - 1);
        this.paginator.length = this.dataServer.resultsLength;
        this.paginator.pageSize = this.filterProductCategories.takePage;

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
              this.filterProductCategories.sortIdOrder = PagingDataSortIdOrder.ASC;
            } else {
              this.filterProductCategories.sortIdOrder = PagingDataSortIdOrder.DES;
            }
          }

          if (change.active === 'creationDate') {

            if (change.direction === 'asc') {
              this.filterProductCategories.sortCreationDateOrder = PagingDataSortCreationDateOrder.ASC;
            } else {
              this.filterProductCategories.sortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
            }
          }

          this.loadProductCategoriesPage()
        })
      )
      .subscribe();

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadProductCategoriesPage();
        })
      )
      .subscribe();
      
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;

    if (this.filterProductCategories.takePage !== size) {
      page = 1;
    }
    const sortDate: PagingDataSortCreationDateOrder = this.filterProductCategories.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterProductCategories.sortIdOrder;

    this.filterProductCategories = new FilterProductCategoryModel(
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
    const dialogRef = this.dialog.open(CreateProductCategoryDialog, {
      width: '600px',
      height: '700px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(EditProductCategoryDialog, {
      width: '600px',
      height: '700px',
      data: {
        id: id
      }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  loadProductCategoriesPage() {
    const sortDate: PagingDataSortCreationDateOrder = this.filterProductCategories.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterProductCategories.sortIdOrder;

    this.filterProductCategories = new FilterProductCategoryModel(
      this.input.nativeElement.value,
      [],
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize,
      sortDate,
      sortId
    );

    this.ngOnInit();
    this.paginator.length = this.dataServer.resultsLength;
    this.paginator.pageSize = this.filterProductCategories.takePage;
  }

  deleteProductCategory(id: number) {
    this.productCategoryService.deleteProductCategory(id).subscribe((res) => {
      if (res.status === 'success') {
        this.ngOnInit();
      }
    });
  }

}
