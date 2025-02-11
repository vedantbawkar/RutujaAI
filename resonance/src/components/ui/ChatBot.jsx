import React, { useState, useRef, useEffect } from 'react'; 
import axios from 'axios';
import { marked } from "marked";
import { Send, Loader2, User, Bot } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { Input } from './Input';
import Button from './Button';

function ChatBot() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    setLoading(true);
    setResponse('');

    setMessages(prev => [...prev, { content: inputValue, isUser: true }]);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', { inputValue });
      const data = res.data;
      let ans = data.outputs[0].outputs[0].messages[0].message;
      ans = marked(ans);

      if (ans) {
        setMessages(prev => [...prev, { content: ans, isUser: false }]);
        setResponse(ans);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages(prev => [...prev, { content: "Error communicating with the server.", isUser: false }]);
    } finally {
      setLoading(false);
      setInputValue('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-teal-400 via-turquoise-500 to-cyan-600">
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-teal-600 p-4">
            {/* <Bot className="w-8 h-8 md:w-10 md:h-10 mb-2 text-teal-500" /> */}
            <Bot className="w-8 h-8 md:w-10 md:h-10 mb-2 text-white" />
            <p className="text-center text-white">No messages yet. Start a conversation!</p>
          </div>
        ) : (
          <div className="space-y-3 py-4">
            {messages.map((message, index) => (
              <MessageBubble key={index} content={message.content} isUser={message.isUser} />
            ))}
            {loading && (
              <div className="flex items-start gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r from-teal-100 to-cyan-100">
                  <Bot className="w-4 h-4 text-teal-600" />
                </div>
                <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-xl px-3 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <div className="border-t-2 border-teal-200 bg-white">
        <div className="max-w-4xl mx-auto w-full px-4 py-6">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 bg-white border-black focus:border-teal-600 focus:ring-teal-600 text-black text-lg placeholder-black"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className={`w-9 h-9 p-0 bg-gradient-to-r from-teal-500 to-cyan-500 ${
                loading || !inputValue.trim()
                  ? 'opacity-50'
                  : 'hover:from-teal-600 hover:to-cyan-600'
              }`}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <Send className="h-4 w-4 text-white" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
