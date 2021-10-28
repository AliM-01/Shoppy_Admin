import { AfterViewInit, ViewChild } from '@angular/core';

import {Component} from '@angular/core';
import { ProductCategoryService } from '@app_services/product-category/product-category.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  id: number;
  title: string;
  creationDate: string;
  productsCount: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, title: 'Hydrogen', creationDate: "1399", productsCount: 1 },
  { id: 2, title: 'Helium', creationDate: "1399", productsCount: 2 },
  { id: 3, title: 'Lithium', creationDate: "1399", productsCount: 3 },
  { id: 4, title: 'Beryllium', creationDate: "1399", productsCount: 4 },
  { id: 5, title: 'Hydrogen', creationDate: "1399", productsCount: 1 },
  { id: 6, title: 'Helium', creationDate: "1399", productsCount: 2 },
  { id: 7, title: 'Lithium', creationDate: "1399", productsCount: 3 },
  { id: 8, title: 'Beryllium', creationDate: "1399", productsCount: 4 },
]

@Component({
  selector: 'app-filter-product-category',
  templateUrl: './filter-product-category.component.html'
})
export class FilterProductCategoryComponent  implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'title', 'creationDate', 'productsCount'];
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatSort) sort!: MatSort;

  // filterProductCategories : FilterProductCategory = new FilterProductCategory('', [], 0, 0, 0, 0, 0, 9, 0, 0);

  constructor(
    private productCategoryService: ProductCategoryService
  ) { 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
