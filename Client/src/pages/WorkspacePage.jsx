import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function WorkspacePage() {
  const { videoId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-800 rounded-3xl p-8 border border-slate-700 text-center shadow-2xl">
        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Workspace Engine</h1>
        <p className="text-slate-400 text-sm mb-6 font-mono">Video ID: {videoId}</p>
        
        <div className="aspect-video w-full bg-black rounded-2xl mb-6 flex items-center justify-center text-slate-600 font-medium border border-slate-800">
          [ YouTube Player Placeholder ]
        </div>

        <button 
          onClick={() => navigate('/')}
          className="w-full h-12 bg-white text-black font-bold rounded-xl hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
        >
          Back to Landing
        </button>
      </div>
    </div>
  );
}