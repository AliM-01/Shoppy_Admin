import { ColleagueDiscountModel } from "./colleague-discount";

export class FilterColleagueDiscountModel {

   constructor(
        public productId: number,
        public productTitle: string,
        public discounts: ColleagueDiscountModel[]
    ){}
}