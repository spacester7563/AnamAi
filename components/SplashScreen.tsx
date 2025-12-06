import React, { useEffect, useState } from 'react';
import { ScanFace } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [opacity, setOpacity] = useState(1);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(onFinish, 500); // Wait for fade out
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-gray-50 dark:bg-dark transition-all duration-500"
      style={{ opacity, pointerEvents: opacity === 0 ? 'none' : 'auto' }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full animate-pulse-fast"></div>
        <ScanFace size={80} className="text-slate-900 dark:text-white relative z-10 transition-colors" />
      </div>
      <h1 className="mt-6 text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
        ANAM
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm tracking-widest uppercase">AI Face Scorecard</p>
    </div>
  );
};

export default SplashScreen;