import { ProductCategoryModel } from "./product-category";

export class FilterProductCategoryModel {

   constructor(
        public title: string,
        public productCategories: ProductCategoryModel[]
    ){}
}