import { IOrder, IOrderDetail } from 'src/types/order/order.type';

export const ORDER_GET_LIST = 'order/get-list';
export const ORDER_GET_LIST_SUCCESS = 'order/get-list-success';
export const ORDER_GET_LIST_FAILED = 'order/get-list-failed';
export const ORDER_GET_ONE = 'order/get-one';
export const ORDER_RESET = 'order/reset';
export const ORDER_DETAIL_GET_ONE = 'order-detail/get-one';

export function getList(onSuccess?: any, onError?: any) {
  return {
    type: ORDER_GET_LIST,
    onSuccess,
    onError,
  };
}

export function getListSuccess(payload: any) {
  return {
    type: ORDER_GET_LIST_SUCCESS,
    payload,
  };
}

export function getListFailed() {
  return {
    type: ORDER_GET_LIST_FAILED,
  };
}

export function getOne(payload: IOrder) {
  return {
    type: ORDER_GET_ONE,
    payload,
  };
}

export function getOneDetail(payload: IOrderDetail) {
  return {
    type: ORDER_DETAIL_GET_ONE,
    payload,
  };
}

export function reset() {
  return {
    type: ORDER_RESET,
  };
}

const orderActions = {
  getList,
  getListFailed,
  getListSuccess,
  getOne,
  getOneDetail,
  reset,
};
export default orderActions;
