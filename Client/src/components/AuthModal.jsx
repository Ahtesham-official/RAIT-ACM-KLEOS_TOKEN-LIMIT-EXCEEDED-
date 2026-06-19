import React from 'react';
import { FaArrowRightLong, FaRegEye, FaRegEyeSlash, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export default function AuthModal({ authView, setAuthView, showPassword, setShowPassword }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.2)] p-8 relative border border-gray-100 flex flex-col">
        <button 
          onClick={() => setAuthView(null)} 
          className="absolute top-5 right-6 text-gray-400 hover:text-black text-xl font-bold cursor-pointer transition-colors"
        >
          ✕
        </button>

        <h2 className="text-3xl font-extrabold text-black tracking-tight">
          {authView === 'login' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="text-gray-500 text-sm mt-1.5 mb-6">
          {authView === 'login' ? 'Glad to have you back! Please enter your details.' : 'Start transforming your video consumption into real code.'}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <button className="authSocialBtn flex items-center justify-center gap-2 border-2 border-gray-200 rounded-2xl py-3 hover:bg-gray-50 hover:border-gray-400 active:scale-98 transition-all font-semibold text-sm cursor-pointer">
            <FcGoogle className="text-lg" /> Google
          </button>
          <button className="authSocialBtn flex items-center justify-center gap-2 border-2 border-gray-200 rounded-2xl py-3 hover:bg-gray-50 hover:border-gray-400 active:scale-98 transition-all font-semibold text-sm cursor-pointer">
            <FaGithub className="text-lg text-black" /> GitHub
          </button>
        </div>

        <div className="flex items-center my-3">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="text-xs text-gray-400 px-3 font-medium uppercase tracking-wider">or</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mt-2">
          {authView === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 pl-1">Full Name</label>
              <input type="text" required placeholder="Alex Mercer" className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 outline-none focus:border-black transition-all bg-gray-50/50" />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 pl-1">Email Address</label>
            <input type="email" required placeholder="you@example.com" className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 outline-none focus:border-black transition-all bg-gray-50/50" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 pl-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
              {authView === 'login' && <a href="#" className="text-xs font-semibold text-gray-500 hover:text-black underline">Forgot?</a>}
            </div>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} required placeholder="••••••••" className="w-full h-12 px-4 pr-12 rounded-xl border-2 border-gray-200 outline-none focus:border-black transition-all bg-gray-50/50" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[32%] text-gray-400 hover:text-black cursor-pointer text-lg">
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full h-13 bg-black text-white rounded-xl font-bold text-base mt-6 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-black/10">
            <span>{authView === 'login' ? 'Sign In' : 'Register Account'}</span>
            <FaArrowRightLong className="text-xs mt-0.5" />
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6 font-medium">
          {authView === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => { setAuthView(authView === 'login' ? 'signup' : 'login'); setShowPassword(false); }}
            className="text-black font-bold underline hover:text-gray-700 cursor-pointer"
          >
            {authView === 'login' ? 'Sign up for free' : 'Log in here'}
          </button>
        </p>
      </div>
    </div>
  );
}