export class ProductCategory {
    constructor(
         public id: number,
         public title: string,
         public imagePath: string,
         public creationDate: string,
         public productsCount: number,
     ){}
 }