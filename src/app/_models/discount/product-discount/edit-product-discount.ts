export class EditProductDiscountModel {
    constructor(
         public id: string,
         public productId: number,
         public rate: number,
         public startDate: string,
         public endDate: string,
         public description: string,
     ){}
 }