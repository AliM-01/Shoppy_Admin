export class DefineProductDiscountModel {
    constructor(
         public productId: string,
         public rate: number,
         public startDate: string,
         public endDate: string,
         public description: string,
     ){}
 }