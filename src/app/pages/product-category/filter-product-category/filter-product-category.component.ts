import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductCategoryService } from '@app_services/product-category/product-category.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProductCategoryDataSource, FilterProductCategoryModel } from '../../../_models/product-category/_index';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductCategoryComponent } from '../create-product-category/create-product-category.component';

@Component({
  selector: 'app-filter-product-category',
  templateUrl: './filter-product-category.component.html'
})
export class FilterProductCategoryComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterInput') input: ElementRef;
  displayedColumns: string[] = ['id', 'title', 'creationDate', 'productsCount'];
  dataSource: ProductCategoryDataSource;

  filterProductCategories: FilterProductCategoryModel = new FilterProductCategoryModel('', [], 0, 0, 0, 0, 0, 9, 0, 0);

  
  constructor(
    public dialog: MatDialog,
    private productCategoryService: ProductCategoryService
  ) { }

  ngOnInit(): void {
    this.dataSource = new ProductCategoryDataSource(this.productCategoryService);
    this.dataSource.loadProductCategories(this.filterProductCategories);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateProductCategoryComponent, {
      width: '550px',
      height: '400px'
    });
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
  }

  loadProductCategoriesPage() {
    this.filterProductCategories =new FilterProductCategoryModel(this.input.nativeElement.value, [], this.paginator.pageIndex, 0, 0, 0, 0, this.paginator.pageSize, 0, 0);
    this.dataSource.loadProductCategories(this.filterProductCategories);
  }

}
