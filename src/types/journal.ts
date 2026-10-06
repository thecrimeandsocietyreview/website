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
  | 'Policy & Practice Brief'
  | 'Other'
  | string;

export interface AuthorSubmissionDetail {
  id?: string;
  fullName: string;
  email: string;
  designation?: string;
  affiliation: string;
  department?: string;
  cityCountry?: string;
  qualification?: string;
  orcid?: string;
  isCorresponding?: boolean;
  bio?: string;
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
  authorPhone?: string;
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
  authorMode?: 'manual' | 'upload';
  authorDetails?: AuthorSubmissionDetail[];
  authorInfoFileName?: string;
  authorInfoFileSize?: string;
  blindFileKey?: string;
  authorFileKey?: string;
  keywords?: string;
  editorMessage?: string;
  editorialDecisionNotes?: string;
  assignedReviewers?: string[];
}
