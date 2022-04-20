export class ProductModel {
    constructor(
         public id: string,
         public title: string,
         public code: string,
         public unitPrice: string,
         public imagePath: string,
         public isInStock: boolean,
         public categoryTitle: string,
         public creationDate: string
     ){}
 }