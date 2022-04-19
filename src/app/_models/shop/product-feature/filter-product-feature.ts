import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from "@app_models/_common/IPaging";
import { ProductFeatureModel } from "./product-feature";

export class FilterProductFeatureModel implements IPaging {

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
        this.productId = productId;
        this.productFeatures = productFeatures;
        this.pageId = pageId;
        this.takePage = takePage;
    }
}
