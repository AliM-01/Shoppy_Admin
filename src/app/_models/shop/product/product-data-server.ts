import {ProductService} from "@app_services/shop/product/product.service";
import {FilterProductModel, ProductModel} from "./_index";
import {finalize} from 'rxjs/operators';
import {BaseDataServer} from '@app_models/_common/_index';

export class ProductDataServer extends BaseDataServer<ProductModel, FilterProductModel> {

  constructor(private productService: ProductService) {
    super();
  }

  load(filter: FilterProductModel): void {
    this.loadingOn();

    this.productService.filterProduct(filter)
      .pipe(
        finalize(() => {
          this.loadingOff();
        })
      )
      .subscribe((res: FilterProductModel) => {
        this.data = res.products === undefined ? [] : res.products;
        this.resultsLength = res.dataCount;
        this.pageId = res.pageId;
      });
  }

}

