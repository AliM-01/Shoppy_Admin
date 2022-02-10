export class EditArticleModel {
    constructor(
         public id: number,
         public title: string,
         public summary: string,
         public text: string,
         public categoryId: number,
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