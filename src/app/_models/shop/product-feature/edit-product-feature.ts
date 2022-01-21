import { CreateProductFeatureModel } from "./create-product-feature";

export class EditProductFeatureModel extends CreateProductFeatureModel {
    id: number;

    constructor(
        id: number,
        productId: string,
        featureTitle: string,
        featureValue: string
    ) {
        super(productId, featureTitle, featureValue);
        this.id = id;
    }
 }