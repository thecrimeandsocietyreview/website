import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Compass,
  Scale,
  ShieldAlert,
  Microscope,
  Brain,
  Landmark,
  Users,
  HeartHandshake,
  Gavel,
  Building2,
  ShieldCheck,
  Terminal,
  Lock,
  Activity,
  Search,
  Network,
  AlertTriangle,
  Smile,
  Heart,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// ------------------------------ | 20 RESEARCH AREAS (AIMS & SCOPE) | ------------------------------ //

interface ScopeItem {
  id: string;
  name: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  badgeBg: string;
}

const SCOPE_CARDS_20: ScopeItem[] = [
  {
    id: "criminology",
    name: "Criminology",
    desc: "Theories of criminal behaviour, structural crime causation, socio-legal perspectives.",
    icon: Compass,
    color: "text-amber-700",
    badgeBg: "bg-amber-50 border-amber-200",
  },
  {
    id: "criminal-justice",
    name: "Criminal Justice",
    desc: "Statutory frameworks, judicial administration, trial court processes, fair trial.",
    icon: Scale,
    color: "text-indigo-700",
    badgeBg: "bg-indigo-50 border-indigo-200",
  },
  {
    id: "policing",
    name: "Policing",
    desc: "Investigative protocols, Section 105 BNSS videography, frontline field constraints.",
    icon: ShieldAlert,
    color: "text-rose-700",
    badgeBg: "bg-rose-50 border-rose-200",
  },
  {
    id: "forensic-science",
    name: "Forensic Science",
    desc: "Physical evidence analysis, DNA phenotyping, CFSL standards, ballistics, toxicology.",
    icon: Microscope,
    color: "text-cyan-700",
    badgeBg: "bg-cyan-50 border-cyan-200",
  },
  {
    id: "forensic-psychology",
    name: "Forensic Psychology",
    desc: "Competency to stand trial, eyewitness reliability, interrogation trauma, memory.",
    icon: Brain,
    color: "text-purple-700",
    badgeBg: "bg-purple-50 border-purple-200",
  },
  {
    id: "law",
    name: "Law",
    desc: "Doctrinal analysis of BNS, BSA, comparative criminal law, constitutional rights.",
    icon: Landmark,
    color: "text-sky-700",
    badgeBg: "bg-sky-50 border-sky-200",
  },
  {
    id: "sociology",
    name: "Sociology",
    desc: "Societal structures, caste, class, community marginalization, carceral dynamics.",
    icon: Users,
    color: "text-emerald-700",
    badgeBg: "bg-emerald-50 border-emerald-200",
  },
  {
    id: "victimology",
    name: "Victimology",
    desc: "Victim compensation frameworks, secondary trauma, witness protection schemes.",
    icon: HeartHandshake,
    color: "text-teal-700",
    badgeBg: "bg-teal-50 border-teal-200",
  },
  {
    id: "penology",
    name: "Penology",
    desc: "Punishment philosophies, sentencing guidelines, death penalty jurisprudence.",
    icon: Gavel,
    color: "text-orange-700",
    badgeBg: "bg-orange-50 border-orange-200",
  },
  {
    id: "corrections",
    name: "Corrections",
    desc: "Central and District prison administration, undertrial pendency, rehabilitation.",
    icon: Building2,
    color: "text-violet-700",
    badgeBg: "bg-violet-50 border-violet-200",
  },
  {
    id: "crime-prevention",
    name: "Crime Prevention",
    desc: "Situational crime prevention, urban surveillance architecture, early intervention.",
    icon: ShieldCheck,
    color: "text-green-700",
    badgeBg: "bg-green-50 border-green-200",
  },
  {
    id: "cybercrime",
    name: "Cybercrime",
    desc: "Mule account syndicates, OTP phishing call centres, Section 63 BSA compliance.",
    icon: Terminal,
    color: "text-red-700",
    badgeBg: "bg-red-50 border-red-200",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    desc: "Critical information infrastructure, cryptographic evidentiary logs, cloud jurisdiction.",
    icon: Lock,
    color: "text-blue-700",
    badgeBg: "bg-blue-50 border-blue-200",
  },
  {
    id: "behavioural-sciences",
    name: "Behavioural Sciences",
    desc: "Cognitive biases in judicial sentencing, decision-making among law officers.",
    icon: Activity,
    color: "text-fuchsia-700",
    badgeBg: "bg-fuchsia-50 border-fuchsia-200",
  },
  {
    id: "criminal-investigation",
    name: "Criminal Investigation",
    desc: "Crime scene management, digital device extraction, forensic audit of financial crimes.",
    icon: Search,
    color: "text-yellow-800",
    badgeBg: "bg-yellow-50 border-yellow-200",
  },
  {
    id: "organised-crime",
    name: "Organised Crime",
    desc: "Transnational narcotics syndicates, hawala money laundering, MCOCA statutory laws.",
    icon: Network,
    color: "text-amber-800",
    badgeBg: "bg-amber-100 border-amber-200",
  },
  {
    id: "terrorism-extremism",
    name: "Terrorism & Extremism",
    desc: "Counter-terror jurisprudence, digital radicalization, terror financing, UAPA review.",
    icon: AlertTriangle,
    color: "text-rose-800",
    badgeBg: "bg-rose-100 border-rose-200",
  },
  {
    id: "juvenile-justice",
    name: "Juvenile Justice",
    desc: "Child in conflict with law assessments, JJB processes, diversionary rehabilitation.",
    icon: Smile,
    color: "text-lime-800",
    badgeBg: "bg-lime-50 border-lime-200",
  },
  {
    id: "gender-crime",
    name: "Gender & Crime",
    desc: "Special POCSO trial mechanisms, gender-based violence, domestic violence remedies.",
    icon: Heart,
    color: "text-pink-700",
    badgeBg: "bg-pink-50 border-pink-200",
  },
  {
    id: "emerging-criminality",
    name: "Emerging Criminality",
    desc: "Deepfake fraud, generative AI forensic forgery, cryptocurrency scam containment.",
    icon: Sparkles,
    color: "text-sky-800",
    badgeBg: "bg-sky-100 border-sky-200",
  },
];

// Arched oval wave path spanning 4700px total distance
// Snug fit: crest at y = 85, dips at y = 195 within viewBox height 270
const BELT_PATH =
  "M -250 195 C 150 195, 400 85, 650 85 C 900 85, 1150 195, 1550 195 L 4450 195";
const BELT_DURATION = 65; // Seconds for full cycle
const BELT_RIDERS = SCOPE_CARDS_20.length; // 20 cards

export default function Feature() {
  const step = BELT_DURATION / BELT_RIDERS;
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseEnter = () => {
    try {
      svgRef.current?.pauseAnimations();
    } catch {
      // Fallback
    }
  };

  const handleMouseLeave = () => {
    try {
      svgRef.current?.unpauseAnimations();
    } catch {
      // Fallback
    }
  };

  return (
    <section className="w-full px-4 py-4 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div
          className="relative w-full overflow-hidden rounded-[28px] border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 sm:p-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Subtle Ambient Light Glows */}
          <div className="absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

          {/* 1. TOP HEADING (Light theme typography) */}
          <div className="relative z-10 text-center max-w-3xl mx-auto pt-1 pb-1">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Interdisciplinary Pillars: Law, Forensics &amp; Society
            </h2>
          </div>

          {/* 2. OVAL TRAVELING CARDS TRACK (Light Mode) */}
          <div className="relative h-[230px] sm:h-[250px] w-full [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] my-0">
            <svg
              ref={svgRef}
              viewBox="0 0 1300 270"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full motion-reduce:hidden"
            >
              {/* Subtle curved orbital guide track */}
              <path
                d="M -250 195 C 150 195, 400 85, 650 85 C 900 85, 1150 195, 1550 195"
                fill="none"
                stroke="rgba(0,0,0,0.06)"
                strokeDasharray="6 8"
                strokeWidth="1.5"
              />

              {SCOPE_CARDS_20.map((card, i) => {
                const Icon = card.icon;
                return (
                  <g key={card.id}>
                    <animateMotion
                      dur={`${BELT_DURATION}s`}
                      begin={`${-i * step}s`}
                      repeatCount="indefinite"
                      calcMode="linear"
                      rotate="auto"
                      path={BELT_PATH}
                    />
                    <foreignObject
                      x="-92"
                      y="-60"
                      width="185"
                      height="120"
                      className="overflow-visible"
                    >
                      <div
                        className="group relative flex h-[120px] w-[185px] flex-col justify-between rounded-[14px] border border-slate-200/90 bg-white p-3 text-left shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:scale-[1.03] select-none block"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <div
                              className={cn(
                                "flex size-7 items-center justify-center rounded-lg border",
                                card.badgeBg,
                              )}
                            >
                              <Icon className={cn("size-3.5", card.color)} />
                            </div>
                            <span className="font-mono text-[9px] font-semibold text-slate-400">
                              #{String(i + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <h4 className="mt-2 text-[12.5px] font-bold tracking-tight text-slate-900 line-clamp-1 font-sans">
                            {card.name}
                          </h4>

                          <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-slate-600 font-sans">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>

            {/* Accessible Fallback for Reduced Motion */}
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden items-center justify-start gap-3 px-4 motion-reduce:flex overflow-x-auto"
            >
              {SCOPE_CARDS_20.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={`reduced-${card.id}`}
                    className="flex h-[120px] w-[180px] shrink-0 flex-col justify-between rounded-[14px] border border-slate-200 bg-white p-3 text-left shadow-sm select-none"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div
                          className={cn(
                            "flex size-7 items-center justify-center rounded-lg border",
                            card.badgeBg,
                          )}
                        >
                          <Icon className={cn("size-3.5", card.color)} />
                        </div>
                        <span className="font-mono text-[9px] font-semibold text-slate-400">
                          #{String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h4 className="mt-2 text-[12.5px] font-bold text-slate-900 line-clamp-1">
                        {card.name}
                      </h4>
                      <p className="mt-0.5 text-[10px] leading-snug text-slate-600 line-clamp-2">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. BOTTOM DESCRIPTION & EXPLORE BUTTON (Light Theme) */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-3.5 max-w-3xl mx-auto pt-3 border-t border-slate-200/90">
            <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
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
