import React from 'react';
import { Eye, ShieldCheck, Cpu, Database } from 'lucide-react';
const features = [
  { icon: <Eye />, title: "Tutorial Sessions", desc: "Organize applied learning modules directly around existing video tutorial lessons from YouTube or other courses." },
  { icon: <ShieldCheck />, title: "Challenge Gates", desc: "Validate active retention using MCQs, bug-fixing tasks, and code completion exercises before video playheads unlock." },
  { icon: <Cpu />, title: "Topic Checkpoints", desc: "Tutorial playlists are parsed into lockable milestone checkpoints mapping core engineering concepts." },
  { icon: <Database />, title: "Learning Debt Tracker", desc: "Identify passive learning immediately by tracking watch time completion against challenge attempts." }
];

export default function FeaturesGrid({ theme }) {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (theme === 'dark') {
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }

    // Calculate rotation angles
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    card.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s, shadow 0.3s';
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s, shadow 0.3s';
  };

  return (
    <section className="scroll-reveal py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-16 text-center md:text-left">
        <span className="text-xs font-mono tracking-widest text-cyan-500 font-bold uppercase">// CAPABILITIES DECK</span>
        <h2 className={`text-3xl md:text-5xl font-black tracking-tight mt-1 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Supercharged for core engineers</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feat, i) => (
          <div 
            key={i} 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`glow-card relative border p-8 rounded-2xl overflow-hidden ${
              theme === 'dark' 
                ? 'bg-slate-900/50 border-slate-800 before:absolute before:inset-0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(34,211,238,0.06),transparent_40%)]' 
                : 'bg-white border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-300'
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div 
              className={`w-10 h-10 border rounded-xl flex items-center justify-center mb-6 transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-cyan-400' : 'bg-slate-50 border-slate-200 text-black'
              }`}
              style={{ transform: 'translateZ(20px)' }}
            >
              {React.cloneElement(feat.icon, { className: 'w-5 h-5' })}
            </div>
            <h3 
              className={`text-lg font-bold tracking-tight mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
              style={{ transform: 'translateZ(10px)' }}
            >
              {feat.title}
            </h3>
            <p 
              className={`text-sm leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}
              style={{ transform: 'translateZ(5px)' }}
            >
              {feat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}