import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL as string, {
  withCredentials: true,
}); //withCredentials: true degani — request bilan birga cookie / session / auth credentials ham yuborilishi mumkin.

export const SocketContext = createContext<Socket>(socket); //React Context yaratamiz.
//const socket = useContext(SocketContext); wunday qilib ishlatamiz bowqa componentlarda.

interface SocketProviderProps {
  children: React.ReactNode;
} //SocketProvider ichida keladigan componentlar uchun type.

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
