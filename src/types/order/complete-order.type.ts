import { PaymentMethodEnum } from 'src/constants/order/enums';

export interface ICompleteOrder {
  id: number;
  note: string;
  customerPhoneNumber: string;
  customerName: string;
  paymentMethod: PaymentMethodEnum;
  pointUsed: string;
  cashierId: number;
}
