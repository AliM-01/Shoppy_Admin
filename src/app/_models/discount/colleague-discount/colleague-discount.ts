export class ColleagueDiscountModel {
    constructor(
         public id: number,
         public productId: number,
         public product: string,
         public rate: number,
         public creationDate: string,
         public isActive: boolean
     ){}
 }