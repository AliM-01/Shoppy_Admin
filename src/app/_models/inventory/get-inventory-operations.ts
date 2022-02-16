import { InventoryOperationModel } from "./inventory-operation";

export class GetInventoryOperationsModel {
    constructor(
         public inventoryId: string,
         public productId: number,
         public productTitle: string,
         public operations: InventoryOperationModel[],
     ){}
 }