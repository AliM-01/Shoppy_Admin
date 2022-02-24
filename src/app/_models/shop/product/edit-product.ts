export class EditProductModel {
    constructor(
         public id: string,
         public categoryId: string,
         public title: string,
         public code: string,
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