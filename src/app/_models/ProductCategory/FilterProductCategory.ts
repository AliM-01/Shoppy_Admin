import { ProductCategory } from "./ProductCategory";

export class FilterProductCategory {

   constructor(
        public title: string,
        public productCategories: ProductCategory[],
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