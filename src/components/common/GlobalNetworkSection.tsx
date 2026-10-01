import React from 'react';
import { Component as Globe } from "@/components/ui/interactive-globe";

export const GlobalNetworkSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="w-full rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative shadow-2xl">
        {/* Ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* Left content */}
          <div className="flex-1 flex flex-col justify-center p-8 sm:p-10 md:p-14 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs text-amber-300 mb-6 w-fit backdrop-blur-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Continuous Rolling Publication • UGC-CARE Aligned
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-4 font-serif">
              Global Scholarly
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-sky-300 bg-clip-text text-transparent">
                Research Network
              </span>
            </h2>

            <p className="text-sm md:text-base text-slate-300 max-w-md leading-relaxed mb-8 font-serif">
              Connecting legal scholars, forensic scientists, criminologists, and judicial academies across premier institutions worldwide. Advancing evidence-based scholarship on the BNS, BNSS, and BSA. Drag the globe to explore international research collaborations.
            </p>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-2xl font-bold text-amber-400 font-mono">₹0 APC</p>
                <p className="text-xs text-slate-400 font-sans">Diamond Open Access</p>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div>
                <p className="text-2xl font-bold text-white font-mono">20+</p>
                <p className="text-xs text-slate-400 font-sans">Subject Domains</p>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div>
                <p className="text-2xl font-bold text-white font-mono">Double-Blind</p>
                <p className="text-xs text-slate-400 font-sans">Peer Review</p>
              </div>
            </div>
          </div>

          {/* Right — Globe */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-0 min-h-[400px] overflow-hidden">
            <Globe size={460} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalNetworkSection;
