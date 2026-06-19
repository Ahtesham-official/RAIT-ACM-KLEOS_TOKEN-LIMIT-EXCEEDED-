import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Terminal, ArrowRight, Sparkles } from 'lucide-react';

export default function UrlForm({ videoUrl, setVideoUrl, onSubmit, theme }) {
  const scopeRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.hero-badge', { y: -20, opacity: 0, duration: 0.6, ease: 'power3.out' })
      .from('.hero-heading', { y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power4.out' }, '-=0.4')
      .from('.hero-desc', { opacity: 0, y: 15, duration: 0.6 }, '-=0.3')
      .from('.hero-input-box', { scale: 0.97, opacity: 0, duration: 0.5, ease: 'back.out(1.2)' }, '-=0.2');
  }, { scope: scopeRef });

  return (
    <div ref={scopeRef} className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 relative">
      {theme === 'dark' ? (
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
      ) : (
        <div className="absolute w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
      )}
      
      <div className={`hero-badge inline-flex items-center gap-2 border px-4 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider mb-6 transition-colors shadow-inner ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-cyan-400' : 'bg-slate-200/50 border-slate-300 text-slate-700'
      }`}>
        {theme === 'dark' ? <Terminal className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5 text-yellow-600" />} 
        ENGINE INTERFACE v1.0.4
      </div>

      <h1 className={`hero-heading text-6xl md:text-8xl font-black tracking-tight text-center leading-none ${
        theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400' : 'text-black'
      }`}>
        Learn Less.
      </h1>
      <h1 className={`hero-heading text-5xl md:text-7xl font-extrabold tracking-tight text-center mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
        Build More.
      </h1>

      <p className={`hero-desc font-medium text-base md:text-lg mt-6 text-center max-w-md leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
        Drop any system tutorial link below to transform raw video context into compilation modules.
      </p>

      <form onSubmit={onSubmit} className='hero-input-box relative mt-10 w-full max-w-2xl px-2 group'>
        <div className={`absolute inset-0 rounded-3xl blur-md opacity-20 group-focus-within:opacity-40 transition-all duration-300 ${theme === 'dark' ? 'bg-cyan-500' : 'bg-black'}`} />
        <input 
          type="url" 
          required
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className={`relative h-16 w-full rounded-2xl outline-none border p-5 pr-20 text-base shadow-2xl transition-all ${
            theme === 'dark' 
              ? 'border-slate-800 bg-slate-900/80 text-white focus:border-cyan-500 focus:bg-slate-950' 
              : 'border-slate-200 bg-white text-black focus:border-black'
          }`} 
          placeholder='Paste your YouTube video link here...' 
        />
        <button 
          type="submit" 
          className={`absolute right-4 top-[15%] h-11 w-14 flex items-center justify-center rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg ${
            theme === 'dark' ? 'bg-white text-black hover:bg-cyan-400' : 'bg-black text-white hover:bg-slate-800'
          }`}
        >
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </form>
    </div>
  );
}