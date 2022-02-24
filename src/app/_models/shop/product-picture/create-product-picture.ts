export class CreateProductPictureModel {
    constructor(
         public productId: string,
         public imageFiles: any[] = []
     ){}
 }