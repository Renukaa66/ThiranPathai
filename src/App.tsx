/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { StudentWorkspace } from './components/StudentWorkspace';
import { PlacementCellDashboard } from './components/PlacementCellDashboard';
import { SkillsCatalogModal } from './components/SkillsCatalogModal';
import { VivaDefenseModal } from './components/VivaDefenseModal';
import { Compass, GraduationCap, Building2, BookOpen, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'student' | 'placement' | 'catalog' | 'viva'>('student');

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'student' && <StudentWorkspace />}
        {activeTab === 'placement' && <PlacementCellDashboard />}
        {activeTab === 'catalog' && <SkillsCatalogModal />}
        {activeTab === 'viva' && <VivaDefenseModal />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm">
                  ThiranPathai — AI Skill Roadmap for Placements
                </span>
                <span className="text-xs text-slate-400 block">
                  NLP Skill Extraction • Semantic Cosine Matching • Topological Prerequisite Ordering
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <button
                onClick={() => setActiveTab('student')}
                className="hover:text-blue-600 transition-colors"
              >
                Student View
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveTab('placement')}
                className="hover:text-blue-600 transition-colors"
              >
                Placement Cell (TPO)
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveTab('catalog')}
                className="hover:text-blue-600 transition-colors"
              >
                150+ Skills Catalog
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveTab('viva')}
                className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
              >
                Viva Defense Guide
              </button>
            </div>

          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <div>
              Designed for university campus recruitment drives & engineering project reviews.
            </div>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
              <span>for engineering students</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
