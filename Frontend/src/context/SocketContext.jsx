// src/context/SocketContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

// Custom hook to use socket
export const useSocket = () => useContext(SocketContext);

const SOCKET_URL = "https://taskmanagement-production-e770.up.railway.app"; // Change this to your backend URL

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  console.log("SOCKET1",socket)

  useEffect(() => {
    console.log("🔌 Initializing socket connection...");
    
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    newSocket.on("connect", () => {
      console.log("✅ Socket connected successfully:", newSocket.id);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
    });

    newSocket.on("connect_error", (error) => {
      console.error("🔴 Socket connection error:", error);
    });

    setSocket(newSocket);

    return () => {
      console.log("🔌 Disconnecting socket...");
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};