export interface IPaymentPlan {
  id?: number;
  name: string;
  price: number;
  dateRange: number;
  isActive: boolean;
  description?: string;
}

export class PaymentPlan implements IPaymentPlan {
  id?: number;
  name: string;
  price: number;
  dateRange: number;
  isActive: boolean;
  description?: string;
}
