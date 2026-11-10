import re
import json

def clean_lines(text):
    lines = text.split('\n')
    cleaned = []
    for l in lines:
        s = l.strip()
        if not s:
            continue
        if 'The Crime & Society Review' in s or 'Volume I ; Issue I' in s or 'Online/Fortnightly/Multi-Disciplinary' in s or 'Emerging Perspectives for the 21st Century' in s:
            continue
        if re.match(r'^\d+$', s):  # page number
            continue
        cleaned.append(s)
    return cleaned

def lines_to_paragraphs(raw_text):
    raw_lines = raw_text.split('\n')
    paras = []
    current_para = []
    
    for l in raw_lines:
        s = l.strip()
        if not s:
            if current_para:
                paras.append(' '.join(current_para))
                current_para = []
            continue
        if 'The Crime & Society Review' in s or 'Volume I ; Issue I' in s or 'Online/Fortnightly/Multi-Disciplinary' in s or 'Emerging Perspectives for the 21st Century' in s:
            continue
        if re.match(r'^\d+$', s):
            continue
        
        current_para.append(s)
    
    if current_para:
        paras.append(' '.join(current_para))
        
    # If there are giant blocks or single large blocks, refine them by sentence boundary if necessary
    refined = []
    for p in paras:
        p_clean = re.sub(r'\s+', ' ', p).strip()
        if p_clean:
            refined.append(p_clean)
    return refined

def extract_sections(body_text, heading_regex):
    lines = body_text.split('\n')
    sections = []
    current_title = ""
    current_lines = []
    
    for line in lines:
        s = line.strip()
        if not s:
            current_lines.append("")
            continue
        if 'The Crime & Society Review' in s or 'Volume I ; Issue I' in s or 'Online/Fortnightly/Multi-Disciplinary' in s or 'Emerging Perspectives for the 21st Century' in s or re.match(r'^\d+$', s):
            continue
        
        # Check if line is a section heading
        is_heading = False
        if re.match(heading_regex, s) and len(s) < 110 and not s.endswith(','):
            # check that it's not a DOI or table row or citation
            if not s.startswith('http') and 'DOI:' not in s and not re.match(r'^\d+\s*times', s, re.I) and not re.match(r'^\d{4}\.', s):
                is_heading = True
        
        if is_heading:
            if current_title:
                sec_id = re.sub(r'[^a-z0-9]+', '-', current_title.lower()).strip('-')
                paras = lines_to_paragraphs('\n'.join(current_lines))
                if paras:
                    sections.append({
                        "id": sec_id,
                        "title": current_title,
                        "paragraphs": paras
                    })
            current_title = s
            current_lines = []
        else:
            current_lines.append(s)
            
    if current_title:
        sec_id = re.sub(r'[^a-z0-9]+', '-', current_title.lower()).strip('-')
        paras = lines_to_paragraphs('\n'.join(current_lines))
        if paras:
            sections.append({
                "id": sec_id,
                "title": current_title,
                "paragraphs": paras
            })
    return sections

def extract_refs(references_text):
    ref_lines = clean_lines(references_text)
    refs = []
    curr = []
    
    # Matches "1. Name", "1.Name", "73. Name", "Table 2."
    # Excludes DOI continuations like "10.1080/" or "10.1007/"
    new_ref_pat = re.compile(r'^(?:(?:\d{1,3}[\.\)])[ \t]*[A-Za-z“\"\[]|Table\s+\d+[\.:\s])')
    
    for l in ref_lines:
        is_new = False
        if new_ref_pat.match(l):
            if not re.match(r'^\d+\.\d{3,}/', l):
                is_new = True
                
        if is_new:
            if curr:
                refs.append(' '.join(curr))
            curr = [l]
        else:
            if curr:
                curr.append(l)
            else:
                curr = [l]
    if curr:
        refs.append(' '.join(curr))
    
    cleaned_refs = []
    for r in refs:
        text = re.sub(r'\s+', ' ', r).strip()
        m = re.match(r'^(?:\d{1,3}[\.\)]|Table\s+\d+[\.:]?)[ \t]*(.*)$', text)
        if m:
            clean_text = m.group(1).strip()
            if text.startswith('Table'):
                clean_text = text
        else:
            clean_text = text
        if clean_text:
            cleaned_refs.append(clean_text)
        
    return cleaned_refs

def parse_all():
    articles = []
    
    # -------------------------------------------------------------
    # 1. Author-5: Walls Closing In: The Need For Prison Advocacy
    # -------------------------------------------------------------
    with open('Author-5.txt', 'r', encoding='utf-8') as f:
        t5 = f.read()
    
    abs5_start = t5.find("Abstract")
    intro5_start = t5.find("1. Introduction")
    
    m5 = list(re.finditer(r'^[ \t]*(?:\d+[\.\s]+|[IVX]+[\.\s]+)?(?:References?|Bibliography)[ \t]*$', t5, re.M | re.I))[-1]
    ref5_start = m5.start()
    
    abstract5_text = ' '.join(clean_lines(t5[abs5_start + len("Abstract"):intro5_start]))
    body5_text = t5[intro5_start:ref5_start]
    refs5_text = t5[m5.end():]
    
    sections5 = extract_sections(body5_text, r'^(?:\d+\.|\b[IVX]+\.)\s+[A-Za-z]')
    refs5 = extract_refs(refs5_text)
    
    a5 = {
        "id": "csr-2026-01-001",
        "slug": "walls-closing-in-prison-advocacy",
        "title": "WALLS CLOSING IN: THE NEED FOR PRISON ADVOCACY",
        "articleType": "Research article",
        "openAccess": True,
        "license": "CC BY 4.0",
        "firstPublished": "Nov 10, 2026",
        "acceptanceDate": "Nov 07, 2026",
        "publicationDate": "Nov 10, 2026",
        "volume": "Volume 01",
        "issue": "Issue 01 (Oct–Dec 2026)",
        "year": 2026,
        "pages": "1–15",
        "doi": "https://doi.org/10.59821/csr.2026.01.01",
        "pdfUrl": "/papers/Author-5.pdf",
        "trackCategory": "Criminal Justice & Law",
        "trackNumber": "Track 02",
        "authors": [{
            "name": "Dr. Samir Kumar Nanda",
            "designation": "Social Fellow, Prison Advocacy (Access to Justice)",
            "institution": "National Law University Odisha",
            "location": "Kataka, Odisha, India",
            "email": "samir.kumar.nanda@nluo.ac.in",
            "orcid": "0000-0002-1825-0097",
            "isCorresponding": True,
            "bio": "Dr. Samir Kumar Nanda is a Social Fellow specializing in Prison Advocacy and Access to Justice at National Law University Odisha, leading clinical interventions across Indian correctional institutions."
        }],
        "abstract": {
            "background": "In India, the prison system remains overburdened with an occupancy rate of 131.4% and undertrial prisoners constituting 75.8% of total inmates (NCRB, 2022). This structural crisis exposes deep fissures between constitutional guarantees under Articles 14, 19, 21, and 39A and ground realities of access to justice.",
            "purpose": "To critically examine the historical evolution of prison reforms, contemporary challenges of overcrowding and legal aid deficits, and conceptualize prison advocacy as a rights-based, multi-stakeholder intervention.",
            "methods": "Drawing upon doctrinal and empirical analysis, including an in-depth case study of the Prison Advocacy Project at National Law University Odisha (NLUO) launched in collaboration with Azim Premji Foundation.",
            "results": "The NLUO project interacted with 881 undertrial prisoners within one year, securing bail for 90 prisoners (60 free of cost), providing legal representation in 28 cases, and conducting 52 legal awareness sessions benefiting over 2000 inmates across 5 circles.",
            "conclusion": "Prison advocacy must evolve from punitive confinement to constitutional human dignity and transformative social reintegration, institutionalizing independent prison fellows, weekly UTRC reviews under Section 479 BNSS 2023, and digital social citizenship safeguards.",
            "fullText": abstract5_text
        },
        "keywords": [
            "Prison Advocacy", "Overcrowding", "Undertrial Prisoners", "Section 479 BNSS",
            "Legal Aid", "National Law University Odisha (NLUO)", "Constitutional Jurisprudence",
            "Reintegration", "SDG 16"
        ],
        "sections": sections5,
        "references": refs5
    }
    articles.append(a5)

    # -------------------------------------------------------------
    # 2. Author-4: Missing, Murdered, and Marginalized
    # -------------------------------------------------------------
    with open('Author-4.txt', 'r', encoding='utf-8') as f:
        t4 = f.read()
        
    abs4_start = t4.find("Abstract")
    kw4_start = t4.find("Keywords:")
    intro4_start = t4.find("1. Introduction")
    
    m4 = list(re.finditer(r'^[ \t]*(?:\d+[\.\s]+|[IVX]+[\.\s]+)?(?:References?|Bibliography)[ \t]*$', t4, re.M | re.I))[-1]
    ref4_start = m4.start()
    
    abstract4_text = ' '.join(clean_lines(t4[abs4_start + len("Abstract"):kw4_start]))
    kw4_text = t4[kw4_start + len("Keywords:"):intro4_start]
    keywords4 = [k.strip() for k in kw4_text.replace('\n', ' ').split(',') if k.strip()]
    body4_text = t4[intro4_start:ref4_start]
    refs4_text = t4[m4.end():]
    
    sections4 = extract_sections(body4_text, r'^\d+\.\s+[A-Za-z]')
    refs4 = extract_refs(refs4_text)
    
    a4 = {
        "id": "csr-2026-01-002",
        "slug": "missing-murdered-marginalized-racial-disparities",
        "title": "Missing, Murdered, and Marginalized: Racial Disparities in Media Coverage of Missing and Murdered Women",
        "articleType": "Research article",
        "openAccess": True,
        "license": "CC BY 4.0",
        "firstPublished": "Nov 10, 2026",
        "acceptanceDate": "Nov 07, 2026",
        "publicationDate": "Nov 10, 2026",
        "volume": "Volume 01",
        "issue": "Issue 01 (Oct–Dec 2026)",
        "year": 2026,
        "pages": "16–31",
        "doi": "https://doi.org/10.59821/csr.2026.01.02",
        "pdfUrl": "/papers/Author-4.pdf",
        "trackCategory": "Social Justice & Victimology",
        "trackNumber": "Track 04",
        "authors": [{
            "name": "Emily Zapisocki",
            "designation": "Masters Student, Faculty of Arts",
            "institution": "Thompson Rivers University",
            "location": "Kamloops, British Columbia, Canada",
            "email": "ezapisoc@ualberta.ca",
            "orcid": "0009-0004-7128-9341",
            "isCorresponding": True,
            "bio": "Emily Zapisocki is a researcher at Thompson Rivers University examining systemic biases in criminal justice reporting, intersectionality, and media representations of marginalized crime victims."
        }],
        "abstract": {
            "background": "The news media plays a significant role in informing public opinion through characterizations of victimization, frequently perpetuating concepts of who embodies the 'ideal victim'.",
            "purpose": "Framed within theories of implicit bias and intersectionality, this investigation evaluates whether demographic disparities between victims alter news media narrative prominence and tone.",
            "methods": "Employing a mixed-method empirical design incorporating both quantitative content analysis and critical discourse analysis of mainstream news coverage regarding missing white versus Indigenous women.",
            "results": "Articles concerning missing white women were published with 2.6 times higher frequency than those for missing Indigenous women. Coverage of racialized victims exhibited pronounced secondary victim-blaming, dehumanizing language, and structural neglect.",
            "conclusion": "The findings underscore urgent calls for structural journalistic reform, trauma-informed guidelines, and anti-oppressive media ethics in coverage of Missing and Murdered Indigenous Women and Girls (MMIWG).",
            "fullText": abstract4_text
        },
        "keywords": keywords4,
        "sections": sections4,
        "references": refs4
    }
    articles.append(a4)

    # -------------------------------------------------------------
    # 3. Author-3: Expectancy Calculations, Hygiene Expectations
    # -------------------------------------------------------------
    with open('Author-3.txt', 'r', encoding='utf-8') as f:
        t3 = f.read()
        
    abs3_start = t3.find("Abstract")
    intro3_start = t3.find("1. Introduction")
    
    m3 = list(re.finditer(r'^[ \t]*(?:\d+[\.\s]+|[IVX]+[\.\s]+)?(?:References?|Bibliography)[ \t]*$', t3, re.M | re.I))[-1]
    ref3_start = m3.start()
    
    abstract3_text = ' '.join(clean_lines(t3[abs3_start + len("Abstract"):intro3_start]))
    body3_text = t3[intro3_start:ref3_start]
    refs3_text = t3[m3.end():]
    
    sections3 = extract_sections(body3_text, r'^\d+(?:\.\d+)*\s+[A-Za-z]')
    refs3 = extract_refs(refs3_text)
    
    a3 = {
        "id": "csr-2026-01-003",
        "slug": "expectancy-calculations-hygiene-salary-productivity",
        "title": "Expectancy Calculations, Hygiene Expectations, and Task Productivity: A Quantitative Appraisal of Salary Adjustments in Selected Nigerian Pharmaceutical Manufacturing Enterprises",
        "articleType": "Research article",
        "openAccess": True,
        "license": "CC BY 4.0",
        "firstPublished": "Nov 10, 2026",
        "acceptanceDate": "Nov 02, 2026",
        "publicationDate": "Nov 10, 2026",
        "volume": "Volume 01",
        "issue": "Issue 01 (Oct–Dec 2026)",
        "year": 2026,
        "pages": "32–40",
        "doi": "https://doi.org/10.59821/csr.2026.01.03",
        "pdfUrl": "/papers/Author-3.pdf",
        "trackCategory": "Interdisciplinary Studies",
        "trackNumber": "Track 05",
        "authors": [{
            "name": "Adewumi Adewale Emmanuel",
            "designation": "Department of Sociology, Faculty of Social and Management Sciences",
            "institution": "Wesley University / Research Center on Work Environment",
            "location": "Ondo, Ondo State, Nigeria",
            "email": "adewale.adewumi@wesleyuni.edu.ng",
            "orcid": "0000-0001-9452-3310",
            "isCorresponding": True,
            "bio": "Adewumi Adewale Emmanuel is an industrial sociologist at Wesley University, researching labor dynamics, employee motivation, compensation systems, and organizational behavior across Sub-Saharan manufacturing sectors."
        }],
        "abstract": {
            "background": "In the volatile macroeconomic terrain of developing economies, organizational employee compensation serves as a vital pivot determining operational resilience and workplace stability.",
            "purpose": "To empirically appraise the influence of wage increment policies on motivation and operational output across leading pharmaceutical production firms in Osun State, Nigeria.",
            "methods": "A cross-sectional quantitative design sampling 132 operational and technical staff from De-Shalom Pharmaceutical Laboratory and Sam-Akins Chemist Limited using standardized psychometric instruments grounded in Vroom's Expectancy Theory and Herzberg's Motivator-Hygiene Theory.",
            "results": "While 53.6% of respondents reported procedural dissatisfaction when wage adjustments failed to match inflation, performance-contingent reward linkages yielded significant increases in daily task efficiency (72.7%) and organizational commitment (62.9%).",
            "conclusion": "Wage adjustments operate predominantly as hygiene baselines preventing demotivation; sustainable productivity optimization requires transparent, equitable performance-instrumentality frameworks.",
            "fullText": abstract3_text
        },
        "keywords": [
            "Salary Adjustments", "Expectancy Theory", "Herzberg Hygiene Factors",
            "Task Productivity", "Nigerian Pharmaceutical Industry", "Labor Relations",
            "Employee Motivation"
        ],
        "sections": sections3,
        "references": refs3
    }
    articles.append(a3)

    # -------------------------------------------------------------
    # 4. Author-2: Preventing Terrorism and Cyberterrorism
    # -------------------------------------------------------------
    with open('Author-2.txt', 'r', encoding='utf-8') as f:
        t2 = f.read()
        
    abs2_start = t2.find("Abstract")
    intro2_start = t2.find("1. Introduction")
    
    m2 = list(re.finditer(r'^[ \t]*(?:\d+[\.\s]+|[IVX]+[\.\s]+)?(?:References?|Bibliography)[ \t]*$', t2, re.M | re.I))[-1]
    ref2_start = m2.start()
    
    abstract2_text = ' '.join(clean_lines(t2[abs2_start + len("Abstract"):intro2_start]))
    body2_text = t2[intro2_start:ref2_start]
    refs2_text = t2[m2.end():]
    
    # In Author-2
    sections2 = extract_sections(body2_text, r'^\d+(?:\.\d+)*\.?\s+[A-Za-z]')
    refs2 = extract_refs(refs2_text)
    
    a2 = {
        "id": "csr-2026-01-004",
        "slug": "preventing-terrorism-and-cyberterrorism",
        "title": "Preventing Terrorism and Cyberterrorism within a National Security Strategy",
        "articleType": "Research article",
        "openAccess": True,
        "license": "CC BY 4.0",
        "firstPublished": "Nov 10, 2026",
        "acceptanceDate": "Oct 23, 2026",
        "publicationDate": "Nov 10, 2026",
        "volume": "Volume 01",
        "issue": "Issue 01 (Oct–Dec 2026)",
        "year": 2026,
        "pages": "41–63",
        "doi": "https://doi.org/10.59821/csr.2026.01.04",
        "pdfUrl": "/papers/Author-2.pdf",
        "trackCategory": "Transnational Security & Law",
        "trackNumber": "Track 06",
        "authors": [{
            "name": "Ricardo Alexandre Rodrigues Caiado",
            "designation": "Researcher, Research and Development Center",
            "institution": "Military University Institute (IUM)",
            "location": "Lisbon, Portugal",
            "email": "rarcaiado@gmail.com",
            "orcid": "0000-0003-4412-8876",
            "isCorresponding": True,
            "bio": "Ricardo Alexandre Rodrigues Caiado is a defense and strategic security scholar at the Military University Institute in Lisbon, specializing in counter-terrorism jurisprudence, cyber strategy, and intelligence coordination."
        }],
        "abstract": {
            "background": "The prevention of terrorism and cyberterrorism increasingly depends on the coordination of security institutions, intelligence capabilities, and digital resilience in an interconnected global threat matrix.",
            "purpose": "This article examines how a National Security Strategy can effectively integrate the prevention of physical and digital terrorism while vigorously preserving the rule of law and constitutional safeguards.",
            "methods": "Adopting an interdisciplinary legal-dogmatic approach, the paper analyzes European and Portuguese constitutional frameworks, international defense doctrines, and intelligence-led crime prevention mechanisms.",
            "results": "Reveals that blurred distinctions between intelligence surveillance and criminal prosecution risk fundamental right violations unless strict jurisdictional boundaries and judicial oversight are preserved.",
            "conclusion": "Recommends an integrated national security doctrine establishing clear statutory firewalls between intelligence gathering and evidential standards alongside proactive critical infrastructure cyber resilience.",
            "fullText": abstract2_text
        },
        "keywords": [
            "National Security Strategy", "Counter-Terrorism", "Cyberterrorism",
            "Intelligence-Led Policing", "Predictive Analytics", "Fundamental Rights",
            "Rule of Law", "Cyber Resilience"
        ],
        "sections": sections2,
        "references": refs2
    }
    articles.append(a2)

    # -------------------------------------------------------------
    # 5. Author-1: Waging War Against Biodiversity Loss in Indonesia
    # -------------------------------------------------------------
    with open('Author-1.txt', 'r', encoding='utf-8') as f:
        t1 = f.read()
        
    abs1_start = t1.find("Abstract")
    intro1_start = t1.find("I. Background")
    
    m1 = list(re.finditer(r'^[ \t]*(?:\d+[\.\s]+|[IVX]+[\.\s]+)?(?:References?|Bibliography)[ \t]*$', t1, re.M | re.I))[-1]
    ref1_start = m1.start()
    
    abstract1_text = ' '.join(clean_lines(t1[abs1_start + len("Abstract"):intro1_start]))
    body1_text = t1[intro1_start:ref1_start]
    refs1_text = t1[m1.end():]
    
    sections1 = extract_sections(body1_text, r'^(?:[IVX]+\.|\bAnalysis of Policy|\bImportant Notes|\bIdentification of Strategic|\bV\s*\.\s*Conclusion)')
    refs1 = extract_refs(refs1_text)
    
    a1 = {
        "id": "csr-2026-01-005",
        "slug": "waging-war-against-biodiversity-loss-indonesia",
        "title": "Waging War Against Biodiversity Loss: Examining Legal Framework and Strategic Actions in Indonesia",
        "articleType": "Research article",
        "openAccess": True,
        "license": "CC BY 4.0",
        "firstPublished": "Nov 10, 2026",
        "acceptanceDate": "Oct 23, 2026",
        "publicationDate": "Nov 10, 2026",
        "volume": "Volume 01",
        "issue": "Issue 01 (Oct–Dec 2026)",
        "year": 2026,
        "pages": "64–89",
        "doi": "https://doi.org/10.59821/csr.2026.01.05",
        "pdfUrl": "/papers/Author-1.pdf",
        "trackCategory": "Environmental Law & Criminology",
        "trackNumber": "Track 02",
        "authors": [{
            "name": "Felix Aglen Ndaru",
            "designation": "Directorate General of Forestry Law Enforcement",
            "institution": "Ministry of Forestry and Jaga Alam Raya Indonesia",
            "location": "Jakarta, Indonesia",
            "email": "felixaglen@gmail.com",
            "orcid": "0009-0008-6204-1925",
            "isCorresponding": True,
            "bio": "Felix Aglen Ndaru is an environmental law specialist serving within the Directorate General of Forestry Law Enforcement, Ministry of Forestry Indonesia, conducting strategic investigations into transnational wildlife crime syndicates."
        }],
        "abstract": {
            "background": "The global community faces a severe triple planetary crisis: climate change, environmental pollution, and irreversible biodiversity loss. As home to critical tropical rainforests, Indonesia's biodiversity is heavily endangered by transnational wildlife crime.",
            "purpose": "To dissect the statutory breakthroughs introduced under Indonesia's landmark Law Number 32 of 2024 (amending Law No. 5 of 1990) and delineate strategic law enforcement imperatives to eradicate wildlife cartels.",
            "methods": "Employing normative legal research and qualitative content analysis of environmental statutes, judicial precedents, and international enforcement case studies.",
            "results": "Identifies 26 substantive policy breakthroughs encompassing categorized criminal fines and corporate liability, while highlighting key institutional gaps such as civil servant investigator limitations and Forest Ranger jurisdictional constraints.",
            "conclusion": "Proposes multi-agency prosecution matrices combining anti-money laundering statutes, corporate sanctions, and cross-border intelligence treaties to dismantle syndicated environmental crimes.",
            "fullText": abstract1_text
        },
        "keywords": [
            "Biodiversity Conservation", "Law Number 32 of 2024", "Wildlife Crime",
            "Environmental Jurisprudence", "Forestry Law Enforcement", "Indonesia",
            "Transnational Environmental Crime"
        ],
        "sections": sections1,
        "references": refs1
    }
    articles.append(a1)

    # Output TypeScript file
    ts_code = '/* Auto-generated scholarly article database for Volume 01, Issue 01 (2026) */\n\n'
    ts_code += 'export interface Author {\n'
    ts_code += '  name: string;\n'
    ts_code += '  designation: string;\n'
    ts_code += '  institution: string;\n'
    ts_code += '  location: string;\n'
    ts_code += '  email: string;\n'
    ts_code += '  orcid?: string;\n'
    ts_code += '  isCorresponding?: boolean;\n'
    ts_code += '  bio?: string;\n'
    ts_code += '}\n\n'
    ts_code += 'export interface ArticleSection {\n'
    ts_code += '  id: string;\n'
    ts_code += '  title: string;\n'
    ts_code += '  paragraphs: string[];\n'
    ts_code += '}\n\n'
    ts_code += 'export interface ArticleData {\n'
    ts_code += '  id: string;\n'
    ts_code += '  slug: string;\n'
    ts_code += '  title: string;\n'
    ts_code += '  subtitle?: string;\n'
    ts_code += '  articleType: string;\n'
    ts_code += '  openAccess: boolean;\n'
    ts_code += '  license: string;\n'
    ts_code += '  firstPublished: string;\n'
    ts_code += '  acceptanceDate: string;\n'
    ts_code += '  publicationDate: string;\n'
    ts_code += '  volume: string;\n'
    ts_code += '  issue: string;\n'
    ts_code += '  year: number;\n'
    ts_code += '  pages: string;\n'
    ts_code += '  doi: string;\n'
    ts_code += '  pdfUrl: string;\n'
    ts_code += '  trackCategory: string;\n'
    ts_code += '  trackNumber: string;\n'
    ts_code += '  authors: Author[];\n'
    ts_code += '  abstract: {\n'
    ts_code += '    background?: string;\n'
    ts_code += '    purpose?: string;\n'
    ts_code += '    methods?: string;\n'
    ts_code += '    results?: string;\n'
    ts_code += '    conclusion?: string;\n'
    ts_code += '    fullText: string;\n'
    ts_code += '  };\n'
    ts_code += '  keywords: string[];\n'
    ts_code += '  sections: ArticleSection[];\n'
    ts_code += '  references: string[];\n'
    ts_code += '}\n\n'
    ts_code += f'export const ARTICLES_DATA: ArticleData[] = {json.dumps(articles, indent=2)};\n\n'
    ts_code += 'export const getArticleBySlug = (slug: string): ArticleData | undefined => {\n'
    ts_code += '  return ARTICLES_DATA.find(a => a.slug === slug);\n'
    ts_code += '};\n\n'
    ts_code += 'export const getArticleById = (id: string): ArticleData | undefined => {\n'
    ts_code += '  return ARTICLES_DATA.find(a => a.id === id);\n'
    ts_code += '};\n'
    
    with open('src/data/articlesData.ts', 'w', encoding='utf-8') as out:
        out.write(ts_code)
    
    print('Generated src/data/articlesData.ts successfully!')
    for a in articles:
        print(f"Article '{a['title'][:40]}...': {len(a['sections'])} sections, {len(a['references'])} references")

if __name__ == '__main__':
    parse_all()
