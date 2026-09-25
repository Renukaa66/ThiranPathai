import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Layers, 
  GitBranch, 
  Cpu, 
  BookOpen, 
  Code2,
  RefreshCw,
  Send
} from 'lucide-react';

export const VivaDefenseModal: React.FC = () => {
  const [aiLoading, setAiLoading] = useState(false);
  const [vivaData, setVivaData] = useState<any>(null);

  const fetchAiVivaGuidance = async () => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai-viva-guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: 'ThiranPathai Architecture' })
      });
      const data = await res.json();
      setVivaData(data.guidance);
    } catch (err) {
      console.error('Error fetching guidance:', err);
    } finally {
      setAiLoading(false);
    }
  };

  const coreArchitectureModules = [
    {
      title: '1. Text Preprocessing & Section Classifier',
      desc: 'Parses raw resume (via pdf-parse) and JD text. Uses regular expression boundary analyzers to segregate "Required / Must Have" qualifications from "Preferred / Nice-to-Have" competencies.'
    },
    {
      title: '2. NLP Skill Extraction & Alias Ontology',
      desc: 'Matches tokens against 150+ canonical tech entities with hundreds of aliases (e.g. "RESTful services" -> "REST API", "Containerization" -> "Docker", "LeetCode" -> "DSA"). Handles special token boundaries like C++, C#, .NET, Node.js.'
    },
    {
      title: '3. Vector Cosine Similarity Matching',
      desc: 'Constructs normalized sub-word and character n-gram vectors. Calculates cosine similarity dot product with a 0.70 - 0.75 threshold to recognize semantic synonyms without requiring exact string identity.'
    },
    {
      title: '4. Weighted Dual-Tier Fit Scoring',
      desc: 'Weights mandatory requirements at 75% and preferred skills at 25%, factoring in domain importance weights. Yields an overall Fit % and categorical domain competency breakdown.'
    },
    {
      title: '5. Prerequisite DAG Topological Sort',
      desc: 'Models skills and dependencies as a Directed Acyclic Graph (e.g. Java -> Spring Boot; Linux -> Docker -> K8s). Topologically schedules missing skills so students learn foundations before advanced tools.'
    },
    {
      title: '6. Placement Cell (TPO) Aggregation',
      desc: 'Evaluates entire student batches against an upcoming company drive, outputting cohort readiness % and the highest frequency missing skills for targeted university bootcamps.'
    }
  ];

  const standardVivaQuestions = [
    {
      q: 'Why did you build ThiranPathai instead of using a standard ATS scanner?',
      a: 'Standard commercial ATS scanners perform rigid keyword search. If a student writes "RESTful web services" or "Spring MVC" while the job posting says "REST API" or "Spring Boot", traditional tools mark it as 0% match. ThiranPathai utilizes semantic NLP ontologies and vector cosine similarity to capture conceptual equivalence, then generates a concrete prerequisite-ordered roadmap.'
    },
    {
      q: 'How does the Cosine Similarity formula work in your application?',
      a: 'The text and skill aliases are converted into high-dimensional normalized term and character n-gram frequency vectors (vecA, vecB). Cosine similarity measures the cosine of the angle between them: (vecA · vecB) / (||vecA|| * ||vecB||). A score above 0.75 indicates strong semantic correlation.'
    },
    {
      q: 'Explain the algorithm used to order missing skills in the roadmap.',
      a: 'We implement Topological Sorting on a Directed Acyclic Graph (DAG) of skill dependencies. If skill A (e.g., Spring Boot) lists skill B (Java) as a prerequisite, and the student knows neither, the engine schedules Java into Stage 1 (Foundations) and Spring Boot into Stage 2 (Applied Frameworks).'
    },
    {
      q: 'How does the Weighted Scoring model prevent biased fit scores?',
      a: 'Not all requirements in a job description are equal. Mandatory skills ("Must Have") are weighted at 75% of the total score, while bonus skills ("Nice to Have") contribute 25%. This prevents a candidate from scoring 80% just by knowing optional tools while missing the core programming language.'
    },
    {
      q: 'How is this beneficial to a university placement director (TPO)?',
      a: 'Instead of finding out about student rejection after interview day, the TPO can test an incoming company JD (e.g. TCS Digital, Amazon, Zoho) against the entire batch beforehand. It reveals which skills are most frequently missing across the cohort (e.g. "Docker missing in 70% of students"), allowing the college to run immediate 3-day bootcamps to maximize offers.'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-linear-to-r from-indigo-900 via-purple-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-md">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Project Review & Viva Examiner Mode
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">
            System Architecture & Academic Viva Guide
          </h1>
          <p className="text-sm text-indigo-100/80 mt-1 leading-relaxed">
            Use this section during your project evaluation, external viva, or faculty review. It lays out the algorithmic workflow, mathematical formulas, and prepared viva questions.
          </p>
        </div>
      </div>

      {/* Mathematical & Architectural Pillars */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-600" />
          Technical Architecture Workflow
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreArchitectureModules.map((mod, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 mb-1.5">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Formula Box */}
        <div className="mt-6 p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 text-xs font-mono text-indigo-950 space-y-2">
          <div className="font-bold text-indigo-900 font-sans text-sm">
            Core Computational Formulations:
          </div>
          <div>
            <strong>1. Semantic Cosine Similarity:</strong> cos(θ) = (u · v) / (||u|| ||v||) ≥ 0.75
          </div>
          <div>
            <strong>2. Weighted Placement Fit:</strong> Score = (MatchedReq / TotalReq) * 75 + (MatchedPref / TotalPref) * 25
          </div>
          <div>
            <strong>3. Prerequisite In-Degree Order:</strong> stage(Skill_i) = max(stage(Prereq_j)) + 1
          </div>
        </div>
      </div>

      {/* Frequently Asked Viva Questions */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Standard Project Review / Viva Questions & Answers
            </h2>
            <p className="text-xs text-slate-500">
              High-scoring answers to explain design decisions to external examiners
            </p>
          </div>

          <button
            onClick={fetchAiVivaGuidance}
            disabled={aiLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
          >
            {aiLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Generating AI Insights...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Generate Live AI Viva Advice</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-4">
          {standardVivaQuestions.map((qa, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 text-[10px]">
                  Q{idx + 1}
                </span>
                <span>{qa.q}</span>
              </h3>
              <p className="text-xs text-slate-700 pl-7 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-indigo-900">Answer: </strong>
                {qa.a}
              </p>
            </div>
          ))}
        </div>

        {/* Dynamic Gemini Response if fetched */}
        {vivaData && (
          <div className="mt-6 p-5 rounded-2xl bg-indigo-50 border border-indigo-200">
            <div className="flex items-center gap-2 mb-2 text-indigo-950 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              AI Studio Real-Time Architecture Assessment
            </div>
            <pre className="text-xs text-indigo-900 font-mono whitespace-pre-wrap bg-white p-4 rounded-xl border border-indigo-200">
              {JSON.stringify(vivaData, null, 2)}
            </pre>
          </div>
        )}

      </div>

    </div>
  );
};
