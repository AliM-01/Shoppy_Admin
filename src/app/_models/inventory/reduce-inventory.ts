export class ReduceInventoryModel {
    constructor(
         public inventoryId: number,
         public orderId: number,
         public productId: number,
         public count: number,
         public description: string
     ){}
 }