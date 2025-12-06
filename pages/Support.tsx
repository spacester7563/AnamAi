import React from 'react';
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Support: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-dark text-slate-900 dark:text-white pb-24">
      <div className="flex items-center mb-8 mt-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2">Support</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
          <h2 className="text-lg font-bold mb-2">How can we help?</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
            If you have any questions, issues, or suggestions, please don't hesitate to reach out to our team.
          </p>
          
          <div className="space-y-4">
            <a href="mailto:support@anam.ai" className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Email Support</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Email us at spacester.app@gmail.com</p>
              </div>
            </a>
{/* 
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Live Chat</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Currently Offline</p>
              </div>
            </div> */}
          </div>
        </div>

        {/* <div className="text-center text-xs text-gray-400 dark:text-gray-500">
            <p>Support Hours: Mon-Fri, 9AM - 5PM EST</p>
        </div> */}
      </div>
    </div>
  );
};

export default Support;