import React from 'react';

export const TierBadge = ({ tier }) => {
  if (tier?.includes('Super Dream')) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
        ⭐ Super Dream (15+ LPA)
      </span>
    );
  }
  if (tier?.includes('Dream')) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
        🎯 Dream (8-15 LPA)
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
      💼 Regular IT / Core
    </span>
  );
};

export const AppStatusBadge = ({ status }) => {
  const map = {
    'Offer Received': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'Technical Round': 'bg-indigo-100 text-indigo-800 border-indigo-300',
    'HR Round': 'bg-purple-100 text-purple-800 border-purple-300',
    'OA Scheduled': 'bg-sky-100 text-sky-800 border-sky-300',
    'OA Cleared': 'bg-teal-100 text-teal-800 border-teal-300',
    'Applied': 'bg-blue-100 text-blue-800 border-blue-200',
    'Bookmarked': 'bg-slate-100 text-slate-700 border-slate-200',
    'Rejected': 'bg-rose-100 text-rose-800 border-rose-200',
  };

  const style = map[status] || 'bg-slate-100 text-slate-800 border-slate-200';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style}`}>
      {status === 'Offer Received' ? '🎉 ' : ''}{status}
    </span>
  );
};

export const EligibilityPill = ({ isEligible }) => {
  if (isEligible) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        ✓ Eligible to Apply
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
      ✕ Criteria Mismatch
    </span>
  );
};
