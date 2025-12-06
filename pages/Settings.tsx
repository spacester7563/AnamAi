import React from 'react';
import { Shield, HelpCircle, Moon, Sun, Download, FileText, ChevronRight, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-dark">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 mt-4">Settings</h1>

      <div className="space-y-6">
        {/* Install Section */}
        {/* <section>
             <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-5 border border-primary/10 dark:border-primary/20">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary rounded-xl text-white shadow-lg shadow-primary/30">
                        <Download size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Install App</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                            For the best experience, add Anam to your home screen.
                        </p>
                    </div>
                </div>
             </div>
        </section> */}

        {/* General Section */}
        <section>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">General</h2>
            <div className="bg-white dark:bg-card rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none">
                
                {/* Theme Toggle */}
                <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500 dark:text-yellow-400">
                             {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">Theme</span>
                    </div>
                    <button 
                        onClick={toggleTheme}
                        className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                         <span
                            className={`${
                            theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out`}
                        />
                    </button>
                </div>

                {/* About Link */}
                <button 
                    onClick={() => navigate('/about')}
                    className="w-full p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500 dark:text-pink-400"><Info size={20} /></div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">About Anam</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                </button>

                {/* Support Link */}
                <button 
                    onClick={() => navigate('/support')}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg text-green-500 dark:text-green-400"><HelpCircle size={20} /></div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">Support</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                </button>
            </div>
        </section>

        {/* Legal Section */}
        <section>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Legal</h2>
            <div className="bg-white dark:bg-card rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none">
                {/* Privacy Policy */}
                <button 
                    onClick={() => navigate('/privacy')}
                    className="w-full p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 dark:text-purple-400"><Shield size={20} /></div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">Privacy Policy</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                </button>

                {/* Terms & Conditions */}
                <button 
                    onClick={() => navigate('/terms')}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 dark:text-blue-400"><FileText size={20} /></div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">Terms & Conditions</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                </button>
            </div>
        </section>

        <div className="text-center mt-8 pb-8">
            <p className="text-xs text-gray-400 dark:text-gray-600">Made with ❤️ Anam</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;