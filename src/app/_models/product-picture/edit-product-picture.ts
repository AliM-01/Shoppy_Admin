export class EditProductPictureModel {
    constructor(
         public id: number,
         public productId: number,
         public imagePath: any,
         public imageFileUploaded: boolean,
         public imageFile: any,
         public imageAlt: string,
         public imageTitle: string
     ){}
 }