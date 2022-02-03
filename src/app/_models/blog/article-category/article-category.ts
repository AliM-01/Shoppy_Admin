export class ArticleCategoryModel {
    constructor(
         public id: number,
         public title: string,
         public description: string,
         public orderShow: number,
         public imagePath: string,
         public creationDate: string,
     ){}
 }