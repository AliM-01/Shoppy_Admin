import { ProductCategoryModel } from "./product-category";

export class FilterProductCategoryModel {

   constructor(
        public title: string,
        public productCategories: ProductCategoryModel[],
        public pageId: number,
        public allPagesCount: number,
        public startPage: number,
        public endPage: number,
        public shownPages: number,
        public takePage: number,
        public skipPage: number,
        public pageCount: number
    ){}
}