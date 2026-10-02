import React from 'react';
import { Component as Globe } from "@/components/ui/interactive-globe";

export const GlobalNetworkSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-3 sm:px-6">
      <div className="w-full rounded-2xl sm:rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative shadow-2xl">
        {/* Ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        {/* Side-by-side on Mobile, Tablet & Laptop */}
        <div className="flex flex-row items-center min-h-[340px] sm:min-h-[420px] md:min-h-[480px]">
          {/* Left content */}
          <div className="flex-1 min-w-0 flex flex-col justify-center p-3.5 sm:p-7 md:p-10 lg:p-12 relative z-10">
            <h2 className="text-base sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-2 sm:mb-4 font-serif">
              Global Scholarly
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-sky-300 bg-clip-text text-transparent">
                Research Network
              </span>
            </h2>

            <p className="text-[10.5px] sm:text-xs md:text-sm lg:text-base text-slate-300 max-w-md leading-relaxed mb-3 sm:mb-6 md:mb-8 font-serif line-clamp-3 sm:line-clamp-none">
              Connecting legal scholars, forensic scientists, criminologists, and judicial academies across premier institutions worldwide. Advancing evidence-based scholarship on the BNS, BNSS, and BSA. Drag the globe to explore international research collaborations.
            </p>

            {/* 3 Stats in a Row */}
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6 pt-1">
              <div>
                <p className="text-xs sm:text-lg md:text-2xl font-bold text-amber-400 font-mono">₹0 APC</p>
                <p className="text-[8px] sm:text-[10.5px] md:text-xs text-slate-400 font-sans whitespace-nowrap">Diamond Open Access</p>
              </div>
              <div className="w-px h-5 sm:h-7 md:h-8 bg-slate-800 shrink-0" />
              <div>
                <p className="text-xs sm:text-lg md:text-2xl font-bold text-white font-mono">20+</p>
                <p className="text-[8px] sm:text-[10.5px] md:text-xs text-slate-400 font-sans whitespace-nowrap">Subject Domains</p>
              </div>
              <div className="w-px h-5 sm:h-7 md:h-8 bg-slate-800 shrink-0" />
              <div>
                <p className="text-xs sm:text-lg md:text-2xl font-bold text-white font-mono">Double-Blind</p>
                <p className="text-[8px] sm:text-[10.5px] md:text-xs text-slate-400 font-sans whitespace-nowrap">Peer Review</p>
              </div>
            </div>
          </div>

          {/* Right — Globe (Auto-responsive side-by-side, larger and prominent on mobile) */}
          <div className="flex-1 min-w-0 flex items-center justify-center p-1 sm:p-4 md:p-6 overflow-hidden relative">
            <div className="w-full max-w-[240px] sm:max-w-[340px] md:max-w-[440px] aspect-square flex items-center justify-center">
              <Globe size={480} className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalNetworkSection;
