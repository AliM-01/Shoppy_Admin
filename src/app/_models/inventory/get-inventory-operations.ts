import { InventoryOperationModel } from "./inventory-operation";

export class GetInventoryOperationsModel {
    constructor(
         public inventoryId: string,
         public productId: string,
         public productTitle: string,
         public operations: InventoryOperationModel[],
     ){}
 }