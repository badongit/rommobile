import { useContext } from 'react';
import { SocketEventEnum } from 'src/constants/enums';
import SocketContext from 'src/contexts/SocketContext';
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

  return {
    ...contexts,
    createOrder,
    updateOrder,
  };
};

export default useSocket;
