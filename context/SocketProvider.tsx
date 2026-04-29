'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { socket } from '@/lib/socket';
import { toast } from 'react-hot-toast';

interface SocketContextType {
  isConnected: boolean;
  socket: typeof socket;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log('🔌 Connected to Socket.io server:', socket.id);
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log('🔌 Disconnected from Socket.io server');
    }

    function onConnectError(err: any) {
      console.error('🔌 Socket connection error:', err);
      if (err.description) console.error('🔌 Error description:', err.description);
      if (err.context) console.error('🔌 Error context:', err.context);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);

    if (typeof window !== 'undefined') {
      socket.connect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
