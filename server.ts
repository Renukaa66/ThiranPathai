import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { PDFParse } from 'pdf-parse';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

import { SKILLS_DATASET, SKILLS_MAP } from './src/data/skillsDataset';
import { BATCH_STUDENTS } from './src/data/batchData';
import {
  analyzeFit,
  extractSkillsFromText,
  generateSkillRoadmap,
  classifyJobDescriptionSections
} from './src/lib/skillEngine';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Multer for PDF memory upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Initialize Google GenAI client if key exists
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// -------------------------------------------------------------
// API ROUTES
// -------------------------------------------------------------

// 1. Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    system: 'ThiranPathai — AI Placement Skill Engine',
    timestamp: new Date().toISOString(),
    aiEngineConfigured: !!aiClient
  });
});

// 2. Skill dataset
app.get('/api/skills', (req: Request, res: Response) => {
  res.json({
    total: SKILLS_DATASET.length,
    skills: SKILLS_DATASET
  });
});

// 3. Parse resume (multipart upload or JSON base64 / plain text)
app.post('/api/parse-resume', upload.single('resumeFile'), async (req: Request, res: Response) => {
  try {
    let extractedText = '';

    // Check if multipart file was uploaded
    if (req.file) {
      if (req.file.mimetype === 'application/pdf' || req.file.originalname.toLowerCase().endsWith('.pdf')) {
        const parser = new PDFParse({ data: req.file.buffer });
        const parsed = await parser.getText();
        extractedText = parsed.text;
        await parser.destroy();
      } else {
        // Plain text file
        extractedText = req.file.buffer.toString('utf-8');
      }
    } else if (req.body.base64Pdf) {
      // Base64 encoded PDF
      const pdfBuffer = Buffer.from(req.body.base64Pdf.replace(/^data:application\/pdf;base64,/, ''), 'base64');
      const parser = new PDFParse({ data: pdfBuffer });
      const parsed = await parser.getText();
      extractedText = parsed.text;
      await parser.destroy();
    } else if (req.body.resumeText) {
      extractedText = req.body.resumeText;
    } else {
      return res.status(400).json({ error: 'Please provide a PDF resume file or plain text resume.' });
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ error: 'Unable to extract text from the provided resume.' });
    }

    // Extract skills
    const extractedSkills = extractSkillsFromText(extractedText, 'resume');

    res.json({
      success: true,
      textLength: extractedText.length,
      extractedText,
      extractedSkillsCount: extractedSkills.length,
      extractedSkills
    });
  } catch (error: any) {
    console.error('Resume parse error:', error);
    res.status(500).json({
      error: 'Failed to process resume file: ' + (error.message || 'Unknown error')
    });
  }
});

// 4. Parse Job Description sections
app.post('/api/parse-jd', (req: Request, res: Response) => {
  const { jdText } = req.body;
  if (!jdText) {
    return res.status(400).json({ error: 'Missing job description text' });
  }

  const sections = classifyJobDescriptionSections(jdText);
  const requiredSkills = extractSkillsFromText(sections.requiredText, 'required');
  const preferredSkills = extractSkillsFromText(sections.preferredText, 'preferred');

  res.json({
    sections,
    requiredSkills,
    preferredSkills
  });
});

// 5. Semantic matching & roadmap endpoint
app.post('/api/match', (req: Request, res: Response) => {
  const { resumeText, jobDescriptionText } = req.body;

  if (!resumeText || !jobDescriptionText) {
    return res.status(400).json({
      error: 'Both resumeText and jobDescriptionText are required for analysis.'
    });
  }

  // 1. Run skill fit analysis
  const analysis = analyzeFit(resumeText, jobDescriptionText);

  // 2. Extract resume known skill IDs
  const resumeExtracted = extractSkillsFromText(resumeText, 'resume');
  const studentKnownIds = new Set(resumeExtracted.map(r => r.skill.id));

  // 3. Generate prerequisite-based roadmap for missing skills
  const roadmap = generateSkillRoadmap(analysis.missingSkills, studentKnownIds);

  res.json({
    success: true,
    analysis,
    roadmap,
    studentKnownSkills: Array.from(studentKnownIds).map(id => SKILLS_MAP.get(id)?.name).filter(Boolean)
  });
});

// 6. Placement Cell: Get batch students
app.get('/api/batch-students', (req: Request, res: Response) => {
  res.json({
    total: BATCH_STUDENTS.length,
    students: BATCH_STUDENTS
  });
});

// 7. Placement Cell: Aggregated Batch Analysis for a Company Drive
app.post('/api/batch-analysis', (req: Request, res: Response) => {
  const { jobDescriptionText, companyName, roleName } = req.body;

  if (!jobDescriptionText) {
    return res.status(400).json({ error: 'Missing job description text for batch drive.' });
  }

  // Extract skills from JD
  const sections = classifyJobDescriptionSections(jobDescriptionText);
  const requiredSkills = extractSkillsFromText(sections.requiredText, 'required');
  const preferredSkills = extractSkillsFromText(sections.preferredText, 'preferred');
  const allJdSkills = [...requiredSkills, ...preferredSkills];

  const jdSkillIds = new Set(allJdSkills.map(s => s.skill.id));

  // Evaluate each student in the batch
  const studentResults = BATCH_STUDENTS.map(student => {
    // Generate synthetic resume representation from student's skills and snippet
    const studentSkillsText = student.skills
      .map(id => {
        const sk = SKILLS_MAP.get(id);
        return sk ? `${sk.name} ${sk.aliases.join(' ')}` : id;
      })
      .join(', ');
    const fullStudentText = `${student.resumeSnippet}\nTechnical Skills: ${studentSkillsText}`;

    const analysis = analyzeFit(fullStudentText, jobDescriptionText);

    return {
      student,
      fitScore: analysis.overallScore,
      verdict: analysis.verdict,
      matchedCount: analysis.matchedSkills.length,
      missingCount: analysis.missingSkills.length,
      matchedSkillNames: analysis.matchedSkills.map(m => m.skill.name),
      missingSkillNames: analysis.missingSkills.map(m => m.skill.name),
      categoryBreakdown: analysis.categoryBreakdown
    };
  });

  // Calculate cohort aggregates
  const totalStudents = studentResults.length;
  const avgFitScore = Math.round(
    studentResults.reduce((acc, curr) => acc + curr.fitScore, 0) / totalStudents
  );

  const readyForInterview = studentResults.filter(s => s.fitScore >= 75);
  const moderateTraining = studentResults.filter(s => s.fitScore >= 50 && s.fitScore < 75);
  const criticalIntervention = studentResults.filter(s => s.fitScore < 50);

  // Missing skills frequency count
  const missingSkillFrequency = new Map<string, { count: number; skill: any }>();

  for (const res of studentResults) {
    for (const name of res.missingSkillNames) {
      const existing = missingSkillFrequency.get(name);
      if (existing) {
        existing.count += 1;
      } else {
        const found = SKILLS_DATASET.find(s => s.name === name);
        missingSkillFrequency.set(name, { count: 1, skill: found });
      }
    }
  }

  // Sort missing skills by frequency (descending)
  const rankedMissingSkills = Array.from(missingSkillFrequency.entries())
    .map(([skillName, data]) => ({
      skillName,
      category: data.skill?.category || 'General',
      missingInCount: data.count,
      missingPercentage: Math.round((data.count / totalStudents) * 100),
      estimatedTrainingHours: data.skill?.estimatedHours || 20,
      importanceWeight: data.skill?.importanceWeight || 1.2
    }))
    .sort((a, b) => b.missingInCount - a.missingInCount);

  // Recommended placement bootcamps
  const recommendedBootcamps = rankedMissingSkills.slice(0, 4).map((item, idx) => ({
    bootcampTitle: `${item.skillName} Intensive Bootcamp for Placements`,
    targetSkill: item.skillName,
    affectedStudents: item.missingInCount,
    percentageAffected: item.missingPercentage,
    suggestedDuration: `${Math.ceil(item.estimatedTrainingHours / 5)} Sessions (${item.estimatedTrainingHours} hrs)`,
    priority: idx === 0 ? 'Urgent' : idx <= 2 ? 'High' : 'Medium'
  }));

  res.json({
    companyName: companyName || 'Campus Drive',
    roleName: roleName || 'Software Role',
    totalStudents,
    avgFitScore,
    cohortBreakdown: {
      readyCount: readyForInterview.length,
      moderateCount: moderateTraining.length,
      criticalCount: criticalIntervention.length,
      readyPercentage: Math.round((readyForInterview.length / totalStudents) * 100)
    },
    rankedMissingSkills,
    recommendedBootcamps,
    studentResults
  });
});

// 8. AI-Powered Viva & Project Review Guide (Gemini server-side API)
app.post('/api/ai-viva-guidance', async (req: Request, res: Response) => {
  try {
    const { topic } = req.body;

    if (!aiClient) {
      // Provide high quality deterministic academic fallback if key not configured
      return res.json({
        fallback: true,
        guidance: {
          projectTitle: 'ThiranPathai — AI Skill Roadmap for Campus Placements',
          coreConcepts: [
            {
              concept: 'Semantic Skill Matching vs Keyword Matching',
              explanation:
                'Traditional ATS uses exact string search (fails if resume says "RESTful web services" and JD says "REST API"). ThiranPathai utilizes NLP tokenization, canonical skill ontologies, and cosine similarity over sub-word n-gram embeddings to recognize semantic equivalents.'
            },
            {
              concept: 'Weighted Scoring Model',
              explanation:
                'Skills in JDs have unequal significance. The algorithm weights Mandatory/Required qualifications at 75% and Desired/Preferred at 25%, factoring in domain importance weights.'
            },
            {
              concept: 'Topological Prerequisite Ordering',
              explanation:
                'Simply listing missing skills overwhelms students. ThiranPathai models dependencies as a Directed Acyclic Graph (DAG) (e.g. Java -> Spring Boot; Linux -> Docker -> Kubernetes), sorting them into progressive learning stages.'
            },
            {
              concept: 'Placement Cell (TPO) Aggregation',
              explanation:
                'College placement offices can test an incoming company JD against 100s of student profiles to detect batch-wide curriculum blindspots and run targeted training bootcamps before recruitment drives begin.'
            }
          ],
          sampleVivaQuestions: [
            {
              q: 'How does the system handle synonyms like "ReactJS" and "React"?',
              a: 'Through a curated canonical skill ontology with 150+ tech skills mapped to known aliases, plus cosine vector similarity on character n-grams to catch morphological variations.'
            },
            {
              q: 'Why is Spring Boot placed in Stage 2 if a student is missing both Java and Spring Boot?',
              a: 'The graph dependency engine detects that Java is a declared prerequisite of Spring Boot. It topologically schedules Java into Stage 1 and Spring Boot into Stage 2.'
            },
            {
              q: 'How does the placement cell dashboard benefit the university?',
              a: 'Rather than subjective feedback, TPOs get empirical data on batch readiness percentages and exact skill deficit frequencies across students.'
            }
          ]
        }
      });
    }

    const prompt = `You are a university computer science placement coordinator and senior software architect. 
Provide a clear, high-scoring viva explanation for the student's project: "ThiranPathai — AI Skill Roadmap for Placements".
Focus on:
1. Architecture explanation (NLP skill extraction, semantic cosine similarity matching, DAG prerequisite sorting).
2. 4 realistic external examiner viva questions with concise answers.
3. Industry placement preparation advice.
Return valid JSON.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsedJson = JSON.parse(response.text || '{}');
    res.json({
      fallback: false,
      guidance: parsedJson
    });
  } catch (error: any) {
    console.error('Gemini guidance error:', error);
    res.status(500).json({ error: error.message || 'Error generating viva guidance' });
  }
});

// -------------------------------------------------------------
// VITE SETUP (Full Stack Integration)
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[ThiranPathai] Full-Stack server running at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
