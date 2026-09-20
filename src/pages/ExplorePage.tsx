import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Sparkles, 
  Layers, 
  Scale, 
  Microscope, 
  Brain, 
  Landmark, 
  ShieldAlert, 
  HeartHandshake, 
  ArrowRight, 
  Search, 
  Tag, 
  FileText 
} from 'lucide-react';
import { MOCK_CONCEPT_NODES, MOCK_CONCEPT_EDGES, MOCK_ARTICLES } from '../data/mockJournalData';
import { DisciplinaryLens, ConceptNode } from '../types/journal';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'lenses';
  const initialConcept = searchParams.get('concept') || '';

  const [selectedLens, setSelectedLens] = useState<DisciplinaryLens>(
    (searchParams.get('lens') as DisciplinaryLens) || 'all'
  );
  const [selectedConcept, setSelectedConcept] = useState<ConceptNode | null>(
    MOCK_CONCEPT_NODES.find(c => c.label.toLowerCase() === initialConcept.toLowerCase()) || MOCK_CONCEPT_NODES[0]
  );
  const [searchQuery, setSearchQuery] = useState('');

  const lensList: { id: DisciplinaryLens; title: string; desc: string; icon: React.ReactNode; color: string }[] = [
    { 
      id: 'legal', 
      title: 'Law & Legal Studies', 
      desc: 'Statutory interpretations, evidentiary admissibility, constitutional due process, trial procedure, and comparative human rights jurisprudence.',
      icon: <Scale className="w-5 h-5" />, 
      color: 'border-blue-500 text-blue-600 dark:text-blue-400' 
    },
    { 
      id: 'forensic', 
      title: 'Forensic Science & Pathology', 
      desc: 'Physical evidence, digital forensics, algorithmic validation, DNA phenotyping, toxicology, chain-of-custody protocols, and epistemic reliability.',
      icon: <Microscope className="w-5 h-5" />, 
      color: 'border-red-500 text-red-600 dark:text-red-400' 
    },
    { 
      id: 'psychological', 
      title: 'Behavioral Psychology & Psychiatry', 
      desc: 'Offender behavioral patterns, cognitive confirmation heuristics, eyewitness reliability, trauma psychology, and forensic risk assessments.',
      icon: <Brain className="w-5 h-5" />, 
      color: 'border-purple-500 text-purple-600 dark:text-purple-400' 
    },
    { 
      id: 'sociological', 
      title: 'Sociology & Criminology', 
      desc: 'Structural inequality, carceral sociology, penology, crime displacement, institutional power dynamics, and societal harm production.',
      icon: <Landmark className="w-5 h-5" />, 
      color: 'border-emerald-500 text-emerald-600 dark:text-emerald-400' 
    },
    { 
      id: 'policing', 
      title: 'Policing & Investigative Practice', 
      desc: 'Tactical law enforcement deployment, surveillance technologies, investigative ethics, police accountability, and community liaison models.',
      icon: <ShieldAlert className="w-5 h-5" />, 
      color: 'border-amber-500 text-amber-600 dark:text-amber-400' 
    },
    { 
      id: 'victimology', 
      title: 'Victimology & Restorative Justice', 
      desc: 'Secondary victimisation, restorative conferencing, trauma-informed procedural justice, and institutional redress for crime survivors.',
      icon: <HeartHandshake className="w-5 h-5" />, 
      color: 'border-rose-500 text-rose-600 dark:text-rose-400' 
    },
  ];

  const filteredArticles = MOCK_ARTICLES.filter(art => {
    const matchesLens = selectedLens === 'all' || art.discipline === selectedLens || art.secondaryDisciplines.includes(selectedLens);
    const matchesSearch = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLens && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-[var(--border-subtle)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase font-bold text-[var(--accent-gold)] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Interdisciplinary Discovery Engine
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-1">
            The Rashomon Explorer
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-2xl leading-relaxed">
            Examine crime and justice research through distinct disciplinary perspectives or discover hidden conceptual connections across our interactive knowledge network.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center rounded-lg border border-[var(--border-subtle)] p-0.5 bg-[var(--bg-card)]">
          <button
            onClick={() => setSearchParams({ tab: 'lenses' })}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'lenses'
                ? 'bg-[var(--accent-navy)] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Disciplinary Lenses</span>
          </button>

          <button
            onClick={() => setSearchParams({ tab: 'graph' })}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'graph'
                ? 'bg-[var(--accent-navy)] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Concept Knowledge Graph</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: LENSES VIEW */}
      {activeTab === 'lenses' && (
        <div className="space-y-10">
          {/* Lens Cards Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lensList.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedLens(selectedLens === item.id ? 'all' : item.id)}
                className={`p-5 rounded-xl border transition-all cursor-pointer bg-[var(--bg-card)] shadow-xs ${
                  selectedLens === item.id
                    ? 'border-[var(--accent-gold)] ring-2 ring-[var(--accent-gold)]/20 shadow-md'
                    : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-[var(--bg-card-hover)] ${item.color}`}>
                    {item.icon}
                  </div>
                  {selectedLens === item.id && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--accent-gold)] text-slate-950 uppercase">
                      Active Lens
                    </span>
                  )}
                </div>
                <h3 className="font-serif font-bold text-base text-[var(--text-primary)] mt-3">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Filtered Articles Section */}
          <div className="space-y-4 pt-4 border-t border-[var(--border-subtle)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="font-serif font-bold text-xl text-[var(--text-primary)]">
                {selectedLens === 'all' ? 'All Published Investigations' : `Scholarship Under: ${lensList.find(l => l.id === selectedLens)?.title}`}
                <span className="text-xs font-mono font-normal text-[var(--text-muted)] ml-2">
                  ({filteredArticles.length} papers)
                </span>
              </h2>

              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Filter by keyword..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map(art => (
                <div 
                  key={art.id}
                  className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col justify-between hover:border-[var(--accent-gold)] transition-colors shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2">
                      <span className="font-bold text-[var(--accent-gold)]">{art.elocationId}</span>
                      <span>{art.publishedDate}</span>
                    </div>
                    <Link to={`/article/${art.id}`}>
                      <h3 className="font-serif font-bold text-lg text-[var(--text-primary)] hover:text-[var(--accent-navy)] transition-colors leading-snug">
                        {art.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[var(--text-secondary)] mt-1.5">{art.authors.map(a => a.name).join(', ')}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-2 line-clamp-2 font-serif leading-relaxed">{art.abstract}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-600 font-bold">{art.scite.supporting} Supporting Citations</span>
                    <Link to={`/article/${art.id}`} className="font-sans font-semibold text-[var(--accent-navy)] hover:underline flex items-center gap-1">
                      <span>Full Paper</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: INTERACTIVE CONCEPT KNOWLEDGE GRAPH */}
      {activeTab === 'graph' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Graph Viewport (Col Span 8) */}
          <div className="lg:col-span-8 p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">
                  Force-Directed Conceptual Map
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Click any node to inspect connected criminological themes and linked research.
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                SVG Topology Engine
              </span>
            </div>

            {/* SVG Interactive Canvas */}
            <div className="relative w-full h-[460px] bg-[var(--bg-page)] rounded-xl border border-[var(--border-subtle)] overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 750 550">
                {/* Render Edges */}
                {MOCK_CONCEPT_EDGES.map((edge, idx) => {
                  const sourceNode = MOCK_CONCEPT_NODES.find(n => n.id === edge.source);
                  const targetNode = MOCK_CONCEPT_NODES.find(n => n.id === edge.target);
                  if (!sourceNode || !targetNode) return null;

                  const isEdgeActive = selectedConcept && (selectedConcept.id === edge.source || selectedConcept.id === edge.target);

                  return (
                    <line
                      key={idx}
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isEdgeActive ? '#C5A059' : '#CBD5E1'}
                      strokeWidth={isEdgeActive ? 2.5 : 1}
                      strokeDasharray={isEdgeActive ? 'none' : '3,3'}
                      className="transition-colors duration-300"
                    />
                  );
                })}

                {/* Render Nodes */}
                {MOCK_CONCEPT_NODES.map(node => {
                  const isSelected = selectedConcept?.id === node.id;
                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onClick={() => setSelectedConcept(node)}
                      className="cursor-pointer group"
                    >
                      <circle
                        r={isSelected ? 22 : 16}
                        fill={isSelected ? '#C5A059' : '#0F172A'}
                        stroke={isSelected ? '#F7F4EB' : '#64748B'}
                        strokeWidth={isSelected ? 3 : 1.5}
                        className="transition-all duration-300 group-hover:scale-110"
                      />
                      <text
                        y={isSelected ? 34 : 28}
                        textAnchor="middle"
                        fill="currentColor"
                        className={`text-[11px] font-sans font-semibold transition-all ${
                          isSelected ? 'font-bold text-[var(--accent-gold)]' : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Selected Concept Inspector (Col Span 4) */}
          <div className="lg:col-span-4 p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
            {selectedConcept ? (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                  <span className="font-mono text-[10px] uppercase font-bold text-[var(--accent-gold)]">
                    Concept Node Analysis
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-card-hover)] text-[var(--text-muted)]">
                    {selectedConcept.category} Track
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-[var(--text-primary)]">
                  {selectedConcept.label}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Referenced across <strong>{selectedConcept.articlesCount}</strong> peer-reviewed empirical studies and doctrinal commentaries in The Crime & Society Review.
                </p>

                <div className="pt-2">
                  <h4 className="font-mono text-[10px] uppercase font-bold text-[var(--text-muted)] mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[var(--accent-navy)]" /> Linked Benchmark Articles
                  </h4>
                  <div className="space-y-2">
                    {MOCK_ARTICLES.slice(0, 2).map(a => (
                      <Link
                        key={a.id}
                        to={`/article/${a.id}`}
                        className="block p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-hover)] hover:border-[var(--accent-navy)] transition-colors"
                      >
                        <div className="font-serif font-semibold text-xs text-[var(--text-primary)] leading-snug">
                          {a.title}
                        </div>
                        <div className="text-[10px] font-mono text-[var(--text-muted)] mt-1">
                          {a.elocationId} • {a.authors[0]?.name} et al.
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-[var(--text-muted)] text-xs">
                Select a concept node to view interdisciplinary linkages.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
