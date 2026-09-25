import React from 'react';
import { 
  Compass, 
  GraduationCap, 
  Building2, 
  BookOpen, 
  HelpCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'student' | 'placement' | 'catalog' | 'viva';
  setActiveTab: (tab: 'student' | 'placement' | 'catalog' | 'viva') => void;
  studentName?: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, studentName }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 via-blue-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  ThiranPathai
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  திறன் பாதை
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                AI Skill Gap Engine & Prerequisite Roadmap for Campus Placements
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'student'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Roadmap</span>
            </button>

            <button
              onClick={() => setActiveTab('placement')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'placement'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span className="hidden md:inline">Placement Cell (TPO)</span>
              <span className="md:hidden">TPO</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'catalog'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Explore 150+ Skills & Resources"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden lg:inline">Skill Catalog</span>
            </button>

            <button
              onClick={() => setActiveTab('viva')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'viva'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200'
              }`}
              title="Project Review / Viva Defense Mode"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="font-semibold text-xs sm:text-sm">Viva Defense</span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};
