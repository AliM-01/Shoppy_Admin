import {BasePaging} from "@app_models/_common/_index";
import {ProductFeatureModel} from "./product-feature";

export class FilterProductFeatureModel extends BasePaging {

  productId: string;
  productFeatures: ProductFeatureModel[];

  constructor(
    productId: string,
    pageId: number,
    takePage: number
  ) {
    super();
    this.productId = productId;
    this.pageId = pageId;
    this.takePage = takePage;
  }
}
