import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Bot, User, Trash2 } from 'lucide-react';
import { ChatSession, ChatMessage } from '../types';
import { sendCoachMessage } from '../services/geminiService';
import showdown from 'showdown';
import StyledText from '@/components/styledText';

const CoachChat: React.FC = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<ChatSession | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat session
  useEffect(() => {
    const savedSessions = localStorage.getItem('anam_coach_sessions');
    if (savedSessions && chatId) {
      const parsedSessions: ChatSession[] = JSON.parse(savedSessions);
      const currentSession = parsedSessions.find(s => s.id === chatId);
      if (currentSession) {
        setSession(currentSession);
      } else {
        navigate('/coach');
      }
    }
  }, [chatId, navigate]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session?.messages, isTyping]);

  const saveSession = (updatedSession: ChatSession) => {
    const savedSessions = localStorage.getItem('anam_coach_sessions');
    if (savedSessions) {
      const parsedSessions: ChatSession[] = JSON.parse(savedSessions);
      const index = parsedSessions.findIndex(s => s.id === updatedSession.id);
      if (index !== -1) {
        parsedSessions[index] = updatedSession;
        localStorage.setItem('anam_coach_sessions', JSON.stringify(parsedSessions));
      }
    }
    setSession(updatedSession);
  };

  const handleSend = async () => {
    if (!inputText.trim() || !session) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: Date.now()
    };

    const updatedMessages = [...session.messages, userMsg];
    const updatedSession = {
      ...session,
      messages: updatedMessages,
      lastMessage: inputText,
      timestamp: Date.now(),
      title: session.messages.length === 0 ? (inputText.length > 20 ? inputText.substring(0, 20) + '...' : inputText) : session.title
    };

    saveSession(updatedSession);
    setInputText('');
    setIsTyping(true);

    try {
      const responseText = await sendCoachMessage(updatedMessages, userMsg.text);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };

      const finalSession = {
        ...updatedSession,
        messages: [...updatedMessages, botMsg],
        lastMessage: responseText,
        timestamp: Date.now()
      };

      saveSession(finalSession);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsTyping(false);
    }
  };

  const deleteChat = () => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      const savedSessions = localStorage.getItem('anam_coach_sessions');
      if (savedSessions && chatId) {
        const parsedSessions: ChatSession[] = JSON.parse(savedSessions);
        const newSessions = parsedSessions.filter(s => s.id !== chatId);
        localStorage.setItem('anam_coach_sessions', JSON.stringify(newSessions));
        navigate('/coach', { replace: true });
      }
    }
  }

  if (!session) return <div className="p-6">Loading...</div>;

  function getFormattedMSG(text: string) {
    const converter = new showdown.Converter();
    const markdownText = text;
    const txt = converter.makeHtml(markdownText);
    return txt;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-dark">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 dark:bg-card/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 fixed top-0 w-full z-10">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/coach')} className="p-2 -ml-2 text-gray-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <Bot size={18} />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white text-sm">AI Coach</h1>
              <p className="text-[10px] text-green-500 font-medium">Online</p>
            </div>
          </div>
        </div>
        <button onClick={deleteChat} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
          <Trash2 size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 pt-24 pb-32 space-y-6">
        {session.messages.length === 0 && (
          <div className="text-center text-gray-400 text-sm mt-10">
            <p>Ask me anything about your style, face card, or how to glow up!</p>
          </div>
        )}

        {session.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300' : 'bg-primary text-white'
              }`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>

            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-white dark:bg-card text-slate-800 dark:text-gray-200 border border-gray-100 dark:border-white/5 rounded-bl-none shadow-sm'
                }`}
            >
              <StyledText text={getFormattedMSG(msg.text)} />
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-end gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-white dark:bg-card px-4 py-3 rounded-2xl rounded-bl-none border border-gray-100 dark:border-white/5 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-dark border-t border-gray-200 dark:border-white/5 pb-safe">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-card rounded-full p-2 pr-2 border border-transparent focus-within:border-primary/50 transition-colors">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for advice..."
            className="flex-1 bg-transparent px-4 py-2 text-slate-900 dark:text-white placeholder-gray-500 focus:outline-none text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            className="p-3 bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachChat;