export class CreateProductPictureModel {
    constructor(
         public productId: number,
         public imageFiles: any[] = []
     ){}
 }