'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
  const [isOpen, setIsOpen] = useState(false);
  const [showMessenger, setShowMessenger] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello! 👋 Thanks for visiting Beevora. How can we help you today?', sender: 'bot' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
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

    const userMessage = inputText.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputText('');
    setIsTyping(true);

    // Simulate auto-reply delay
    setTimeout(() => {
      const lowerMessage = userMessage.toLowerCase();
      const match = KNOWLEDGE_BASE.find(item => 
        item.keywords.some(keyword => lowerMessage.includes(keyword))
      );

      const responseText = match 
        ? match.response 
        : "I'm not sure I understand. Could you please rephrase, or would you like me to connect you with a live agent?";

      setMessages(prev => [...prev, { text: responseText, sender: 'bot' }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Messenger Chat Box */}
      {showMessenger && (
        <div className="w-[320px] sm:w-[380px] h-[500px] flex flex-col bg-[#0D1428] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">Beevora AI Support</h3>
                <p className="text-blue-100 text-xs">Automated assistant</p>
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
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white/5 border border-white/10 text-white/80 rounded-bl-none'
                }`}>
                  {msg.text}
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

      {/* Floating Buttons */}
      <div className="flex flex-col gap-3 items-end">
        {(hovered || isOpen) && (
          <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300 mb-2">
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <span className="bg-white/90 text-[#07091A] text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Order via WhatsApp</span>
              <div className="w-12 h-12 rounded-full bg-green-500 shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                <Phone className="h-6 w-6 text-white" />
              </div>
            </a>

            <button 
              onClick={() => { setShowMessenger(!showMessenger); setIsOpen(false); }}
              className="flex items-center gap-3 group"
            >
              <span className="bg-white/90 text-[#07091A] text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Instant Help</span>
              <div className="w-12 h-12 rounded-full bg-blue-600 shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
            </button>
          </div>
        )}

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isOpen ? 'bg-red-500 rotate-90' : 'bg-amber-500'}`}
        >
          {isOpen ? <X className="h-7 w-7 text-white" /> : <MessageSquare className="h-7 w-7 text-black" />}
        </button>
      </div>
    </div>
  );
};
