import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProductDataSource, FilterProductModel } from '@app_models/shop/product/_index';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Title } from "@angular/platform-browser";
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '@app_services/shop/product/product.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { environment } from '@environments/environment';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html'
})
export class FilterProductComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterInput') input: ElementRef;
  @ViewChild('filterCategoryInput') categoryInput: ElementRef;
  displayedColumns: string[] = ['id', 'thumbnailImage', 'title', 'inStockStatus', 'creationDate', 'productsCount', 'commands'];
  dataSource: ProductDataSource;
  thumbnailBasePath: string = `${environment.productBaseImagePath}/thumbnail/`;
  filterProducts: FilterProductModel = new FilterProductModel('', '', []);

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private productService: ProductService,
    private toastr: ToastrService
  ) {
    this.pageTitle.setTitle('مدیریت محصولات');
  }

  ngOnInit(): void {
    this.dataSource = new ProductDataSource(this.productService);
    this.dataSource.loadProducts(this.filterProducts);
  }

  ngAfterViewInit() {

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

    this.paginator.page
      .pipe(
        tap(() => this.loadProductCategoriesPage())
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

    this.paginator.page
      .pipe(
        tap(() => this.loadProductCategoriesPage())
      )
      .subscribe();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '600px',
      height: '700px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
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
    this.filterProducts = new FilterProductModel(this.input.nativeElement.value, this.categoryInput.nativeElement.value, []);
    this.dataSource.loadProducts(this.filterProducts);
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

  updateProductIsInStock(id: number) {
    this.productService.updateProductIsInStock(id).subscribe((res) => {
      if (res.status === 'success') {


        this.ngOnInit();

        this.toastr.toastrConfig.tapToDismiss = false;
        this.toastr.toastrConfig.autoDismiss = true;
        this.toastr.toastrConfig.timeOut = 1500;

        this.toastr.success(res.message, 'موفقیت');
      }
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.toastrConfig.tapToDismiss = false;
          this.toastr.toastrConfig.autoDismiss = true;
          this.toastr.toastrConfig.timeOut = 2500;

          this.toastr.error(error.error.message, 'خطا');
        }
      }
    );
  }

  updateProductNotInStock(id: number) {
    this.productService.updateProductNotInStock(id).subscribe((res) => {
      if (res.status === 'success') {


        this.ngOnInit();

        this.toastr.toastrConfig.tapToDismiss = false;
        this.toastr.toastrConfig.autoDismiss = true;
        this.toastr.toastrConfig.timeOut = 1500;

        this.toastr.success(res.message, 'موفقیت');
      }
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.toastrConfig.tapToDismiss = false;
          this.toastr.toastrConfig.autoDismiss = true;
          this.toastr.toastrConfig.timeOut = 2500;

          this.toastr.error(error.error.message, 'خطا');
        }
      }
    );
  }

}
