import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import UrlForm from '../components/UrlForm';
import Footer from '../components/Footer';
import PipelineModal from '../components/PipelineModal';
import AuthModal from '../components/AuthModal';

export default function LandingPage({ authView, setAuthView, showPassword, setShowPassword }) {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const pipelineSteps = [
    "Triggering YouTube iFrame API...",
    "Extracting Video Context & Telemetry...",
    "Fetching Transcript Records...",
    "AI Layer: Generating Learning Modules...",
    "AI Layer: Compiling Checkpoint Questions...",
    "Success! Loading Workspace Suite..."
  ];

  useEffect(() => {
    let interval;
    if (isProcessing && currentStep < pipelineSteps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep((prev) => prev + 1);
      }, 900);
    } else if (isProcessing && currentStep === pipelineSteps.length - 1) {
      const timeout = setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(0);
        
        let derivedId = "dQw4w9WgXcQ"; // Default fallback
        try {
          if (videoUrl.includes("v=")) {
            derivedId = videoUrl.split("v=")[1].split("&")[0];
          } else if (videoUrl.includes("youtu.be/")) {
            derivedId = videoUrl.split("youtu.be/")[1].split("?")[0];
          }
        } catch (err) {
          console.error("Error parsing video link, pulling standard track context.", err);
        }

        setVideoUrl('');
        navigate(`/workspace/${derivedId}`);
      }, 1200);
      return () => clearTimeout(timeout);
    }
    return () => clearInterval(interval);
  }, [isProcessing, currentStep, videoUrl, navigate, pipelineSteps.length]);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;
    setCurrentStep(0);
    setIsProcessing(true);
  };

  return (
    <>
      <div className={`parent flex flex-col min-h-screen bg-slate-50 transition-all ${authView || isProcessing ? 'blur-md pointer-events-none' : ''}`}>
        <Navbar setAuthView={setAuthView} />
        <UrlForm videoUrl={videoUrl} setVideoUrl={setVideoUrl} onSubmit={handleUrlSubmit} />
        <Footer />
      </div>

      {isProcessing && <PipelineModal currentStep={currentStep} pipelineSteps={pipelineSteps} />}
      {authView && <AuthModal authView={authView} setAuthView={setAuthView} showPassword={showPassword} setShowPassword={setShowPassword} />}
    </>
  );
}