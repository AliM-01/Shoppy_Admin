export class EditArticleCategoryModel {
    constructor(
         public id: string,
         public title: string,
         public description: string,
         public orderShow: number,
         public imagePath: any,
         public imageFileUploaded: boolean,
         public imageFile: any,
         public imageAlt: string,
         public imageTitle: string,
         public metaKeywords: string,
         public metaDescription: string,
         public canonicalAddress: string,
     ){}
 }