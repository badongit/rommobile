import { useContext } from 'react';
import { SocketEventEnum } from 'src/constants/enums';
import SocketContext from 'src/contexts/SocketContext';
import { IdParamsDto } from 'src/types/common';
import { IChangeStatusOrderDetail } from 'src/types/order/change-status-order-detail.type';
import { ICreateOrder } from 'src/types/order/create-order.type';
import { IUpdateOrder } from 'src/types/order/update-order.type';

export const useSocket = () => {
  const contexts = useContext(SocketContext);
  const socket = contexts.socket;

  function createOrder(payload: ICreateOrder) {
    socket?.emit(SocketEventEnum.CREATE_ORDER, payload);
  }

  function updateOrder(payload: IUpdateOrder) {
    socket?.emit(SocketEventEnum.UPDATE_ORDER, payload);
  }

  function confirmOrder(payload: IdParamsDto) {
    socket?.emit(SocketEventEnum.CONFIRM_ORDER, payload);
  }

  function cancelOrder(payload: IdParamsDto) {
    socket?.emit(SocketEventEnum.CANCEL_ORDER, payload);
  }

  function changeStatusOrderDetail(payload: IChangeStatusOrderDetail) {
    socket?.emit(SocketEventEnum.CHANGE_STATUS_ORDER_DETAIL, payload);
  }

  return {
    ...contexts,
    createOrder,
    updateOrder,
    confirmOrder,
    cancelOrder,
    changeStatusOrderDetail,
  };
};

export default useSocket;
