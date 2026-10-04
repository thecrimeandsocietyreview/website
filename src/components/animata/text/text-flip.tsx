"use client";

import React, { useEffect, useMemo, useRef } from "react";

interface TextFlipProps {
  words?: string[];
  prefix?: string;
  className?: string;
  wordClassName?: string;
}

export function TextFlip({
  words: customWords,
  prefix = "Advancing",
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
  const tallestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tallestRef.current) {
      let maxHeight = 0;

      words.forEach((word) => {
        const span = document.createElement("span");
        span.className = "absolute opacity-0 inline-block";
        span.textContent = word;
        tallestRef.current?.appendChild(span);
        const height = span.offsetHeight;
        tallestRef.current?.removeChild(span);

        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      if (maxHeight > 0) {
        tallestRef.current.style.height = `${maxHeight}px`;
      }
    }
  }, [words]);

  return (
    <div className={className}>
      {prefix && <span className="text-white shrink-0">{prefix}</span>}
      <div
        ref={tallestRef}
        className={`inline-flex flex-col overflow-hidden leading-tight ${wordClassName}`}
        style={{ minHeight: "1.3em" }}
      >
        {words.map((word, index) => (
          <span key={index} className="animate-flip-words whitespace-nowrap">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TextFlip;
