import { ProductModel } from "./product";

export class FilterProductCategoryModel {

   constructor(
        public search: string,
        public products: ProductModel[]
    ){}
}