export class CreateProductCategoryModel {
    constructor(
         public title: string,
         public description: string,
         public imageFile: File,
         public imageAlt: string,
         public imageTitle: string,
         public metaKeywords: string,
         public metaDescription: string
     ){}
 }
