export class CreateProductPictureModel {
    constructor(
         public productId: number,
         public imageFile: any,
         public imageAlt: string,
         public imageTitle: string
     ){}
 }