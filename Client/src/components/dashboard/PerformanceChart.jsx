import React from 'react';

export default function PerformanceChart({ theme }) {
  const points = [
    { label: "Apr 20", score: 65, avg: 50 },
    { label: "Apr 27", score: 72, avg: 55 },
    { label: "May 4", score: 58, avg: 45 },
    { label: "May 11", score: 80, avg: 60 },
    { label: "May 18", score: 75, avg: 62 },
    { label: "May 24", score: 88, avg: 66 }
  ];

  return (
    <div className={`p-6 rounded-2xl border flex flex-col justify-between w-full min-w-0 transition-colors ${
      theme === 'dark' ? 'bg-slate-900/40 border-slate-900' : 'bg-white border-slate-200 shadow-sm'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-black tracking-tight">Past Performance</h2>
        <div className="flex items-center gap-4 text-[10px] font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span className="text-slate-400">Scores (%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-slate-400">Average (%)</span>
          </div>
        </div>
      </div>

      {/* Render Chart Coordinate Grid */}
      <div className="relative w-full h-48 flex items-end justify-between px-4 pb-2 group">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9px] font-mono font-bold text-slate-400">
          {['100%', '75%', '50%', '25%', '0%'].map((val, i) => (
            <div key={i} className="w-full flex items-center gap-2 h-0">
              <span className="w-8 text-right">{val}</span>
              <div className={`flex-1 h-[1px] border-b border-dashed ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`} />
            </div>
          ))}
        </div>

        <svg viewBox="0 0 600 160" className="absolute inset-x-4 bottom-6 w-[calc(100%-2rem)] h-36 overflow-visible pointer-events-none">
          {/* User Score Curve Line */}
          <path d="M 10 110 Q 110 90 220 120 T 440 60 T 590 30" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
          <circle cx="590" cy="30" r="4" fill="#8b5cf6" />
          
          {/* Average Curve Line */}
          <path d="M 10 130 Q 110 120 220 140 T 440 100 T 590 80" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
          <circle cx="590" cy="80" r="4" fill="#f59e0b" />
        </svg>

        {points.map((p, i) => (
          <div key={i} className="flex flex-col items-center flex-1 z-10 relative">
            <div className="text-[10px] font-bold space-y-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-12 text-center">
              <div className="text-violet-500">{p.score}%</div>
              <div className="text-amber-500">{p.avg}%</div>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400 mt-2">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}