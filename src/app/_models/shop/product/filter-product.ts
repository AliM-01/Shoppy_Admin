import { IPaging } from "@app_models/common/IPaging";
import { ProductModel } from "./product";

export class FilterProductModel implements IPaging {
    pageId: number;
    allPagesCount: number;
    takePage: number;
    search: string;
    categoryId: string;
    products: ProductModel[];

    constructor(
        search: string,
        categoryId: string,
        products: ProductModel[],
        pageId: number,
        takePage: number
        ){
        this.search = search;
        this.categoryId = categoryId;
        this.products = products;
        this.pageId = pageId;
        this.takePage = takePage;
    }
}