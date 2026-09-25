import React, { useState } from 'react';
import { 
  RoadmapPlan, 
  RoadmapStage 
} from '../lib/skillEngine';
import { 
  Clock, 
  Calendar, 
  ExternalLink, 
  Youtube, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  RotateCw, 
  ArrowRight,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Check
} from 'lucide-react';
import { SKILLS_MAP } from '../data/skillsDataset';

interface RoadmapViewProps {
  roadmap: RoadmapPlan;
  onSkillStatusChange?: (skillId: string, status: 'todo' | 'in_progress' | 'done') => void;
  skillStatuses?: Record<string, 'todo' | 'in_progress' | 'done'>;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  roadmap,
  onSkillStatusChange,
  skillStatuses: initialStatuses = {}
}) => {
  // Local state for interactive skill tracker
  const [skillStatuses, setSkillStatuses] = useState<Record<string, 'todo' | 'in_progress' | 'done'>>(initialStatuses);

  const toggleStatus = (skillId: string) => {
    const current = skillStatuses[skillId] || 'todo';
    let next: 'todo' | 'in_progress' | 'done' = 'todo';
    if (current === 'todo') next = 'in_progress';
    else if (current === 'in_progress') next = 'done';
    else next = 'todo';

    const updated = { ...skillStatuses, [skillId]: next };
    setSkillStatuses(updated);
    if (onSkillStatusChange) {
      onSkillStatusChange(skillId, next);
    }
  };

  // Calculate completed progress
  let totalSkillsInRoadmap = 0;
  let doneCount = 0;
  let inProgressCount = 0;
  let completedHours = 0;

  roadmap.stages.forEach(st => {
    st.skills.forEach(sk => {
      totalSkillsInRoadmap++;
      const stt = skillStatuses[sk.skill.id] || 'todo';
      if (stt === 'done') {
        doneCount++;
        completedHours += sk.estimatedHours;
      } else if (stt === 'in_progress') {
        inProgressCount++;
        completedHours += Math.round(sk.estimatedHours * 0.4);
      }
    });
  });

  const completionPct = totalSkillsInRoadmap > 0
    ? Math.round((doneCount / totalSkillsInRoadmap) * 100)
    : 100;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
      
      {/* Top Banner */}
      <div className="p-6 bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <GitBranch className="w-3.5 h-3.5" />
                Prerequisite Dependency Graph
              </span>
              <span className="text-xs text-blue-200">
                Topological Stage Sorting
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              Personalized Learning Roadmap
            </h3>
            <p className="text-sm text-blue-100/80 mt-1 max-w-2xl">
              Foundations are scheduled first so you never hit a wall trying to learn advanced frameworks without core prerequisites.
            </p>
          </div>

          {/* Time & Duration summary */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/15">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-300" />
              <div>
                <div className="text-[10px] uppercase font-bold text-blue-200">Total Study</div>
                <div className="text-base font-bold">{roadmap.totalEstimatedHours} Hours</div>
              </div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-300" />
              <div>
                <div className="text-[10px] uppercase font-bold text-blue-200">Timeline</div>
                <div className="text-base font-bold">~{roadmap.estimatedWeeks} Weeks</div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Tracker Progress Bar */}
        <div className="mt-6 pt-4 border-t border-white/15">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-blue-200 font-medium flex items-center gap-2">
              <span>Interactive Progress:</span>
              <strong className="text-white">{doneCount} Mastered</strong>,
              <span className="text-amber-300">{inProgressCount} Learning</span>,
              <span className="text-slate-300">{totalSkillsInRoadmap - doneCount - inProgressCount} To Go</span>
            </span>
            <span className="font-bold text-teal-300">{completionPct}% Prepared</span>
          </div>
          <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-linear-to-r from-teal-400 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${completionPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Immediate Next Steps */}
      {roadmap.immediateNextSteps.length > 0 && (
        <div className="p-4 bg-amber-50/80 border-b border-amber-200/60 flex items-start gap-3">
          <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-0.5">
              Placement Cell Recommended Action
            </div>
            <ul className="text-xs text-amber-900/90 space-y-1">
              {roadmap.immediateNextSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="font-bold">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Stages List */}
      <div className="p-6 space-y-8">
        {roadmap.stages.length === 0 ? (
          <div className="text-center py-12">
            <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-800">
              No Gaps Detected for this Role!
            </h4>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
              Your resume exhibits full coverage for the extracted skills of this job description. Practice mock DSA and system design interviews to secure the offer.
            </p>
          </div>
        ) : (
          roadmap.stages.map((stage) => (
            <div key={stage.stageNumber} className="relative">
              
              {/* Stage Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    {stage.stageNumber}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      {stage.title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {stage.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-slate-600 self-start sm:self-auto bg-slate-100 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>
                    Est. {stage.durationWeeks} {stage.durationWeeks === 1 ? 'Week' : 'Weeks'} (~10 hrs/wk)
                  </span>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stage.skills.map((item) => {
                  const currentStatus = skillStatuses[item.skill.id] || 'todo';

                  return (
                    <div
                      key={item.skill.id}
                      className={`p-4 rounded-xl border transition-all ${
                        currentStatus === 'done'
                          ? 'bg-emerald-50/60 border-emerald-300'
                          : currentStatus === 'in_progress'
                          ? 'bg-blue-50/60 border-blue-300'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {item.skill.category}
                            </span>
                            <span className="text-xs text-slate-500 font-mono">
                              ~{item.estimatedHours} hrs
                            </span>
                          </div>
                          <h5 className="text-sm font-bold text-slate-900">
                            {item.skill.name}
                          </h5>
                        </div>

                        {/* Interactive Status Toggle Button */}
                        <button
                          onClick={() => toggleStatus(item.skill.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                            currentStatus === 'done'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : currentStatus === 'in_progress'
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                          }`}
                          title="Click to cycle status: To Learn -> Learning -> Done"
                        >
                          {currentStatus === 'done' && (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Done</span>
                            </>
                          )}
                          {currentStatus === 'in_progress' && (
                            <>
                              <RotateCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Learning</span>
                            </>
                          )}
                          {currentStatus === 'todo' && (
                            <>
                              <Circle className="w-3.5 h-3.5 text-slate-400" />
                              <span>To Learn</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {item.skill.description}
                      </p>

                      {/* Prerequisites tags */}
                      {item.prerequisitesFulfilled.length > 0 && (
                        <div className="mb-3 text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-slate-600">Requires first:</span>
                          {item.prerequisitesFulfilled.map((pId) => {
                            const pName = SKILLS_MAP.get(pId)?.name || pId;
                            return (
                              <span
                                key={pId}
                                className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]"
                              >
                                {pName}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      {/* Curated Free Resources */}
                      <div className="pt-2 border-t border-slate-100 space-y-1">
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Free Verified Resources:
                        </div>
                        {item.resources.map((res, rIdx) => (
                          <a
                            key={rIdx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-100 text-xs text-blue-700 hover:text-blue-900 group transition-colors"
                          >
                            <span className="flex items-center gap-1.5 truncate">
                              {res.type === 'youtube' ? (
                                <Youtube className="w-3.5 h-3.5 text-red-500 shrink-0" />
                              ) : (
                                <BookOpen className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              )}
                              <span className="truncate">{res.title}</span>
                            </span>
                            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0 ml-1" />
                          </a>
                        ))}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
