export class ArticleModel {
    constructor(
         public id: string,
         public title: string,
         public summary: string,
         public categoryId: string,
         public category: string,
         public imagePath: string,
         public creationDate: string
     ){}
 }