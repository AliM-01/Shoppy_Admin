export class DiscountCodeModel {
  id: string;
  code: string;
  rate: number;
  startDate: string;
  endDate: string;
  description: string;
  isExpired: boolean;
}
