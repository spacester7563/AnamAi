import React, { useRef, useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { ArrowLeft, Share2, CheckCircle2, Loader2, ScanFace } from 'lucide-react';
import { AnalysisResult, AnalysisType } from '../types';
import { useTheme } from '../context/ThemeContext';
// @ts-ignore
import html2canvas from 'html2canvas';

interface LocationState {
    result: AnalysisResult;
    type: AnalysisType;
    frontImage?: string; // Base64 string
}

const Result: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState;
    const { theme } = useTheme();

    // Refs for the visible result and the hidden share card
    const resultRef = useRef<HTMLDivElement>(null);
    const shareRef = useRef<HTMLDivElement>(null);

    const [sharing, setSharing] = useState(false);

    if (!state?.result) {
        return <Navigate to="/" />;
    }

    const { result, type, frontImage } = state;

    const scoreData = [
        { name: 'Score', value: result.overallScore, fill: '#6366f1' }
    ];

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-500 dark:text-green-400';
        if (score >= 70) return 'text-blue-500 dark:text-blue-400';
        if (score >= 50) return 'text-yellow-500 dark:text-yellow-400';
        return 'text-red-500 dark:text-red-400';
    };

    const trackColor = theme === 'dark' ? '#334155' : '#e2e8f0';

    // Sort categories by score descending to get top 5
    const topFeatures = [...result.categories]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    const handleShare = async () => {
        if (!shareRef.current || sharing) return;

        setSharing(true);
        try {
            // Use the hidden shareRef for capture
            const canvas = await html2canvas(shareRef.current, {
                useCORS: true,
                backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
                scale: 3, // Higher resolution for crisp text
                logging: false,
                onclone: (clonedDoc: Document) => {
                    // Ensure the cloned element is visible for capture
                    const element = clonedDoc.getElementById('share-card-container');
                    if (element) {
                        element.style.display = 'block';
                        element.style.position = 'relative';
                        element.style.left = '0';
                        element.style.top = '0';
                    }
                }
            });

            const imageBlob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));

            if (imageBlob) {
                const file = new File([imageBlob], 'anam-score.png', { type: 'image/png' });

                if (navigator.share) {
                    await navigator.share({
                        title: 'My Anam AI Score',
                        text: `I got a ${result.overallScore} on my ${type} Score!`,
                        files: [file]
                    });
                } else {
                    // Fallback for browsers that don't support file sharing via navigator
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = 'anam-score.png';
                    link.click();
                }
            }
        } catch (error) {
            console.error("Sharing failed:", error);
            alert("Could not share image. Try taking a screenshot manually.");
        } finally {
            setSharing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark pb-24 transition-colors duration-300">

            {/* 
          HIDDEN SHARE CARD 
          Positioned off-screen but rendered so html2canvas can capture it.
          Fixed width ensures consistent screenshot size.
          Uses 'font-sans' and strict 'leading' to prevent text shifting artifacts in html2canvas.
      */}
            <div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
                <div
                    id="share-card-container"
                    ref={shareRef}
                    className="w-[400px] bg-gray-50 dark:bg-dark p-6 rounded-none flex flex-col items-center font-sans"
                >
                    {/* Share Header */}
                    <div className="flex items-center gap-2 mb-6 opacity-80">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <ScanFace size={24} className="text-primary" />
                        </div>
                        <div className="pb-3">
                            <h1 className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white leading-none pb-1">ANAM</h1>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 leading-none">AI Face Scorecard</p>
                        </div>
                    </div>

                    {/* Share Score with Image */}
                    <div className="relative w-48 h-48 mb-4">
                        {frontImage ? (
                            <div className="absolute inset-[15%] rounded-full overflow-hidden border-2 border-white/20 dark:border-white/10 z-0">
                                <img
                                    src={`data:image/jpeg;base64,${frontImage}`}
                                    className="w-full h-full object-cover opacity-80"
                                    alt="User"
                                />
                                <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
                            </div>
                        ) : null}

                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                                cx="50%"
                                cy="50%"
                                innerRadius="80%"
                                outerRadius="100%"
                                barSize={10}
                                data={scoreData}
                                startAngle={90}
                                endAngle={-270}
                            >
                                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                                <RadialBar
                                    background={{ fill: trackColor }}
                                    dataKey="value"
                                    cornerRadius={30 / 2}
                                    isAnimationActive={false} // Disable animation for capture
                                />
                            </RadialBarChart>
                        </ResponsiveContainer>

                        {/* Score Overlay - Uses tight leading and explicit padding to prevent shift */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                            <div className="bg-white/80 dark:bg-black/40 backdrop-blur-sm px-6 py-3 rounded-2xl flex flex-col items-center shadow-sm">
                                <span className={`text-4xl font-black leading-[0.8] mb-5 ${getScoreColor(result.overallScore)}`}>
                                    {result.overallScore}
                                </span>
                                <span className="text-slate-600 dark:text-gray-200 text-[10px] uppercase tracking-wider font-bold leading-none pb-2">Overall</span>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-3 leading-tight">{result.title}</h2>
                    <div className="items-center h-12 flex items-center px-3 pb-3 rounded-full bg-gray-200 dark:bg-white/10 text-xs font-medium text-slate-700 dark:text-gray-300 mb-6 uppercase tracking-wider mt-2">
                        {type} Score
                    </div>

                    {/* Top 5 Features */}
                    <div className="w-full space-y-3 mb-6">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest text-center mb-3 leading-none">Top 5 Features</h3>
                        {topFeatures.map((cat, idx) => (
                            <div key={idx} className="bg-white dark:bg-card p-3 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm flex justify-between items-center h-12">
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 pb-4">{cat.name}</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${cat.score}%` }}></div>
                                    </div>
                                    <span className={`text-sm font-bold pb-4 ${getScoreColor(cat.score)}`}>{cat.score}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Share Footer */}
                    <div className="text-center">
                        <p className="text-[10px] text-gray-400 leading-none">Get your score at Anam AI</p>
                    </div>
                </div>
            </div>

            {/* VISIBLE UI */}
            <div ref={resultRef} className="bg-gray-50 dark:bg-dark">
                {/* Header Image/Gradient */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-purple-600/20 dark:from-primary/30 dark:to-purple-600/30 rounded-b-[2.5rem] overflow-hidden">
                    <div className="absolute inset-0 flex flex-col p-6">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => navigate('/')}
                                className="w-10 h-10 rounded-full bg-white/60 dark:bg-black/20 backdrop-blur-md flex items-center justify-center text-slate-900 dark:text-white shadow-sm"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <button
                                onClick={handleShare}
                                disabled={sharing}
                                className="w-10 h-10 rounded-full bg-white/60 dark:bg-black/20 backdrop-blur-md flex items-center justify-center text-slate-900 dark:text-white shadow-sm disabled:opacity-50"
                            >
                                {sharing ? <Loader2 size={20} className="animate-spin" /> : <Share2 size={20} />}
                            </button>
                        </div>
                        <div className="mt-auto text-center">
                            <span className="px-3 py-1 rounded-full bg-white/30 dark:bg-white/10 text-xs backdrop-blur-sm border border-white/20 uppercase tracking-widest font-medium text-slate-800 dark:text-white">
                                {type}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Score Card */}
                <div className="px-6 -mt-12 relative z-10 mb-6">
                    <div className="bg-white dark:bg-card border border-gray-100 dark:border-white/5 rounded-3xl p-6 shadow-xl flex flex-col items-center transition-colors">

                        {/* Score Chart with Image Inside */}
                        <div className="relative w-56 h-56">
                            {/* User Image in Center */}
                            {frontImage ? (
                                <div className="absolute inset-[15%] rounded-full overflow-hidden border-2 border-white/20 dark:border-white/10 z-0">
                                    <img
                                        src={`data:image/jpeg;base64,${frontImage}`}
                                        className="w-full h-full object-cover opacity-90"
                                        alt="User"
                                    />
                                    {/* Dark overlay for contrast */}
                                    <div className="absolute inset-0 bg-black/10"></div>
                                </div>
                            ) : (
                                // Fallback placeholder if no image
                                <div className="absolute inset-[15%] rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center z-0">
                                    <ScanFace size={48} className="text-gray-300 dark:text-gray-600" />
                                </div>
                            )}

                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="80%"
                                    outerRadius="100%"
                                    barSize={12}
                                    data={scoreData}
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                                    <RadialBar
                                        background={{ fill: trackColor }}
                                        dataKey="value"
                                        cornerRadius={30 / 2}
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>

                            {/* Score Text Overlay - Centered with backdrop */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                <div className="bg-white/80 dark:bg-black/60 backdrop-blur-md px-5 py-2 rounded-2xl flex flex-col items-center shadow-lg border border-white/20">
                                    <span className={`text-4xl font-black ${getScoreColor(result.overallScore)}`}>
                                        {result.overallScore}
                                    </span>
                                    <span className="text-slate-600 dark:text-gray-300 text-[10px] uppercase tracking-wider font-bold">Overall</span>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-4 text-center">{result.title}</h2>
                        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-2 leading-relaxed">
                            {result.summary}
                        </p>
                    </div>
                </div>

                {/* Breakdown - Grid Layout for more items */}
                <div className="px-6 space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Detailed Score</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {result.categories.map((cat, idx) => (
                                <div key={idx} className="bg-white dark:bg-card p-3 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-none transition-colors">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate pr-2">{cat.name}</span>
                                        <span className={`text-sm font-bold ${getScoreColor(cat.score)}`}>{cat.score}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1 mb-1.5">
                                        <div
                                            className="bg-primary h-1 rounded-full"
                                            style={{ width: `${cat.score}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight line-clamp-2">{cat.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recommendations</h3>
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-5 border border-indigo-100 dark:border-white/5">
                            <ul className="space-y-4">
                                {result.recommendations.map((rec, idx) => (
                                    <li key={idx} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                                        <CheckCircle2 className="text-primary shrink-0" size={18} />
                                        <span>{rec}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center pb-4 opacity-50">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Generated by Anam AI</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;