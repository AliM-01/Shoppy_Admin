export class ReduceInventoryModel {
    constructor(
         public inventoryId: string,
         public orderId: number,
         public productId: string,
         public count: number,
         public description: string
     ){}
 }