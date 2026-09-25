import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Briefcase, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  RotateCcw,
  Zap,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_RESUMES, SAMPLE_JOB_DESCRIPTIONS, SampleResume, SampleJobDescription } from '../data/sampleData';
import { 
  analyzeFit, 
  generateSkillRoadmap, 
  FitScoreAnalysis, 
  RoadmapPlan,
  extractSkillsFromText,
  classifyJobDescriptionSections
} from '../lib/skillEngine';
import { FitScoreDisplay } from './FitScoreDisplay';
import { RoadmapView } from './RoadmapView';

export const StudentWorkspace: React.FC = () => {
  // Pre-load default student and JD
  const [selectedResumeId, setSelectedResumeId] = useState<string>('arjun_cse');
  const [resumeText, setResumeText] = useState<string>(SAMPLE_RESUMES[0].rawText);
  const [resumeFileName, setResumeFileName] = useState<string>('Arjun_Sharma_Resume.pdf');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [selectedJdId, setSelectedJdId] = useState<string>('amazon_sde1');
  const [jdText, setJdText] = useState<string>(SAMPLE_JOB_DESCRIPTIONS[0].rawText);
  const [targetCompany, setTargetCompany] = useState<string>(SAMPLE_JOB_DESCRIPTIONS[0].company);
  const [targetRole, setTargetRole] = useState<string>(SAMPLE_JOB_DESCRIPTIONS[0].role);

  // Analysis result state
  const [analysisResult, setAnalysisResult] = useState<FitScoreAnalysis | null>(null);
  const [roadmapResult, setRoadmapResult] = useState<RoadmapPlan | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Interactive skill statuses tracking
  const [skillStatuses, setSkillStatuses] = useState<Record<string, 'todo' | 'in_progress' | 'done'>>({});

  // Handle switching sample resumes
  const handleSelectSampleResume = (resume: SampleResume) => {
    setSelectedResumeId(resume.id);
    setResumeText(resume.rawText);
    setResumeFileName(`${resume.name.replace(/\s+/g, '_')}_Resume.pdf`);
    setUploadError(null);
  };

  // Handle switching sample JDs
  const handleSelectSampleJd = (jd: SampleJobDescription) => {
    setSelectedJdId(jd.id);
    setJdText(jd.rawText);
    setTargetCompany(jd.company);
    setTargetRole(jd.role);
  };

  // Handle real PDF file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    setResumeFileName(file.name);
    setSelectedResumeId('custom');

    try {
      const formData = new FormData();
      formData.append('resumeFile', file);

      const res = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Server failed to parse PDF');
      }

      const data = await res.json();
      if (data.extractedText) {
        setResumeText(data.extractedText);
      } else {
        throw new Error('No readable text returned from PDF');
      }
    } catch (err: any) {
      console.warn('PDF upload warning:', err.message);
      // Fallback: If network error or server unavailable, prompt user
      setUploadError(`Note: ${err.message}. You can paste resume plain text directly.`);
    } finally {
      setIsUploading(false);
    }
  };

  // Run Semantic Match & Roadmap Generation
  const handleRunAnalysis = () => {
    if (!resumeText.trim() || !jdText.trim()) {
      alert('Please provide both resume text and job description.');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate natural AI computation delay for smooth UX
    setTimeout(() => {
      try {
        const analysis = analyzeFit(resumeText, jdText);
        const resumeExtracted = extractSkillsFromText(resumeText, 'resume');
        const knownSkillIds = new Set(resumeExtracted.map(r => r.skill.id));
        const roadmap = generateSkillRoadmap(analysis.missingSkills, knownSkillIds);

        setAnalysisResult(analysis);
        setRoadmapResult(roadmap);

        // Smooth scroll to results
        setTimeout(() => {
          const resultsElem = document.getElementById('analysis-results-section');
          if (resultsElem) {
            resultsElem.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } catch (err: any) {
        console.error('Analysis error:', err);
        alert('Analysis error: ' + err.message);
      } finally {
        setIsAnalyzing(false);
      }
    }, 400);
  };

  // Preview extracted skills from current resume
  const liveResumeSkills = extractSkillsFromText(resumeText, 'resume');

  // Preview sections extracted from current JD
  const liveJdSections = classifyJobDescriptionSections(jdText);
  const liveRequiredSkills = extractSkillsFromText(liveJdSections.requiredText, 'required');
  const livePreferredSkills = extractSkillsFromText(liveJdSections.preferredText, 'preferred');

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Header */}
      <div className="bg-linear-to-b from-blue-50/70 via-white to-white p-6 sm:p-8 rounded-3xl border border-blue-100 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>NLP & Cosine Semantic Matching Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Target Your Campus Placement With Zero Blindspots
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Existing tools only do exact keyword matching. ThiranPathai uses natural language embeddings to understand that <code className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">REST API</code> and <code className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">RESTful services</code> are equivalent, calculates your placement fit, and constructs a prerequisite-ordered study roadmap.
          </p>
        </div>
      </div>

      {/* Input Stage: Resume & JD dual columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: Student Resume Input */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Student Resume
                </h2>
                <p className="text-xs text-slate-500">
                  Upload PDF or select sample student profile
                </p>
              </div>
            </div>

            {/* Quick Sample Selector */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-400 font-medium mr-1 hidden sm:inline">
                Preset:
              </span>
              {SAMPLE_RESUMES.map((res) => (
                <button
                  key={res.id}
                  onClick={() => handleSelectSampleResume(res)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                    selectedResumeId === res.id
                      ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  title={`${res.name} (${res.degree})`}
                >
                  {res.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Button & Dropzone */}
          <div className="mb-4">
            <label className="flex items-center justify-between p-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/60 hover:bg-blue-50/30 cursor-pointer transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-2xs">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    {isUploading ? 'Parsing Resume PDF...' : `Active: ${resumeFileName}`}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Click to browse your own PDF resume (parsed via pdf-parse)
                  </div>
                </div>
              </div>
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
              <span className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                Upload PDF
              </span>
            </label>

            {uploadError && (
              <p className="mt-1.5 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                {uploadError}
              </p>
            )}
          </div>

          {/* Text Area for Resume content */}
          <div className="flex-1 flex flex-col min-h-[220px]">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
              <span>Resume Text (Extracted / Editable)</span>
              <span className="text-[11px] font-mono text-slate-400">
                {resumeText.length} characters
              </span>
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => {
                setResumeText(e.target.value);
                setSelectedResumeId('custom');
              }}
              rows={9}
              className="w-full flex-1 p-3 rounded-xl border border-slate-200 bg-slate-50/50 font-mono text-xs text-slate-800 focus:bg-white focus:outline-blue-500 focus:ring-1 focus:ring-blue-500 leading-relaxed"
              placeholder="Paste student resume text here or upload PDF above..."
            />
          </div>

          {/* Extracted Resume Skills Preview */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                NLP Recognized Skills ({liveResumeSkills.length}):
              </span>
              <span className="text-[11px] text-slate-500">
                Automatic entity tagging
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {liveResumeSkills.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-700 font-medium border border-slate-200/80"
                >
                  {item.skill.name}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Target Job Description Input */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Target Job Description (JD)
                </h2>
                <p className="text-xs text-slate-500">
                  Select campus drive or paste company JD
                </p>
              </div>
            </div>

            {/* Quick Drive Selector */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-400 font-medium mr-1 hidden sm:inline">
                Drive:
              </span>
              {SAMPLE_JOB_DESCRIPTIONS.map((jd) => (
                <button
                  key={jd.id}
                  onClick={() => handleSelectSampleJd(jd)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                    selectedJdId === jd.id
                      ? 'bg-indigo-600 text-white font-semibold shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  title={`${jd.company} - ${jd.role} (${jd.ctc})`}
                >
                  {jd.company.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Company & Role Meta Info */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 font-medium bg-slate-50/50 focus:bg-white"
                placeholder="e.g. Amazon, Zoho, TCS..."
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Role / Title
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 font-medium bg-slate-50/50 focus:bg-white"
                placeholder="e.g. SDE-1, Systems Engineer..."
              />
            </div>
          </div>

          {/* Text Area for JD content */}
          <div className="flex-1 flex flex-col min-h-[220px]">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
              <span>Job Description Text</span>
              <span className="text-[11px] font-mono text-slate-400">
                {jdText.length} characters
              </span>
            </label>
            <textarea
              value={jdText}
              onChange={(e) => {
                setJdText(e.target.value);
                setSelectedJdId('custom');
              }}
              rows={9}
              className="w-full flex-1 p-3 rounded-xl border border-slate-200 bg-slate-50/50 font-mono text-xs text-slate-800 focus:bg-white focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-relaxed"
              placeholder="Paste job description text here..."
            />
          </div>

          {/* Section Classification Preview */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-bold border border-rose-200 text-[11px]">
                Must-Have: {liveRequiredSkills.length} skills
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-bold border border-amber-200 text-[11px]">
                Nice-to-Have: {livePreferredSkills.length} skills
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Auto section header detection
            </span>
          </div>

        </div>

      </div>

      {/* Central Action Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={handleRunAnalysis}
          disabled={isAnalyzing}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Semantic Fit & Sorting Prerequisites...</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              <span>Analyze Skill Fit & Generate Prerequisite Roadmap</span>
            </>
          )}
        </button>
      </div>

      {/* Analysis & Roadmap Results Display */}
      {analysisResult && roadmapResult && (
        <div id="analysis-results-section" className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600">
                Evaluation Output
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Campus Drive Alignment Report
              </h2>
            </div>
            <button
              onClick={() => {
                const resultsElem = document.getElementById('analysis-results-section');
                if (resultsElem) resultsElem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
            >
              Back to Top ↑
            </button>
          </div>

          {/* Fit Score Radial Gauge & Category Bar Cards */}
          <FitScoreDisplay
            analysis={analysisResult}
            targetRoleName={targetRole}
            targetCompany={targetCompany}
          />

          {/* Prerequisite Topological Roadmap & Free Resource Links */}
          <RoadmapView
            roadmap={roadmapResult}
            skillStatuses={skillStatuses}
            onSkillStatusChange={(id, st) => {
              setSkillStatuses(prev => ({ ...prev, [id]: st }));
            }}
          />
        </div>
      )}

    </div>
  );
};
