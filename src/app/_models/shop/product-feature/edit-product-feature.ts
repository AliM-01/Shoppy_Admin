import { CreateProductFeatureModel } from "./create-product-feature";

export class EditProductFeatureModel extends CreateProductFeatureModel {
    id: string;

    constructor(
        id: string,
        productId: string,
        featureTitle: string,
        featureValue: string
    ) {
        super(productId, featureTitle, featureValue);
        this.id = id;
    }
 }