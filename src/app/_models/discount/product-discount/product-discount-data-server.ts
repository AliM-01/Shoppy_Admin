import {FilterProductDiscountModel, ProductDiscountModel} from "./_index";
import {finalize} from 'rxjs/operators';
import {ProductDiscountService} from "@app_services/discount/product-discount/product-discount.service";
import {BaseDataServer} from "@app_models/_common/BaseDataServer";

export class ProductDiscountDataServer extends BaseDataServer<ProductDiscountModel, FilterProductDiscountModel> {


  constructor(private productDiscountService: ProductDiscountService) {
    super();
  }

  load(filter: FilterProductDiscountModel): void {
    this.loadingOn();

    this.productDiscountService.filterProductDiscount(filter)
      .pipe(
        finalize(() => {
          this.loadingOff();
        })
      )
      .subscribe((res: FilterProductDiscountModel) => {
        this.data = res.discounts === undefined ? [] : res.discounts;
        this.resultsLength = res.dataCount;
        this.pageId = res.pageId;
      });
  }
}

