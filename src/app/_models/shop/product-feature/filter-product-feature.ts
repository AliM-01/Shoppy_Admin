import { BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from "@app_models/_common/_index";
import { ProductFeatureModel } from "./product-feature";

export class FilterProductFeatureModel extends BasePaging {

    pageId: number;
    dataCount: number;
    takePage: number;
    sortCreationDateOrder: PagingDataSortCreationDateOrder;
    sortIdOrder: PagingDataSortIdOrder;
    productId: string;
    productFeatures: ProductFeatureModel[];

    constructor(
        productId: string,
        productFeatures: ProductFeatureModel[],
        pageId: number,
        takePage: number
    ) {
      super();
        this.productId = productId;
        this.productFeatures = productFeatures;
        this.pageId = pageId;
        this.takePage = takePage;
    }
}
