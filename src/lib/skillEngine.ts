import { SKILLS_DATASET, SKILLS_MAP, SkillDefinition } from '../data/skillsDataset';

export interface ExtractedSkill {
  skill: SkillDefinition;
  confidence: number;
  matchedVia: string; // which alias or term triggered the match
  section?: 'required' | 'preferred' | 'general' | 'resume';
}

export interface SkillMatchResult {
  skill: SkillDefinition;
  status: 'matched' | 'missing' | 'partial';
  requirementType: 'required' | 'preferred';
  similarityScore: number;
  matchedResumeSnippet?: string;
  notes?: string;
}

export interface FitScoreAnalysis {
  overallScore: number; // 0 - 100
  requiredScore: number;
  preferredScore: number;
  totalRequiredCount: number;
  matchedRequiredCount: number;
  totalPreferredCount: number;
  matchedPreferredCount: number;
  matchedSkills: SkillMatchResult[];
  missingSkills: SkillMatchResult[];
  categoryBreakdown: {
    category: string;
    total: number;
    matched: number;
    percentage: number;
  }[];
  verdict: 'Excellent Match' | 'Strong Fit' | 'Moderate Gap' | 'Critical Skills Missing';
  verdictDescription: string;
}

export interface RoadmapStage {
  stageNumber: number;
  title: string;
  durationWeeks: number;
  description: string;
  skills: {
    skill: SkillDefinition;
    estimatedHours: number;
    prerequisitesFulfilled: string[];
    resources: SkillDefinition['resources'];
  }[];
}

export interface RoadmapPlan {
  totalEstimatedHours: number;
  estimatedWeeks: number;
  stages: RoadmapStage[];
  immediateNextSteps: string[];
}

// -------------------------------------------------------------
// 1. JD SECTION CLASSIFIER
// -------------------------------------------------------------
export function classifyJobDescriptionSections(jdText: string): {
  requiredText: string;
  preferredText: string;
  generalText: string;
} {
  const lines = jdText.split(/\r?\n/);
  let currentSection: 'required' | 'preferred' | 'general' = 'general';

  const requiredBuffer: string[] = [];
  const preferredBuffer: string[] = [];
  const generalBuffer: string[] = [];

  const requiredRegex = /^(?:[\d\.\-\*\s#]*)(?:required|must[\s\-]have|minimum\s+qualifications|basic\s+qualifications|mandatory|technical\s+requirements|what\s+you\s+need|requirements|core\s+requirements)(?::|\b)/i;
  const preferredRegex = /^(?:[\d\.\-\*\s#]*)(?:preferred|nice[\s\-]to[\s\-]have|good[\s\-]to[\s\-]have|bonus|desired|plus\s+points|additional\s+qualifications|preferred\s+qualifications)(?::|\b)/i;
  const generalRegex = /^(?:[\d\.\-\*\s#]*)(?:about\s+the\s+role|job\s+summary|responsibilities|what\s+you'll\s+do|overview|company\s+description|benefits)(?::|\b)/i;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (requiredRegex.test(trimmed)) {
      currentSection = 'required';
      requiredBuffer.push(trimmed);
      continue;
    } else if (preferredRegex.test(trimmed)) {
      currentSection = 'preferred';
      preferredBuffer.push(trimmed);
      continue;
    } else if (generalRegex.test(trimmed)) {
      currentSection = 'general';
      generalBuffer.push(trimmed);
      continue;
    }

    if (currentSection === 'required') {
      requiredBuffer.push(trimmed);
    } else if (currentSection === 'preferred') {
      preferredBuffer.push(trimmed);
    } else {
      generalBuffer.push(trimmed);
    }
  }

  // Fallback: If no explicit headers were detected, treat the whole JD as required
  if (requiredBuffer.length === 0 && preferredBuffer.length === 0) {
    return {
      requiredText: jdText,
      preferredText: '',
      generalText: ''
    };
  }

  return {
    requiredText: requiredBuffer.join('\n'),
    preferredText: preferredBuffer.join('\n'),
    generalText: generalBuffer.join('\n')
  };
}

// -------------------------------------------------------------
// 2. VECTOR EMBEDDING & COSINE SIMILARITY (Pure TypeScript)
// -------------------------------------------------------------
// Creates a normalized high-dimensional semantic term & character n-gram vector
function createSemanticVector(text: string): Map<string, number> {
  const clean = text.toLowerCase().replace(/[^a-z0-9+#.\s]/g, ' ');
  const words = clean.split(/\s+/).filter(w => w.length > 0);
  const vector = new Map<string, number>();

  // Word unigrams and bigrams
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    vector.set(w, (vector.get(w) || 0) + 2.0);

    if (i < words.length - 1) {
      const bi = `${w}_${words[i + 1]}`;
      vector.set(bi, (vector.get(bi) || 0) + 3.0);
    }

    // Character 3-grams for typo & stem matching
    if (w.length >= 3) {
      for (let j = 0; j <= w.length - 3; j++) {
        const tri = `tri_${w.substring(j, j + 3)}`;
        vector.set(tri, (vector.get(tri) || 0) + 0.5);
      }
    }
  }

  // Calculate Euclidean norm
  let sumSq = 0;
  for (const val of vector.values()) {
    sumSq += val * val;
  }
  const norm = Math.sqrt(sumSq) || 1;

  // Normalize
  for (const [key, val] of vector.entries()) {
    vector.set(key, val / norm);
  }

  return vector;
}

export function computeCosineSimilarity(vecA: Map<string, number>, vecB: Map<string, number>): number {
  let dotProduct = 0;
  for (const [term, valA] of vecA.entries()) {
    const valB = vecB.get(term);
    if (valB !== undefined) {
      dotProduct += valA * valB;
    }
  }
  return Math.min(1.0, Math.max(0.0, dotProduct));
}

// -------------------------------------------------------------
// 3. SKILL EXTRACTOR
// -------------------------------------------------------------
export function extractSkillsFromText(
  text: string,
  sectionType: 'required' | 'preferred' | 'general' | 'resume' = 'general'
): ExtractedSkill[] {
  const lowerText = text.toLowerCase();
  const extractedMap = new Map<string, ExtractedSkill>();

  for (const skill of SKILLS_DATASET) {
    // Check main name
    const terms = [skill.name.toLowerCase(), ...skill.aliases.map(a => a.toLowerCase())];

    for (const term of terms) {
      // Precise regex boundary matching
      // Handles special cases like C++, C#, .NET
      let escaped = term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      
      // If term ends with alphanumeric, add word boundary
      const prefix = /^[a-z0-9]/.test(term) ? '(?:^|[^a-z0-9])' : '';
      const suffix = /[a-z0-9]$/.test(term) ? '(?=[^a-z0-9]|$)' : '';
      const regex = new RegExp(`${prefix}${escaped}${suffix}`, 'i');

      if (regex.test(lowerText)) {
        if (!extractedMap.has(skill.id)) {
          extractedMap.set(skill.id, {
            skill,
            confidence: 1.0,
            matchedVia: term,
            section: sectionType
          });
        }
        break;
      }
    }

    // Semantic vector similarity for paraphrased skills
    if (!extractedMap.has(skill.id)) {
      const skillVector = createSemanticVector(`${skill.name} ${skill.aliases.join(' ')} ${skill.description}`);
      const textVector = createSemanticVector(lowerText);
      const similarity = computeCosineSimilarity(skillVector, textVector);

      // If very strong semantic affinity (> 0.72)
      if (similarity >= 0.72) {
        extractedMap.set(skill.id, {
          skill,
          confidence: Number(similarity.toFixed(2)),
          matchedVia: `Semantic match (${Math.round(similarity * 100)}%)`,
          section: sectionType
        });
      }
    }
  }

  return Array.from(extractedMap.values());
}

// -------------------------------------------------------------
// 4. SEMANTIC SKILL MATCHING & FIT SCORING
// -------------------------------------------------------------
export function analyzeFit(
  resumeText: string,
  jobDescriptionText: string
): FitScoreAnalysis {
  const sections = classifyJobDescriptionSections(jobDescriptionText);

  // Extract from JD sections
  const requiredExtracted = extractSkillsFromText(sections.requiredText, 'required');
  const preferredExtracted = extractSkillsFromText(sections.preferredText, 'preferred');
  const generalExtracted = extractSkillsFromText(sections.generalText, 'general');

  // Consolidate JD skills (avoid duplicates, prioritize required)
  const jdSkillMap = new Map<string, { skill: SkillDefinition; reqType: 'required' | 'preferred' }>();

  for (const item of requiredExtracted) {
    jdSkillMap.set(item.skill.id, { skill: item.skill, reqType: 'required' });
  }

  for (const item of generalExtracted) {
    // If not in required, and general text has it, treat as required if required list is empty
    if (!jdSkillMap.has(item.skill.id)) {
      const reqType = requiredExtracted.length === 0 ? 'required' : 'preferred';
      jdSkillMap.set(item.skill.id, { skill: item.skill, reqType });
    }
  }

  for (const item of preferredExtracted) {
    if (!jdSkillMap.has(item.skill.id)) {
      jdSkillMap.set(item.skill.id, { skill: item.skill, reqType: 'preferred' });
    }
  }

  // Extract resume skills
  const resumeExtracted = extractSkillsFromText(resumeText, 'resume');
  const resumeSkillIds = new Set(resumeExtracted.map(r => r.skill.id));
  const resumeVector = createSemanticVector(resumeText);

  const matchedSkills: SkillMatchResult[] = [];
  const missingSkills: SkillMatchResult[] = [];

  let requiredWeightSum = 0;
  let matchedRequiredWeight = 0;
  let preferredWeightSum = 0;
  let matchedPreferredWeight = 0;

  for (const { skill, reqType } of jdSkillMap.values()) {
    const isDirectMatch = resumeSkillIds.has(skill.id);
    const weight = skill.importanceWeight || 1.0;

    let similarityScore = 0;
    let snippet = '';

    if (isDirectMatch) {
      similarityScore = 1.0;
      snippet = `Exact / Alias match found in resume for "${skill.name}"`;
    } else {
      // Check semantic similarity against resume
      const skillRepr = `${skill.name} ${skill.aliases.join(' ')}`;
      const skillVec = createSemanticVector(skillRepr);
      const sim = computeCosineSimilarity(skillVec, resumeVector);

      if (sim >= 0.70) {
        similarityScore = Number(sim.toFixed(2));
        snippet = `Semantic synonym correlation (${Math.round(sim * 100)}%) in resume context`;
      }
    }

    const isMatched = similarityScore >= 0.70;

    if (reqType === 'required') {
      requiredWeightSum += weight;
      if (isMatched) {
        matchedRequiredWeight += weight * (similarityScore >= 0.9 ? 1.0 : similarityScore);
      }
    } else {
      preferredWeightSum += weight;
      if (isMatched) {
        matchedPreferredWeight += weight * (similarityScore >= 0.9 ? 1.0 : similarityScore);
      }
    }

    const matchRecord: SkillMatchResult = {
      skill,
      status: isMatched ? (similarityScore >= 0.85 ? 'matched' : 'partial') : 'missing',
      requirementType: reqType,
      similarityScore,
      matchedResumeSnippet: snippet,
      notes: isMatched
        ? `Recognized via semantic NLP parser (Score: ${(similarityScore * 100).toFixed(0)}%)`
        : `Key prerequisite for this role; add to roadmap.`
    };

    if (isMatched) {
      matchedSkills.push(matchRecord);
    } else {
      missingSkills.push(matchRecord);
    }
  }

  // Calculate Weighted Score
  // Required: 75%, Preferred: 25% (or 100% required if no preferred skills)
  let overallScore = 0;
  let reqPct = 100;
  let prefPct = 100;

  if (requiredWeightSum > 0) {
    reqPct = Math.round((matchedRequiredWeight / requiredWeightSum) * 100);
  }

  if (preferredWeightSum > 0) {
    prefPct = Math.round((matchedPreferredWeight / preferredWeightSum) * 100);
  }

  if (requiredWeightSum > 0 && preferredWeightSum > 0) {
    overallScore = Math.round(reqPct * 0.75 + prefPct * 0.25);
  } else if (requiredWeightSum > 0) {
    overallScore = reqPct;
  } else if (preferredWeightSum > 0) {
    overallScore = prefPct;
  } else {
    // If no specific skills parsed from JD
    overallScore = 70;
  }

  // Category breakdown
  const categoryTotals = new Map<string, { total: number; matched: number }>();
  for (const { skill } of jdSkillMap.values()) {
    const cat = skill.category;
    const curr = categoryTotals.get(cat) || { total: 0, matched: 0 };
    curr.total += 1;
    if (resumeSkillIds.has(skill.id)) {
      curr.matched += 1;
    }
    categoryTotals.set(cat, curr);
  }

  const categoryBreakdown = Array.from(categoryTotals.entries()).map(([category, stats]) => ({
    category,
    total: stats.total,
    matched: stats.matched,
    percentage: Math.round((stats.matched / stats.total) * 100)
  }));

  // Verdict determination
  let verdict: FitScoreAnalysis['verdict'] = 'Moderate Gap';
  let verdictDescription = '';

  if (overallScore >= 82) {
    verdict = 'Excellent Match';
    verdictDescription = 'High placement readiness! Student meets all core requirements and most preferred tech stacks.';
  } else if (overallScore >= 68) {
    verdict = 'Strong Fit';
    verdictDescription = 'Well-positioned candidate for this drive with a few targeted skill gaps in frameworks or cloud.';
  } else if (overallScore >= 45) {
    verdict = 'Moderate Gap';
    verdictDescription = 'Solid foundation, but missing critical mandatory skills required by the recruiting team.';
  } else {
    verdict = 'Critical Skills Missing';
    verdictDescription = 'Significant alignment gap. Urgent prerequisite bootcamp training recommended before campus interview.';
  }

  const totalRequiredCount = Array.from(jdSkillMap.values()).filter(x => x.reqType === 'required').length;
  const matchedRequiredCount = matchedSkills.filter(x => x.requirementType === 'required').length;
  const totalPreferredCount = Array.from(jdSkillMap.values()).filter(x => x.reqType === 'preferred').length;
  const matchedPreferredCount = matchedSkills.filter(x => x.requirementType === 'preferred').length;

  return {
    overallScore,
    requiredScore: reqPct,
    preferredScore: prefPct,
    totalRequiredCount,
    matchedRequiredCount,
    totalPreferredCount,
    matchedPreferredCount,
    matchedSkills,
    missingSkills,
    categoryBreakdown,
    verdict,
    verdictDescription
  };
}

// -------------------------------------------------------------
// 5. PREREQUISITE-BASED ROADMAP GENERATOR
// -------------------------------------------------------------
export function generateSkillRoadmap(
  missingSkills: SkillMatchResult[],
  studentKnownSkillIds: Set<string>
): RoadmapPlan {
  // Collect all skills that need to be learned, including missing prerequisites
  const skillsToLearn = new Map<string, SkillDefinition>();

  // Add all missing skills
  for (const m of missingSkills) {
    skillsToLearn.set(m.skill.id, m.skill);
  }

  // Also include any prerequisite skills that the student doesn't know yet!
  for (const m of missingSkills) {
    for (const prereqId of m.skill.prerequisites) {
      if (!studentKnownSkillIds.has(prereqId)) {
        const prereqSkill = SKILLS_MAP.get(prereqId);
        if (prereqSkill) {
          skillsToLearn.set(prereqId, prereqSkill);
        }
      }
    }
  }

  // Topological sorting into stages based on dependencies
  // Stage 1: Skills with 0 unfulfilled prerequisites
  // Stage 2: Skills whose prerequisites are fulfilled by known skills or Stage 1
  // Stage 3: Advanced/Cloud/System design skills
  const learnedInPlan = new Set<string>(studentKnownSkillIds);
  const remaining = new Map(skillsToLearn);
  const stages: RoadmapStage[] = [];

  const stageTitles = [
    'Stage 1: Core Prerequisites & Foundations',
    'Stage 2: Applied Engineering & Frameworks',
    'Stage 3: Advanced Systems & Cloud Deployments',
    'Stage 4: Placement Polishing & Mock Projects'
  ];

  let currentStageNumber = 1;

  while (remaining.size > 0 && currentStageNumber <= 4) {
    const currentStageSkills: {
      skill: SkillDefinition;
      estimatedHours: number;
      prerequisitesFulfilled: string[];
      resources: SkillDefinition['resources'];
    }[] = [];

    // Find all skills whose prerequisites are satisfied in learnedInPlan
    for (const [id, skill] of Array.from(remaining.entries())) {
      const allPrereqsMet = skill.prerequisites.every(p => learnedInPlan.has(p));

      // In later stages or if cyclic, force progression
      if (allPrereqsMet || currentStageNumber === 4 || (currentStageSkills.length === 0 && remaining.size <= 2)) {
        currentStageSkills.push({
          skill,
          estimatedHours: skill.estimatedHours,
          prerequisitesFulfilled: skill.prerequisites,
          resources: skill.resources
        });
        remaining.delete(id);
      }
    }

    // If no skill could be resolved (due to unresolved chain), pull lowest complexity skills
    if (currentStageSkills.length === 0 && remaining.size > 0) {
      const [firstId, firstSkill] = remaining.entries().next().value!;
      currentStageSkills.push({
        skill: firstSkill,
        estimatedHours: firstSkill.estimatedHours,
        prerequisitesFulfilled: firstSkill.prerequisites,
        resources: firstSkill.resources
      });
      remaining.delete(firstId);
    }

    // Add current stage skills to learned set
    for (const item of currentStageSkills) {
      learnedInPlan.add(item.skill.id);
    }

    const stageHours = currentStageSkills.reduce((acc, curr) => acc + curr.estimatedHours, 0);
    const durationWeeks = Math.max(1, Math.ceil(stageHours / 12)); // assuming ~12 hours/week of college prep

    stages.push({
      stageNumber: currentStageNumber,
      title: stageTitles[currentStageNumber - 1] || `Stage ${currentStageNumber}: Specialized Skills`,
      durationWeeks,
      description: `Complete these ${currentStageSkills.length} essential skill(s) before advancing to higher-order interview questions.`,
      skills: currentStageSkills
    });

    currentStageNumber++;
  }

  const totalEstimatedHours = stages.reduce(
    (sum, st) => sum + st.skills.reduce((s, sk) => s + sk.estimatedHours, 0),
    0
  );
  const estimatedWeeks = stages.reduce((sum, st) => sum + st.durationWeeks, 0);

  const immediateNextSteps = stages.length > 0 && stages[0].skills.length > 0
    ? [
        `Begin with ${stages[0].skills[0].skill.name} (${stages[0].skills[0].estimatedHours} hrs) using the linked free resources.`,
        `Build a mini hands-on project demonstrating ${stages[0].skills.map(s => s.skill.name).join(' and ')}.`,
        `Push commits to your public GitHub profile and update your placement resume bullets.`
      ]
    : ['You meet all target skills for this job description! Focus on mock interview problem solving.'];

  return {
    totalEstimatedHours,
    estimatedWeeks,
    stages,
    immediateNextSteps
  };
}
