export class EditProductModel {
    constructor(
         public id: number,
         public categoryId: number,
         public title: string,
         public code: string,
         public unitPrice: string,
         public isInStock: boolean,
         public shortDescription: string,
         public description: string,
         public imagePath: string,
         public imageFile: any,
         public imageFileUploaded: boolean,
         public imageAlt: string,
         public imageTitle: string,
         public metaKeywords: string,
         public metaDescription: string,
     ){}
 }