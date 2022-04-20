export class EditDiscountCodeModel {
    constructor(
         public id: string,
         public code: string,
         public rate: number,
         public startDate: string,
         public endDate: string,
         public description: string
     ){}
 }
