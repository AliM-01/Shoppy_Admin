export class ProductFeatureModel {
    constructor(
         public id: number,
         public productId: number,
         public featureTitle: string,
         public featureValue: string,
         public creationDate: string,
     ){}
 }