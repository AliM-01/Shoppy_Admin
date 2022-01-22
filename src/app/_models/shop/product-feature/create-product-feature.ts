export class CreateProductFeatureModel {
    productId: number;
    featureTitle: string;
    featureValue: string;

    constructor(
        productId: number,
        featureTitle: string,
        featureValue: string
    ) {
        this.productId = productId;
        this.featureTitle = featureTitle;
        this.featureValue = featureValue;
    }
}