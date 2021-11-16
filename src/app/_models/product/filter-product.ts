import { ProductModel } from "./product";

export class FilterProductModel {

   constructor(
        public search: string,
        public categoryId: string,
        public products: ProductModel[]
    ){}
}