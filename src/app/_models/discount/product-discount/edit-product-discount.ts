import {DefineProductDiscountModel} from "./define-product-discount";

export class EditProductDiscountModel extends DefineProductDiscountModel {
  id: string;

  constructor(
    id: string,
    productId: string,
    rate: number,
    startDate: string,
    endDate: string,
    description: string
  ) {
    super(productId, rate, startDate, endDate, description);
    this.id = id;
  }
}
