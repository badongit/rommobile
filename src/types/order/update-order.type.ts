export interface IUpdateOrder {
  id: number;
  note?: string;
  customerPhoneNumber?: string;
  customerName?: string;
  details: IUpdateOrderDetail[];
}

export interface IUpdateOrderDetail {
  id?: number;
  quantity: number;
  price: number;
  dishId: number;
}
