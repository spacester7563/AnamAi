import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-dark text-slate-900 dark:text-white pb-24">
      <div className="flex items-center mb-8 mt-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2">Privacy Policy</h1>
      </div>

      <div className="prose dark:prose-invert prose-sm max-w-none">
        <p className="text-gray-600 dark:text-gray-400 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <h3 className="font-bold text-lg mb-2">1. Introduction</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Welcome to Anam. We respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you as to how we look after your personal data when you visit our application.
        </p>

        <h3 className="font-bold text-lg mb-2">2. Data We Collect</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          We collect image data that you voluntarily upload for analysis. 
          This data is processed by our AI partners (Google Gemini) to generate scores and recommendations.
          We do not store your facial data permanently on our servers. Images are processed and then discarded or stored locally on your device history.
        </p>

        <h3 className="font-bold text-lg mb-2">3. How We Use Your Data</h3>
        <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-300 space-y-1">
          <li>To provide the AI analysis services you request.</li>
          <li>To improve the accuracy of our algorithms (anonymized).</li>
          <li>To maintain your local history within the app.</li>
        </ul>

        <h3 className="font-bold text-lg mb-2">4. Data Security</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way.
        </p>

        <h3 className="font-bold text-lg mb-2">5. Contact Us</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          If you have any questions about this privacy policy, please contact us via the Support page.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;