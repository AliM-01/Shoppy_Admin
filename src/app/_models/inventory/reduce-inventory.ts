export class ReduceInventoryModel {
    constructor(
         public inventoryId: string,
         public orderId: number,
         public productId: number,
         public count: number,
         public description: string
     ){}
 }