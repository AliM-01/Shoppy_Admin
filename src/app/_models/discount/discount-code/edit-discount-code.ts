import {DefineDiscountCodeModel} from "./define-discount-code";

export class EditDiscountCodeModel extends DefineDiscountCodeModel {

  id: string;

  constructor(
    id: string,
    code: string,
    rate: number,
    startDate: string,
    endDate: string,
    description: string
  ) {
    super(code, rate, startDate, endDate, description);
    this.id = id;
  }
}
