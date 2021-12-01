export class DefineCustomerDiscountModel {
    constructor(
         public productId: number,
         public rate: number,
         public startDate: string,
         public endDate: string,
         public description: string,
     ){}
 }