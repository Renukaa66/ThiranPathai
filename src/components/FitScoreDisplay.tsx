import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  Award,
  Zap,
  Info
} from 'lucide-react';
import { FitScoreAnalysis } from '../lib/skillEngine';

interface FitScoreDisplayProps {
  analysis: FitScoreAnalysis;
  targetRoleName?: string;
  targetCompany?: string;
}

export const FitScoreDisplay: React.FC<FitScoreDisplayProps> = ({
  analysis,
  targetRoleName = 'Target Role',
  targetCompany = 'Target Company'
}) => {
  const {
    overallScore,
    requiredScore,
    preferredScore,
    totalRequiredCount,
    matchedRequiredCount,
    totalPreferredCount,
    matchedPreferredCount,
    matchedSkills,
    missingSkills,
    categoryBreakdown,
    verdict,
    verdictDescription
  } = analysis;

  // Colors based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 border-emerald-500 bg-emerald-50';
    if (score >= 65) return 'text-blue-600 border-blue-500 bg-blue-50';
    if (score >= 45) return 'text-amber-600 border-amber-500 bg-amber-50';
    return 'text-rose-600 border-rose-500 bg-rose-50';
  };

  const getVerdictBadge = () => {
    if (overallScore >= 80) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          {verdict}
        </span>
      );
    }
    if (overallScore >= 65) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
          {verdict}
        </span>
      );
    }
    if (overallScore >= 45) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          {verdict}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
        <XCircle className="w-3.5 h-3.5 text-rose-600" />
        {verdict}
      </span>
    );
  };

  // SVG circular gauge
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Header bar */}
      <div className="p-6 border-b border-slate-100 bg-linear-to-r from-slate-50 via-white to-blue-50/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Semantic Match Analysis
              </span>
              {getVerdictBadge()}
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {targetRoleName} <span className="text-slate-400 font-normal">at</span> {targetCompany}
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              {verdictDescription}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto">
            <div className="text-center px-3 border-r border-slate-100">
              <div className="text-xs text-slate-500">Matched</div>
              <div className="text-lg font-bold text-emerald-600">
                {matchedSkills.length} <span className="text-xs text-slate-400 font-normal">skills</span>
              </div>
            </div>
            <div className="text-center px-3">
              <div className="text-xs text-slate-500">Missing</div>
              <div className="text-lg font-bold text-rose-600">
                {missingSkills.length} <span className="text-xs text-slate-400 font-normal">gaps</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Circular Score Gauge */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="text-slate-200"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className={
                    overallScore >= 80
                      ? 'text-emerald-500'
                      : overallScore >= 65
                      ? 'text-blue-500'
                      : overallScore >= 45
                      ? 'text-amber-500'
                      : 'text-rose-500'
                  }
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  {overallScore}%
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Fit Score
                </span>
              </div>
            </div>

            <div className="w-full mt-4 space-y-2 text-xs">
              <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-slate-600 font-medium">Must-Have (Required)</span>
                <span className="font-bold text-slate-900">
                  {matchedRequiredCount}/{totalRequiredCount} ({requiredScore}%)
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-slate-600 font-medium">Nice-to-Have (Preferred)</span>
                <span className="font-bold text-slate-900">
                  {matchedPreferredCount}/{totalPreferredCount} ({preferredScore}%)
                </span>
              </div>
            </div>
          </div>

          {/* Category Breakdown Bars */}
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-slate-400" />
                Domain Competency Breakdown
              </h4>
              <span className="text-xs text-slate-500">
                Weighted: 75% Required + 25% Preferred
              </span>
            </div>

            <div className="space-y-2.5">
              {categoryBreakdown.map((cat, idx) => (
                <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-semibold text-slate-800">{cat.category}</span>
                    <span className="text-slate-500 font-medium">
                      {cat.matched} of {cat.total} matched ({cat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        cat.percentage >= 75
                          ? 'bg-emerald-500'
                          : cat.percentage >= 50
                          ? 'bg-blue-500'
                          : cat.percentage > 0
                          ? 'bg-amber-500'
                          : 'bg-rose-400'
                      }`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Side-by-side Matched vs Missing Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-slate-100">
          
          {/* Matched Skills Box */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/70">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <h4 className="font-bold text-emerald-950 text-sm">
                  Matched Skills ({matchedSkills.length})
                </h4>
              </div>
              <span className="text-xs text-emerald-700 font-medium">
                Verified from Resume
              </span>
            </div>

            {matchedSkills.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-white rounded-lg border border-dashed border-slate-300">
                No overlapping skills detected yet between resume and target job requirements.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((item, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-white text-emerald-900 border border-emerald-200 shadow-2xs group relative"
                    title={item.matchedResumeSnippet}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="font-semibold">{item.skill.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono">
                      {Math.round(item.similarityScore * 100)}%
                    </span>
                    {item.requirementType === 'required' && (
                      <span className="text-[10px] text-emerald-800 font-semibold uppercase">
                        req
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Missing Skills Box */}
          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/70">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                  !
                </div>
                <h4 className="font-bold text-rose-950 text-sm">
                  Missing Skill Gaps ({missingSkills.length})
                </h4>
              </div>
              <span className="text-xs text-rose-700 font-medium">
                Scheduled for Roadmap
              </span>
            </div>

            {missingSkills.length === 0 ? (
              <div className="p-3 bg-white rounded-lg border border-emerald-200 text-center">
                <p className="text-xs text-emerald-800 font-medium">
                  🎉 Fantastic! You possess all declared skills for this job description.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((item, idx) => (
                  <div
                    key={idx}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-white border shadow-2xs ${
                      item.requirementType === 'required'
                        ? 'text-rose-900 border-rose-300 bg-rose-50/30'
                        : 'text-amber-900 border-amber-300 bg-amber-50/30'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.requirementType === 'required' ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                    />
                    <span className="font-semibold">{item.skill.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                        item.requirementType === 'required'
                          ? 'bg-rose-100 text-rose-800 font-bold'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.requirementType === 'required' ? 'MUST HAVE' : 'NICE TO HAVE'}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      ~{item.skill.estimatedHours}h
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
