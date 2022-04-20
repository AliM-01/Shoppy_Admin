export class CreateProductModel {
    constructor(
         public categoryId: string,
         public title: string,
         public shortDescription: string,
         public description: string,
         public imageFile: File,
         public imageAlt: string,
         public imageTitle: string,
         public metaKeywords: string,
         public metaDescription: string
     ){}
 }
