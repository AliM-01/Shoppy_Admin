export class EditProductCategoryModel {
    constructor(
         public id: string,
         public title: string,
         public description: string,
         public imagePath: string,
         public imageFileUploaded: boolean,
         public imageFile: File,
         public imageAlt: string,
         public imageTitle: string,
         public metaKeywords: string,
         public metaDescription: string
     ){}
 }
