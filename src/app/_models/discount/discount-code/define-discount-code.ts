export class DefineDiscountCodeModel {
  constructor(
    public code: string,
    public rate: number,
    public startDate: string,
    public endDate: string,
    public description: string
  ) { }
}
