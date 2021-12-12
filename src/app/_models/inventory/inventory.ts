export class InventoryModel {
    constructor(
         public id: number,
         public productId: number,
         public product: string,
         public inStock: boolean,
         public unitPrice: number,
         public currentCount: number,
         public creationDate: string,
     ){}
 }