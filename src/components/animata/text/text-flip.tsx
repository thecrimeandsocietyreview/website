"use client";

import React, { useMemo } from "react";

interface TextFlipProps {
  words?: string[];
  prefix?: string;
  className?: string;
  wordClassName?: string;
}

export function TextFlip({
  words: customWords,
  prefix = "",
  className = "box-content flex flex-wrap items-baseline gap-2 sm:gap-2.5 text-xl sm:text-2xl lg:text-3xl font-bold font-serif",
  wordClassName = "text-[var(--accent-gold)] dark:text-amber-400 font-bold",
}: TextFlipProps) {
  const defaultWords = useMemo(
    () => [
      "Criminology",
      "Forensic Science",
      "Criminal Law",
      "Societal Justice",
      "Criminology",
    ],
    []
  );

  const words = customWords || defaultWords;

  return (
    <div className={className}>
      {prefix && <span className="text-white shrink-0">{prefix}</span>}
      {/* 
        Container locked strictly to 1.22em height with overflow:hidden and contain:paint 
        guarantees that on initial page load / refresh, ONLY 1 word can EVER be visible.
        All subsequent words are clipped out from frame 0 with ZERO flash of stacked content.
      */}
      <div
        className={`inline-flex flex-col overflow-hidden ${wordClassName}`}
        style={{
          height: "1.22em",
          maxHeight: "1.22em",
          lineHeight: "1.22",
          overflow: "hidden",
          contain: "paint",
          verticalAlign: "bottom",
        }}
      >
        {words.map((word, index) => (
          <span
            key={index}
            className="animate-flip-words whitespace-nowrap block shrink-0 select-none"
            style={{
              height: "1.22em",
              lineHeight: "1.22",
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TextFlip;
