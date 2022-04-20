import {Component, AfterViewInit, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ProductDataServer, FilterProductModel} from '@app_models/shop/product/_index';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {Title} from "@angular/platform-browser";
import {MatDialog} from '@angular/material/dialog';
import {ProductService} from '@app_services/shop/product/product.service';
import {CreateProductDialog} from '../create-product/create-product.dialog';
import {environment} from '@app_env';
import {EditProductDialog} from '../edit-product/edit-product.dialog';
import {MatTableDataSource} from '@angular/material/table';
import {ProductModel} from '@app_models/shop/product/product';
import {MatSort} from '@angular/material/sort';
import {PagingDataSortIdOrder, PagingDataSortCreationDateOrder} from '@app_models/_common/_index';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.page.html'
})
export class FilterProductPage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filterInput') input: ElementRef;
  @ViewChild('filterCategoryInput') categoryInput: ElementRef;
  displayedColumns: string[] = ['id', 'thumbnailImage', 'title', 'inStockStatus', 'creationDate', 'commands'];
  dataServer: ProductDataServer;
  dataSource: MatTableDataSource<ProductModel> = new MatTableDataSource<ProductModel>([]);
  isDataSourceLoaded = false;
  thumbnailBasePath = `${environment.productBaseImagePath}/thumbnail/`;
  filterProducts: FilterProductModel = new FilterProductModel('', '', 1, 5, PagingDataSortCreationDateOrder.DES, PagingDataSortIdOrder.NotSelected);

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private productService: ProductService
  ) {
    this.pageTitle.setTitle('مدیریت محصولات');
  }

  ngOnInit(): void {
    this.dataServer = new ProductDataServer(this.productService);
    this.dataServer.loadProducts(this.filterProducts);
    this.dataSource = new MatTableDataSource<ProductModel>(this.dataServer.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.dataSource.data.length === 0) {
      this.isDataSourceLoaded = false;
    }
  }

  ngAfterViewInit(): void {

    setInterval(() => {
      if (this.isDataSourceLoaded === false) {
        this.dataSource = new MatTableDataSource<ProductModel>(this.dataServer.data);
        this.dataSource.sort = this.sort;
        this.paginator.pageIndex = (this.dataServer.pageId - 1);
        this.paginator.length = this.dataServer.resultsLength;
        this.paginator.pageSize = this.filterProducts.takePage;

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
              this.filterProducts.sortIdOrder = PagingDataSortIdOrder.ASC;
            } else {
              this.filterProducts.sortIdOrder = PagingDataSortIdOrder.DES;
            }
          }

          if (change.active === 'creationDate') {

            if (change.direction === 'asc') {
              this.filterProducts.sortCreationDateOrder = PagingDataSortCreationDateOrder.ASC;
            } else {
              this.filterProducts.sortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
            }
          }

          this.load()
        })
      )
      .subscribe();

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.load();
        })
      )
      .subscribe();

    fromEvent(this.categoryInput.nativeElement, 'keyup')
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

    if (this.filterProducts.takePage !== size) {
      page = 1;
    }
    const sortDate: PagingDataSortCreationDateOrder = this.filterProducts.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterProducts.sortIdOrder;

    this.filterProducts = new FilterProductModel(
      this.input.nativeElement.value,
      this.categoryInput.nativeElement.value,
      page,
      size,
      sortDate,
      sortId
    );
    this.ngOnInit();
    this.paginator.pageSize = size;
  }

  openCreateDialog(): void {
    this.dialog.open(CreateProductDialog, {
      width: '750px',
      height: '750px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openEditDialog(id: number): void {
    this.dialog.open(EditProductDialog, {
      width: '750px',
      height: '750px',
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
    const sortDate: PagingDataSortCreationDateOrder = this.filterProducts.sortCreationDateOrder;
    const sortId: PagingDataSortIdOrder = this.filterProducts.sortIdOrder;

    this.filterProducts = new FilterProductModel(
      this.input.nativeElement.value,
      this.categoryInput.nativeElement.value,
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize,
      sortDate,
      sortId
    );

    this.ngOnInit();
    this.paginator.length = this.dataServer.resultsLength;
    this.paginator.pageSize = this.filterProducts.takePage;
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe((res) => {
      if (res.status === 200) {
        this.ngOnInit();
      }
    });
  }
}
