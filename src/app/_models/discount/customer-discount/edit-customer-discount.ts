export class EditCustomerDiscountModel {
    constructor(
         public id: number,
         public productId: number,
         public rate: number,
         public startDate: string,
         public endDate: string,
         public description: string,
     ){}
 }