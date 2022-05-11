import {FilterDiscountCodeModel, DiscountCodeModel} from "./_index";
import {finalize} from 'rxjs/operators';
import {DiscountCodeService} from "@app_services/discount/discount-code/discount-code.service";
import {BaseDataServer} from "@app_models/_common/_index";

export class DiscountCodeDataServer extends BaseDataServer<DiscountCodeModel, FilterDiscountCodeModel>  {

  constructor(private discountCodeService: DiscountCodeService) {
    super();
  }

  load(filter: FilterDiscountCodeModel): void {
    this.loadingOn();

    this.discountCodeService.filterDiscountCode(filter)
      .pipe(
        finalize(() => {
          this.loadingOff();
        })
      )
      .subscribe((res: FilterDiscountCodeModel) => {
        this.data = res.discounts === undefined ? [] : res.discounts;
        this.resultsLength = res.dataCount;
        this.pageId = res.pageId;
      });
  }
}

