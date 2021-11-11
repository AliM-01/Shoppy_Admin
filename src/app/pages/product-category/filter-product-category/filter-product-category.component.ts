import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductCategoryService } from '@app_services/product-category/product-category.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProductCategoryDataSource, FilterProductCategoryModel } from '../../../_models/product-category/_index';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductCategoryComponent } from '../create-product-category/create-product-category.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-filter-product-category',
  templateUrl: './filter-product-category.component.html'
})
export class FilterProductCategoryComponent implements OnInit, AfterViewInit {

  //#region properties

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterInput') input: ElementRef;
  displayedColumns: string[] = ['id', 'title', 'creationDate', 'productsCount', 'commands'];
  dataSource: ProductCategoryDataSource;

  filterProductCategories: FilterProductCategoryModel = new FilterProductCategoryModel('', []);

  //#endregion

  //#region Ctor

  constructor(
    public dialog: MatDialog,
    private productCategoryService: ProductCategoryService,
    private toastr: ToastrService
  ) { }

  //#endregion

  //#region ngOnInit

  ngOnInit(): void {
    this.dataSource = new ProductCategoryDataSource(this.productCategoryService);
    this.dataSource.loadProductCategories(this.filterProductCategories);
  }

  //#endregion

  //#region ngAfterViewInit

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
  }

  //#endregion

  //#region openDialog

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateProductCategoryComponent, {
      width: '600px',
      height: '700px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  //#endregion

  //#region loadProductCategoriesPage

  loadProductCategoriesPage() {
    this.filterProductCategories = new FilterProductCategoryModel(this.input.nativeElement.value, []);
    this.dataSource.loadProductCategories(this.filterProductCategories);
  }

  //#endregion

  //#region deleteProductCategory

  deleteProductCategory(id: number) {
    this.productCategoryService.deleteProductCategory(id).subscribe((res) => {
      if (res.status === 'success') {


        this.ngOnInit();

        this.toastr.toastrConfig.tapToDismiss = false;
        this.toastr.toastrConfig.autoDismiss = true;
        this.toastr.toastrConfig.timeOut = 1500;

        this.toastr.success('دسته بندی مورد نظر با موفقیت حذف شد', 'موفقیت');
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

  //#endregion
}
