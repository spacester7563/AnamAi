import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Loader2, ImagePlus, ScanFace, Trash2 } from 'lucide-react';
import { AnalysisType, ImageAsset } from '../types';
import { analyzeImages } from '../services/geminiService';

const Upload: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = (searchParams.get('type') as AnalysisType) || AnalysisType.FACE_CARD;
  const [loading, setLoading] = useState(false);

  // Define required photos based on type
  const getRequiredPhotos = () => {
    switch (type) {
      case AnalysisType.FACE_CARD:
      case AnalysisType.HAIR:
        return [
          { id: 'front', label: 'Front Profile' },
          { id: 'side', label: 'Side Profile' }
        ];
      case AnalysisType.BODY:
      case AnalysisType.APPEARANCE:
        return [
          { id: 'front', label: 'Front View' },
          { id: 'back', label: 'Back/Full View' }
        ];
      default:
        return [{ id: 'front', label: 'Main Photo' }];
    }
  };

  const requiredPhotos = getRequiredPhotos();
  const [images, setImages] = useState<Record<string, ImageAsset | null>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate MIME type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Unsupported file format. Please upload JPG, PNG, WEBP, or HEIC.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        
        setImages(prev => ({
          ...prev,
          [id]: {
            data: base64Data,
            mimeType: file.type
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => ({
      ...prev,
      [id]: null
    }));
  };

  const handleAnalyze = async () => {
    const isComplete = requiredPhotos.every(req => images[req.id]);
    if (!isComplete) return;

    setLoading(true);
    try {
      const imageList = Object.values(images) as ImageAsset[];
      const result = await analyzeImages(type, imageList);
      
      const frontImage = images['front']?.data || imageList[0].data;

      const historyItem = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        type,
        result,
        thumbnail: frontImage
      };
      
      const existingHistory = JSON.parse(localStorage.getItem('anam_history') || '[]');
      localStorage.setItem('anam_history', JSON.stringify([historyItem, ...existingHistory]));

      navigate('/result', { state: { result, type, frontImage } });
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please ensure your API key is valid and images are clear.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-dark p-6 text-center z-50 fixed inset-0">
        <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            <Loader2 size={64} className="text-primary animate-spin relative z-10" />
        </div>
        <h2 className="mt-8 text-2xl font-bold text-slate-900 dark:text-white">Analyzing {type}...</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Our AI is calculating your scores. This may take a few seconds.</p>
        
        <div className="mt-8 w-64 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
             <div className="h-full bg-primary animate-[width_2s_ease-in-out_infinite]" style={{width: '30%'}}></div>
        </div>
      </div>
    );
  }

  const isComplete = requiredPhotos.every(req => images[req.id]);

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-dark">
      <div className="flex items-center mb-8 text-slate-900 dark:text-white mt-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2">Upload Photos</h1>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
        Please upload clear photos for the most accurate <strong>{type}</strong> score.
      </p>

      <div className="grid gap-6">
        {requiredPhotos.map((req) => (
          <div key={req.id} className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">{req.label}</label>
            
            {images[req.id] ? (
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 group shadow-sm">
                <img 
                  src={`data:${images[req.id]?.mimeType};base64,${images[req.id]?.data}`} 
                  alt={req.label} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                        onClick={() => removeImage(req.id)}
                        className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500/80 transition-colors"
                    >
                        <Trash2 size={24} />
                    </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full aspect-[4/3] border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-100 dark:bg-card hover:bg-gray-200 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="p-4 rounded-full bg-white dark:bg-white/5 mb-3 shadow-sm group-hover:scale-110 transition-transform">
                    <ImagePlus size={32} className="text-gray-400 dark:text-gray-500" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Tap to upload</span>
                <span className="text-xs text-gray-400 dark:text-gray-600 mt-1">JPG, PNG, HEIC</span>
                <input 
                  type="file" 
                  accept="image/jpeg, image/png, image/webp, image/heic, image/heif"
                  className="hidden" 
                  onChange={(e) => handleFileChange(e, req.id)}
                />
              </label>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-20 left-0 right-0 px-6 max-w-md mx-auto pointer-events-none">
          <button
            onClick={handleAnalyze}
            disabled={!isComplete}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg pointer-events-auto transition-all transform active:scale-[0.98] ${
                isComplete 
                ? 'bg-primary text-white shadow-primary/30' 
                : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
          >
            {isComplete ? 'Generate Score' : 'Upload All Photos'}
          </button>
      </div>
    </div>
  );
};

export default Upload;