import { Component, AfterViewInit, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProductDataSource, FilterProductModel } from '@app_models/shop/product/_index';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Title } from "@angular/platform-browser";
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '@app_services/shop/product/product.service';
import { CreateProductDialog } from '../create-product/create-product.dialog';
import { environment } from '@environments/environment';
import { EditProductDialog } from '../edit-product/edit-product.dialog';
import { DataHelperService } from '@app_services/common/data-helper/data-helper.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModel } from '../../../../_models/shop/product/product';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.page.html'
})
export class FilterProductPage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterInput') input: ElementRef;
  @ViewChild('filterCategoryInput') categoryInput: ElementRef;
  displayedColumns: string[] = ['id', 'thumbnailImage', 'title', 'inStockStatus', 'creationDate', 'productsCount', 'commands'];
  dataServer: ProductDataSource;
  dataSource: MatTableDataSource<ProductModel> = new MatTableDataSource<ProductModel>([]);
  isDataSourceLoaded: boolean = false;
  thumbnailBasePath: string = `${environment.productBaseImagePath}/thumbnail/`;
  filterProducts: FilterProductModel = new FilterProductModel('', '0', [], 1, 5);

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private productService: ProductService,
    private helper: DataHelperService,
    private toastr: ToastrService
  ) {
    this.pageTitle.setTitle('مدیریت محصولات');
  }

  ngOnInit(): void {
    this.dataServer = new ProductDataSource(this.productService);
    this.dataServer.loadProducts(this.filterProducts);
    this.dataSource = new MatTableDataSource<ProductModel>(this.dataServer.data);
    this.dataSource.paginator = this.paginator;

    if (this.dataSource.data.length === 0) {
      this.isDataSourceLoaded = false;
    }
  }

  ngAfterViewInit() {

    setInterval(() => {
      if (this.isDataSourceLoaded === false) {
        this.dataSource = new MatTableDataSource<ProductModel>(this.dataServer.data);
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

    fromEvent(this.categoryInput.nativeElement, 'keyup')
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

    if (this.filterProducts.takePage !== size) {
      page = 1;
    }
    this.filterProducts = new FilterProductModel(
      this.input.nativeElement.value,
      this.categoryInput.nativeElement.value,
      [],
      page,
      size
    );
    this.ngOnInit();
    this.paginator.pageSize = size;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateProductDialog, {
      width: '750px',
      height: '750px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(EditProductDialog, {
      width: '750px',
      height: '750px',
      data: {
        id: id
      }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  loadProductCategoriesPage() {
    this.filterProducts = new FilterProductModel(
      this.input.nativeElement.value,
      this.categoryInput.nativeElement.value,
      [],
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize
    );

    this.ngOnInit();
    this.paginator.length = this.dataServer.resultsLength;
    this.paginator.pageSize = this.filterProducts.takePage;
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((res) => {
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
}
