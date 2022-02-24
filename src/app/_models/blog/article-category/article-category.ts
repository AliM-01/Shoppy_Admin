export class ArticleCategoryModel {
    constructor(
         public id: string,
         public title: string,
         public description: string,
         public orderShow: number,
         public imagePath: string,
         public creationDate: string,
     ){}
 }