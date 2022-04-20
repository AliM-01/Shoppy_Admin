export class InventoryModel {
    constructor(
         public id: string,
         public productId: string,
         public product: string,
         public inStock: boolean,
         public unitPrice: number,
         public currentCount: number,
         public creationDate: string
     ){}
 }