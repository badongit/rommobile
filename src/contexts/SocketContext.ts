import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { HOST } from 'src/constants/common';

export const SocketContext = createContext({});

export const SocketProvider = (props: any) => {
  const { children } = props;
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socket = io(HOST, { transports: ['websocket'] });
    socket.connect();

    setSocket(socket);

    socket.on('test', data => {
      console.log(data);
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
