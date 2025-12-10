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
          Please read these Terms &amp; Conditions (“Terms”) carefully before using the Anam Ai Android application. By installing or using the App, you agree to these Terms. If you do not agree, do not use the App.
        </p>

        <h3 class="text-xl font-semibold mb-2">1. The Service</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Anam Ai provides automated, AI-based appearance analysis and improvement suggestions based on images you submit. Features include a face score card, scores for facial features, hair/outfit/physique analysis, and an AI chat for improvement advice. The App uses <strong>Google Gemini</strong> for AI processing.
        </p>

        <h3 class="text-xl font-semibold mb-2">2. Eligibility &amp; age</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          • You must be at least having minimum age as required by google play store.<br />
          • By using the App you represent and warrant that you have the legal right to submit any image you provide and that you consent to the processing described in the Privacy Policy.
        </p>

        <h3 class="text-xl font-semibold mb-2">3. License</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          • We grant you a limited, non-exclusive, non-transferable license to use Anam Ai on devices you own or control in accordance with these Terms.<br />
          • You may not copy, modify, distribute, resell, or create derivative works from the App except as expressly permitted.
        </p>

        <h3 class="text-xl font-semibold mb-2">4. User content &amp; responsibility</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          • You are responsible for the images you upload. Do not upload images that violate others’ privacy or rights.<br />
          • Do not upload illegal content or images of persons who have not consented to their image being processed by the App.
        </p>

        <h3 class="text-xl font-semibold mb-2">5. Accuracy &amp; disclaimers</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          • The App provides AI-generated opinions, scores, and suggestions for informational and entertainment purposes only.<br />
          • <strong>No warranty:</strong> We do not guarantee the accuracy, reliability, or outcomes of any analysis or advice. Results may be subjective and vary.<br />
          • You should not rely on the App for medical, mental health, legal, or professional advice.
        </p>

        <h3 class="text-xl font-semibold mb-2">6. Third-party services</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          • The App relies on third-party services (Google Gemini API). Use of those services is subject to their terms and privacy policies. We are not responsible for their practices or any issues arising from their processing.
        </p>

        <h3 class="text-xl font-semibold mb-2">7. Limitation of liability</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          • To the maximum extent permitted by law, in no event will we, our officers, affiliates or suppliers be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of the App, including any analysis results, or reliance on them.<br />
          • Our total aggregate liability for all claims related to the App will not exceed the amount you paid to download the App (if any), or a nominal amount (e.g., INR 500 / USD 5) if the App was free — whichever is greater.
        </p>

        <h3 class="text-xl font-semibold mb-2">8. Indemnity</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          You agree to indemnify and hold harmless the developers, affiliates, and service providers from any claims, losses, liabilities, damages, costs, and expenses arising from your misuse of the App or violation of these Terms.
        </p>

        <h3 class="text-xl font-semibold mb-2">9. Contact</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          For support, privacy questions, or legal requests, contact: <a href="mailto:spacester7563@gmail.com" class="underline">spacester7563@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
