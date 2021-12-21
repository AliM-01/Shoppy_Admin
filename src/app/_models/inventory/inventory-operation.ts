export class InventoryOperationModel {
    constructor(
         public id: number,
         public operationType: boolean,
         public count: number,
         public operationDate: string,
         public currentCount: number,
         public description: string,
         public inventoryId: number,
         public operatorId: number,
         public operator: string,
         public orderId: number
     ){}
 }