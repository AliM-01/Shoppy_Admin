export class ReduceInventoryModel {
    constructor(
         public inventoryId: string,
         public orderId: string,
         public productId: string,
         public count: number,
         public description: string
     ){}
 }
