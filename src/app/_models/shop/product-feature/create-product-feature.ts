export class CreateProductFeatureModel {
    productId: string;
    featureTitle: string;
    featureValue: string;

    constructor(
        productId: string,
        featureTitle: string,
        featureValue: string
    ) {
        this.productId = productId;
        this.featureTitle = featureTitle;
        this.featureValue = featureValue;
    }
}