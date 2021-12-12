import { InventoryModel } from './inventory';

export class FilterInventoryModel {

   constructor(
        public productId: number,
        public inStock: boolean,
        public inventories: InventoryModel[]
    ){}
}