import React from 'react'
import { User, Bot } from 'lucide-react';
import parse from "html-react-parser";

function MessageBubble({ content, isUser }) {
  return (
    <div className={`flex items-start gap-2 ${isUser ? 'justify-end' : ''}`}>
    <div className={`flex items-center justify-center w-7 h-7 rounded-full ${
      isUser ? 'order-2 bg-gradient-to-r from-indigo-500 to-purple-500' : 
      'bg-gradient-to-r from-indigo-100 to-purple-100'
    }`}>
      {isUser ? 
        <User className="w-4 h-4 text-white" /> : 
        <Bot className="w-4 h-4 text-indigo-600" />
      }
    </div>
    <div className={`max-w-[80%] break-words ${
      isUser ? 
      'order-1 bg-gradient-to-r from-teal-300 to-cyan-300' : 
      'bg-gradient-to-r from-teal-100 to-cyan-100'
    } rounded-xl px-4 py-2`}>
      {parse(content)}
    </div>
  </div>
  )
}

export default MessageBubble

