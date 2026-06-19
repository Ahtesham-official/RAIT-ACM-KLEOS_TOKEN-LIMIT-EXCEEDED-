import React from 'react';
import Sidebar from '/src/components/dashboard/Sidebar.jsx';
import Header from '/src/components/dashboard/Header.jsx';
import MetricCards from '/src/components/dashboard/MetricCards.jsx';
import LearningProgress from '/src/components/dashboard/LearningProgress.jsx';
import PerformanceChart from '/src/components/dashboard/PerformanceChart.jsx';
import WatchTimeMetrics from '/src/components/dashboard/WatchTimeMetrics.jsx';

export default function DashboardPage({ theme, toggleTheme }) {
  return (
    <div className={`min-h-screen flex w-full overflow-x-hidden relative transition-colors duration-500 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Matrix Mesh Layer calibrated precisely to match your Landing Page style */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none`}
        style={{ '--grid-color': theme === 'dark' ? '#0f172a' : '#e2e8f0' }}
      />

      <Sidebar theme={theme} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 lg:p-8 space-y-6 z-10">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <MetricCards theme={theme} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch w-full min-w-0">
          <LearningProgress theme={theme} />
          <PerformanceChart theme={theme} />
        </div>

        <WatchTimeMetrics theme={theme} />
      </div>
    </div>
  );
}