import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Result from './pages/Result';
import History from './pages/History';
import Settings from './pages/Settings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Support from './pages/Support';
import About from './pages/About';
import CoachList from './pages/CoachList';
import CoachChat from './pages/CoachChat';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Handle splash screen completion
  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <ThemeProvider>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      
      {!showSplash && (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="upload" element={<Upload />} />
              <Route path="result" element={<Result />} />
              <Route path="history" element={<History />} />
              <Route path="coach" element={<CoachList />} />
              <Route path="coach/:chatId" element={<CoachChat />} />
              <Route path="settings" element={<Settings />} />
              <Route path="about" element={<About />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsConditions />} />
              <Route path="support" element={<Support />} />
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      )}
    </ThemeProvider>
  );
};

export default App;