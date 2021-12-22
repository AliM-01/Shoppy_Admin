export class CreateProductModel {
    constructor(
         public categoryId: number,
         public title: string,
         public shortDescription: string,
         public description: string,
         public imageFile: any,
         public imageAlt: string,
         public imageTitle: string,
         public metaKeywords: string,
         public metaDescription: string,
     ){}
 }