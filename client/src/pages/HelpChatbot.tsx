import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { Send, ArrowLeft, Bot, User as UserIcon, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { apiRequest } from '@/lib/queryClient';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export default function HelpChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your JalSetu assistant. How can I help you with your farm water management today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  // Common FAQs for quick access
  const faqs = [
    { id: '1', question: 'How do I optimize my irrigation schedule?' },
    { id: '2', question: 'What do the soil moisture readings mean?' },
    { id: '3', question: 'How to interpret water quality metrics?' },
    { id: '4', question: 'What is the optimal soil moisture level for rice?' },
    { id: '5', question: 'How can I conserve water during drought?' },
    { id: '6', question: 'What are the best watering practices for vegetables?' },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Format message history for API
      const messageHistory = messages
        .filter(m => m.id !== '1') // Skip welcome message
        .map(m => ({ 
          role: m.sender, 
          content: m.text 
        }));
      
      // Call our Gemini API endpoint
      const response = await apiRequest('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage.text,
          history: messageHistory
        }),
      });
      
      // Parse the response and handle errors
      const data = response as any;
      // Handle various response formats and ensure we have a response
      if (typeof data !== 'object' || data === null) {
        throw new Error('Invalid response format from server');
      }
      
      if (data.error && !data.response) {
        throw new Error(data.error || 'Error from server');
      }
      
      // Ensure we have a response text
      if (!data.response) {
        // Create a fallback response if none is provided
        data.response = "I'm having trouble connecting to my knowledge base right now. Please try asking about irrigation, soil moisture, or water quality topics.";
        data.apiKeyError = true;
      }
      
      // Add bot response to chat
      const botMessage: Message = {
        id: Date.now().toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      // If we hit a rate limit, let the user know they can try again later
      if (data.rateLimited) {
        toast({
          title: "Usage Limit Reached",
          description: "The AI service is experiencing high demand. Please try again in a minute.",
        });
      }
      
      // If there's an API key error, let the user know
      if (data.apiKeyError) {
        toast({
          title: "Connection Issue",
          description: "The chatbot AI service needs a valid API key to be configured.",
        });
      }
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Chatbot error:', error);
      
      // Create a fallback response
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        text: "I'm having trouble connecting to my knowledge base right now. Please check if the API key is properly set up or try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
      
      toast({
        title: "Connection Error",
        description: error.message || "Failed to get a response from the AI. Please check your API key settings.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFaqClick = (question: string) => {
    setInputValue(question);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Hello! I\'m your JalSetu assistant. How can I help you with your farm water management today?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
    toast({
      title: "Chat Cleared",
      description: "Your conversation has been reset.",
    });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="fade-in">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2 h-8 w-8" 
                onClick={() => navigate('/settings')}
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-200" />
              </Button>
              Help & FAQ
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium ml-10">Ask any questions about JalSetu</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={clearChat}
            className="h-9 w-9 rounded-full bg-white/10 text-gray-600 dark:text-gray-300"
          >
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* FAQ Quick Access */}
      <div className="px-5 py-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Frequently Asked Questions:</p>
        <div className="flex overflow-x-auto pb-2 space-x-2 no-scrollbar">
          {faqs.map(faq => (
            <button
              key={faq.id}
              className="px-3 py-2 bg-white dark:bg-gray-800 rounded-full text-sm whitespace-nowrap flex-shrink-0 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700"
              onClick={() => handleFaqClick(faq.question)}
            >
              {faq.question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 px-5 py-2 overflow-y-auto">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-primary text-white ml-2' 
                    : 'bg-gray-200 dark:bg-gray-700 mr-2'
                }`}>
                  {message.sender === 'user' 
                    ? <UserIcon className="h-5 w-5" /> 
                    : <Bot className="h-5 w-5 text-primary dark:text-blue-400" />
                  }
                </div>
                <div className={`${
                  message.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                } rounded-2xl p-3 shadow-sm`}>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] flex flex-row">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                  <Bot className="h-5 w-5 text-primary dark:text-blue-400" />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-2 w-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Type your question here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="rounded-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90"
            disabled={isLoading || !inputValue.trim()}
          >
            <Send className="h-5 w-5 text-white" />
          </Button>
        </form>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
          JalSetu Farming Assistant
        </p>
      </div>
    </div>
  );
}