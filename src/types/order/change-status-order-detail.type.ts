import { OrderDetailStatusEnum } from 'src/constants/order/enums';
import { IdParamsDto } from '../common';

export interface IChangeStatusOrderDetail extends IdParamsDto {
  status: OrderDetailStatusEnum;
}
