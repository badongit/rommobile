import { IOrder } from 'src/types/order/order.type';
import {
  ORDER_GET_LIST,
  ORDER_GET_LIST_FAILED,
  ORDER_GET_LIST_SUCCESS,
  ORDER_GET_ONE,
  ORDER_RESET,
} from '../actions';
import { keyBy } from 'lodash';
import { OrderStatusEnum } from 'src/constants/order/enums';

export interface IOrderState {
  itemMap: {
    [key: string | number]: IOrder;
  };
  isLoading: boolean;
}

const initialState: IOrderState = {
  itemMap: {},
  isLoading: false,
};

export default function orderReducer(state = initialState, action: any) {
  switch (action.type) {
    case ORDER_GET_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case ORDER_GET_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        itemMap: keyBy(action.payload.items, 'id'),
      };
    case ORDER_GET_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ORDER_GET_ONE:
      const newItemMap = {
        ...state.itemMap,
      };

      if (
        [OrderStatusEnum.CANCEL, OrderStatusEnum.COMPLETED].includes(
          action.payload.status,
        )
      ) {
        delete newItemMap[action.payload.id];
      } else {
        newItemMap[action.payload.id] = action.payload;
      }

      return {
        ...state,
        itemMap: newItemMap,
      };
    case ORDER_RESET:
      return initialState;
    default:
      return state;
  }
}
