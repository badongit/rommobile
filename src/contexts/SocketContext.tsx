import { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { HOST } from 'src/constants/common';

export interface ISocketContext {
  socket: Socket | null;
}

export const SocketContext = createContext<ISocketContext>({ socket: null });

export const SocketProvider = (props: any) => {
  const { children } = props;
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(HOST, { transports: ['websocket'] });

    socket.connect();

    socket.on('error', (data: any) => {
      console.log('error: ', data);
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
