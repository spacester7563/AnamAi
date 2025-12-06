import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar, Trash2 } from 'lucide-react';
import { HistoryItem } from '../types';

const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('anam_history');
    if (data) {
      setHistory(JSON.parse(data));
    }
  }, []);

  const handleClear = () => {
    if(window.confirm("Are you sure you want to clear all history? This cannot be undone.")) {
        localStorage.removeItem('anam_history');
        setHistory([]);
    }
  };

  const handleItemClick = (item: HistoryItem) => {
    navigate('/result', { state: { result: item.result, type: item.type } });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-dark">
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">History</h1>
        {history.length > 0 && (
            <button 
              onClick={handleClear} 
              className="p-2 bg-white dark:bg-white/5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors shadow-sm"
              title="Clear All History"
            >
                <Trash2 size={20} />
            </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400 dark:text-gray-500">
          <Calendar size={48} className="mb-4 opacity-30" />
          <p>No scans yet.</p>
          <p className="text-xs mt-2">Your results will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="w-full bg-white dark:bg-card rounded-xl p-3 border border-gray-200 dark:border-white/5 flex items-center gap-4 hover:shadow-md dark:hover:bg-white/5 transition-all shadow-sm"
            >
              <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-100 dark:border-white/5">
                {item.thumbnail ? (
                   <img 
                    src={`data:image/jpeg;base64,${item.thumbnail}`} 
                    className="w-full h-full object-cover" 
                    alt="thumbnail"
                   />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">N/A</div>
                )}
              </div>
              
              <div className="flex-1 text-left overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-slate-900 dark:text-white truncate">{item.type}</h3>
                    <span className="text-xs bg-primary/10 dark:bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">
                        {item.result.overallScore}
                    </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.result.title}</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
              
              <ChevronRight className="text-gray-400 dark:text-gray-600" size={16} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;