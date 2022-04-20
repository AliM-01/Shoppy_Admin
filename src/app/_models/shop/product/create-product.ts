/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export class CreateProductModel {
    constructor(
         public categoryId: string,
         public title: string,
         public shortDescription: string,
         public description: string,
         public imageFile: any,
         public imageAlt: string,
         public imageTitle: string,
         public metaKeywords: string,
         public metaDescription: string
     ){}
 }
