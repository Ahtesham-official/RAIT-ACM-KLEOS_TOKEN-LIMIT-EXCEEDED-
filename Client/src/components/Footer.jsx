import React from 'react';
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t-2 border-gray-200 py-6 px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tight text-black">Praxis</span>
        <span className="text-xs font-medium text-gray-400 mt-1">© 2026. All rights reserved.</span>
      </div>
      
      <div className="flex items-center gap-6 text-sm font-semibold text-gray-500">
        <a href="#" className="hover:text-black transition-colors">Privacy</a>
        <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-black transition-colors">Contact</a>
      </div>

      <div className="flex items-center gap-4 text-lg text-gray-400">
        <a href="https://github.com/Ahtesham-official/RAIT-ACM-KLEOS_TOKEN-LIMIT-EXCEEDED-" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}