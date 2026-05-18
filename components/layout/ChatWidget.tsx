'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSocket } from '@/context/SocketProvider';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useAuth } from '@/hooks/useAuth';

interface ChatMessage {
  text: string;
  sender: string;
  userName?: string;
  timestamp?: string;
}

// Auto-reply knowledge base
const KNOWLEDGE_BASE = [
  { keywords: ['price', 'cost', 'how much'], response: 'Our product prices vary. Honey starts from $14.25 and Clothing from $25.00. Check our products page for full details!' },
  { keywords: ['honey', 'manuka', 'pure'], response: 'We offer premium Honey including Original, Wildflower, and Manuka Gold. All are 100% pure and organic.' },
  { keywords: ['cloth', 'shirt', 'pants', 'size'], response: 'Our clothing line features high-quality cotton shirts, denim, and more. Sizes range from S to XL.' },
  { keywords: ['delivery', 'shipping', 'track'], response: 'We offer fast delivery! Shipping is FREE on all orders over $100.' },
  { keywords: ['contact', 'email', 'phone', 'call'], response: 'You can email us at support@beevora.com or call our hotline at +8801926360430.' },
  { keywords: ['hello', 'hi', 'hey'], response: 'Hello! 👋 Welcome to Beevora Support. How can I help you today?' },
  { keywords: ['thanks', 'thank you'], response: "You're very welcome! Let me know if you need anything else. 😊" },
];

export const ChatWidget = () => {
  const [showMessenger, setShowMessenger] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: 'Hello! 👋 Thanks for visiting Beevora. How can we help you today?', sender: 'bot' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { socket, isConnected } = useSocket();
  const { user } = useAuth();
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const whatsappNumber = "+8801926360430";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}`;

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Socket listeners
  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (message: any) => {
      // If the message is from a user, we only add it if it's not us (since we add ours locally for speed)
      // Actually, to make it a true global chat, we'll clear the input and let the server broadcast handle the addition
      // but to keep it feeling fast, we'll filter out our own broadcasted message if we already have it.
      
      setMessages(prev => {
        // Check if message already exists (to prevent duplicates when io.emit sends back to sender)
        const isDuplicate = prev.some(m => m.text === message.text && m.timestamp === message.timestamp && m.sender === message.sender);
        if (isDuplicate) return prev;
        return [...prev, message];
      });
      setIsTyping(false);
    };

    socket.on('chat-message', handleIncomingMessage);

    return () => {
      socket.off('chat-message', handleIncomingMessage);
    };
  }, [socket]);

  // Auto-focus input when messenger opens
  useEffect(() => {
    if (showMessenger) {
      setTimeout(() => {
        const input = document.getElementById('chat-input');
        if (input) (input as HTMLInputElement).focus();
      }, 400);
    }
  }, [showMessenger]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMessage = {
      text: inputText.trim(),
      sender: 'user',
      userName: user?.name || 'Guest',
      timestamp: new Date().toISOString(),
    };

    // Add user message to UI
    setMessages(prev => [...prev, userMessage]);
    
    // Emit message to backend
    if (isConnected) {
      socket.emit('chat-message', userMessage);
      setIsTyping(true);
    } else {
      // Fallback to local auto-reply if socket is disconnected
      setIsTyping(true);
      setTimeout(() => {
        const lowerMessage = userMessage.text.toLowerCase();
        const match = KNOWLEDGE_BASE.find(item => 
          item.keywords.some(keyword => lowerMessage.includes(keyword))
        );

        const responseText = match 
          ? match.response 
          : "I'm having trouble connecting to my live server, but I'm still here to help! Could you please try again in a moment?";

        setMessages(prev => [...prev, { text: responseText, sender: 'bot' }]);
        setIsTyping(false);
      }, 1000);
    }

    setInputText('');
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Messenger Chat Box */}
      {showMessenger && (
        <div className="w-[320px] sm:w-[380px] h-[500px] flex flex-col bg-[#0D1428] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300 mb-2">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">Beevora AI Support</h3>
                <StatusBadge 
                  isConnected={isConnected} 
                  onlineLabel="Online" 
                  offlineLabel="Offline" 
                  className="!px-0 !py-0 !border-0 !bg-transparent !shadow-none"
                />
              </div>
            </div>
            <button onClick={() => setShowMessenger(false)} className="text-white/80 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0A0F1E]/50">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex flex-col gap-1">
                  {msg.sender === 'user' && (
                    <span className={`text-[10px] font-bold opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.userName || 'Guest'}
                    </span>
                  )}
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white/5 border border-white/10 text-white/80 rounded-bl-none text-left'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-[#0D1428]">
            <div className="flex gap-2">
              <input 
                id="chat-input"
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..." 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 placeholder:text-white/20"
              />
              <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700 h-9 w-9" disabled={!inputText.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* revealed buttons (on hover only) */}
      <div className={`flex flex-col gap-3 items-end transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0 translate-y-10 translate-x-5 pointer-events-none'}`}>
          {/* WhatsApp */}
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <span className="bg-white/90 text-[#07091A] text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Order via WhatsApp</span>
            <div className="w-11 h-11 rounded-full bg-green-500 shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
              <Phone className="h-5 w-5 text-white" />
            </div>
          </a>

          {/* Instant Help button */}
          <button 
            onClick={() => setShowMessenger(!showMessenger)}
            className="flex items-center gap-3 group"
          >
            <span className="bg-white/90 text-[#07091A] text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Instant Help</span>
            <div className="w-11 h-11 rounded-full bg-blue-600 shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
          </button>
      </div>

      {/* Main Floating Action Button */}
      <button 
        onClick={() => setShowMessenger(!showMessenger)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${showMessenger ? 'bg-red-500 rotate-90 scale-110' : 'bg-amber-500 hover:scale-110'}`}
      >
        {showMessenger ? <X className="h-7 w-7 text-white" /> : <MessageSquare className="h-7 w-7 text-black" />}
      </button>
    </div>
  );
};
