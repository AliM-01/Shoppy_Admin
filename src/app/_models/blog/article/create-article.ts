/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export class CreateArticleModel {
    constructor(
         public title: string,
         public summary: string,
         public text: string,
         public categoryId: string,
         public imageFile: any,
         public imageAlt: string,
         public imageTitle: string,
         public metaKeywords: string,
         public metaDescription: string,
         public canonicalAddress: string
     ){}
 }
