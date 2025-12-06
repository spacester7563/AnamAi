import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ScanEye, Scissors, Dumbbell, ChevronRight } from 'lucide-react';
import { AnalysisType } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const options = [
    {
      id: 1,
      title: AnalysisType.FACE_CARD,
      icon: <ScanEye size={28} className="text-blue-400" />,
      desc: 'Facial symmetry & aesthetics',
      gradient: 'from-blue-500/10 to-blue-600/5',
      borderColor: 'border-blue-500/20'
    },
    {
      id: 2,
      title: AnalysisType.APPEARANCE,
      icon: <User size={28} className="text-purple-400" />,
      desc: 'Overall style & first impression',
      gradient: 'from-purple-500/10 to-purple-600/5',
      borderColor: 'border-purple-500/20'
    },
    {
      id: 3,
      title: AnalysisType.HAIR,
      icon: <Scissors size={28} className="text-pink-400" />,
      desc: 'Hair health & style match',
      gradient: 'from-pink-500/10 to-pink-600/5',
      borderColor: 'border-pink-500/20'
    },
    {
      id: 4,
      title: AnalysisType.BODY,
      icon: <Dumbbell size={28} className="text-green-400" />,
      desc: 'Physique & posture analysis',
      gradient: 'from-green-500/10 to-green-600/5',
      borderColor: 'border-green-500/20'
    },
  ];

  const handleSelect = (type: AnalysisType) => {
    navigate(`/upload?type=${encodeURIComponent(type)}`);
  };

  return (
    <div className="p-6">
      <header className="mb-8 mt-4">
        <h2 className="text-xl text-gray-500 dark:text-gray-400 font-medium">Welcome back</h2>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Snap. Score. Share</h1>
      </header>

      <div className="grid gap-4">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.title)}
            className={`w-full text-left relative overflow-hidden group rounded-2xl p-5 border border-gray-200 dark:border-white/10 dark:${opt.borderColor} bg-white dark:bg-card transition-all active:scale-[0.98] shadow-sm dark:shadow-none`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${opt.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-100 dark:bg-dark/50 rounded-xl backdrop-blur-sm">
                  {opt.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{opt.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{opt.desc}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-indigo-900/10 to-purple-900/10 dark:from-indigo-900/40 dark:to-purple-900/40 border border-gray-200 dark:border-white/5">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Pro Tip</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          For the most accurate AI score, ensure good lighting and a neutral background. Avoid filters or heavy blur.
        </p>
      </div>
    </div>
  );
};

export default Home;