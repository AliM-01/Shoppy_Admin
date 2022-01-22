import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from "@app_models/common/IPaging";
import { ProductFeatureModel } from "./product-feature";

export class FilterProductFeatureModel implements IPaging {

    pageId: number;
    allPagesCount: number;
    takePage: number;
    sortCreationDateOrder: PagingDataSortCreationDateOrder;
    sortIdOrder: PagingDataSortIdOrder;
    productId: number;
    productFeatures: ProductFeatureModel[];

    constructor(
        productId: number,
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