import { Component, AfterViewInit, ElementRef, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
import { DataHelperService } from '../../../../_services/common/data-helper/data-helper.service';

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
  filterProducts: FilterProductModel = new FilterProductModel('', '', []);

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
}
