import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Briefcase, 
  Download, 
  Search, 
  Filter, 
  GraduationCap, 
  Layers, 
  Clock, 
  Flame,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { SAMPLE_JOB_DESCRIPTIONS, SampleJobDescription } from '../data/sampleData';
import { BATCH_STUDENTS, BatchStudent } from '../data/batchData';
import { SKILLS_MAP } from '../data/skillsDataset';
import { analyzeFit } from '../lib/skillEngine';

export const PlacementCellDashboard: React.FC = () => {
  const [selectedJdId, setSelectedJdId] = useState<string>('amazon_sde1');
  const [customJdText, setCustomJdText] = useState<string>(SAMPLE_JOB_DESCRIPTIONS[0].rawText);
  const [companyName, setCompanyName] = useState<string>(SAMPLE_JOB_DESCRIPTIONS[0].company);
  const [roleTitle, setRoleTitle] = useState<string>(SAMPLE_JOB_DESCRIPTIONS[0].role);

  // Filters for student cohort
  const [branchFilter, setBranchFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<BatchStudent | null>(null);

  // Handle switching company drive
  const handleSelectDrive = (jd: SampleJobDescription) => {
    setSelectedJdId(jd.id);
    setCustomJdText(jd.rawText);
    setCompanyName(jd.company);
    setRoleTitle(jd.role);
    setSelectedStudentForDetail(null);
  };

  // Perform Batch Evaluation against current JD
  const batchEvaluation = useMemo(() => {
    const studentEvals = BATCH_STUDENTS.map(student => {
      const studentSkillsText = student.skills
        .map(id => {
          const sk = SKILLS_MAP.get(id);
          return sk ? `${sk.name} ${sk.aliases.join(' ')}` : id;
        })
        .join(', ');
      const fullText = `${student.resumeSnippet}\nTechnical Competencies: ${studentSkillsText}`;

      const analysis = analyzeFit(fullText, customJdText);

      return {
        student,
        analysis,
        fitScore: analysis.overallScore,
        verdict: analysis.verdict,
        matchedCount: analysis.matchedSkills.length,
        missingCount: analysis.missingSkills.length,
        matchedSkills: analysis.matchedSkills,
        missingSkills: analysis.missingSkills
      };
    });

    const total = studentEvals.length;
    const avgScore = Math.round(studentEvals.reduce((s, curr) => s + curr.fitScore, 0) / (total || 1));
    const ready = studentEvals.filter(s => s.fitScore >= 75);
    const moderate = studentEvals.filter(s => s.fitScore >= 50 && s.fitScore < 75);
    const critical = studentEvals.filter(s => s.fitScore < 50);

    // Aggregate missing skills across the batch
    const missingFreq = new Map<string, { count: number; name: string; category: string; hours: number }>();

    for (const item of studentEvals) {
      for (const m of item.missingSkills) {
        const id = m.skill.id;
        const cur = missingFreq.get(id) || {
          count: 0,
          name: m.skill.name,
          category: m.skill.category,
          hours: m.skill.estimatedHours
        };
        cur.count += 1;
        missingFreq.set(id, cur);
      }
    }

    const rankedMissing = Array.from(missingFreq.entries())
      .map(([id, d]) => ({
        id,
        name: d.name,
        category: d.category,
        count: d.count,
        hours: d.hours,
        percentage: Math.round((d.count / total) * 100)
      }))
      .sort((a, b) => b.count - a.count);

    // Recommended training bootcamps
    const recommendedBootcamps = rankedMissing.slice(0, 4).map((item, idx) => ({
      title: `${item.name} Rapid Masterclass`,
      skillName: item.name,
      category: item.category,
      affectedStudents: item.count,
      affectedPct: item.percentage,
      estimatedHours: item.hours,
      sessions: Math.ceil(item.hours / 6),
      urgency: idx === 0 ? 'Urgent' : idx <= 2 ? 'High' : 'Medium'
    }));

    return {
      studentEvals,
      total,
      avgScore,
      readyCount: ready.length,
      moderateCount: moderate.length,
      criticalCount: critical.length,
      readyPct: Math.round((ready.length / total) * 100),
      rankedMissing,
      recommendedBootcamps
    };
  }, [customJdText]);

  // Filter students
  const filteredStudents = useMemo(() => {
    return batchEvaluation.studentEvals.filter(item => {
      const matchBranch = branchFilter === 'ALL' || item.student.branch === branchFilter;
      const matchQuery =
        searchQuery === '' ||
        item.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.student.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBranch && matchQuery;
    });
  }, [batchEvaluation, branchFilter, searchQuery]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-blue-950 p-6 sm:p-8 rounded-3xl text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <Building2 className="w-3.5 h-3.5" />
                University Placement Cell (TPO) Suite
              </span>
              <span className="text-xs text-blue-200">
                Batch Skill Gap & Readiness Analytics
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">
              Pre-Drive Cohort Skill Gap Analysis
            </h1>
            <p className="text-sm text-blue-100/80 mt-1">
              Select or paste any visiting recruiter&apos;s Job Description. The engine evaluates the entire university batch in real-time to pinpoint curriculum deficits and recommend training bootcamps before day-1 recruitment.
            </p>
          </div>

          {/* Recruiter Selector Dropdown */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 min-w-[280px]">
            <label className="text-xs uppercase font-bold text-blue-200 block mb-1.5">
              Select Upcoming Campus Drive:
            </label>
            <div className="space-y-1.5">
              {SAMPLE_JOB_DESCRIPTIONS.map(jd => (
                <button
                  key={jd.id}
                  onClick={() => handleSelectDrive(jd)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                    selectedJdId === jd.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white/5 hover:bg-white/15 text-blue-100'
                  }`}
                >
                  <span className="truncate">{jd.company} ({jd.role.split(' ')[0]})</span>
                  <span className="text-[10px] opacity-80 shrink-0 font-mono ml-1">{jd.ctc.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cohort Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Batch Size</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {batchEvaluation.total} <span className="text-sm font-normal text-slate-500">Students</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            CSE, IT, ECE, AI&DS (2025 Graduating)
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Cohort Avg. Fit</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {batchEvaluation.avgScore}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Against {companyName} ({roleTitle})
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Drive-Ready (&gt;75%)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600">
            {batchEvaluation.readyCount} <span className="text-sm font-normal text-slate-500">({batchEvaluation.readyPct}%)</span>
          </div>
          <div className="text-xs text-emerald-700 mt-1 font-medium">
            Eligible for direct technical interview
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Needs Bootcamp</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-rose-600">
            {batchEvaluation.moderateCount + batchEvaluation.criticalCount}{' '}
            <span className="text-sm font-normal text-slate-500">
              ({100 - batchEvaluation.readyPct}%)
            </span>
          </div>
          <div className="text-xs text-rose-600 mt-1 font-medium">
            Requires targeted skill intervention
          </div>
        </div>

      </div>

      {/* Aggregate Batch Missing Skills & Recommended Bootcamps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Ranked Batch Missing Skills */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Most Commonly Missing Skills in Batch
              </h3>
              <p className="text-xs text-slate-500">
                Ranked by frequency of deficit among the {batchEvaluation.total} candidates
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              Curriculum Blindspots
            </span>
          </div>

          <div className="space-y-3">
            {batchEvaluation.rankedMissing.slice(0, 7).map((skill, idx) => (
              <div key={skill.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                      #{idx + 1}
                    </span>
                    <span className="font-bold text-slate-900">{skill.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      ({skill.category})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-rose-600">
                      {skill.count} of {batchEvaluation.total} ({skill.percentage}%)
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      skill.percentage >= 70
                        ? 'bg-rose-500'
                        : skill.percentage >= 45
                        ? 'bg-amber-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recommended TPO Training Bootcamps */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Recommended Bootcamps
                  </h3>
                  <p className="text-xs text-slate-500">
                    Immediate training sessions to maximize offers
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {batchEvaluation.recommendedBootcamps.map((camp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-indigo-100 bg-linear-to-r from-indigo-50/50 to-white"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-indigo-950">
                      {camp.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        camp.urgency === 'Urgent'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {camp.urgency}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-600 mt-2">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <strong>{camp.affectedStudents}</strong> students affected
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {camp.sessions} sessions ({camp.estimatedHours}h)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                alert(`Placement Cell Action Plan: Scheduled 4 masterclass bootcamps for ${companyName} recruitment drive. Notice generated for 20 students.`);
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Schedule Bootcamps for Placement Batch</span>
            </button>
          </div>
        </div>

      </div>

      {/* Student Cohort Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Table Controls */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Batch Student Readiness Roster
            </h3>
            <p className="text-xs text-slate-500">
              Evaluated against {companyName} — {roleTitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search name or roll no..."
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white w-48"
              />
            </div>

            {/* Branch Filter */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              {['ALL', 'CSE', 'IT', 'ECE', 'AI & DS'].map(branch => (
                <button
                  key={branch}
                  onClick={() => setBranchFilter(branch)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                    branchFilter === branch
                      ? 'bg-white text-slate-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {branch}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Branch</th>
                <th className="py-3 px-4">CGPA</th>
                <th className="py-3 px-4">Fit Score</th>
                <th className="py-3 px-4">Status & Verdict</th>
                <th className="py-3 px-4">Gaps Count</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map(item => {
                const s = item.student;
                return (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{s.rollNo}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium text-slate-700">
                        {s.branch} (Sec {s.section})
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                      {s.cgpa}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${
                          item.fitScore >= 75
                            ? 'text-emerald-600'
                            : item.fitScore >= 50
                            ? 'text-blue-600'
                            : 'text-rose-600'
                        }`}>
                          {item.fitScore}%
                        </span>
                        <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.fitScore >= 75
                                ? 'bg-emerald-500'
                                : item.fitScore >= 50
                                ? 'bg-blue-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${item.fitScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.fitScore >= 75
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.fitScore >= 50
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {item.verdict}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-600">
                      <span className="font-semibold text-emerald-600">{item.matchedCount} matched</span>,{' '}
                      <span className="font-semibold text-rose-600">{item.missingCount} missing</span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedStudentForDetail(s)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-medium transition-colors"
                      >
                        Inspect Gaps
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Student Detailed Gap Modal */}
      {selectedStudentForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs uppercase font-bold text-blue-600">
                  Individual Candidate Audit
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedStudentForDetail.name} ({selectedStudentForDetail.rollNo})
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedStudentForDetail.branch} • CGPA: {selectedStudentForDetail.cgpa} • {selectedStudentForDetail.email}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudentForDetail(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 mb-4 border border-slate-100">
              <strong className="text-slate-900">Current Resume Highlight:</strong>{' '}
              {selectedStudentForDetail.resumeSnippet}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase text-emerald-700 mb-1.5">
                  Verified Skills for {companyName}:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudentForDetail.skills.map(id => {
                    const sk = SKILLS_MAP.get(id);
                    return (
                      <span key={id} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
                        {sk?.name || id}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => setSelectedStudentForDetail(null)}
                  className="w-full py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Close Inspection
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
