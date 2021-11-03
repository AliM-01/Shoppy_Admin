import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ProductCategoryService } from '@app_services/product-category/product-category.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProductCategoryDataSource, ProductCategory, FilterProductCategory } from '../../../_models/product-category/_index';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-filter-product-category',
  templateUrl: './filter-product-category.component.html'
})
export class FilterProductCategoryComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'title', 'creationDate', 'productsCount'];
  dataSource: ProductCategoryDataSource;

  filterProductCategories: FilterProductCategory = new FilterProductCategory('', [], 0, 0, 0, 0, 0, 9, 0, 0);

  constructor(
    private productCategoryService: ProductCategoryService
  ) { }

  ngOnInit(): void {
    console.log("init");
    
    this.dataSource = new ProductCategoryDataSource(this.productCategoryService);
    this.dataSource.loadProductCategories(this.filterProductCategories);
    
  }

  ngAfterViewInit() {
    console.log("view");
    
    this.paginator.page
      .pipe(
        tap(() => this.loadProductCategoriesPage())
      )
      .subscribe();
  }

  loadProductCategoriesPage() {
    this.dataSource.loadProductCategories(new FilterProductCategory('', [], this.paginator.pageIndex, 0, 0, 0, 0, this.paginator.pageSize, 0, 0));
  }

}
