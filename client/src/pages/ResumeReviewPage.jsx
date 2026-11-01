import React, { useState } from 'react';
import {
  FileCheck2,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  RefreshCw,
  Award,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const ResumeReviewPage = () => {
  const { user } = useAuth();
  const [resumeText, setResumeText] = useState(user?.resumeText || '');
  const [targetRole, setTargetRole] = useState('Software Development Engineer');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Bullet rewriter state
  const [bulletInput, setBulletInput] = useState('');
  const [bulletRewrites, setBulletRewrites] = useState(null);
  const [rewriting, setRewriting] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const sampleFresherResume = `AARAV SHARMA
aarav.sharma@campus.edu | +91 9876543210 | Bangalore, India | linkedin.com/in/aarav-sharma | github.com/aarav-code

EDUCATION
National Institute of Technology, B.Tech in Computer Science and Engineering (2023 - 2027)
CGPA: 8.45 / 10.0 | Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Networks.

TECHNICAL SKILLS
Languages: C++, Java, JavaScript, Python, SQL
Frameworks & Databases: React.js, Node.js, Express.js, MongoDB, Git, Docker, RESTful APIs

EXPERIENCE & PROJECTS
• Campus Placement Portal (Full Stack Lead):
  Architected a full-stack MERN portal to track company recruitment drives. Implemented JWT authentication and real-time status updates, reducing placement query latency by 40% and serving 1,200+ students.
• Distributed Job Queue Engine:
  Engineered an asynchronous job queue in Node.js and Redis processing 1,000+ jobs/minute with exponential backoff and error tracking, maintaining 99.8% uptime.
• Algorithmic Problem Solving:
  Solved 450+ questions across LeetCode and GeeksforGeeks with focus on Dynamic Programming, Binary Trees, and Graph Traversal.`;

  const handleAnalyze = async () => {
    if (!resumeText || resumeText.trim().length < 50) {
      setError('Please provide at least 50 characters of resume content for ATS analysis.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await api.analyzeResume(resumeText, targetRole);
      setAnalysis(data);
    } catch (err) {
      setError(err.message || 'Analysis failed. Please check the text.');
    } finally {
      setLoading(false);
    }
  };

  const handleRewriteBullet = async () => {
    if (!bulletInput || bulletInput.trim().length < 6) return;
    setRewriting(true);
    try {
      const data = await api.rewriteBullet(bulletInput, targetRole);
      setBulletRewrites(data.suggestions);
    } catch (err) {
      console.error(err);
    } finally {
      setRewriting(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900">AI Resume ATS Reviewer</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
              X-Y-Z Scoring Formula
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Test your resume against campus recruiter ATS parsers, detect missing keywords, and quantify your project impacts.
          </p>
        </div>

        <button
          onClick={() => {
            setResumeText(sampleFresherResume);
            setError('');
          }}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition border border-slate-300 self-start md:self-auto"
        >
          Load High-Scoring Sample Resume
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Analysis Input Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Resume Textarea & Settings */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Paste Resume Text / Project Content
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500 font-medium">Target Role:</span>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Software Development Engineer">SDE 1 / Software Engineer</option>
                <option value="Full Stack Developer">Full Stack Web Developer</option>
                <option value="Data Analyst / Scientist">Data Analyst / Scientist</option>
                <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer</option>
                <option value="Generic Tech Fresher">General Tech Fresher</option>
              </select>
            </div>
          </div>

          <textarea
            rows={12}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your raw resume text here (Education, Skills, Experience, Projects)..."
            className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono text-slate-800 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              {resumeText.split(/\s+/).filter(Boolean).length} words detected
            </span>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-md transition flex items-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Parsing ATS Rubrics...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run ATS Placement Audit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column (1 Col): Score dial & Quick Rubric */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-center">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Composite ATS Score
            </div>

            <div className="my-4 inline-flex items-center justify-center">
              <div
                className={`w-32 h-32 rounded-full border-8 flex flex-col items-center justify-center ${
                  analysis
                    ? analysis.atsScore >= 80
                      ? 'border-emerald-500 text-emerald-700'
                      : analysis.atsScore >= 60
                      ? 'border-amber-500 text-amber-700'
                      : 'border-rose-500 text-rose-700'
                    : 'border-slate-200 text-slate-400'
                }`}
              >
                <span className="text-3xl font-extrabold">
                  {analysis ? analysis.atsScore : '--'}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  / 100
                </span>
              </div>
            </div>

            <div className="text-xs font-semibold text-slate-700">
              {analysis ? (
                analysis.atsScore >= 80 ? (
                  <span className="text-emerald-600 font-bold">
                    ✓ Strong Campus Placement Readiness
                  </span>
                ) : analysis.atsScore >= 60 ? (
                  <span className="text-amber-600 font-bold">
                    ⚠️ Moderate: Needs More Metrics & Verbs
                  </span>
                ) : (
                  <span className="text-rose-600 font-bold">
                    ✕ High Risk: Lacks Required Structure
                  </span>
                )
              ) : (
                'Run audit to evaluate ATS score'
              )}
            </div>

            {analysis && (
              <div className="mt-4 pt-4 border-t border-slate-100 text-left space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Sections Complete</span>
                  <strong>{analysis.breakdown.sectionCompleteness.score}/30</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Quantifiable Impact</span>
                  <strong>{analysis.breakdown.quantifiableImpact.score}/25</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Action Verbs</span>
                  <strong>{analysis.breakdown.actionVerbs.score}/20</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Keyword Matching</span>
                  <strong>{analysis.breakdown.keywordMatching.score}/25</strong>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="font-bold flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Google's X-Y-Z Resume Formula:</span>
            </div>
            <p className="leading-relaxed text-amber-800">
              "Accomplished <strong>[X]</strong>, as measured by <strong>[Y]</strong>, by doing <strong>[Z]</strong>."
            </p>
            <p className="text-[11px] text-amber-700 italic">
              Example: "Reduced database query latency by 45% (Y) on the student portal (X) by implementing Redis indexing and connection pooling (Z)."
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Details: Keywords, Strengths, Recommendations */}
      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
          {/* Matched & Missing Keywords */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Keyword Density for {analysis.targetRole}</span>
            </h3>

            <div>
              <div className="text-xs font-semibold text-emerald-800 mb-2">
                ✓ Matched Keywords Found ({analysis.matchedKeywords.length}):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysis.matchedKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {analysis.missingKeywords.length > 0 && (
              <div className="pt-2">
                <div className="text-xs font-semibold text-rose-800 mb-2">
                  ✕ Missing Recommended Keywords:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.missingKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Strengths & Recommendations */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Campus Recruiter Observations</span>
            </h3>

            <div className="space-y-2">
              {analysis.strengths.map((str, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{str}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="text-xs font-bold text-slate-800">Critical Action Items:</div>
              {analysis.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Bullet Point Enhancer */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2 border border-blue-400/20">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>AI Bullet Point Rewriter</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Turn Weak Bullets into High-Impact Placement Statements
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Replace passive college project phrasing with industry-grade metrics and architectural depth.
          </p>
        </div>

        {/* Input box */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={bulletInput}
            onChange={(e) => setBulletInput(e.target.value)}
            placeholder="e.g. Worked on a hospital management portal using React and MongoDB..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/15 transition"
          />
          <button
            onClick={handleRewriteBullet}
            disabled={rewriting || !bulletInput}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center space-x-2 disabled:opacity-50 shrink-0"
          >
            {rewriting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Rewriting...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Enhance Bullet</span>
              </>
            )}
          </button>
        </div>

        {/* Quick sample chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span>Try quick templates:</span>
          {[
            'Created an ecommerce website using MERN stack',
            'Implemented machine learning model for image classification',
            'Made an Android chat application using Firebase',
          ].map((sample, i) => (
            <button
              key={i}
              onClick={() => {
                setBulletInput(sample);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] border border-white/10 transition"
            >
              "{sample}"
            </button>
          ))}
        </div>

        {/* Rewritten options */}
        {bulletRewrites && (
          <div className="space-y-4 pt-4 border-t border-white/10 animate-in fade-in duration-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300">
              3 High-Impact Rewritten Variations:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bulletRewrites.map((option, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 rounded-2xl p-4 border border-white/10 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{option.style}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/20">
                        {option.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                      "{option.rewritten}"
                    </p>
                    <p className="text-[11px] text-slate-400 mt-2 italic">
                      Why it works: {option.explanation}
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(option.rewritten, idx)}
                    className="w-full py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition flex items-center justify-center space-x-1.5"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-300" />
                        <span>Copy Statement</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
