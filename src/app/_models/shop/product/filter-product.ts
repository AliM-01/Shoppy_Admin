import { IPaging } from "@app_models/common/IPaging";
import { ProductModel } from "./product";

export class FilterProductModel implements IPaging {
    pageId: number;
    allPagesCount: number;
    takePage: number;
    search: string;
    categoryId: string;
    products: ProductModel[];
}