export interface ReviewerProfile {
  id: string;
  name: string;
  designation: string;
  institution: string;
  expertise: string[];
  activeReviews: number;
  completedReviews: number;
  status: 'Available' | 'Busy' | 'On Leave';
  email: string;
}

export const REVIEWERS_ROSTER: ReviewerProfile[] = [
  {
    id: 'rev-01',
    name: 'Dr. J. R. Gaur',
    designation: 'Lifetime Professor & Emeritus Resource Faculty',
    institution: 'Rashtriya Raksha University',
    expertise: ['Forensic Ballistics', 'Crime Scene Reconstruction', 'BSA Section 63'],
    activeReviews: 1,
    completedReviews: 14,
    status: 'Available',
    email: 'jr.gaur@rru.ac.in'
  },
  {
    id: 'rev-02',
    name: 'Dr. Mahesh A. Tripathi',
    designation: 'Associate Professor',
    institution: 'Rashtriya Raksha University',
    expertise: ['Criminal Criminology', 'Correctional Administration', 'BNSS Due Process'],
    activeReviews: 2,
    completedReviews: 9,
    status: 'Busy',
    email: 'mahesh.tripathi@rru.ac.in'
  },
  {
    id: 'rev-03',
    name: 'Dr. Dimple T. Raval',
    designation: 'Associate Professor of Law',
    institution: 'Rashtriya Raksha University',
    expertise: ['Cyber Jurisprudence', 'Digital Evidence Certification', 'IT Act 65B/BSA'],
    activeReviews: 0,
    completedReviews: 11,
    status: 'Available',
    email: 'dimple.raval@rru.ac.in'
  },
  {
    id: 'rev-04',
    name: 'Dr. Sheetal Arora',
    designation: 'Assistant Professor (Senior Scale)',
    institution: 'Sardar Patel University of Police (SPUP)',
    expertise: ['Criminology', 'Victimology', 'Gender-Based Crime Dynamics'],
    activeReviews: 1,
    completedReviews: 8,
    status: 'Available',
    email: 'sheetal.arora@policeuniversity.ac.in'
  },
  {
    id: 'rev-05',
    name: 'Dr. Sushil Goswami',
    designation: 'Head, External Affairs & Assistant Professor of Law',
    institution: 'Gujarat National Law University (GNLU)',
    expertise: ['Bharatiya Nyaya Sanhita (BNS)', 'Criminal Jurisprudence', 'Statutory Interpretation'],
    activeReviews: 2,
    completedReviews: 16,
    status: 'Available',
    email: 'sgoswami@gnlu.ac.in'
  },
  {
    id: 'rev-06',
    name: 'Mohit Charan',
    designation: 'Assistant Professor',
    institution: 'Hemvati Nandan Bahuguna Garhwal University',
    expertise: ['Sociology of Crime', 'Penology', 'Undertrial Incarceration Studies'],
    activeReviews: 1,
    completedReviews: 6,
    status: 'Available',
    email: 'm.charan@hnbgu.ac.in'
  },
  {
    id: 'rev-07',
    name: 'Dr. Asif Hasan',
    designation: 'Assistant Professor, Department of Psychology',
    institution: 'Aligarh Muslim University (AMU)',
    expertise: ['Forensic Psychology', 'Criminal Profiling', 'Eyewitness Reliability'],
    activeReviews: 0,
    completedReviews: 7,
    status: 'Available',
    email: 'asif.hasan@amu.ac.in'
  }
];

export const onRequestGet = async (_context: { request: Request; env: any }): Promise<Response> => {
  return new Response(
    JSON.stringify({
      success: true,
      reviewers: REVIEWERS_ROSTER,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
