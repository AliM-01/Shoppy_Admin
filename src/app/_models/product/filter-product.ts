import { ProductModel } from "./product";

export class FilterProductModel {

   constructor(
        public search: string,
        public products: ProductModel[]
    ){}
}