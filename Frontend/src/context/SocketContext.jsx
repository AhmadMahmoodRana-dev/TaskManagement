// src/context/SocketContext.jsx
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

// Custom hook to use socket
export const useSocket = () => useContext(SocketContext);

const SOCKET_URL = "http://localhost:5000"; // Change in one place later

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      transports: ["websocket"], // optional
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Connected to socket:", socketRef.current.id);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};