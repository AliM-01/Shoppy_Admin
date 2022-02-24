export class ColleagueDiscountModel {
    constructor(
         public id: string,
         public productId: string,
         public product: string,
         public rate: number,
         public creationDate: string,
         public isActive: boolean
     ){}
 }