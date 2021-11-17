import { ProductPictureModel } from "./product-picture";

export class FilterProductPictureModel {

   constructor(
        public productId: string,
        public productPictures: ProductPictureModel[]
    ){}
}