export type DisciplinaryLens = 
  | 'all' 
  | 'legal' 
  | 'forensic' 
  | 'psychological' 
  | 'sociological' 
  | 'policing' 
  | 'victimology';

export type ArticleType = 
  | 'Original Empirical Research'
  | 'Theoretical Synthesis'
  | 'Methodological Innovation'
  | 'Forensic Case Commentary'
  | 'Systematic Review'
  | 'Policy & Practice Brief';

export interface SciteMetrics {
  supporting: number;
  mentioning: number;
  contrasting: number;
  total: number;
}

export interface Citation {
  id: string;
  num: number;
  authors: string;
  title: string;
  year: number;
  journal: string;
  volume?: string;
  doi: string;
  scite: SciteMetrics;
  excerpt: string;
  contextType: 'supporting' | 'mentioning' | 'contrasting';
}

export interface FigureData {
  id: string;
  label: string;
  title: string;
  caption: string;
  type: 'chart' | 'timeline' | 'map' | 'diagram';
  metrics?: { label: string; value: string | number; change?: string }[];
  timelineEvents?: { phase: string; date: string; details: string; status: 'verified' | 'disputed' | 'critical' }[];
  tableData?: { headers: string[]; rows: (string | number)[][] };
}

export interface Annotation {
  id: string;
  author: string;
  orcid: string;
  affiliation: string;
  role: string;
  date: string;
  paragraphId: string;
  text: string;
  lens: DisciplinaryLens;
}

export interface DiffChange {
  paragraphId: string;
  type: 'added' | 'removed' | 'modified';
  oldText?: string;
  newText: string;
  justification: string;
}

export interface DiffRevision {
  version: string;
  date: string;
  summary: string;
  changes: DiffChange[];
}

export interface PolicyMatrix {
  lawEnforcement: string[];
  judiciary: string[];
  policyMakers: string[];
}

export interface Author {
  name: string;
  orcid: string;
  affiliation: string;
  ror?: string;
  creditRoles: string[];
  corresponding?: boolean;
}

export interface ArticleParagraph {
  id: string;
  text: string;
  lensTag?: DisciplinaryLens;
  citationIds?: number[];
  figureId?: string;
  highlightText?: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  subsections?: {
    id: string;
    title: string;
    paragraphs: ArticleParagraph[];
  }[];
  paragraphs: ArticleParagraph[];
}

export interface Article {
  id: string;
  elocationId: string;
  volume: number;
  year: number;
  title: string;
  authors: Author[];
  abstract: string;
  laySummary: string;
  keywords: string[];
  discipline: DisciplinaryLens;
  secondaryDisciplines: DisciplinaryLens[];
  articleType: ArticleType;
  doi: string;
  publishedDate: string;
  receivedDate: string;
  revisedDate: string;
  acceptedDate: string;
  readingTime: number;
  audioBriefMinutes: number;
  audioTitle: string;
  metrics: {
    views: number;
    downloads: number;
    altmetric: number;
    citations: number;
  };
  scite: SciteMetrics;
  policyMatrix: PolicyMatrix;
  sections: ArticleSection[];
  citations: Citation[];
  figures: FigureData[];
  annotations: Annotation[];
  revisions?: DiffRevision;
  featured?: boolean;
}

export interface BoardMember {
  id: string;
  name: string;
  role: 'Editor-in-Chief' | 'Senior Associate Editor' | 'Section Editor' | 'Editorial Advisory Board';
  discipline: string;
  affiliation: string;
  rorId?: string;
  orcid: string;
  bio: string;
  editorialFocus: string;
  recentPublications: string[];
}

export interface ConceptNode {
  id: string;
  label: string;
  category: 'Law' | 'Forensics' | 'Psychology' | 'Sociology' | 'Cybercrime' | 'Policing';
  articlesCount: number;
  x?: number;
  y?: number;
}

export interface ConceptEdge {
  source: string;
  target: string;
  strength: number;
}

export interface SubmissionDraft {
  id: string;
  trackingNumber: string;
  title: string;
  abstract: string;
  primaryLens: DisciplinaryLens;
  secondaryLenses: DisciplinaryLens[];
  articleType: ArticleType;
  authorName: string;
  authorEmail: string;
  authorOrcid: string;
  authorAffiliation: string;
  creditRoles: string[];
  ethicsApproved: boolean;
  conflictDeclared: boolean;
  openDataAccessAccepted: boolean;
  fileName: string;
  fileSize: string;
  submittedAt: string;
  status: 'Submitted' | 'Editorial Triage' | 'Under Peer Review' | 'Revisions Required' | 'Accepted' | 'Published';
  currentStageNumber: number; // 1 to 6
}
