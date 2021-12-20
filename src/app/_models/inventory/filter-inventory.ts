import { InventoryModel } from './inventory';

export class FilterInventoryModel {

   constructor(
        public productId: number,
        public inStockState: FilterInventoryInStockStateEnum,
        public inventories: InventoryModel[]
    ){}
}

export enum FilterInventoryInStockStateEnum {
    All,
    InStock,
    NotInStock
}