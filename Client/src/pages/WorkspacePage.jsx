import React from 'react';
import { useParams } from 'react-router-dom';

export default function WorkspacePage() {
  const { videoId } = useParams();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Workspace</h1>
      <p className="text-xl text-gray-400">
        You are currently viewing the workspace for Video ID: <span className="text-teal-400 font-mono">{videoId}</span>
      </p>
      <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-w-2xl text-center">
        <p className="text-gray-300">
          This is a placeholder for the Workspace Page. The backend features we implemented (dual scoring, Feynman techique, text evaluation) will be integrated here soon!
        </p>
      </div>
    </div>
  );
}
