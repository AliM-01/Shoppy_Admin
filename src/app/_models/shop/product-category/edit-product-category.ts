export class EditProductCategoryModel {
    constructor(
         public id: number,
         public title: string,
         public description: string,
         public imagePath: any,
         public imageFileUploaded: boolean,
         public imageFile: any,
         public imageAlt: string,
         public imageTitle: string,
         public metaKeywords: string,
         public metaDescription: string,
     ){}
 }