import React, { useState, useEffect } from 'react';
import {
  Mic2,
  Play,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Award,
  Layers,
  Send,
  RefreshCw,
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const InterviewSimulatorPage = () => {
  const { user } = useAuth();
  const [track, setTrack] = useState('sde');
  const [company, setCompany] = useState('Amazon');
  const [role, setRole] = useState('Software Development Engineer');

  // Interview session state
  const [interview, setInterview] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const startNewInterview = async () => {
    setLoading(true);
    setEvaluation(null);
    setStudentAnswer('');
    setTimerSeconds(0);
    setCurrentIdx(0);
    try {
      const data = await api.generateInterview(track, company, role);
      setInterview(data);
      setIsTimerRunning(true);
    } catch (err) {
      console.error('Failed to start interview:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluate = async () => {
    if (!studentAnswer || studentAnswer.trim().length < 15) return;
    setEvaluating(true);
    try {
      const currentQ = interview.questions[currentIdx];
      const result = await api.evaluateAnswer({
        questionId: currentQ.id,
        questionText: currentQ.questionText,
        studentAnswer,
        track,
      });
      setEvaluation(result);
      setIsTimerRunning(false);
    } catch (err) {
      console.error('Evaluation error:', err);
    } finally {
      setEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < (interview?.questions.length || 0)) {
      setCurrentIdx(currentIdx + 1);
      setStudentAnswer('');
      setEvaluation(null);
      setTimerSeconds(0);
      setIsTimerRunning(true);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const loadSampleAnswer = () => {
    if (track === 'sde') {
      setStudentAnswer(
        "To detect a cycle in a linked list in O(1) space, I would use Floyd's Tortoise and Hare algorithm. We initialize two pointers: slow moving 1 step and fast moving 2 steps. If there is a cycle, fast will eventually lap slow and they will collide. This takes O(N) time and O(1) auxiliary space, whereas using a Hash Set would require O(N) memory."
      );
    } else if (track === 'core') {
      setStudentAnswer(
        "In a banking transfer from A to B, Atomicity guarantees either both debit and credit occur or neither does. Consistency ensures total account balances remain invariant. Isolation prevents concurrent transactions from seeing intermediate dirty reads, and Durability ensures the committed transaction survives crash via Write-Ahead Logging."
      );
    } else {
      setStudentAnswer(
        "During our 6th-semester capstone project, our payment webhook faced race conditions under concurrent load. As the backend lead, I implemented distributed Redis mutex locks and idempotency keys with exponential backoff. As a result, our payment failure rate dropped from 14% to 0.05%, delivering a reliable prototype for our campus symposium."
      );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-slate-900">AI Mock Interview Simulator</h1>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
            Campus Interview Rubric
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Practice dynamic technical, core CS, and STAR behavioral interview rounds with instant feedback on time complexity, accuracy, and structure.
        </p>
      </div>

      {/* Track Selection & Setup Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto md:flex-1">
          {/* Track selection */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Interview Track
            </label>
            <select
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="sde">SDE Technical Round (DSA & Algos)</option>
              <option value="core">Core CS (OS, DBMS, Networks, OOPs)</option>
              <option value="behavioral">STAR Behavioral / Amazon LP</option>
              <option value="hr">HR & Cultural Alignment Round</option>
            </select>
          </div>

          {/* Company Target */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Target Company Pattern
            </label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="Amazon">Amazon (Bar Raiser & STAR Focus)</option>
              <option value="Google">Google (DSA & Clean Code)</option>
              <option value="Microsoft">Microsoft (OOPs & Data Structures)</option>
              <option value="TCS Digital">TCS Digital (Core CS & SQL)</option>
              <option value="Deloitte">Deloitte / Consulting (Agile & Cloud)</option>
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Candidate Target Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <button
          onClick={startNewInterview}
          disabled={loading}
          className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-md transition flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-white" />
          )}
          <span>{interview ? 'Restart Interview' : 'Start Mock Interview'}</span>
        </button>
      </div>

      {/* Active Interview Panel */}
      {interview ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Question & Answer Panel (2 Cols) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              {/* Question metadata & timer */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    Question {currentIdx + 1} of {interview.questions.length}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-600">
                    {interview.questions[currentIdx].category}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{formatTime(timerSeconds)}</span>
                </div>
              </div>

              {/* The Question */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-900 font-semibold text-sm sm:text-base leading-relaxed">
                "{interview.questions[currentIdx].questionText}"
              </div>

              {/* Student Answer Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Your Explanation / Solution
                  </label>
                  <button
                    onClick={loadSampleAnswer}
                    className="text-[11px] text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Paste Sample High-Scoring Response
                  </button>
                </div>

                <textarea
                  rows={7}
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                  placeholder="Explain your thought process clearly. State your approach, edge cases, data structures, and Big-O Time & Space complexity..."
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400">
                  {studentAnswer.split(/\s+/).filter(Boolean).length} words
                </span>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleEvaluate}
                    disabled={evaluating || studentAnswer.trim().length < 15}
                    className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-md transition flex items-center space-x-2 disabled:opacity-50"
                  >
                    {evaluating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Evaluating Rubric...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit for AI Evaluation</span>
                      </>
                    )}
                  </button>

                  {currentIdx + 1 < interview.questions.length && (
                    <button
                      onClick={handleNextQuestion}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition flex items-center space-x-1"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Evaluation Scorecard */}
            {evaluation && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span>Candidate Performance Rubric</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500 font-medium">Evaluation Score:</span>
                    <span
                      className={`text-base font-extrabold px-3 py-1 rounded-xl ${
                        evaluation.score >= 75
                          ? 'bg-emerald-100 text-emerald-800'
                          : evaluation.score >= 50
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {evaluation.score} / 100
                    </span>
                  </div>
                </div>

                {/* STAR Method Adherence */}
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 font-medium">
                  {evaluation.starAdherence}
                </div>

                {/* Strengths & Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      ✓ What You Did Well
                    </h4>
                    {evaluation.strengths.map((str, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-start space-x-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                      ⚠️ Constructive Critique
                    </h4>
                    {evaluation.improvements.map((imp, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-start space-x-2">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{imp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Golden Model Answer */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="text-xs font-bold text-slate-800">
                    💡 Ideal Answer Structure (Tier-1 Candidate Benchmark):
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {evaluation.modelAnswer}
                  </p>
                </div>

                {/* Follow-up Question */}
                <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1">
                  <div className="text-xs font-bold text-indigo-900">
                    🎯 Interviewer Follow-up Probe:
                  </div>
                  <p className="text-xs text-indigo-800 italic">
                    "{evaluation.followUpQuestion}"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (1 Col): Interviewer Persona & Guidelines */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
                  {company.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{company} Interviewer</h4>
                  <p className="text-[11px] text-slate-500">Senior Engineering Lead</p>
                </div>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                "I evaluate candidates not just on getting the final correct answer, but on how clearly you explain trade-offs between Time and Space complexity, edge-case vigilance, and active communication."
              </div>
            </div>

            {/* Rubric Checklist */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Evaluation Pillars
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>State Time & Space Complexity explicitly</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Verify negative numbers / null inputs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Use STAR framework for behavioral rounds</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State / Call to Action */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
            <Mic2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Ready to simulate your campus round?</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Choose your target company track above and click <strong>"Start Mock Interview"</strong> to experience realistic placement questions with real-time feedback.
          </p>
          <button
            onClick={startNewInterview}
            className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-md transition"
          >
            Start Mock Interview Now
          </button>
        </div>
      )}
    </div>
  );
};
