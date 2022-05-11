import {FilterProductFeatureModel, ProductFeatureModel} from "./_index";
import {finalize} from 'rxjs/operators';
import {ProductFeatureService} from "@app_services/shop/product-feature/product-feature.service";
import {BaseDataServer} from "@app_models/_common/_index";

export class ProductFeatureDataServer extends BaseDataServer<ProductFeatureModel, FilterProductFeatureModel> {


  public data: ProductFeatureModel[] = [];
  public resultsLength = 0;
  public isLoadingResults = true;
  public pageId = 1;

  constructor(private productFeatureService: ProductFeatureService) {
    super();
  }

  load(filter: FilterProductFeatureModel): void {
    this.loadingOn();

    this.productFeatureService.filterProductFeature(filter)
      .pipe(
        finalize(() => {
          this.loadingOff();
        })
      )
      .subscribe((res: FilterProductFeatureModel) => {
        this.data = res.productFeatures === undefined ? [] : res.productFeatures;
        this.resultsLength = res.dataCount;
        this.pageId = res.pageId;
      });
  }
}

