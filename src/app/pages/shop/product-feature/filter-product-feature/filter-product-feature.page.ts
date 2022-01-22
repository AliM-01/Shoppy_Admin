import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { ProductFeatureService } from '@app_services/shop/product-feature/product-feature.service';
import { FilterProductFeatureModel, ProductFeatureDataServer, ProductFeatureModel } from '@app_models/shop/product-feature/_index';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter-product-feature',
  templateUrl: './filter-product-feature.page.html'
})
export class FilterProductFeaturePage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'title', 'value', 'creationDate', 'commands'];
  dataServer: ProductFeatureDataServer;
  dataSource: MatTableDataSource<ProductFeatureModel> = new MatTableDataSource<ProductFeatureModel>([]);
  isDataSourceLoaded: boolean = false;
  productId: number = 0;
  filterProductFeatures: FilterProductFeatureModel = new FilterProductFeatureModel(this.productId, [], 1, 10);

  constructor(
    private pageTitle: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private productFeatureService: ProductFeatureService
  ) {
    this.pageTitle.setTitle('ویژگی های محصول');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const productId = params.productId;

      if (productId === undefined) {
        this.router.navigate(['/']);
      }
      this.productId = productId;

      this.dataServer = new ProductFeatureDataServer(this.productFeatureService);
      this.dataServer.loadProductFeatures(this.filterProductFeatures);
      this.dataSource = new MatTableDataSource<ProductFeatureModel>(this.dataServer.data);
      this.dataSource.paginator = this.paginator;
  
      if (this.dataSource.data.length === 0) {
        this.isDataSourceLoaded = false;
      }
      
    });
  }

  ngAfterViewInit() {

    setInterval(() => {
      if (this.isDataSourceLoaded === false) {
        this.dataSource = new MatTableDataSource<ProductFeatureModel>(this.dataServer.data);
        this.paginator.pageIndex = (this.dataServer.pageId - 1);
        this.paginator.length = this.dataServer.resultsLength;
        this.paginator.pageSize = this.filterProductFeatures.takePage;

        if (this.dataSource.data.length !== 0) {
          this.isDataSourceLoaded = true;
        } else {
          this.isDataSourceLoaded = false;
        }
      }

    }, 1000);
      
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;

    if (this.filterProductFeatures.takePage !== size) {
      page = 1;
    }

    this.filterProductFeatures = new FilterProductFeatureModel(
      this.productId,
      [],
      page,
      size
    );
    this.ngOnInit();
    this.paginator.pageSize = size;
  }
  
  loadProductFeaturesPage() {
    this.filterProductFeatures = new FilterProductFeatureModel(
      this.productId,
      [],
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize
    );

    this.ngOnInit();
    this.paginator.length = this.dataServer.resultsLength;
    this.paginator.pageSize = this.filterProductFeatures.takePage;
  }

  deleteProductFeature(id: number) {
    this.productFeatureService.deleteProductFeature(id).subscribe((res) => {
      if (res.status === 'success') {
        this.ngOnInit();
      }
    });
  }

}
