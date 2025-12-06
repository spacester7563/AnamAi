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

        <h3 className="font-bold text-lg mb-2">1. Acceptance of Terms</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          By accessing and using Anam, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h3 className="font-bold text-lg mb-2">2. Description of Service</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Anam provides AI-powered analysis of facial features and appearance. 
          The scores and recommendations provided are for entertainment and informational purposes only and should not be considered professional advice.
        </p>

        <h3 className="font-bold text-lg mb-2">3. User Conduct</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          You agree to only upload images that you own or have the right to use. 
          You agree not to use the service for any illegal or unauthorized purpose.
        </p>

        <h3 className="font-bold text-lg mb-2">4. Disclaimer</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          The application and its content are provided "as is" and "as available" without any warranty or representations of any kind, whether express or implied.
        </p>

        <h3 className="font-bold text-lg mb-2">5. Changes to Terms</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          We reserve the right to modify these terms at any time. Your continued use of the service constitutes agreement to such modifications.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;