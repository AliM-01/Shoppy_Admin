/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export class EditArticleModel {
    constructor(
         public id: string,
         public title: string,
         public summary: string,
         public text: string,
         public categoryId: string,
         public imagePath: string,
         public imageFileUploaded: boolean,
         public imageFile: any,
         public imageAlt: string,
         public imageTitle: string,
         public metaKeywords: string,
         public metaDescription: string,
         public canonicalAddress: string
     ){}
 }
