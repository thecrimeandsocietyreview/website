import { Article, BoardMember, ConceptNode, ConceptEdge, SubmissionDraft } from '../types/journal';

export const JOURNAL_METADATA = {
  name: "The Crime & Society Review",
  tagline: "Indian Journal of Interdisciplinary Criminology, Forensics & Criminal Law",
  subtagline: "Advancing evidence-informed scholarship on the Bharatiya Nyaya Sanhita (BNS), BNSS, BSA, forensic science, policing, and societal justice through the Rashomon Approach.",
  issnOnline: "2998-4122",
  issnPrint: "2998-4114",
  doiPrefix: "10.59821/csr",
  currentVolume: 1,
  currentYear: 2026,
  publicationModel: "Continuous Rolling Publication (UGC-CARE Category II Aligned • Immediate Version of Record)",
  license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
  indexingTargets: [
    "UGC-CARE List (Group II)",
    "Indian Citation Index (ICI)",
    "DOAJ",
    "Google Scholar",
    "Crossref",
    "National Science Library (CSIR-NIScPR)"
  ],
  ethicsStandard: "COPE Core Practices & ICMR National Ethical Guidelines Aligned",
};

export const MOCK_ARTICLES: Article[] = [
  {
    id: "e2026-0492",
    elocationId: "e10492",
    volume: 1,
    year: 2026,
    title: "The Rashomon Paradigm in Indian Criminal Jurisprudence: Reconciling Algorithmic Forensics with Article 21 Due Process and the Bharatiya Sakshya Adhiniyam (BSA, 2023)",
    authors: [
      {
        name: "Dr. Aarav Sengupta",
        orcid: "0000-0002-1825-0097",
        affiliation: "School of Forensic Sciences, National Forensic Sciences University (NFSU), Gandhinagar",
        ror: "https://ror.org/03nfsu01",
        creditRoles: ["Conceptualization", "Methodology", "Investigation", "Writing – original draft"],
        corresponding: true,
      },
      {
        name: "Hon. Justice (Retd.) Devendra Pathak",
        orcid: "0000-0003-4912-881X",
        affiliation: "Centre for Constitutional Criminal Justice, National Law University (NLU), Delhi",
        ror: "https://ror.org/05nlud02",
        creditRoles: ["Legal Doctrine", "Constitutional Supervision", "Writing – review & editing"],
      },
      {
        name: "Dr. Priya Raghavan",
        orcid: "0000-0001-9034-7721",
        affiliation: "Centre for Criminology & Justice, Tata Institute of Social Sciences (TISS), Mumbai",
        ror: "https://ror.org/02tiss99",
        creditRoles: ["Sociological Fieldwork", "Formal Analysis", "Data curation"],
      }
    ],
    abstract: "The enactment of the Bharatiya Sakshya Adhiniyam (BSA, 2023)—specifically the revamped electronic evidence mandates under Sections 61, 62, and 63—coincides with widespread adoption of automated algorithmic diagnostics and Automated Facial Recognition Systems (AFRS) across Indian state police departments. Applying the Rashomon Approach as an interdisciplinary prism, this empirical investigation evaluates how automated evidence is interpreted across three institutional domains in India: Forensic Science (probabilistic validation limits at CFSL and state FSLs), Constitutional Law (Article 21 fair trial guarantees, Article 20(3) right against self-incrimination, and the Puttaswamy privacy standard), and Policing Realities (NCRB crime mapping and automated predictive beat systems). Auditing 420 felony trials across Delhi, Maharashtra, and Karnataka (2021–2025), we reveal systemic non-compliance with hash-generation thresholds and persistent black-box evidentiary opacity. We formulate an Indian Forensic Due Process Charter to harmonize cutting-edge computational diagnostics with constitutional jurisprudence.",
    laySummary: "When Indian police and trial courts use computer software and AI algorithms to analyze CCTV footage, mobile data, or biometric matches, different actors see different realities. Forensic scientists see mathematical probabilities; defense advocates see an unchallengeable black box violating fair trial rights; police officers see practical proof. This study examines over 400 Indian criminal trials under the new Bharatiya Sakshya Adhiniyam (BSA 2023) and proposes clear, binding rules for High Courts and trial judges to ensure electronic and algorithmic evidence is fair, transparent, and legally verified.",
    keywords: [
      "Bharatiya Sakshya Adhiniyam",
      "Section 63 BSA",
      "Article 21 Constitution of India",
      "Algorithmic Forensics",
      "Digital Evidence Certification",
      "Selvi Doctrine",
      "Puttaswamy Precedent",
      "Indian Police Reforms"
    ],
    discipline: "forensic",
    secondaryDisciplines: ["legal", "policing", "sociological"],
    articleType: "Original Empirical Research",
    doi: "10.59821/csr.2026.10492",
    publishedDate: "2026-03-14",
    receivedDate: "2025-11-04",
    revisedDate: "2026-01-22",
    acceptedDate: "2026-02-28",
    readingTime: 18,
    audioBriefMinutes: 3.5,
    audioTitle: "3-Minute Executive Scholar Briefing: Algorithmic Evidence, Due Process & the BSA 2023",
    metrics: {
      views: 4210,
      downloads: 1480,
      altmetric: 82,
      citations: 21,
    },
    scite: {
      supporting: 17,
      mentioning: 4,
      contrasting: 1,
      total: 22,
    },
    policyMatrix: {
      lawEnforcement: [
        "Ensure all state police cyber cells implement mandatory cryptographic SHA-256 hash generation at the exact moment of device seizure under Section 105 BNSS.",
        "Prohibit reliance on unverified proprietary facial recognition alerts as sole substantive grounds for Section 35 BNSS arrests without independent corroboration.",
        "Mandate state FSL and CFSL examiners to submit transparent calibration variance reports alongside Section 63 BSA electronic certificates."
      ],
      judiciary: [
        "Apply the Supreme Court's Arjun Panditrao Khotkar standard strictly under Section 63 of the BSA 2023, disallowing oral secondary evidence when cryptographic integrity is contested.",
        "Order independent code inspection by an empanelled scientific referee when an accused demonstrates reasonable doubt regarding algorithmic bias or false match rates.",
        "Issue uniform trial guidelines under Article 21 ensuring that corporate trade secret privileges cannot override the accused's right to cross-examine algorithmic witnesses."
      ],
      policyMakers: [
        "Urge the Union Ministry of Home Affairs (MHA) to establish an Indian Forensic Evidence Quality Standards Council with statutory oversight over private forensic vendors.",
        "Amend the Bharatiya Sakshya Adhiniyam rules to provide standardized, statutory formats for digital chain-of-custody logs across all states.",
        "Fund state Legal Services Authorities (NALSA / SLSA) to create specialized digital forensics defense assistance units for indigent undertrial prisoners."
      ]
    },
    sections: [
      {
        id: "sec-intro",
        title: "1. Introduction: Epistemic Clashes in the Era of Indian Criminal Law Reforms",
        paragraphs: [
          {
            id: "p1",
            text: "The transition from the colonial Indian Evidence Act of 1872 to the Bharatiya Sakshya Adhiniyam, 2023 (BSA) marks a profound structural reimagining of evidentiary proof in Indian courtrooms. At the heart of this transformation is the statutory elevation of digital, electronic, and automated algorithmic records to primary evidential status under Section 61 and Section 63 of the BSA.",
            lensTag: "legal",
            citationIds: [1, 2]
          },
          {
            id: "p2",
            text: "Yet, when an artificial intelligence facial recognition system or automated cyber pattern scanner flags a suspect, the Indian criminal justice ecosystem encounters what Akira Kurosawa captured as the Rashomon Effect: multiple constitutional stakeholders perceive and testify to fundamentally contradictory epistemic realities.",
            lensTag: "sociological",
            citationIds: [3]
          },
          {
            id: "p3",
            text: "To an investigating officer in the Delhi Police or Mumbai Crime Branch, an algorithmic match represents an objective, scientific shortcut to satisfy the stringent arrest thresholds under Section 35 of the Bharatiya Nagarik Suraksha Sanhita (BNSS). To a defense advocate and human rights jurist, the same algorithmic score represents an unconstitutional black-box that impairs Article 21 due process and vitiates the right to fair cross-examination.",
            lensTag: "policing",
            citationIds: [4, 5]
          }
        ]
      },
      {
        id: "sec-rashomon",
        title: "2. The Rashomon Framework in Indian Courtrooms: Multi-Disciplinary Triage",
        paragraphs: [
          {
            id: "p4",
            text: "The Crime & Society Review’s foundational Rashomon Approach demonstrates that the veracity of algorithmic evidence cannot be settled by legal doctrine alone, nor by computational claims in isolation. In the study of criminal trials, forensic validation, constitutional guarantees, and policing ground realities operate in dialectical tension.",
            lensTag: "forensic",
            citationIds: [6]
          },
          {
            id: "p5",
            text: "Our audit of 420 felony trials (2021–2025) across Sessions Courts in Delhi, Bengaluru, and Mumbai reveals that in 81.6% of cyber and forensic cases, electronic evidence certificates were issued as boilerplate mechanical forms without accompanying hash verification logs, leaving judicial magistrates without tools to detect post-seizure evidentiary manipulation.",
            lensTag: "forensic",
            figureId: "fig-1",
            citationIds: [7]
          }
        ]
      },
      {
        id: "sec-evidence",
        title: "3. Constitutional Scrutiny: Selvi, Puttaswamy, and Article 20(3) Boundaries",
        paragraphs: [
          {
            id: "p6",
            text: "The Supreme Court of India in Selvi v. State of Karnataka (2010) set an unyielding constitutional boundary: scientific and neuro-forensic techniques cannot be used to compel testimonial responses without offending Article 20(3) and the dignity guarantees of Article 21. When automated algorithms infer subjective culpability or behavioral risk scores, this constitutional prohibition is directly implicated.",
            lensTag: "legal",
            citationIds: [8]
          },
          {
            id: "p7",
            text: "Furthermore, under Justice K.S. Puttaswamy v. Union of India (2017), state surveillance and automated biometric processing must satisfy the rigorous three-pronged test of legality, legitimate state aim, and proportionality. Unregulated algorithmic matching in urban policing fails the proportionality standard.",
            lensTag: "psychological",
            figureId: "fig-2",
            citationIds: [9, 10]
          }
        ]
      },
      {
        id: "sec-synthesis",
        title: "4. An Indian Forensic Due Process Charter",
        paragraphs: [
          {
            id: "p8",
            text: "To reconcile technological policing with constitutional justice, we formulate a 3-point Indian Forensic Due Process Charter: (1) Mandatory Pre-Trial Source Code Disclosures in High-Stakes Trials; (2) Standardized Cryptographic Hash Checklists under Section 63 BSA; and (3) Mandatory Inter-Laboratory Blind Validation at accredited Central Forensic Science Laboratories (CFSL).",
            lensTag: "legal",
            citationIds: [11]
          }
        ]
      }
    ],
    citations: [
      {
        id: "cit-1",
        num: 1,
        authors: "Law Commission of India",
        title: "Report No. 277: Wrongful Prosecution (Miscarriage of Justice): Legal Remedies",
        year: 2018,
        journal: "Government of India Official Publications",
        volume: "Rep. 277",
        doi: "10.59821/lci.rep277",
        scite: { supporting: 14, mentioning: 3, contrasting: 0, total: 17 },
        excerpt: "Documenting how inadequate forensic protocols and unverified police evidence contribute directly to wrongful convictions in trial courts.",
        contextType: "supporting"
      },
      {
        id: "cit-2",
        num: 2,
        authors: "Supreme Court of India",
        title: "Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal & Ors., (2020) 7 SCC 1",
        year: 2020,
        journal: "Supreme Court Cases",
        volume: "(2020) 7 SCC 1",
        doi: "10.59821/scc.2020.7.1",
        scite: { supporting: 84, mentioning: 22, contrasting: 1, total: 107 },
        excerpt: "Settles the mandatory requirement of electronic certificates under Section 65B (now Section 63 BSA) as an indispensable condition precedent for admitting secondary electronic records.",
        contextType: "supporting"
      },
      {
        id: "cit-3",
        num: 3,
        authors: "Bureau of Police Research and Development (BPR&D)",
        title: "National Compendium on Modern Forensic Tools & Standard Operating Procedures",
        year: 2023,
        journal: "Ministry of Home Affairs, New Delhi",
        volume: "Vol. 6",
        doi: "10.59821/bprd.2023.06",
        scite: { supporting: 19, mentioning: 6, contrasting: 0, total: 25 },
        excerpt: "Highlights the acute deficit of trained cyber forensic examiners across state-level forensic science laboratories in India.",
        contextType: "supporting"
      },
      {
        id: "cit-4",
        num: 4,
        authors: "Supreme Court of India",
        title: "D.K. Basu v. State of West Bengal, (1997) 1 SCC 416",
        year: 1997,
        journal: "Supreme Court Cases",
        volume: "(1997) 1 SCC 416",
        doi: "10.59821/scc.1997.1.416",
        scite: { supporting: 142, mentioning: 35, contrasting: 0, total: 177 },
        excerpt: "Foundational constitutional arrest guidelines designed to prevent custodial violence and ensure transparent police arrest documentation.",
        contextType: "supporting"
      },
      {
        id: "cit-5",
        num: 5,
        authors: "Sengupta, A. & Rao, B. V.",
        title: "Chain of Custody Failures in Digital Evidence: An Empirical Analysis of Indian High Court Decisions (2015–2024)",
        year: 2024,
        journal: "Indian Journal of Criminology & Criminalistics",
        volume: "45(2), pp. 88–104",
        doi: "10.59821/ijcc.2024.45.2.88",
        scite: { supporting: 22, mentioning: 5, contrasting: 0, total: 27 },
        excerpt: "Demonstrates that 64% of electronic evidence acquittals in Indian High Courts stemmed from improper hash generation and chain-of-custody lapses.",
        contextType: "supporting"
      },
      {
        id: "cit-6",
        num: 6,
        authors: "Supreme Court of India",
        title: "Selvi & Ors. v. State of Karnataka, (2010) 7 SCC 263",
        year: 2010,
        journal: "Supreme Court Cases",
        volume: "(2010) 7 SCC 263",
        doi: "10.59821/scc.2010.7.263",
        scite: { supporting: 96, mentioning: 18, contrasting: 0, total: 114 },
        excerpt: "Landmark ruling striking down involuntary narco-analysis, polygraph, and brain mapping as unconstitutional infringements of Article 20(3) and personal liberty.",
        contextType: "supporting"
      },
      {
        id: "cit-7",
        num: 7,
        authors: "Supreme Court of India",
        title: "Justice K.S. Puttaswamy (Retd.) v. Union of India, (2017) 10 SCC 1",
        year: 2017,
        journal: "Supreme Court Cases",
        volume: "(2017) 10 SCC 1",
        doi: "10.59821/scc.2017.10.1",
        scite: { supporting: 180, mentioning: 45, contrasting: 2, total: 227 },
        excerpt: "Affirms the fundamental right to privacy under Article 21, establishing strict proportionality tests for automated biometric processing.",
        contextType: "supporting"
      },
      {
        id: "cit-8",
        num: 8,
        authors: "National Crime Records Bureau (NCRB)",
        title: "Crime in India 2023: Statistics on Cyber Crimes, Forensics, and Trial Pendency",
        year: 2024,
        journal: "Ministry of Home Affairs, Government of India",
        volume: "Vol. 71",
        doi: "10.59821/ncrb.2023.cii",
        scite: { supporting: 35, mentioning: 12, contrasting: 1, total: 48 },
        excerpt: "Official statistical compendium recording a 24.2% annual escalation in registered cybercrimes alongside an 88% trial pendency rate.",
        contextType: "supporting"
      }
    ],
    figures: [
      {
        id: "fig-1",
        label: "Figure 1",
        title: "Electronic Evidence Invalidation Rates in Indian Sessions Courts (2021–2025)",
        caption: "Empirical analysis of 420 felony trials audited in Delhi, Maharashtra, and Karnataka. Shows the frequency of Section 65B / Section 63 BSA compliance rejections by trial courts.",
        type: "chart",
        metrics: [
          { label: "Trials Audited", value: 420 },
          { label: "Certificates Missing Hash Logs", value: "81.6%", change: "High vulnerability" },
          { label: "Judicial Rejection Rate", value: "34.2%", change: "+6.8% YoY" },
          { label: "Average Trial Pendency", value: "4.8 Yrs", change: "Sessions level" }
        ],
        tableData: {
          headers: ["Jurisdiction", "Trials Audited", "Section 63 Compliance", "Independent FSL Review", "Acquittal Due to Defective Hash"],
          rows: [
            ["Delhi Sessions Courts", "154", "38%", "18%", "24%"],
            ["Mumbai City Civil & Sessions", "142", "29%", "12%", "31%"],
            ["Bengaluru City Sessions", "124", "41%", "15%", "22%"]
          ]
        }
      },
      {
        id: "fig-2",
        label: "Figure 2",
        title: "The Indian Electronic Chain of Custody Protocol (Section 105 BNSS to Section 63 BSA)",
        caption: "Operational stages from device seizure at the crime scene to final judicial admission in Indian trial courts.",
        type: "timeline",
        timelineEvents: [
          { phase: "Stage 1: Seizure & Videography", date: "Crime Scene (IO & Panchas)", details: "Mandatory videography under Section 105 BNSS; device bagged in Faraday pouch with initial panchnama.", status: "verified" },
          { phase: "Stage 2: Cryptographic Hashing", date: "Police Cyber Cell", details: "SHA-256 hash generated; police copy created without altering master block state.", status: "disputed" },
          { phase: "Stage 3: State FSL Examination", date: "Forensic Science Laboratory", details: "Forensic extraction using write-blockers; analytical report prepared under Section 39 BSA.", status: "verified" },
          { phase: "Stage 4: Judicial Scrutiny", date: "Court of Sessions", details: "Court verifies compliance with Section 63 BSA and Arjun Panditrao Khotkar prerequisites.", status: "disputed" },
          { phase: "Stage 5: Final Admissibility", date: "Judgment Stage", details: "Court assesses corroborative value under Article 21 constitutional due process standards.", status: "verified" }
        ]
      }
    ],
    annotations: [
      {
        id: "ann-1",
        author: "Adv. Meera Swaminathan",
        orcid: "0000-0002-4411-9012",
        affiliation: "Supreme Court of India / National Law School of India University (NLSIU)",
        role: "Verified Advocate & Scholar",
        date: "2026-03-16",
        paragraphId: "p1",
        text: "The authors accurately pinpoint the practical challenge in Section 63 BSA. While the provision modernizes electronic record admissibility, grassroots magistrates in mofussil courts still lack standardized cryptographic verification tools.",
        lens: "legal"
      },
      {
        id: "ann-2",
        author: "Dr. K. S. Rajadhyaksha",
        orcid: "0000-0001-8820-3341",
        affiliation: "Central Forensic Science Laboratory (CFSL), Hyderabad",
        role: "Senior Scientific Officer",
        date: "2026-03-18",
        paragraphId: "p5",
        text: "Important empirical data on hash-generation deficits. The Bureau of Police Research and Development (BPR&D) must expedite state-level training on mandatory videography under Section 105 BNSS.",
        lens: "forensic"
      }
    ],
    revisions: {
      version: "v1.1 (Approved Revision)",
      date: "2026-03-18",
      summary: "Updated Section 63 BSA electronic certificate compliance guidelines following the Delhi High Court's 2026 circular on digital hash verification in cyber fraud cases.",
      changes: [
        {
          paragraphId: "p5",
          type: "modified",
          oldText: "revealing a documented 74.2% boilerplate non-compliance rate in trial courts",
          newText: "revealing an escalated 81.6% boilerplate non-compliance rate in trial courts across metropolitan Sessions divisions",
          justification: "Incorporated finalized 2025 Karnataka and Maharashtra judicial audit data."
        }
      ]
    },
    featured: true
  },
  {
    id: "e2026-0493",
    elocationId: "e10493",
    volume: 1,
    year: 2026,
    title: "Mandatory Videography and Forensic Inspection Under Section 105 BNSS (2023): Capacity Constraints and Procedural Realities Across State Police Cadres",
    authors: [
      {
        name: "Prof. Meenakshi Sundaram",
        orcid: "0000-0003-1120-7798",
        affiliation: "National Law School of India University (NLSIU), Bengaluru",
        creditRoles: ["Conceptualization", "Doctrinal Analysis", "Writing"],
        corresponding: true,
      },
      {
        name: "Shri Vikramaditya Singh, IPS",
        orcid: "0000-0002-9401-2213",
        affiliation: "Bureau of Police Research and Development (BPR&D), New Delhi",
        creditRoles: ["Field Surveys", "Policing Methodology", "Statistical Analysis"],
      }
    ],
    abstract: "Section 105 of the Bharatiya Nagarik Suraksha Sanhita (BNSS, 2023) introduces a pioneering mandate: search, seizure, and crime scene investigation in offences punishable with seven years or more must be compulsorily recorded through audio-video electronic means. Through an extensive empirical survey of 1,240 investigating officers across Uttar Pradesh, Tamil Nadu, and Rajasthan, alongside 180 public prosecutors, this study analyzes the operational readiness of Indian police forces. While mandatory videography substantially curbs custodial tampering and fabricated recoveries under Section 27 IEA / Section 23 BSA, severe infrastructural deficits—such as unencrypted cloud storage, lack of timestamped body-worn cameras, and bandwidth bottlenecks in rural police stations—threaten evidential admissibility. We present an actionable state-level implementation framework for tamper-proof digital evidence archiving.",
    laySummary: "The new Bharatiya Nagarik Suraksha Sanhita (BNSS 2023) makes it compulsory for Indian police to video-record crime scene searches and seizures. But do police stations across India actually have the cameras, secure storage, and forensic personnel to follow this law? Our study of over 1,200 police officers across three states reveals major gaps in technology and training, and provides a clear practical roadmap for state governments to make digital crime scene recording work seamlessly.",
    keywords: ["Section 105 BNSS", "Mandatory Videography", "Crime Scene Forensics", "Indian Police Reforms", "Search and Seizure", "Custodial Integrity", "BPR&D Standards"],
    discipline: "policing",
    secondaryDisciplines: ["forensic", "legal", "sociological"],
    articleType: "Original Empirical Research",
    doi: "10.59821/csr.2026.10493",
    publishedDate: "2026-03-08",
    receivedDate: "2025-10-18",
    revisedDate: "2026-01-14",
    acceptedDate: "2026-02-20",
    readingTime: 15,
    audioBriefMinutes: 3.0,
    audioTitle: "3-Minute Executive Scholar Briefing: Making Section 105 BNSS Videography Work",
    metrics: {
      views: 3410,
      downloads: 1120,
      altmetric: 64,
      citations: 14,
    },
    scite: {
      supporting: 11,
      mentioning: 3,
      contrasting: 0,
      total: 14,
    },
    policyMatrix: {
      lawEnforcement: [
        "Issue standardized ruggedized mobile recording kits equipped with auto-hash generation to all Thana sub-inspectors.",
        "Establish secure district-level server nodes with automated air-gapped backup for crime scene videos."
      ],
      judiciary: [
        "Prescribe uniform judicial guidelines on handling unintentional video recording glitches without discarding genuine seizures."
      ],
      policyMakers: [
        "Allocate dedicated central modernization funds through the MHA specifically for BNSS electronic storage infrastructure."
      ]
    },
    sections: [
      {
        id: "sec-intro",
        title: "1. The Statutory Evolution from Paper Panchnama to Digital Recording",
        paragraphs: [
          {
            id: "p1",
            text: "For over a century, the Indian criminal justice process relied upon the handwritten panchnama to substantiate seizure of incriminating articles. The historic enactment of Section 105 of the Bharatiya Nagarik Suraksha Sanhita, 2023 replaces this paper-bound regime with mandatory audio-visual electronic recording.",
            lensTag: "policing",
            citationIds: [1]
          }
        ]
      }
    ],
    citations: [
      {
        id: "cit-1",
        num: 1,
        authors: "Ministry of Home Affairs (MHA)",
        title: "Standard Operating Procedures for Implementation of Criminal Law Reforms (BNS, BNSS, BSA)",
        year: 2024,
        journal: "Government of India Official Directive",
        volume: "No. 11011/2024",
        doi: "10.59821/mha.sop.2024",
        scite: { supporting: 28, mentioning: 6, contrasting: 0, total: 34 },
        excerpt: "Mandatory central directive governing videography protocols across all state and union territory police directorates.",
        contextType: "supporting"
      }
    ],
    figures: [],
    annotations: []
  },
  {
    id: "e2026-0494",
    elocationId: "e10494",
    volume: 1,
    year: 2026,
    title: "Cross-Border Cybercrime Seizures and Mule Bank Networks: Evaluating Section 107 BNSS, PMLA, and the MHA 1930 Portal Mechanisms",
    authors: [
      {
        name: "Adv. Rohan Deshmukh",
        orcid: "0000-0001-6540-8910",
        affiliation: "Chambers of Supreme Court Advocates, New Delhi",
        creditRoles: ["Legal Doctrine", "Appellate Case Review", "Writing"],
        corresponding: true,
      },
      {
        name: "Dr. Ananya Iyer",
        orcid: "0000-0002-3310-9428",
        affiliation: "Centre for Cyber Laws & Information Security, NALSAR University of Law, Hyderabad",
        creditRoles: ["Cyber Forensic Analysis", "Financial Crime Methodology"],
      }
    ],
    abstract: "The proliferation of transnational cyber fraud syndicates operating across Southeast Asia and targeting Indian retail banking infrastructure through mule bank accounts poses unprecedented challenges to criminal forfeiture. Investigating officers routinely utilize the National Cybercrime Reporting Portal (1930) and Section 107 BNSS (attachment of proceeds of crime) to freeze disputed bank accounts. However, this administrative freezing often paralyses legitimate small business accounts without procedural due process. Examining 85 writ petitions across High Courts in Delhi, Bombay, and Telangana (2022–2025), this paper analyzes the delicate balance between rapid recovery of stolen citizen funds and the constitutional protection of bona fide account holders under Article 300A.",
    laySummary: "When cyber scammers dupe innocent citizens, the police immediately freeze the bank accounts where the money travelled. But often, hundreds of innocent shopkeepers and merchants have their accounts locked for months because a scammer routed a tiny transaction through them. This paper investigates 85 High Court cases and offers a new judicial framework to freeze cyber-fraud proceeds swiftly without punishing innocent small business owners.",
    keywords: ["Cyber Fraud", "Mule Accounts", "Section 107 BNSS", "PMLA", "MHA 1930 Portal", "Article 300A", "Financial Forensics", "Indian Banking Cyber Law"],
    discipline: "legal",
    secondaryDisciplines: ["forensic", "policing"],
    articleType: "Theoretical Synthesis",
    doi: "10.59821/csr.2026.10494",
    publishedDate: "2026-02-28",
    receivedDate: "2025-09-12",
    revisedDate: "2025-12-20",
    acceptedDate: "2026-02-10",
    readingTime: 21,
    audioBriefMinutes: 4.0,
    audioTitle: "3-Minute Executive Scholar Briefing: Cyber Mule Accounts, 1930 Portal & Account Freezing Law",
    metrics: {
      views: 3820,
      downloads: 1250,
      altmetric: 48,
      citations: 16,
    },
    scite: {
      supporting: 12,
      mentioning: 4,
      contrasting: 0,
      total: 16,
    },
    policyMatrix: {
      lawEnforcement: [
        "Limit bank account freezing strictly to the disputed transaction quantum (lien marking) rather than debit-freezing entire commercial bank accounts.",
        "Implement real-time automated verification between the MHA 1930 Cyber Portal and nodal bank fraud officers to release innocent third-party accounts within 48 hours."
      ],
      judiciary: [
        "Direct Magistrates to exercise expedited scrutiny under Section 107 BNSS within 14 days of account attachment notices."
      ],
      policyMakers: [
        "Formulate a Reserve Bank of India (RBI) and Ministry of Home Affairs unified regulation governing cyber-fraud restitution."
      ]
    },
    sections: [
      {
        id: "sec-intro",
        title: "1. The Anatomy of Modern Transnational Cyber Frauds in India",
        paragraphs: [
          {
            id: "p1",
            text: "The rapid digitisation of financial transactions across India via the Unified Payments Interface (UPI) and mobile banking has been accompanied by a steep surge in organized cyber syndicates exploiting mule account layers.",
            lensTag: "legal",
            citationIds: [1]
          }
        ]
      }
    ],
    citations: [
      {
        id: "cit-1",
        num: 1,
        authors: "Indian Cyber Crime Coordination Centre (I4C)",
        title: "Strategic Overview of Transnational Digital Arrest and Mule Account Operations",
        year: 2024,
        journal: "Ministry of Home Affairs Special Report",
        volume: "Rep. 3",
        doi: "10.59821/i4c.mha.2024",
        scite: { supporting: 42, mentioning: 10, contrasting: 0, total: 52 },
        excerpt: "Comprehensive data detailing how transnational cyber syndicates recruit domestic mule bank accounts to siphon illicit capital.",
        contextType: "supporting"
      }
    ],
    figures: [],
    annotations: []
  },
  {
    id: "e2026-0495",
    elocationId: "e10495",
    volume: 1,
    year: 2026,
    title: "Secondary Victimisation in POCSO Courtrooms: Evaluating Support Person Protocols and Trauma-Informed Judicial Infrastructure Across India",
    authors: [
      {
        name: "Dr. Shailaja Trivedi",
        orcid: "0000-0002-7719-8430",
        affiliation: "Centre for Child Rights & Victimology, National Law University (NLU), Delhi",
        creditRoles: ["Courtroom Fieldwork", "Trauma Analysis", "Writing"],
        corresponding: true,
      },
      {
        name: "Prof. Rajeshwar Rao",
        orcid: "0000-0003-8890-1124",
        affiliation: "School of Social Work, Tata Institute of Social Sciences (TISS), Mumbai",
        creditRoles: ["Psychological Coding", "Statistical Evaluation"],
      }
    ],
    abstract: "The Protection of Children from Sexual Offences (POCSO) Act, 2012 embodies a progressive statutory vision designed to shield child victims from the intimidatory trauma of traditional adversarial criminal trials. Through an empirical audit of 280 Special POCSO Court trials across Delhi, Karnataka, and Uttar Pradesh, this study assesses the implementation of child-friendly court infrastructure, in-camera depositions, and the statutory role of Support Persons. Our findings demonstrate that in 44.2% of surveyed cases, child victims experienced acute secondary distress due to aggressive cross-examination, repetitive adjournment cycles, and lack of trained clinical child psychologists. We outline institutional reforms and mandatory sensitization protocols for Special Judges and Public Prosecutors to restore therapeutic justice in POCSO proceedings.",
    laySummary: "The POCSO Act was created to ensure that children who suffer abuse are protected from fear and harassment when testifying in court. But are Indian Special POCSO courts truly child-friendly? Our study of 280 trials across three states found that aggressive cross-examinations and delays still cause severe emotional distress to child victims. We provide a practical blueprint for courts, prosecutors, and child welfare committees to make courtrooms genuinely safe and trauma-free.",
    keywords: ["POCSO Act 2012", "Child-Friendly Courtrooms", "Secondary Victimisation", "Support Persons", "Trauma-Informed Justice", "Special POCSO Courts", "Indian Victimology"],
    discipline: "victimology",
    secondaryDisciplines: ["psychological", "legal", "sociological"],
    articleType: "Methodological Innovation",
    doi: "10.59821/csr.2026.10495",
    publishedDate: "2026-02-14",
    receivedDate: "2025-08-30",
    revisedDate: "2025-11-28",
    acceptedDate: "2026-01-30",
    readingTime: 16,
    audioBriefMinutes: 3.5,
    audioTitle: "3-Minute Executive Scholar Briefing: Eradicating Trauma in POCSO Courtrooms",
    metrics: {
      views: 3120,
      downloads: 980,
      altmetric: 56,
      citations: 11,
    },
    scite: {
      supporting: 9,
      mentioning: 2,
      contrasting: 0,
      total: 11,
    },
    policyMatrix: {
      lawEnforcement: [
        "Mandate that child victim statement recording under Section 183 BNSS occurs exclusively in child-friendly environments without police uniforms."
      ],
      judiciary: [
        "Enforce strict judicial gatekeeping against repetitive, suggestive, and intimidatory cross-examination questions in POCSO trials.",
        "Ensure Support Persons are appointed from empanelled psychiatric and social work bodies within 24 hours of FIR registration."
      ],
      policyMakers: [
        "Direct State Child Protection Societies (SCPS) to establish dedicated counseling and rehabilitation funds in every district."
      ]
    },
    sections: [
      {
        id: "sec-intro",
        title: "1. The Legislative Promise of the POCSO Framework",
        paragraphs: [
          {
            id: "p1",
            text: "Enacted to fulfill India's commitments under the UN Convention on the Rights of the Child, the POCSO Act established specialized child-friendly procedural standards to eliminate adversarial trauma.",
            lensTag: "victimology",
            citationIds: [1]
          }
        ]
      }
    ],
    citations: [
      {
        id: "cit-1",
        num: 1,
        authors: "National Commission for Protection of Child Rights (NCPCR)",
        title: "Assessment Report on the Functioning of Special POCSO Courts Across India",
        year: 2023,
        journal: "Government of India Statutory Report",
        volume: "Rep. 4",
        doi: "10.59821/ncpcr.rep.2023",
        scite: { supporting: 31, mentioning: 8, contrasting: 0, total: 39 },
        excerpt: "Empirical study highlighting delays and infrastructural deficits in designated child-friendly courtroom facilities.",
        contextType: "supporting"
      }
    ],
    figures: [],
    annotations: []
  }
];

export const MOCK_BOARD_MEMBERS: BoardMember[] = [
  {
    id: "bm-1",
    name: "Prof. (Dr.) Ved Prakash Sharma",
    role: "Editor-in-Chief",
    discipline: "Criminal Jurisprudence & Forensic Epistemology",
    affiliation: "National Law School of India University (NLSIU), Bengaluru",
    rorId: "https://ror.org/01nlsiu",
    orcid: "0000-0002-9901-4432",
    bio: "Prof. Sharma is a renowned Indian jurist who has served on multiple Law Commission consultative panels on criminal law reform. His research examines the intersection of constitutional due process, the Bharatiya Sakshya Adhiniyam (BSA), and scientific proof.",
    editorialFocus: "Doctrinal criminal law, statutory interpretation, interdisciplinary evidence standards, and editorial triage.",
    recentPublications: [
      "The Law of Evidence in India: From Colonial Act to BSA (Eastern Book Company, 2024)",
      "Re-examining Section 63 BSA in the Digital Era (Supreme Court Cases, 2025)"
    ]
  },
  {
    id: "bm-2",
    name: "Hon. Justice (Retd.) Anandita Sen",
    role: "Senior Associate Editor",
    discipline: "Constitutional Law & Judicial Administration",
    affiliation: "Former Judge, Supreme Court of India / Distinguished Visiting Professor, NLU Delhi",
    rorId: "https://ror.org/05nlud02",
    orcid: "0000-0003-2194-0012",
    bio: "Justice Sen authored benchmark judgments on undertrial rights, custodial bail jurisprudence, and digital privacy under Article 21. She oversees the journal's judicial studies and procedural fairness review tracks.",
    editorialFocus: "Constitutional criminal justice, bail jurisprudence, judicial administration, and trial procedures.",
    recentPublications: [
      "Bail as a Right: Deconstructing Undertrial Incarceration in India (Journal of the Indian Law Institute, 2023)",
      "The Constitutional Dimensions of the BNSS (SCC Journal, 2025)"
    ]
  },
  {
    id: "bm-3",
    name: "Dr. Harshwardhan Parikh",
    role: "Section Editor",
    discipline: "Forensic Science & DNA Phenotyping",
    affiliation: "School of Forensic Sciences, National Forensic Sciences University (NFSU), Gandhinagar",
    rorId: "https://ror.org/03nfsu01",
    orcid: "0000-0001-7729-1054",
    bio: "Dr. Parikh is a leading forensic scientist specializing in complex biological mixtures, probabilistic genotyping, and standard operating procedures for crime scene investigation under the BNSS.",
    editorialFocus: "Forensic biology, DNA validation, chain of custody verification, and physical evidence admissibility.",
    recentPublications: [
      "Probabilistic Calibration in Indian FSLs: Overcoming Low-Template DNA Ambiguities (Forensic Sci Int, 2024)"
    ]
  },
  {
    id: "bm-4",
    name: "Prof. Kavita Krishnamurthy",
    role: "Section Editor",
    discipline: "Criminology, Penology & Victim Studies",
    affiliation: "Centre for Criminology & Justice, Tata Institute of Social Sciences (TISS), Mumbai",
    rorId: "https://ror.org/02tiss99",
    orcid: "0000-0002-3901-8840",
    bio: "Prof. Krishnamurthy leads ground-breaking field investigations on prison overcrowding, carceral sociology, prison mental health, and the rehabilitation of women and juvenile offenders.",
    editorialFocus: "Penology, carceral sociology, POCSO court processes, and restorative Lok Adalat models.",
    recentPublications: [
      "Carceral Realities: An Audit of Central Prisons across Maharashtra and UP (Economic & Political Weekly, 2024)"
    ]
  },
  {
    id: "bm-5",
    name: "Shri Arvind Shrivastava, IPS (Retd.)",
    role: "Section Editor",
    discipline: "Policing, Cyber Intelligence & Internal Security",
    affiliation: "Former Director General of Police / Senior Research Fellow, BPR&D, New Delhi",
    rorId: "https://ror.org/04bprd",
    orcid: "0000-0002-6612-9901",
    bio: "Shri Shrivastava served for 35 years in the Indian Police Service, heading state cyber divisions and counter-terror task forces. He advises the journal on investigative ethics, AFRS deployment, and police reforms.",
    editorialFocus: "Police investigation techniques, Section 105 BNSS videography implementation, cyber fraud containment, and police welfare.",
    recentPublications: [
      "Operationalizing the Bharatiya Nagarik Suraksha Sanhita: A Field Manual for Investigating Officers (BPR&D, 2024)"
    ]
  }
];

export const MOCK_CONCEPT_NODES: ConceptNode[] = [
  { id: "c1", label: "BSA Section 63 Evidence", category: "Law", articlesCount: 28, x: 220, y: 150 },
  { id: "c2", label: "Article 21 Fair Trial", category: "Law", articlesCount: 42, x: 420, y: 110 },
  { id: "c3", label: "The Rashomon Approach", category: "Sociology", articlesCount: 35, x: 320, y: 260 },
  { id: "c4", label: "BNSS Mandatory Videography", category: "Policing", articlesCount: 24, x: 180, y: 360 },
  { id: "c5", label: "NFSU Forensic Standards", category: "Forensics", articlesCount: 19, x: 500, y: 240 },
  { id: "c6", label: "Selvi Self-Incrimination", category: "Law", articlesCount: 16, x: 380, y: 410 },
  { id: "c7", label: "POCSO Victim Support", category: "Psychology", articlesCount: 14, x: 560, y: 370 },
  { id: "c8", label: "Undertrial Bail Reform", category: "Sociology", articlesCount: 31, x: 620, y: 210 },
  { id: "c9", label: "Mule Bank Accounts & UPI", category: "Cybercrime", articlesCount: 22, x: 120, y: 230 },
  { id: "c10", label: "BPR&D Police Modernization", category: "Policing", articlesCount: 17, x: 280, y: 480 },
];

export const MOCK_CONCEPT_EDGES: ConceptEdge[] = [
  { source: "c1", target: "c2", strength: 0.95 },
  { source: "c1", target: "c3", strength: 0.8 },
  { source: "c1", target: "c5", strength: 0.85 },
  { source: "c2", target: "c3", strength: 0.9 },
  { source: "c4", target: "c1", strength: 0.9 },
  { source: "c4", target: "c10", strength: 0.95 },
  { source: "c5", target: "c1", strength: 0.85 },
  { source: "c6", target: "c2", strength: 0.95 },
  { source: "c7", target: "c8", strength: 0.75 },
  { source: "c9", target: "c1", strength: 0.8 },
  { source: "c9", target: "c2", strength: 0.75 },
  { source: "c8", target: "c2", strength: 0.9 },
];

export const MOCK_SUBMISSIONS: SubmissionDraft[] = [
  {
    id: "sub-10492",
    trackingNumber: "CSR-IND-2026-0819",
    title: "The Rashomon Paradigm in Indian Criminal Jurisprudence: Reconciling Algorithmic Forensics with Article 21 and the BSA 2023",
    abstract: "Auditing automated electronic evidence under Section 63 BSA across 420 felony trials in Delhi, Maharashtra, and Karnataka.",
    primaryLens: "forensic",
    secondaryLenses: ["legal", "policing"],
    articleType: "Original Empirical Research",
    authorName: "Dr. Aarav Sengupta",
    authorEmail: "a.sengupta@nfsu.ac.in",
    authorOrcid: "0000-0002-1825-0097",
    authorAffiliation: "National Forensic Sciences University (NFSU), Gandhinagar",
    creditRoles: ["Conceptualization", "Investigation", "Writing"],
    ethicsApproved: true,
    conflictDeclared: true,
    openDataAccessAccepted: true,
    fileName: "sengupta_bsa_forensics_final.docx",
    fileSize: "2.4 MB",
    submittedAt: "2026-03-01",
    status: "Published",
    currentStageNumber: 6
  },
  {
    id: "sub-10501",
    trackingNumber: "CSR-IND-2026-0922",
    title: "Undertrial Incarceration Under Section 479 BNSS: Evaluating Maximum Period Detentions Across Tihar and Arthur Road Jails",
    abstract: "Empirical assessment of the revised statutory bail thresholds for first-time offenders under Section 479 of the Bharatiya Nagarik Suraksha Sanhita.",
    primaryLens: "sociological",
    secondaryLenses: ["legal", "victimology"],
    articleType: "Original Empirical Research",
    authorName: "Adv. Tanvi Kulkarni",
    authorEmail: "t.kulkarni@nludelhi.ac.in",
    authorOrcid: "0000-0003-8812-4509",
    authorAffiliation: "Centre for Constitutional Criminology, NLU Delhi",
    creditRoles: ["Field Interviews", "Doctrinal Analysis", "Writing"],
    ethicsApproved: true,
    conflictDeclared: true,
    openDataAccessAccepted: true,
    fileName: "kulkarni_bnss479_undertrials.docx",
    fileSize: "1.9 MB",
    submittedAt: "2026-03-15",
    status: "Under Peer Review",
    currentStageNumber: 3
  },
  {
    id: "sub-10504",
    trackingNumber: "CSR-IND-2026-0941",
    title: "Digital Arrest Frauds and Jamtara Cyber Clusters: An Empirical Topology of OTP Harvesting Call Centers",
    abstract: "Investigating the technical infrastructure and sociological recruitment models of transnational cyber extortion rings operating through fake law enforcement video calls.",
    primaryLens: "policing",
    secondaryLenses: ["legal", "forensic"],
    articleType: "Methodological Innovation",
    authorName: "SP Rajesh K. Verma, IPS",
    authorEmail: "r.verma@cbi.gov.in",
    authorOrcid: "0000-0001-5509-3321",
    authorAffiliation: "Central Bureau of Investigation (CBI) Cyber Division / BPR&D Fellow",
    creditRoles: ["Investigation", "Methodology"],
    ethicsApproved: true,
    conflictDeclared: true,
    openDataAccessAccepted: true,
    fileName: "verma_digital_arrest_fraud_audit.pdf",
    fileSize: "3.8 MB",
    submittedAt: "2026-03-19",
    status: "Editorial Triage",
    currentStageNumber: 2
  }
];

export const OFFICIAL_DOCUMENT_TEXTS = {
  about: `The Crime & Society Review is an interdisciplinary academic rolling publication journal dedicated to advancing critical, evidence-based, and multidimensional understandings of crime, criminality, victimisation, institutional justice, and society within India and the Global South. The journal recognises that crime and justice in India cannot be adequately understood through a single disciplinary lens. Drawing upon the Rashomon Effect as an analytical foundation, The Crime & Society Review examines Indian criminal jurisprudence and criminological realities through multiple intersecting perspectives: the newly enacted criminal statutory codes (Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita, and Bharatiya Sakshya Adhiniyam), forensic sciences and digital extraction (NFSU and CFSL standards), constitutional safeguards under Articles 20 and 21, institutional police practices, and carceral sociology. It welcomes original empirical research, theoretical scholarship, forensic case commentaries, and policy briefs from legal academics, judges, forensic scientists, police officers, and social researchers across India.`,

  aimsAndScope: `The Crime & Society Review is committed to advancing the systematic, critical, and evidence-informed study of crime, policing, forensic sciences, criminal law, and their complex societal manifestations across India. The journal seeks to provide a high-impact scholarly forum for research examining the implementation, impact, and constitutional validity of the Bharatiya Nyaya Sanhita (BNS, 2023), the Bharatiya Nagarik Suraksha Sanhita (BNSS, 2023), and the Bharatiya Sakshya Adhiniyam (BSA, 2023). The scope encompasses, but is not limited to: Indian criminal law, constitutional criminal procedure, cyber fraud and financial crimes (PMLA, IT Act 2000, 1930 portal operations), forensic pathology, DNA phenotyping and digital forensics, policing practices and Section 105 BNSS videography, victimology and POCSO courtroom trauma, carceral penology and undertrial pendency, mob violence, gender justice, and emerging computational crime diagnostics. Particular priority is accorded to scholarship that translates empirical research into concrete institutional implications for Indian trial courts, High Courts, the Supreme Court of India, state police cadres, and the Union Ministry of Home Affairs.`,

  editorialPhilosophy: `The editorial philosophy of The Crime & Society Review is rooted in intellectual rigour, constitutional integrity, methodological pluralism, and transparent scholarly dissemination. The journal affirms that meaningful knowledge about crime and justice in India cannot emerge from disciplinary exclusivity; rather, complex societal phenomena require the convergence of legal doctrine, empirical fieldwork, scientific calibration, and sociological inquiry. Accordingly, the journal encourages scholarship that critically examines existing doctrines, questions systemic complacency, identifies gaps in criminal justice implementation, and proposes evidence-backed solutions for legal and policing reform. Editorial assessment is guided strictly by academic merit, originality, methodological transparency, and public interest contribution. The journal is committed to nurturing a scholarly forum where constructive critique of state policy and judicial precedents coexists with intellectual respect and rigorous empirical grounding.`,

  rashomonApproach: `At the intellectual core of The Crime & Society Review is the Rashomon Approach—the recognition that a single criminal or legal phenomenon in India is observed, interpreted, experienced, and evaluated differently depending upon the disciplinary position and institutional mandate of the observer. In the study of Indian justice, the identical event simultaneously represents a statutory offence under the BNS from a prosecutorial lens, an evidentiary problem under the BSA from a forensic science lens, a question of fundamental fair trial under Article 21 from a constitutional defense lens, an operational imperative under the BNSS from a police lens, and an experience of enduring trauma from a victimological lens. The journal encourages scholarship that integrates these diverse lenses while critically examining their respective assumptions and institutional limits. Through this orientation, The Crime & Society Review transforms divergent viewpoints into deep, holistic academic inquiry.`,

  publisher: `The Crime & Society Review is published as an open-access scholarly platform dedicated to fostering academic excellence, research integrity, and accessible knowledge dissemination across the Indian subcontinent. The publication adheres to the core practices formulated by the Committee on Publication Ethics (COPE) and aligns with the UGC-CARE benchmarks for scholarly journals. Operating with complete editorial independence, the journal collaborates with leading National Law Universities, the National Forensic Sciences University (NFSU), the Tata Institute of Social Sciences (TISS), and premier judicial academies to provide a credible, internationally recognized platform for advancing justice in society.`
};

export const INDEXING_CREDENTIALS = [
  {
    name: "UGC-CARE Group II Aligned",
    acronym: "UGC-CARE",
    badge: "UGC Approved Format",
    description: "Fully structured according to University Grants Commission (UGC) Minimum Standards and Procedure Regulations for CAS Academic Promotion & PhD Thesis submission in Indian Universities.",
    status: "Compliant & Aligned",
    icon: "award"
  },
  {
    name: "Indian Citation Index",
    acronym: "ICI",
    badge: "National Citation Registry",
    description: "Indexed in the premier Indian citation tracking repository covering articles in multidisciplinary Indian law, forensic science, and police studies.",
    status: "Indexed",
    icon: "bookmark-check"
  },
  {
    name: "Crossref DOI Registered Member",
    acronym: "Crossref",
    badge: "Prefix: 10.59821/csr",
    description: "Every published article is assigned a persistent Digital Object Identifier (DOI) registered with Crossref USA, with complete metadata, citations, and Crossmark provenance deposit.",
    status: "Active Member",
    icon: "globe"
  },
  {
    name: "CSIR-NIScPR New Delhi",
    acronym: "National Science Library",
    badge: "ISSN 2998-4122 (Online)",
    description: "Registered by the National Science Library, Council of Scientific and Industrial Research - National Institute of Science Communication and Policy Research, New Delhi, India.",
    status: "Officially Registered",
    icon: "landmark"
  },
  {
    name: "Directory of Open Access Journals",
    acronym: "DOAJ",
    badge: "Diamond Open Access",
    description: "Strict compliance with DOAJ quality criteria: no author charges (₹0 APC), transparent double-blind peer review, and CC BY 4.0 Creative Commons licensing.",
    status: "DOAJ Candidate Tier",
    icon: "shield-check"
  },
  {
    name: "Clarivate Web of Science (WoS)",
    acronym: "WoS Reviewer Locator",
    badge: "Account ACT-09284122",
    description: "Adheres to Web of Science Editorial Standards. TCSR editors utilize the Web of Science Reviewer Recognition Service & Reviewer Locator for independent international peer validation.",
    status: "WoS Architecture Ready",
    icon: "check-circle-2"
  },
  {
    name: "Google Scholar Auto-Indexing",
    acronym: "Google Scholar",
    badge: "High Visibility",
    description: "Automated semantic crawlers index full texts, citations, author metrics (h-index, i10-index), and typst galley PDFs within 48–72 hours of publication.",
    status: "Automated Feed",
    icon: "search"
  },
  {
    name: "INFLIBNET & Institutional Repositories",
    acronym: "INFLIBNET / Shodhganga",
    badge: "Permanent Archival",
    description: "OAI-PMH compliant metadata repository interoperable with UGC INFLIBNET, Shodhganga, Harvard Hollis Library, PennState Libraries, and CLOCKSS digital preservation.",
    status: "OAI-PMH Active",
    icon: "database"
  }
];

export const CALL_FOR_PAPERS_DATA = {
  currentCall: "Volume 1, Issue 2 (Continuous Rolling Submissions)",
  edition: "Mid-Year 2026 Edition",
  theme: "Reimagining Indian Criminal Jurisprudence Under the Bharatiya Nyaya Sanhita (BNS), BNSS & BSA: Digital Forensics, Article 21 Safeguards, and Carceral Realities",
  submissionDeadline: "30 April 2026 (Continuous Rolling Peer Review)",
  timelines: [
    { stage: "Initial Editorial Screening & Turnitin Plagiarism Check", duration: "≤ 48 Hours" },
    { stage: "Double-Blind Peer Review by Senior Jurists & NFSU Faculty", duration: "14–21 Days" },
    { stage: "Author Revision & Minor Corrections Window", duration: "7–10 Days" },
    { stage: "Final Copyedit, Typesetting & DOI Minting with Typst Galley", duration: "5–7 Days" },
  ],
  charges: {
    apc: "₹0 (Zero Fees)",
    status: "100% Diamond Open Access Subsidized for Indian Researchers, Advocates, and Students",
  },
  tracks: [
    "Criminal Law & Statutory Analysis under BNS 2023",
    "Digital Evidence Certification under Section 63 BSA",
    "Mandatory Audio-Video Recording under Section 105 BNSS",
    "Forensic DNA Profiling, Toxicology & NFSU Benchmarks",
    "Constitutional Due Process (Article 21) & Bail Jurisprudence",
    "Police Investigations, Cyber Financial Fraud (I4C), & Interrogation Ethics",
    "Victimology, Child-Friendly POCSO Courts & Restorative Justice",
    "Carceral Sociology, Undertrial Pendency & Prison Overcrowding in India"
  ]
};

export const AUTHOR_BENEFITS = [
  {
    title: "Digitally Signed Certificate of Publication",
    subtitle: "UGC Regulation 2018 CAS & PhD API Compliant",
    description: "Upon publication, authors receive an official, high-resolution Digital Certificate of Publication featuring the Ashoka seal crest, unique verification QR code, registered ISSN, DOI, and Chief Editor authentication for Career Advancement Scheme (CAS) promotions.",
    icon: "award"
  },
  {
    title: "Complimentary Similarity Check (Turnitin / Crossref)",
    subtitle: "Transparent Plagiarism Report",
    description: "Every manuscript receives a comprehensive similarity report verified through Crossref Similarity Check (iThenticate / Turnitin). Authors receive the itemized report with feedback at no cost.",
    icon: "shield-check"
  },
  {
    title: "Permanent Crossref DOI & Version of Record",
    subtitle: "Instant Digital Preservation",
    description: "Articles are assigned a permanent Crossref DOI (10.59821/csr.*) with instant metadata harvesting to Google Scholar, ResearchGate, SSRN, and institutional library catalogs globally.",
    icon: "globe"
  },
  {
    title: "3-Minute Executive Scholar Audio Briefing",
    subtitle: "Multi-Modal Academic Dissemination",
    description: "Selected high-impact articles are converted into a professional 3-minute executive scholar audio briefing, broadcasted to legal practitioners, judicial clerks, and policy makers.",
    icon: "volume-2"
  }
];

export const UNIVERSITY_AFFILIATES = [
  {
    name: "National Forensic Sciences University (NFSU)",
    location: "Gandhinagar / Delhi",
    role: "Forensic Methodology & Scientific Peer Review Network",
    logoText: "NFSU",
    badge: "Institution of National Importance"
  },
  {
    name: "National Law School of India University (NLSIU)",
    location: "Bengaluru",
    role: "Criminal Jurisprudence & Statutory Doctrine Reviewers",
    logoText: "NLSIU",
    badge: "Premier National Law School"
  },
  {
    name: "National Law University Delhi (NLUD)",
    location: "New Delhi",
    role: "Constitutional Criminal Justice & Fair Trial Benchmarks",
    logoText: "NLUD",
    badge: "Center for Criminal Justice"
  },
  {
    name: "Tata Institute of Social Sciences (TISS)",
    location: "Mumbai",
    role: "Criminology, Carceral Sociology & Victimology Collaborators",
    logoText: "TISS",
    badge: "Social Sciences & Justice"
  },
  {
    name: "Bureau of Police Research & Development (BPR&D)",
    location: "Ministry of Home Affairs, New Delhi",
    role: "Policing Innovation, Section 105 BNSS & Field Procedures",
    logoText: "BPR&D",
    badge: "MHA Think Tank"
  },
  {
    name: "Harvard University Library (Hollis)",
    location: "Cambridge, MA, USA",
    role: "Global Bibliographic Discovery & OAIster Archival",
    logoText: "HARVARD",
    badge: "Hollis Catalog Interoperable"
  }
];

export function generateCitationFormats(article: Article) {
  const authorList = article.authors.map(a => a.name).join(', ');
  const firstAuthorSurname = article.authors[0]?.name.split(' ').slice(-1)[0] || 'Author';
  const year = article.year;
  const title = article.title;
  const doi = article.doi;
  const eloc = article.elocationId;
  const vol = article.volume;

  return {
    bluebook: `${authorList}, ${title}, 1 CRIME & SOC'Y REV. ${eloc} (${year}), https://doi.org/${doi}.`,
    apa: `${authorList} (${year}). ${title}. The Crime & Society Review, ${vol}, ${eloc}. https://doi.org/${doi}`,
    chicago: `${authorList}. "${title}." The Crime & Society Review ${vol} (${year}): ${eloc}. https://doi.org/${doi}.`,
    bibtex: `@article{csr_${year}_${eloc},
  author = {${authorList.replace(/, /g, ' and ')}},
  title = {${title}},
  journal = {The Crime & Society Review},
  volume = {${vol}},
  pages = {${eloc}},
  year = {${year}},
  doi = {${doi}},
  publisher = {The Crime & Society Review Press},
  issn = {2998-4122}
}`
  };
}

export const MOCK_ISSUES = [
  {
    id: "vol-1-iss-1",
    volume: 1,
    issue: 1,
    title: "Volume 01 — Issue 01 (Inaugural Issue)",
    year: 2026,
    date: "January – March 2026",
    status: "Published / Complete",
    coverTag: "INAUGURAL VOLUME",
    theme: "Criminal Justice in Transition: Foundational Paradigms under BNS, BNSS & BSA",
    editorialTitle: "Editorial: Reconciling Statutory Innovation with Constitutional Restraint in Modern India",
    editorialAuthor: "Prof. (Dr.) Vikramaditya Sharma & Editorial Board",
    editorialExcerpt: "The launch of The Crime & Society Review represents an epistemic milestone for Indian criminological and legal scholarship. As the three new criminal enactments take effect, this inaugural issue establishes the Rashomon Framework as a primary analytical model for evaluating digital forensics, undertrial rights, and institutional enforcement.",
    articlesCount: 5,
    downloadsCount: 3840,
    pdfSize: "8.4 MB",
    articleIds: ["e2026-0492", "e2026-0501", "e2026-0518", "e2026-0524", "e2026-0530"]
  },
  {
    id: "vol-1-iss-2",
    volume: 1,
    issue: 2,
    title: "Volume 01 — Issue 02 (Current Issue)",
    year: 2026,
    date: "April – June 2026",
    status: "Active / Continuous Submissions Open",
    coverTag: "CURRENT ROLLING ISSUE",
    theme: "Digital Evidence, Algorithmic Interrogation & Forensic Due Process",
    editorialTitle: "Editorial: Electronic Evidence Certification under Section 63 BSA and the Integrity of Hash Logs",
    editorialAuthor: "Hon. Justice (Retd.) Anandita Sen & Dr. Harshwardhan Parikh",
    editorialExcerpt: "The second issue focuses on practical implementation problems: audio-visual seizure protocols under Section 105 BNSS, CFSL forensic calibration limits, and algorithmic surveillance safeguards under Article 21.",
    articlesCount: 4,
    downloadsCount: 1920,
    pdfSize: "6.2 MB",
    articleIds: ["e2026-0492", "e2026-0501"]
  },
  {
    id: "vol-2-iss-1",
    volume: 2,
    issue: 1,
    title: "Volume 02 — Issue 01 (Special Call)",
    year: 2027,
    date: "January – March 2027",
    status: "Forthcoming / Advance Call for Papers",
    coverTag: "SPECIAL ISSUE",
    theme: "Carceral Penology, Undertrial Reforms & Restorative Justice in the Global South",
    editorialTitle: "Guest Editorial: Beyond Retribution — Structural Decarceration in Indian Central Prisons",
    editorialAuthor: "Prof. Kavita Krishnamurthy (TISS) & Dr. Priya Raghavan",
    editorialExcerpt: "This forthcoming thematic issue explores prison mental health, bail system digitalization, open prisons, and community restorative alternatives.",
    articlesCount: 0,
    downloadsCount: 0,
    pdfSize: "Pending",
    articleIds: []
  }
];

export const SCOPE_CATEGORIES_20 = [
  { id: "criminology", name: "Criminology", desc: "Theories of criminal behaviour, structural crime causation, socio-legal perspectives, and historical evolution of criminal law." },
  { id: "criminal-justice", name: "Criminal Justice", desc: "Statutory frameworks, judicial administration, trial court processes, constitutional fair trial safeguards, and appellate jurisprudence." },
  { id: "policing", name: "Policing", desc: "Investigative protocols, Section 105 BNSS mandatory videography, community policing models, intelligence-led policing, and custodial ethics." },
  { id: "forensic-science", name: "Forensic Science", desc: "Physical evidence analysis, DNA phenotyping, CFSL standards, ballistics, forensic pathology, toxicology, and chain of custody validation." },
  { id: "forensic-psychology", name: "Forensic Psychology", desc: "Competency to stand trial, eyewitness reliability, interrogation psychology, risk assessment, and neuro-forensic evidence under the Selvi precedent." },
  { id: "law", name: "Law", desc: "Doctrinal analysis of the Bharatiya Nyaya Sanhita (BNS), Bharatiya Sakshya Adhiniyam (BSA), comparative criminal law, and constitutional jurisprudence." },
  { id: "sociology", name: "Sociology", desc: "Societal structures, caste, class, community marginalization, deviance, and sociology of Indian criminal courtrooms." },
  { id: "victimology", name: "Victimology", desc: "Victim compensation frameworks, institutional secondary trauma, witness protection schemes, and restorative justice models." },
  { id: "penology", name: "Penology", desc: "Punishment philosophies, sentencing guidelines, death penalty jurisprudence, deterrence theories, and custodial reform." },
  { id: "corrections", name: "Corrections", desc: "Central and District prison administration, undertrial pendency, prison healthcare, open prison models, and post-release rehabilitation." },
  { id: "crime-prevention", name: "Crime Prevention", desc: "Situational crime prevention, urban surveillance architecture, early intervention programs, and public policy crime reduction strategies." },
  { id: "cybercrime", name: "Cybercrime", desc: "Mule account syndicates, OTP phishing call centres, dark web marketplaces, digital arrest frauds, and Section 63 BSA compliance." },
  { id: "cybersecurity", name: "Cybersecurity", desc: "Critical information infrastructure protection, cryptographic evidentiary logs, cloud data jurisdiction, and I4C coordination." },
  { id: "behavioural-sciences", name: "Behavioural Sciences", desc: "Cognitive biases in judicial sentencing, decision-making among law enforcement officers, and behavioural deterrence." },
  { id: "criminal-investigation", name: "Criminal Investigation", desc: "Crime scene management, digital device extraction, forensic audit of financial crimes, and forensic interview methodologies." },
  { id: "organised-crime", name: "Organised Crime", desc: "Transnational narcotics syndicates, hawala money laundering, extortion clusters, and MCOCA / statutory anti-syndicate laws." },
  { id: "terrorism-extremism", name: "Terrorism & Extremism Studies", desc: "Counter-terror jurisprudence, digital radicalization pathways, terror financing surveillance, and UAPA statutory review." },
  { id: "juvenile-justice", name: "Juvenile Justice", desc: "Child in conflict with law assessments, Juvenile Justice Board processes, institutional care homes, and diversionary rehabilitation." },
  { id: "gender-crime", name: "Gender & Crime", desc: "Special POCSO trial mechanisms, gender-based violence, domestic violence remedies, sexual harassment jurisprudence, and intersectional harms." },
  { id: "emerging-criminality", name: "Emerging Criminality", desc: "Deepfake fraud, generative AI generated forensic forgery, autonomous vehicle vehicular homicide, algorithmic bias, and cryptocurrency scams." }
];

export const ACCEPTED_ARTICLE_TYPES_8 = [
  { type: "Original Research", wordCount: "5,000 – 10,000 words", desc: "Primary empirical investigations, court audits, laboratory forensic experiments, or extensive field interviews." },
  { type: "Theoretical Contributions", wordCount: "4,000 – 8,000 words", desc: "Conceptual critiques of legal doctrines, criminological paradigms, and constitutional criminal justice frameworks." },
  { type: "Empirical Studies", wordCount: "4,500 – 9,000 words", desc: "Quantitative and qualitative datasets on trial delays, forensic backlogs, undertrial demographics, or policing patterns." },
  { type: "Methodological Innovations", wordCount: "3,500 – 7,000 words", desc: "Novel forensic protocols, cryptographic evidence hash systems, computational crime mapping, or qualitative interview tools." },
  { type: "Conceptual Analyses", wordCount: "3,000 – 6,000 words", desc: "Rigorous doctrinal dissections of specific statutory provisions (e.g. Sections of BNS, BNSS, BSA) and judicial precedents." },
  { type: "Reviews", wordCount: "5,000 – 12,000 words", desc: "Comprehensive systematic literature reviews, state-of-the-art forensic surveys, and meta-analyses across subfields." },
  { type: "Interdisciplinary Insights", wordCount: "2,500 – 5,000 words", desc: "Cross-cutting analyses connecting law with neuroscience, forensic pathology, sociology, or computer engineering." },
  { type: "Blogs", wordCount: "1,200 – 2,500 words", desc: "Timely scholarly commentaries on breaking Supreme Court judgments, urgent legislative amendments, or ongoing forensic controversies." }
];

export const JOURNAL_HISTORY_TIMELINE = [
  {
    phase: "Conception",
    period: "2023 – 2024",
    title: "The Intellectual Genesis: Responding to Statutory Transformation",
    desc: "Conceived by a consortium of senior jurists, forensic scientists from NFSU, and legal scholars from National Law Universities in response to the introduction of the Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita, and Bharatiya Sakshya Adhiniyam. The founders recognized that Indian criminal justice suffered from severe disciplinary silos where legal scholars, forensic pathologists, police administrators, and sociologists operated in isolation."
  },
  {
    phase: "Establishment",
    period: "2024 – 2025",
    title: "Chartering The Rashomon Framework & Advisory Board",
    desc: "The journal’s editorial charter was formalized around the Rashomon Approach—the epistemological commitment to evaluate every criminal phenomenon through six synchronized lenses. International ISSN registration (Online: 2998-4122, Print: 2998-4114) was secured via the Council of Scientific and Industrial Research - National Institute of Science Communication and Policy Research (CSIR-NIScPR), New Delhi."
  },
  {
    phase: "First Publications",
    period: "2025 – 2026",
    title: "Volume 01 Ingestion & Continuous Publishing Model",
    desc: "The Crime & Society Review initiated its inaugural volume with landmark empirical audits of Section 63 BSA digital evidence certification and Article 21 due process. Adopted immediate Version of Record publishing with persistent Crossref DOIs (10.59821/csr.*) and 100% Diamond Open Access."
  },
  {
    phase: "Growth",
    period: "2026 – 2027",
    title: "National Indexing & Institutional Repository Integration",
    desc: "Integration with UGC-CARE Group II, Indian Citation Index, DOAJ, Harvard Hollis Library, PennState Libraries, and INFLIBNET. Expansion of the peer review network to over 150 empanelled judicial referees, forensic examiners, and academic professors."
  },
  {
    phase: "Future",
    period: "2027 & Beyond",
    title: "Global South Criminal Justice Leadership",
    desc: "Establishing The Crime & Society Review as the premier interdisciplinary reference forum across South Asia and the Global South for forensic science innovation, constitutional procedural rights, and statutory criminal law reform."
  }
];

export const PUBLISHER_PROFILE = {
  name: "The Crime & Society Review Press",
  entityType: "Independent Non-Profit Scholarly Publishing Foundation",
  location: "New Delhi / Gandhinagar, India",
  framework: "Operating under academic independence with institutional cooperation across National Law Universities, the National Forensic Sciences University (NFSU), and Tata Institute of Social Sciences (TISS).",
  mission: "To advance rigorous, accessible, and evidence-based knowledge on crime, institutional justice, forensic science, and society without financial or ideological barriers.",
  publishingPrinciples: [
    { title: "Academic Independence", desc: "Editorial decisions are guided exclusively by academic merit, originality, and intellectual rigor, insulated from commercial, institutional, or governmental pressures." },
    { title: "Diamond Open Access", desc: "No subscription barriers for readers, and zero article processing charges (₹0 APC) for authors, ensuring open universal dissemination of legal and scientific research." },
    { title: "Research Integrity", desc: "Strict adherence to the Committee on Publication Ethics (COPE) Core Practices, ICMR human research ethics, and UGC Academic Integrity Regulations 2018." },
    { title: "Methodological Transparency", desc: "Encouraging full data transparency, statistical reproducibility, open code, and explicit calibration limits for empirical and forensic contributions." },
    { title: "Responsible Dissemination", desc: "Bridging the gap between ivory-tower academic theory and practical trial court reality by providing executive policy implications for courts, police, and forensic laboratories." }
  ]
};

export const FOR_REVIEWERS_DATA = {
  principles: [
    { title: "Double-Blind Anonymity", desc: "Reviewers evaluate manuscripts without knowledge of author identity, institutional affiliation, or commercial interest, and vice versa." },
    { title: "Constructive Rigour", desc: "Reviewers provide substantive, specific, and actionable feedback highlighting methodological strengths, statutory nuances, and empirical validity." },
    { title: "Timely Assessment", desc: "Standard double-blind review turnaround benchmark is 14–21 calendar days to respect author promotion and PhD filing timelines." },
    { title: "Ethical Vigilance", desc: "Reviewers must alert editors immediately to suspected plagiarism, undisclosed conflicts of interest, dual submission, or fabricated experimental data." }
  ],
  criteria: [
    "Originality & Contribution to Indian/Global Criminology or Criminal Law",
    "Methodological Soundness & Forensic / Statistical Validity",
    "Accuracy in Statutory Citation (BNS, BNSS, BSA, Indian Precedents)",
    "Engagement with Constitutional Precedents (Articles 20, 21, 22)",
    "Clarity of Exposition, Structure & Referencing Integrity",
    "Actionable Policy / Judicial Implications for Courtrooms & Police"
  ]
};

export const CONTACT_DETAILS = {
  editorialOffice: {
    title: "Editorial Office",
    email: "editor@thecrimeandsocietyreview.org",
    phone: "+91 (011) 2998-4122",
    address: "The Crime & Society Review Editorial Chambers, Sector 9, Institutional Area, New Delhi – 110003, India"
  },
  submissions: {
    title: "Submissions & Editorial Triage",
    email: "submissions@thecrimeandsocietyreview.org",
    deskHours: "Monday – Saturday, 09:30 AM – 06:00 PM IST"
  },
  reviewers: {
    title: "Reviewer & Editorial Board Enquiries",
    email: "reviewers@thecrimeandsocietyreview.org"
  },
  publisher: {
    title: "Publisher & Institutional Relations",
    email: "publisher@thecrimeandsocietyreview.org",
    entity: "The Crime & Society Review Press (Non-Profit Foundation)"
  }
};

