import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquarePlus, MessageSquare, ChevronRight, Clock } from 'lucide-react';
import { ChatSession } from '../types';

const CoachList: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedSessions = localStorage.getItem('anam_coach_sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions).sort((a: ChatSession, b: ChatSession) => b.timestamp - a.timestamp));
    }
  }, []);

  const createNewChat = () => {
    const newSessionId = Date.now().toString();
    const newSession: ChatSession = {
      id: newSessionId,
      title: 'New Consultation',
      lastMessage: '',
      timestamp: Date.now(),
      messages: []
    };
    
    const updatedSessions = [newSession, ...sessions];
    localStorage.setItem('anam_coach_sessions', JSON.stringify(updatedSessions));
    navigate(`/coach/${newSessionId}`);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-dark">
      <div className="flex items-center justify-between mb-8 mt-4">
        <div>
            <h2 className="text-xl text-gray-500 dark:text-gray-400 font-medium">Style & Aesthetics</h2>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Coach</h1>
        </div>
      </div>

      <button
        onClick={createNewChat}
        className="w-full mb-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform"
      >
        <MessageSquarePlus size={24} />
        Start New Session
      </button>

      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Recent Conversations</h3>

      {sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-white/5 rounded-2xl">
          <MessageSquare size={48} className="mb-4 opacity-30" />
          <p>No conversations yet.</p>
          <p className="text-xs mt-2">Start a chat to improve your style.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => navigate(`/coach/${session.id}`)}
              className="w-full bg-white dark:bg-card p-4 rounded-xl border border-gray-200 dark:border-white/5 flex items-center gap-4 hover:shadow-md dark:hover:bg-white/5 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary shrink-0">
                <MessageSquare size={20} />
              </div>
              
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-slate-900 dark:text-white truncate pr-2">{session.title}</h4>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1 shrink-0">
                         {new Date(session.timestamp).toLocaleDateString()}
                    </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {session.lastMessage || 'No messages yet'}
                </p>
              </div>
              <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoachList;