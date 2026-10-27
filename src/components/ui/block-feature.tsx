import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SCOPE_CATEGORIES_20 } from "../../data/mockJournalData";

export default function Feature() {
  // Duplicate categories to create a seamless infinite straight flow
  const marqueeCards = [...SCOPE_CATEGORIES_20, ...SCOPE_CATEGORIES_20];

  return (
    <section className="w-full px-3.5 sm:px-6 pt-1 pb-4 sm:pt-3 sm:pb-6">
      {/* Expanded larger container max-w-7xl */}
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative w-full overflow-hidden rounded-[22px] sm:rounded-[28px] border border-slate-200/90 dark:border-white/10 bg-white dark:bg-slate-900 shadow-[0_12px_40px_rgba(0,0,0,0.05)] p-4 sm:p-9 lg:p-11 space-y-4 sm:space-y-6">
          {/* Subtle Ambient Light Glows */}
          <div className="absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-blue-100/35 dark:bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-amber-100/40 dark:bg-amber-500/10 blur-3xl pointer-events-none" />

          {/* 1. TOP HEADING */}
          <div className="relative z-10 text-center max-w-4xl mx-auto pt-0.5 pb-1">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              Interdisciplinary Pillars: Law, Forensics &amp; Society
            </h2>
          </div>

          {/* 2. STRAIGHT FLOW MARQUEE TRACK (Same cards as Aims & Scope, flowing straight horizontally) */}
          <div className="relative w-full overflow-hidden py-2 select-none">
            {/* Subtle left & right gradient fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10" />

            {/* Straight Continuous Scrolling Track (pauses on hover) */}
            <div className="animate-pillars-scroll flex gap-3.5 sm:gap-5 items-stretch py-1">
              {marqueeCards.map((cat, index) => (
                <Link
                  key={`${cat.id}-${index}`}
                  to="/aims-scope"
                  className="w-[230px] sm:w-[270px] shrink-0 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-all flex flex-col justify-between shadow-2xs hover:shadow-md group cursor-pointer text-left"
                >
                  <div className="space-y-2.5 sm:space-y-3">
                    {/* Handcrafted Illustration without container, matching Aims & Scope */}
                    <div className="w-full h-24 sm:h-32 flex items-center justify-center p-1">
                      <img 
                        src={`/core-research-areas/${cat.id}.png`}
                        alt={cat.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-xs sm:text-base text-[var(--text-primary)] group-hover:text-[var(--accent-navy)] transition-colors leading-snug">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] mt-1 sm:mt-1.5 leading-relaxed font-serif text-justify line-clamp-3">
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 3. BOTTOM DESCRIPTION & EXPLORE BUTTON */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-3 sm:space-y-3.5 max-w-3xl mx-auto pt-2 sm:pt-3 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-serif leading-relaxed text-justify font-medium">
              Complex criminal justice phenomena cannot be resolved through one discipline alone. We synthesize statutory criminal codes, digital forensics, constitutional safeguards, and empirical realities.
            </p>

            <Link
              to="/aims-scope"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <span>Explore Scholarly Scope</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Feature };
