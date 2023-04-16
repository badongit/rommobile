import { IListCustomerParams } from 'src/types/customer/list-customer.params.type';
import api from './api';

const URL_PREFIX = '/customers';
export const customerService = {
  list: (params?: IListCustomerParams) => {
    const url = URL_PREFIX;
    return api.get(url, params);
  },
};
