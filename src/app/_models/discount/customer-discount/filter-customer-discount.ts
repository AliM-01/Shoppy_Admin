import { CustomerDiscountModel } from "./customer-discount";

export class FilterCustomerDiscountModel {

   constructor(
        public productId: number,
        public discounts: CustomerDiscountModel[]
    ){}
}