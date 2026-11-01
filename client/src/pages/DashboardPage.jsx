import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Award,
  TrendingUp,
  FileCheck2,
  Mic2,
  Kanban,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Building2,
  Clock,
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { TierBadge, AppStatusBadge } from '../components/StatusBadge';
import { EligibilityModal } from '../components/EligibilityModal';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [drives, setDrives] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Eligibility modal state
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [eligibilityResult, setEligibilityResult] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const [statsData, drivesData, appsData] = await Promise.all([
        api.getPlacementStats(),
        api.getDrives(),
        api.getApplications(),
      ]);
      setStats(statsData);
      setDrives(drivesData.slice(0, 4));
      setApplications(appsData);
    } catch (err) {
      console.error('Dashboard load error:', err);
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
        notes: `Tracked from campus drives list. Minimum CGPA required: ${drive.minCgpa}`,
      });
      loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const personal = stats?.personalStats || {
    totalApplied: 4,
    inProgress: 3,
    interviewsScheduled: 2,
    offersReceived: 1,
  };

  const campus = stats?.campusStats || {
    averagePackage: '11.4 LPA',
    highestPackage: '48.2 LPA',
    placementRate: '82.1%',
    studentsPlaced: 394,
    totalEligibleStudents: 480,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Student Welcome & Campus Season Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-900/40">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4 border border-blue-400/20">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Campus Placement Portal • Final Year Readiness</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, {user?.name || 'Aarav'}! 🎓
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            Your readiness score is looking strong with a <strong>{user?.cgpa || '8.45'} CGPA</strong> in{' '}
            <strong>{user?.branch || 'Computer Science & Engineering'}</strong>. You are currently eligible for <strong>92%</strong> of ongoing Tier-1 and Tier-2 placement drives.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              to="/drives"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md transition flex items-center space-x-2"
            >
              <span>Explore Active Drives</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/resume"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition flex items-center space-x-2"
            >
              <FileCheck2 className="w-4 h-4 text-blue-300" />
              <span>Audit Resume ATS</span>
            </Link>
            <Link
              to="/interview"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition flex items-center space-x-2"
            >
              <Mic2 className="w-4 h-4 text-amber-300" />
              <span>Practice Mock Interview</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Personal Applications */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Tracked Applications
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Kanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{personal.totalApplied}</div>
          <div className="text-xs text-slate-500 mt-1 flex items-center space-x-1.5">
            <span className="text-blue-600 font-semibold">{personal.inProgress} active</span>
            <span>in interview pipeline</span>
          </div>
        </div>

        {/* Interviews Scheduled */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Upcoming Rounds
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{personal.interviewsScheduled}</div>
          <div className="text-xs text-indigo-600 font-medium mt-1">
            Google Tech & Microsoft OA
          </div>
        </div>

        {/* Offers Secured */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Offers Received
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-2">
            {personal.offersReceived} 🎉
          </div>
          <div className="text-xs text-slate-500 mt-1 font-medium">
            TCS Digital Cadre (7.5 LPA)
          </div>
        </div>

        {/* Campus Average Package */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Campus Average CTC
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{campus.averagePackage}</div>
          <div className="text-xs text-slate-500 mt-1">
            Highest: <span className="font-semibold text-slate-800">{campus.highestPackage}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Upcoming Active Drives & Application Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Active Campus Recruitment Drives */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <span>Active Campus Recruitment Drives</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                  Live
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Official companies visiting campus with registration windows open
              </p>
            </div>
            <Link
              to="/drives"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
            >
              <span>View All ({drives.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {drives.map((drive) => (
              <div
                key={drive._id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-lg text-slate-700 shrink-0">
                    {drive.companyName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base">{drive.companyName}</h3>
                      <TierBadge tier={drive.tier} />
                    </div>
                    <p className="text-xs font-medium text-slate-600 mt-0.5">
                      {drive.role} • <strong className="text-slate-900">{drive.ctc}</strong>
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Min CGPA: <strong>{drive.minCgpa}</strong></span>
                      </span>
                      <span>Branches: <strong>{drive.eligibleBranches.slice(0, 3).join(', ')}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0">
                  <button
                    onClick={() => handleCheckEligibility(drive)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition shadow-xs"
                  >
                    Check Eligibility
                  </button>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Drive in 5 days
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 Col): Application Pipeline & Readiness Checklist */}
        <div className="space-y-6">
          {/* Quick Application Pipeline Widget */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <Kanban className="w-4 h-4 text-blue-600" />
                <span>My Application Funnel</span>
              </h3>
              <Link to="/tracker" className="text-xs font-semibold text-blue-600 hover:underline">
                Manage
              </Link>
            </div>

            <div className="space-y-3">
              {applications.slice(0, 4).map((app) => (
                <div
                  key={app._id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{app.companyName}</h4>
                    <p className="text-[11px] text-slate-500">{app.role}</p>
                  </div>
                  <AppStatusBadge status={app.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Student Placement Readiness Sprint Checklist */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 p-5 rounded-2xl border border-blue-100/80">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Placement Sprint Checklist</span>
              </h3>
              <Link to="/roadmap" className="text-xs font-semibold text-blue-700 hover:underline">
                Full Plan
              </Link>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start space-x-2">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded text-blue-600" />
                <span>Resume ATS audit completed (Score: 88/100)</span>
              </li>
              <li className="flex items-start space-x-2">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded text-blue-600" />
                <span>Core CS revision: OS & DBMS ACID properties</span>
              </li>
              <li className="flex items-start space-x-2">
                <input type="checkbox" className="mt-0.5 rounded text-blue-600" />
                <span className="font-medium text-slate-900">
                  Practice 1 Mock Interview session on Graphs / Trees
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <input type="checkbox" className="mt-0.5 rounded text-blue-600" />
                <span>Prepare 4 STAR behavioral stories for Amazon Bar Raiser</span>
              </li>
            </ul>

            <Link
              to="/roadmap"
              className="mt-4 block text-center py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition"
            >
              Open 30-Day Sprint Roadmap
            </Link>
          </div>

          {/* Placement Cell Guidance Box */}
          <div className="border border-slate-200 bg-white p-4 rounded-2xl space-y-2">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-800">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Placement Cell Reminder:</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              As per college policy, once you secure an offer from a <strong>Super Dream (15+ LPA)</strong> company, your profile will be locked from attending Regular Tier drives to maximize batch placement.
            </p>
          </div>
        </div>
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
