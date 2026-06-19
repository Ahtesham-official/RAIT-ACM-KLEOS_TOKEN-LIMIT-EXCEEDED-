import React from 'react';
import { Sliders, RefreshCw, Layers } from 'lucide-react';
const steps = [
  { icon: <Sliders />, label: "01 / SESSION SETUP", title: "Create Tutorial Session", desc: "Paste any video tutorial URL. Praxis segments the course content into checkpoints mapping key concepts." },
  { icon: <RefreshCw />, label: "02 / CHALLENGE GATES", title: "Resolve Checkpoint Gates", desc: "As the playhead reaches milestones, the video locks. Solve bug-fixes or MCQs to verify understanding and resume playback." },
  { icon: <Layers />, label: "03 / COMPETENCY METRICS", title: "Visualize Learning Debt", desc: "Submit your completed track to generate a Competency Report tracking watch time against quiz failures and attempts." }
];

export default function WorkflowTimeline({ theme }) {
  return (
    <section className={`scroll-reveal py-32 border-t transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 border-slate-900' : 'bg-slate-100 border-slate-200'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-20 text-center">
          <span className="text-xs font-mono tracking-widest text-cyan-500 font-bold uppercase">// CORE AUTOMATION INTERFACE</span>
          <h2 className={`text-3xl md:text-5xl font-black tracking-tight mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Operational Pipeline</h2>
        </div>

        <div className="relative">
          {/* Laser connection pipeline track */}
          <div className="absolute top-[48px] left-[15%] right-[15%] h-[2px] bg-slate-200 dark:bg-slate-800 hidden lg:block z-0 overflow-hidden rounded-full">
            <div className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-[35%] animate-laser-sweep" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className={`border p-8 rounded-2xl relative group transition-all duration-500 backdrop-blur-md ${
                theme === 'dark' 
                  ? 'bg-slate-900/20 border-slate-900/80 hover:bg-slate-900/40 hover:border-slate-800 hover:shadow-[0_0_30px_rgba(34,211,238,0.03)]' 
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
              }`}>
                <div className={`w-10 h-10 border rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-slate-950 border-slate-800 text-cyan-400 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]' 
                    : 'bg-slate-50 border-slate-200 text-black group-hover:border-black/30'
                }`}>
                  {React.cloneElement(step.icon, { className: 'w-5 h-5' })}
                </div>
                <span className="text-[10px] font-mono tracking-widest font-bold text-slate-400">{step.label}</span>
                <h3 className={`text-xl font-bold tracking-tight mt-2 mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
                <p className={`text-sm leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}