export class EditProductCategory {
    constructor(
         public id: number,
         public title: string,
         public description: string,
         public imagePath: string,
         public imageAlt: string,
         public imageTitle: string,
         public metaKeywords: string,
         public metaDescription: string,
     ){}
 }