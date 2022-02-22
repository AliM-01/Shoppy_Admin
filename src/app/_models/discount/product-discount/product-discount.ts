export class ProductDiscountModel {
    constructor(
         public id: string,
         public productId: number,
         public product: string,
         public rate: number,
         public startDate: string,
         public endDate: string,
         public description: string,
         public creationDate: string,
         public isRemoved: boolean
     ){}
 }