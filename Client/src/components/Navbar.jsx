import React from 'react';

export default function Navbar({ setAuthView }) {
  return (
    <div className='navbar h-16 w-full text-2xl font-bold flex flex-row items-center justify-between bg-white/60 backdrop-blur-md border-b-2 border-gray-200 sticky top-0 z-10'>
      <a href="#" className='navComp p-5 text-black hover:scale-110'>Praxis</a>
      <div className='navComponent flex flex-row items-center gap-2 pr-5'>
        <button 
          onClick={() => setAuthView('login')} 
          className='navComp text-black hover:bg-black rounded-xl hover:scale-105 hover:text-white px-4 py-2 text-lg font-medium active:scale-95 cursor-pointer'
        >
          Login
        </button>
        <button 
          onClick={() => setAuthView('signup')} 
          className='navComp text-white bg-black rounded-xl px-4 py-2 text-lg font-medium hover:scale-105 active:scale-95 cursor-pointer'
        >
          Get started Free
        </button>
      </div>
    </div>
  );
}