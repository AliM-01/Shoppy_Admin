import { CustomerDiscountModel } from "./customer-discount";

export class FilterCustomerDiscountModel {

   constructor(
        public productId: number,
        public productTitle: string,
        public discounts: CustomerDiscountModel[]
    ){}
}