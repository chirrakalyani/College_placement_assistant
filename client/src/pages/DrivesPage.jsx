import React, { useState, useEffect } from 'react';
import {
  Building2,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Award,
  Layers,
  ChevronRight,
  BookOpen,
  PlusCircle,
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { TierBadge } from '../components/StatusBadge';
import { EligibilityModal } from '../components/EligibilityModal';

export const DrivesPage = () => {
  const { user } = useAuth();
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState('All');

  // Eligibility modal
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [eligibilityResult, setEligibilityResult] = useState(null);
  const [trackSuccess, setTrackSuccess] = useState('');

  useEffect(() => {
    loadDrives();
  }, [search, tierFilter, branchFilter]);

  const loadDrives = async () => {
    try {
      const data = await api.getDrives({
        search,
        tier: tierFilter,
        branch: branchFilter,
      });
      setDrives(data);
    } catch (err) {
      console.error('Failed to load drives:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckEligibility = async (drive) => {
    try {
      const result = await api.checkEligibility(drive._id, {
        cgpa: user?.cgpa || 8.4,
        branch: user?.branch || 'CSE',
        backlogs: user?.backlogs || 0,
      });
      setSelectedDrive(drive);
      setEligibilityResult(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTrackDrive = async (drive) => {
    try {
      await api.createApplication({
        companyName: drive.companyName,
        role: drive.role,
        ctc: drive.ctc,
        status: 'Applied',
        notes: `Tracked from campus drives list. Registered for campus recruitment drive.`,
      });
      setTrackSuccess(`Added ${drive.companyName} to your Application Funnel!`);
      setTimeout(() => setTrackSuccess(''), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900">Campus Recruitment Drives</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
              {drives.length} Drives Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse corporate recruitment drives, verify criteria eligibility, and study company selection rounds.
          </p>
        </div>

        {/* Current Student Quick Profile Pill */}
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center space-x-3 shrink-0 shadow-xs">
          <span>Verifying with your profile:</span>
          <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
            CGPA: {user?.cgpa || 8.45}
          </span>
          <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
            {user?.branch ? user.branch.split(' ')[0] : 'CSE'}
          </span>
        </div>
      </div>

      {trackSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{trackSuccess}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by company (e.g. Google, Amazon), role, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
          />
        </div>

        {/* Tier Filter */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <span className="text-xs text-slate-500 font-medium shrink-0">Tier:</span>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="w-full md:w-auto px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="All">All Tiers</option>
            <option value="Super Dream">Super Dream (15+ LPA)</option>
            <option value="Dream">Dream (8-15 LPA)</option>
            <option value="Regular">Regular (4-8 LPA)</option>
          </select>
        </div>

        {/* Branch Filter */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <span className="text-xs text-slate-500 font-medium shrink-0">Branch:</span>
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="w-full md:w-auto px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="All">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="Mechanical">Mechanical</option>
          </select>
        </div>
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {drives.map((drive) => {
          const isStudentEligible =
            parseFloat(user?.cgpa || 8.4) >= drive.minCgpa &&
            (user?.backlogs || 0) <= drive.maxBacklogs;

          return (
            <div
              key={drive._id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between space-y-5"
            >
              <div>
                {/* Header: Company & CTC */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-bold text-xl flex items-center justify-center shrink-0">
                      {drive.companyName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-slate-900 text-lg leading-tight">
                          {drive.companyName}
                        </h3>
                        <TierBadge tier={drive.tier} />
                      </div>
                      <p className="text-xs font-medium text-slate-600 mt-0.5">{drive.role}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      {drive.ctc}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">{drive.location}</div>
                  </div>
                </div>

                {/* Eligibility Criteria Bar */}
                <div className="mt-4 grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Min CGPA</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">{drive.minCgpa}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Branches</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5 truncate" title={drive.eligibleBranches.join(', ')}>
                      {drive.eligibleBranches.slice(0, 2).join(', ')}{drive.eligibleBranches.length > 2 ? ' +' : ''}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Max Backlogs</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">{drive.maxBacklogs}</div>
                  </div>
                </div>

                {/* Test Pattern & Rounds */}
                <div className="mt-4 space-y-2">
                  <div className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    <span>Selection Rounds ({drive.rounds?.length || 4} Rounds):</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {drive.rounds?.map((r, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                        title={r.description}
                      >
                        {i + 1}. {r.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills Required */}
                {drive.requiredSkills && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {drive.requiredSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleCheckEligibility(drive)}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition flex items-center justify-center space-x-1.5"
                >
                  <span>Check Criteria & Eligibility</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleTrackDrive(drive)}
                  title="Track in your placement application funnel"
                  className="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 transition flex items-center space-x-1"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Track</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Eligibility Modal */}
      {selectedDrive && eligibilityResult && (
        <EligibilityModal
          drive={selectedDrive}
          result={eligibilityResult}
          onClose={() => {
            setSelectedDrive(null);
            setEligibilityResult(null);
          }}
          onTrackApplication={handleTrackDrive}
        />
      )}
    </div>
  );
};
