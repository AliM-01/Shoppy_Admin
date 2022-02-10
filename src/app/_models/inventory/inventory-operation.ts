export class InventoryOperationModel {
    constructor(
         public id: string,
         public operationType: boolean,
         public count: number,
         public operationDate: string,
         public currentCount: number,
         public description: string,
         public inventoryId: string,
         public operatorId: number,
         public operator: string,
         public orderId: number
     ){}
 }