import React, { useState, useEffect } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Target,
  ArrowRight,
  Award,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { api } from '../services/api';

export const RoadmapPage = () => {
  const [tier, setTier] = useState('Super Dream (15+ LPA)');
  const [level, setLevel] = useState('Intermediate');
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    generatePlan();
  }, [tier, level]);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const data = await api.generateRoadmap({
        targetTier: tier,
        preparationLevel: level,
      });
      setRoadmap(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCheck = (key) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900">30-Day Placement Sprint Roadmap</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
              4-Week Curriculum
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Structured week-by-week preparation plan covering high-frequency DSA patterns, core CS subjects, and mock assessments.
          </p>
        </div>

        {/* Tier switcher */}
        <div className="flex items-center space-x-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs self-start md:self-auto">
          <span className="text-xs text-slate-500 font-medium px-2">Goal:</span>
          {['Super Dream (15+ LPA)', 'Dream (8-15 LPA)'].map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                tier === t
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.split(' ')[0]} {t.includes('Super') ? 'Super Dream' : 'Dream'}
            </button>
          ))}
        </div>
      </div>

      {/* Daily Routine Widget */}
      {roadmap && (
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 rounded-2xl p-6 text-white shadow-lg space-y-3 border border-blue-800/40">
          <div className="flex items-center space-x-2 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Recommended Daily Placement Sprint Schedule (2.5 Hours):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {roadmap.dailyHabitRecommendation.map((habit, idx) => (
              <div
                key={idx}
                className="bg-white/10 p-3 rounded-xl border border-white/10 backdrop-blur-xs flex items-center space-x-2.5"
              >
                <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center font-bold text-blue-300 text-[11px] shrink-0">
                  {idx + 1}
                </div>
                <span className="text-slate-200 font-medium">{habit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Week by Week Sprint Cards */}
      {roadmap && (
        <div className="space-y-6">
          {roadmap.weeks.map((week) => (
            <div
              key={week.weekNumber}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition space-y-4"
            >
              {/* Week header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 font-bold text-sm flex items-center justify-center shrink-0">
                    W{week.weekNumber}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Week {week.weekNumber}: {week.theme}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Core CS Focus: {week.coreCsFocus}
                    </p>
                  </div>
                </div>
              </div>

              {/* Milestones checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {week.milestones.map((milestone, idx) => {
                  const checkKey = `w${week.weekNumber}-m${idx}`;
                  const isChecked = !!checkedItems[checkKey];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(checkKey)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start space-x-3 ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                          : 'bg-slate-50/60 border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`text-xs font-medium leading-relaxed ${isChecked ? 'line-through text-slate-500' : ''}`}>
                        {milestone}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* High Frequency Problems to Solve */}
              {week.mustSolveProblems && (
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Target className="w-3.5 h-3.5 text-blue-600" />
                    <span>High-Yield Practice Problems for this Week:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {week.mustSolveProblems.map((p, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                      >
                        <span>{p.name}</span>
                        <span className="text-[10px] text-slate-500 font-normal">({p.platform})</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                            p.difficulty === 'Hard'
                              ? 'bg-rose-100 text-rose-800'
                              : p.difficulty === 'Medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {p.difficulty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
