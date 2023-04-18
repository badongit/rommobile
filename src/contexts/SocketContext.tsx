import { createContext, useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { io, Socket } from 'socket.io-client';
import { HOST } from 'src/constants/common';
import { SocketEventEnum } from 'src/constants/enums';
import useFloor from 'src/hooks/useFloor';
import useOrder from 'src/hooks/useOrder';
import { IOrder, IOrderDetail } from 'src/types/order/order.type';
import { ITable } from 'src/types/table/table.type';

export interface ISocketContext {
  socket: Socket | null;
}

export const SocketContext = createContext<ISocketContext>({ socket: null });

export const SocketProvider = (props: any) => {
  const { children } = props;
  const [socket, setSocket] = useState<Socket | null>(null);
  const { actions: orderActions } = useOrder();
  const { actions: floorActions } = useFloor();

  useEffect(() => {
    const socket = io(HOST, { transports: ['websocket'] });

    socket.connect();

    socket.on(SocketEventEnum.ERROR, (data: any) => {
      showMessage({
        message: typeof data === 'string' ? data : 'Đã có lỗi xảy ra',
        type: 'danger',
      });
    });

    socket.on(SocketEventEnum.NOTIFICATION, (data: any) => {
      showMessage({
        message: data.message,
        type: 'success',
      });
    });

    socket.on(SocketEventEnum.SEND_ORDER, (data: IOrder) => {
      orderActions.getOne(data);
    });

    socket.on(SocketEventEnum.SEND_TABLE, (data: ITable) => {
      floorActions.getOneTable(data);
    });

    socket.on(SocketEventEnum.SEND_ORDER_DETAIL, (data: IOrderDetail) => {
      orderActions.getOneDetail(data);
    });

    setSocket(socket);
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
