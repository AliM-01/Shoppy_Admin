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

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.page.html'
})
export class FilterProductPage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterInput') input: ElementRef;
  @ViewChild('filterCategoryInput') categoryInput: ElementRef;
  displayedColumns: string[] = ['id', 'thumbnailImage', 'title', 'inStockStatus', 'creationDate', 'productsCount', 'commands'];
  dataSource: ProductDataSource;
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
    this.dataSource = new ProductDataSource(this.productService);
    this.dataSource.loadProducts(this.filterProducts);
  }

  ngAfterViewInit() {

    setInterval(() => {
      this.paginator.length = this.dataSource.length;
      this.paginator.pageIndex = this.dataSource.pageId;
      this.paginator.pageSize = this.filterProducts.takePage;
    }, 1250)


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

    if (page === 0)
      page = 1;

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
      this.paginator.pageIndex,
      this.paginator.pageSize
    );

    this.ngOnInit();
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
