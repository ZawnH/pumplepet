/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { conversations, currentUser, potentialMatches } from '@/mockData';
import { Message } from '@/types';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function ConversationPage({ params }: { params: any }) {
  const { userId } = params;
  const [messages, setMessages] = useState<Message[]>(conversations[userId] || []);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const otherUser = potentialMatches.find(u => u.id === userId);
  
  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: `new-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: userId,
      text: newMessage,
      timestamp: new Date(),
      read: false,
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };
  
  if (!otherUser) {
    return <div className="p-4">User not found</div>;
  }
  
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b flex items-center">
        <Link href="/messages" className="mr-2">
          ←
        </Link>
        <div className="h-10 w-10 rounded-full bg-gray-300 mr-3">
          {/* User photo placeholder */}
        </div>
        <div>
          <h2 className="font-semibold">{otherUser.name}</h2>
          <p className="text-xs text-gray-500">Active now</p>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] p-3 rounded-lg ${
                message.senderId === currentUser.id 
                  ? 'bg-yellow-400 text-black rounded-br-none' 
                  : 'bg-gray-200 rounded-bl-none'
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-yellow-400 text-black rounded-full h-10 w-10 flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
