import {ProductCategoryService} from "@app_services/shop/product-category/product-category.service";
import {FilterProductCategoryModel, ProductCategoryModel} from "./_index";
import {finalize} from 'rxjs/operators';
import {BaseDataServer} from "@app_models/_common/_index";

export class ProductCategoryDataServer extends BaseDataServer<ProductCategoryModel, FilterProductCategoryModel> {

  constructor(private productCategoryService: ProductCategoryService) {
    super();
  }

  load(filter: FilterProductCategoryModel): void {
    this.loadingOn();

    this.productCategoryService.filterProductCategory(filter)
      .pipe(
        finalize(() => {
          this.loadingOff();
        })
      )
      .subscribe((res: FilterProductCategoryModel) => {
        this.data = res.productCategories === undefined ? [] : res.productCategories;
        this.resultsLength = res.dataCount;
        this.pageId = res.pageId;
      });
  }
}

