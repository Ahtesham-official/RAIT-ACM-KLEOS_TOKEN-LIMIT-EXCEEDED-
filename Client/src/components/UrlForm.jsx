import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";

export default function UrlForm({ videoUrl, setVideoUrl, onSubmit }) {
  return (
    <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">
      <h1 className='tagLine-1 text-8xl font-extrabold bg-gradient-to-br from-black via-gray-700 to-gray-400 bg-clip-text text-transparent tracking-tight text-center'>Learn Less</h1>
      <h1 className='tagLine-2 text-7xl mt-2 font-bold bg-gradient-to-br from-black via-gray-700 to-gray-400 bg-clip-text text-transparent tracking-tight text-center'>Build More</h1>
      <p className='infoText font-semibold mt-10 text-xl text-center'>A proper platform to help you excel</p>
      <p className='infoText font-semibold text-xl text-center'>in your skills and studies</p>
      
      <form onSubmit={onSubmit} className='relative mt-6 max-w-full'>
        <input 
          type="url" 
          id="inputUrlField" 
          required
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className='h-17 w-2xl max-w-full rounded-3xl outline-none border-2 p-6 pr-24 text-xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all focus:border-black focus:bg-white' 
          placeholder='Enter YouTube Video URL here' 
        />
        <button 
          type="submit" 
          className='urlSubmitBtn absolute right-2 top-[12%] h-13 w-20 flex items-center justify-center bg-black rounded-2xl text-white text-2xl hover:scale-105 active:scale-95 cursor-pointer'
        >
          <FaArrowRightLong />
        </button>
      </form>
    </div>
  );
}