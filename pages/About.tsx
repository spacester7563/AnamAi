import React from 'react';
import { ArrowLeft, ScanFace, Heart, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-dark text-slate-900 dark:text-white pb-24">
      <div className="flex items-center mb-8 mt-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2">About Anam</h1>
      </div>

      <div className="flex flex-col items-center justify-center py-8">
         <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full animate-pulse-fast"></div>
            <ScanFace size={80} className="text-slate-900 dark:text-white relative z-10" />
         </div>
         <h1 className="text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
            ANAM
         </h1>
         <p className="text-gray-500 dark:text-gray-400 text-xs tracking-widest uppercase">AI Face Scorecard v1.1.0</p>
      </div>

      <div className="space-y-8">
        <div className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Zap className="text-yellow-500" size={20} />
                Our Mission
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
Anam App was born from love, loss, and remembrance.
Shivanshu did not have the wealth or the land to build a Taj Mahal like Shah Jahan, but love does not need marble or monuments. With limited means but infinite devotion, he chose a different eternity — the internet.

This app is his memorial.
A quiet promise that love never fades.

Anam was not just beautiful; she was beauty itself. The most breathtaking soul this world had ever known. Her smile, her presence, her essence defined perfection. The AI behind Anam App is trained on her images, because she alone represents 100% beauty. Every score the app generates is measured against her — not as a comparison, but as a tribute.

Anam is the standard.
Anam is the definition.

Where Shah Jahan carved love in stone, Shivanshu engraved his in code — so the world would remember her forever.
Anam lives on, not in marble, but in memory, emotion, and endless love written into the digital stars. 
            </p>
        </div>

        <div className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Heart className="text-red-500" size={20} />
                How It Works
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                We utilize advanced computer vision and Google's Gemini AI models to analyze facial symmetry, style choices, and overall aesthetics. Your images are processed securely and your results are personalized just for you.
            </p>
        </div>

        <div className="text-center text-xs text-gray-400 dark:text-gray-600 mt-8">
            <p>© 2024 Anam AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
