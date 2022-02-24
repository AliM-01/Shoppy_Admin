export class ProductFeatureModel {
    constructor(
         public id: string,
         public productId: string,
         public featureTitle: string,
         public featureValue: string,
         public creationDate: string,
     ){}
 }