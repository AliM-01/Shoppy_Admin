import { of } from "rxjs";
import { FilterProductDiscountModel, ProductDiscountModel } from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { ProductDiscountService } from "@app_services/discount/product-discount/product-discount.service";

export class ProductDiscountDataServer {

  constructor(private ProductDiscountService: ProductDiscountService) { }

  public data: ProductDiscountModel[] = [];
  public resultsLength = 0;
  public isLoadingResults = true;
  public pageId: number = 1;

  loadProductDiscounts(filterProducts: FilterProductDiscountModel) {

    this.isLoadingResults = true;

    this.ProductDiscountService.filterProductDiscount(filterProducts)
      .pipe(catchError(() => of([])), finalize(() => {
        this.isLoadingResults = true;
      }))
      .subscribe((res: FilterProductDiscountModel) => {
        setTimeout(() => {
          this.data = res.discounts;
          this.resultsLength = res.dataCount;
          this.isLoadingResults = false;
          this.pageId = res.pageId;
        }, 750)
      });

  }
}

