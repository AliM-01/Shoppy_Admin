import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProductDataSource, FilterProductModel } from '../../../_models/product/_index';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '@app_services/product/product.service';
import { CreateProductComponent } from '../create-product/create-product.component';
@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html'
})
export class FilterProductComponent implements OnInit, AfterViewInit {

  //#region properties

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterInput') input: ElementRef;
  displayedColumns: string[] = ['id', 'title', 'creationDate', 'productsCount'];
  dataSource: ProductDataSource;

  filterProducts: FilterProductModel = new FilterProductModel('', []);

  //#endregion

  //#region Ctor

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  //#endregion

  //#region ngOnInit

  ngOnInit(): void {
    this.dataSource = new ProductDataSource(this.productService);
    this.dataSource.loadProducts(this.filterProducts);
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

  //#region openCreateDialog

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '600px',
      height: '700px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  //#endregion

  //#region openEditDialog

  // openEditDialog(id:number): void {
  //   const dialogRef = this.dialog.open(EditProductComponent, {
  //     width: '600px',
  //     height: '700px',
  //     data: {
  //       id: id
  //     }
  //   }).afterClosed().subscribe(() => {
  //     this.ngOnInit();
  //   });
  // }

  //#endregion

  //#region loadProductCategoriesPage

  loadProductCategoriesPage() {
    this.filterProducts = new FilterProductModel(this.input.nativeElement.value, []);
    this.dataSource.loadProducts(this.filterProducts);
  }

  //#endregion

  //#region deleteProduct

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((res) => {
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
