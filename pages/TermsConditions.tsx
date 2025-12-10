import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsConditions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-dark text-slate-900 dark:text-white pb-24">
      <div className="flex items-center mb-8 mt-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2">Terms & Conditions</h1>
      </div>

      <div className="prose dark:prose-invert prose-sm max-w-none">
        <p className="text-gray-600 dark:text-gray-400 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Anam Ai respects your privacy. This Privacy Policy explains how we handle information
        when you use our Android application “Anam Ai”.
      </p>

      <h3 class="text-xl font-semibold mb-2">1. Information We Collect</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        The app processes face images that users voluntarily upload to generate AI-based
        appearance analysis, including face score, facial features, hair, outfit, and physique.
      </p>

      <h3 class="text-xl font-semibold mb-2">2. Data Storage</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        We do not store any personal data or images on our servers. The app does not require
        login and is not connected to any external database. Any saved history is stored only
        locally on your device and is deleted automatically when you uninstall the app.
      </p>

      <h3 class="text-xl font-semibold mb-2">3. AI & Third-Party Processing</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Image analysis and AI chat functionality are powered by Google Gemini AI. When you
        use these features, the necessary data is securely transmitted to Google for processing
        under Google’s privacy policies.
      </p>

      <h3 class="text-xl font-semibold mb-2">4. Use of Information</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Collected data is used solely to provide face score analysis, appearance feedback,
        and improvement suggestions. We do not sell, share, or misuse user information.
      </p>

      <h3 class="text-xl font-semibold mb-2">5. Children’s Privacy</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Anam Ai is not intended for children under the age of 13. We do not knowingly collect
        data from minors.
      </p>

      <h3 class="text-xl font-semibold mb-2">6. Security</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        We use standard security practices to protect data during processing and local storage,
        but no method of transmission or storage is completely secure.
      </p>

      <h3 class="text-xl font-semibold mb-2">7. Contact Us</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        If you have any questions about this Privacy Policy, contact us at:
        <span class="font-medium">spacester7563@gmail.com</span>
      </p>
      </div>
    </div>
  );
};

export default TermsConditions;
