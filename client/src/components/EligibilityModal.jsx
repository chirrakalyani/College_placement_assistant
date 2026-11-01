import React from 'react';
import { X, CheckCircle, AlertTriangle, Building2, Calendar, Award } from 'lucide-react';
import { TierBadge } from './StatusBadge';

export const EligibilityModal = ({ drive, result, onClose, onTrackApplication }) => {
  if (!drive || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xl text-white border border-white/20">
              {drive.companyName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold">{drive.companyName}</h3>
                <TierBadge tier={drive.tier} />
              </div>
              <p className="text-slate-300 text-sm">{drive.role} • {drive.ctc}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Evaluation Banner */}
        <div className={`px-6 py-4 border-b flex items-center space-x-3 ${
          result.isOverallEligible ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 'bg-amber-50 border-amber-100 text-amber-900'
        }`}>
          {result.isOverallEligible ? (
            <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
          )}
          <div>
            <h4 className="font-semibold text-sm">
              {result.isOverallEligible ? 'Eligible for Campus Drive' : 'Eligibility Warning / Criteria Not Met'}
            </h4>
            <p className="text-xs opacity-90 mt-0.5">{result.advice}</p>
          </div>
        </div>

        {/* Criteria Matrix */}
        <div className="p-6 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Placement Criteria Verification Matrix
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* CGPA */}
            <div className={`p-3.5 rounded-xl border ${
              result.checks.cgpa.eligible ? 'bg-slate-50 border-slate-200' : 'bg-rose-50 border-rose-200'
            }`}>
              <div className="text-xs text-slate-500 font-medium">Cutoff CGPA</div>
              <div className="text-lg font-bold text-slate-800 mt-0.5">
                {result.checks.cgpa.student} <span className="text-xs font-normal text-slate-500">/ min {result.checks.cgpa.required}</span>
              </div>
              <div className={`text-xs mt-1 font-medium ${result.checks.cgpa.eligible ? 'text-emerald-700' : 'text-rose-600'}`}>
                {result.checks.cgpa.eligible ? `✓ Met (${result.checks.cgpa.margin})` : '✕ Below Cutoff'}
              </div>
            </div>

            {/* Branch */}
            <div className={`p-3.5 rounded-xl border ${
              result.checks.branch.eligible ? 'bg-slate-50 border-slate-200' : 'bg-rose-50 border-rose-200'
            }`}>
              <div className="text-xs text-slate-500 font-medium">Branch Eligibility</div>
              <div className="text-sm font-bold text-slate-800 mt-1 truncate" title={result.checks.branch.student}>
                {result.checks.branch.student}
              </div>
              <div className={`text-xs mt-1 font-medium ${result.checks.branch.eligible ? 'text-emerald-700' : 'text-rose-600'}`}>
                {result.checks.branch.eligible ? '✓ Branch Approved' : '✕ Branch Excluded'}
              </div>
            </div>

            {/* Backlogs */}
            <div className={`p-3.5 rounded-xl border ${
              result.checks.backlogs.eligible ? 'bg-slate-50 border-slate-200' : 'bg-rose-50 border-rose-200'
            }`}>
              <div className="text-xs text-slate-500 font-medium">Active Backlogs</div>
              <div className="text-lg font-bold text-slate-800 mt-0.5">
                {result.checks.backlogs.student} <span className="text-xs font-normal text-slate-500">/ max {result.checks.backlogs.maxAllowed}</span>
              </div>
              <div className={`text-xs mt-1 font-medium ${result.checks.backlogs.eligible ? 'text-emerald-700' : 'text-rose-600'}`}>
                {result.checks.backlogs.eligible ? '✓ Within Limit' : '✕ Exceeds Allowance'}
              </div>
            </div>
          </div>

          {/* Test Pattern & Rounds */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Campus Selection Pattern:</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {drive.testPattern}
            </p>
          </div>

          {/* Past Tips */}
          {drive.pastInterviewTips && drive.pastInterviewTips.length > 0 && (
            <div className="border border-amber-200 bg-amber-50/50 p-3.5 rounded-xl">
              <div className="text-xs font-semibold text-amber-900 mb-1.5">
                💡 Senior Batch Interview Tip:
              </div>
              <p className="text-xs text-amber-800 italic">
                "{drive.pastInterviewTips[0]}"
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition"
          >
            Close
          </button>
          <button
            onClick={() => {
              onTrackApplication(drive);
              onClose();
            }}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition flex items-center space-x-2"
          >
            <span>Track in Application Funnel</span>
          </button>
        </div>
      </div>
    </div>
  );
};
