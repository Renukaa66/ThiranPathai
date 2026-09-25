import React, { useState } from 'react';
import { SKILLS_DATASET, SKILLS_MAP, SkillDefinition } from '../data/skillsDataset';
import { 
  Search, 
  BookOpen, 
  ExternalLink, 
  Youtube, 
  Clock, 
  GitBranch, 
  Filter, 
  Star 
} from 'lucide-react';

export const SkillsCatalogModal: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'Programming Languages',
    'Web & Frameworks',
    'Databases & Storage',
    'Cloud & DevOps',
    'Core CS & DSA',
    'AI, ML & Data',
    'System Design & APIs',
    'Soft Skills & Aptitude'
  ];

  const filteredSkills = SKILLS_DATASET.filter(skill => {
    const matchCat = selectedCategory === 'ALL' || skill.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.aliases.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
              <BookOpen className="w-3.5 h-3.5" />
              Curated Placement Taxonomy
            </span>
            <span className="text-xs text-slate-500">
              {SKILLS_DATASET.length} Indexed Technical Competencies
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Engineering Skill Dataset & Free Curated Syllabi
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Browse the foundational ontology used by ThiranPathai for NLP entity extraction, alias normalization, and DAG topological prerequisite mapping.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search skill, alias (e.g. REST API, Docker, DSA)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-800"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.slice(0, 5).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'All Skills' : cat.split('&')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map(skill => (
          <div
            key={skill.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {skill.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                  <Clock className="w-3 h-3 text-slate-400" />
                  ~{skill.estimatedHours} hrs
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1">
                {skill.name}
              </h3>

              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                {skill.description}
              </p>

              {/* Aliases recognized */}
              <div className="mb-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  NLP Synonyms & Aliases:
                </span>
                <div className="flex flex-wrap gap-1">
                  {skill.aliases.slice(0, 4).map((alias, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px]"
                    >
                      {alias}
                    </span>
                  ))}
                  {skill.aliases.length > 4 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{skill.aliases.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Prerequisites */}
              {skill.prerequisites.length > 0 && (
                <div className="mb-3 text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-500 flex items-center gap-1 mb-1">
                    <GitBranch className="w-3 h-3 text-slate-400" />
                    Prerequisites:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {skill.prerequisites.map(pId => {
                      const pName = SKILLS_MAP.get(pId)?.name || pId;
                      return (
                        <span
                          key={pId}
                          className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]"
                        >
                          {pName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Verified Free Learning Resources */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                Free Curated Links:
              </span>
              <div className="space-y-1">
                {skill.resources.map((res, rIdx) => (
                  <a
                    key={rIdx}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-xs text-blue-700 transition-colors"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      {res.type === 'youtube' ? (
                        <Youtube className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      ) : (
                        <BookOpen className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      )}
                      <span className="truncate">{res.title}</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
