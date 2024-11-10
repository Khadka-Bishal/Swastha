import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

interface StreamResponse {
  sessionId: string;
  messageId: string;
  eventType: 'statusLog' | 'fulfillment';
  eventIndex: number;
  answer: string;
  status: string;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isBot: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const currentMessageRef = useRef<string>('');

  const processStreamResponse = (event: MessageEvent) => {
    if (event.data === '[DONE]') {
      setIsLoading(false);
      return;
    }

    if (event.data.startsWith('[ERROR]:')) {
      console.error('Stream error:', event.data);
      setIsLoading(false);
      return;
    }

    try {
      const data: StreamResponse = JSON.parse(event.data);
      if (data.eventType === 'fulfillment') {
        currentMessageRef.current += data.answer;
        
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.isBot && lastMessage.id === data.messageId) {
            return [...prev.slice(0, -1), { ...lastMessage, text: currentMessageRef.current }];
          } else {
            return [...prev, { id: data.messageId, text: currentMessageRef.current, isBot: true }];
          }
        });
      }
    } catch (error) {
      console.error('Error processing stream data:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    currentMessageRef.current = '';

    try {
      const eventSource = new EventSource(
        `https://api.on-demand.io/chat/v1/sessions/668ed7d1d384f821780c7a4f/query`,
        { withCredentials: true }
      );

      const data = {
        endpointId: "predefined-openai-gpt4o",
        query: input,
        pluginIds: ["plugin-1713924030", "plugin-1714419354"],
        responseMode: "stream"
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'HyypkyOMiJrQ9B3upGrj3svx4UYavR1w'
        }
      };

      eventSource.onmessage = processStreamResponse;
      eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        eventSource.close();
        setIsLoading(false);
      };

      await fetch('https://api.on-demand.io/chat/v1/sessions/668ed7d1d384f821780c7a4f/query', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Chat error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-rose-600" />
          <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
        </div>
      </div>

      <div className="h-[300px] overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] rounded-lg px-4 py-2 ${message.isBot ? 'bg-gray-100 text-gray-900' : 'bg-rose-600 text-white'}`}>
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 