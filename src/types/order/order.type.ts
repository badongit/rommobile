import {
  OrderDetailStatusEnum,
  OrderStatusEnum,
  OrderTypeEnum,
  PaymentMethodEnum,
} from 'src/constants/order/enums';
import { ICustomer } from '../customer/customer.type';

export interface IOrderDetail {
  id: number;
  quantity: number;
  status: OrderDetailStatusEnum;
  dishId: number;
  price: number;
  orderId: number;
  createdAt: Date;
}

export interface IOrder {
  id: number;
  code: string;
  paymentReality: number;
  paymentMethod: PaymentMethodEnum;
  status: OrderStatusEnum;
  type: OrderTypeEnum;
  note: string;
  tableId: number;
  waitingTicket: string;
  customerId: number;
  customer: ICustomer;
  details: IOrderDetail[];
}
