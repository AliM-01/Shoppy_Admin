import { ProductPictureModel } from "./product-picture";

export class FilterProductPictureModel {

   constructor(
        public productId: number,
        public productPictures: ProductPictureModel[]
    ){}
}