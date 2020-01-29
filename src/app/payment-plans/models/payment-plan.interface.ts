export interface IPaymentPlan {
  id?: number;
  name: string;
  price: number;
  dateRange: number;
  isActive: boolean;
  description?: string;
}