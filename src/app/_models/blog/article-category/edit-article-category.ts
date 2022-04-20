/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class EditArticleCategoryModel {
    constructor(
         public id: string,
         public title: string,
         public description: string,
         public orderShow: number,
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
