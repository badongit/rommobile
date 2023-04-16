import { OrderStatusEnum, OrderTypeEnum } from 'src/constants/order/enums';

export interface ICreateOrder {
  type: OrderTypeEnum;
  status: OrderStatusEnum;
  note?: string;
  tableId?: number;
  customerPhoneNumber?: string;
  customerName?: string;
  waitingTicket?: string;
  details: ICreateOrderDetail[];
}

export interface ICreateOrderDetail {
  quantity: number;
  price: number;
  dishId: number;
}
