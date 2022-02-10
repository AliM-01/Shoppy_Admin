export class ArticleModel {
    constructor(
         public id: number,
         public title: string,
         public summary: string,
         public categoryId: number,
         public category: string,
         public imagePath: string,
         public creationDate: string,
     ){}
 }