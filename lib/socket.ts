import { io } from 'socket.io-client';

const SOCKET_URL = 
  process.env.NEXT_PUBLIC_SOCKET_URL || 
  (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app') 
    ? 'https://beevora-backend.vercel.app' 
    : 'http://127.0.0.1:5000');

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});
