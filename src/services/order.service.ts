import { OrderStatusEnum } from 'src/constants/order/enums';
import api from './api';

const URL_PREFIX = '/orders';
export const orderService = {
  listAll: () => {
    const url = URL_PREFIX;
    return api.get(url, {
      status: [OrderStatusEnum.IN_PROGRESS, OrderStatusEnum.WAIT_CONFIRM].join(
        ',',
      ),
      isGetDetails: 1,
      isGetAll: 1,
    });
  },
};
