import React, { useState, useEffect } from 'react';
import {
  Kanban,
  Plus,
  Trash2,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  ChevronDown,
  Building2,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { AppStatusBadge } from '../components/StatusBadge';

const STATUS_COLUMNS = [
  'Applied',
  'OA Scheduled',
  'Technical Round',
  'HR Round',
  'Offer Received',
  'Rejected',
];

export const ApplicationTrackerPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // New app form state
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('Software Engineer');
  const [newCtc, setNewCtc] = useState('12 LPA');
  const [newStatus, setNewStatus] = useState('Applied');
  const [newNotes, setNewNotes] = useState('');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await api.getApplications();
      setApplications(data);
    } catch (err) {
      console.error('Failed to load apps:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appId, newStat) => {
    if (newStat === 'Offer Received') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    try {
      await api.updateApplication(appId, { status: newStat });
      setApplications((prev) =>
        prev.map((app) => (app._id === appId ? { ...app, status: newStat } : app))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (appId) => {
    if (!window.confirm('Remove this application from tracker?')) return;
    try {
      await api.deleteApplication(appId);
      setApplications((prev) => prev.filter((a) => a._id !== appId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddApplication = async (e) => {
    e.preventDefault();
    if (!newCompany || !newRole) return;

    try {
      const created = await api.createApplication({
        companyName: newCompany,
        role: newRole,
        ctc: newCtc,
        status: newStatus,
        notes: newNotes,
      });

      if (newStatus === 'Offer Received') {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }

      setApplications([created, ...applications]);
      setShowAddModal(false);
      setNewCompany('');
      setNewNotes('');
    } catch (err) {
      console.error(err);
    }
  };

  const totalOffers = applications.filter((a) => a.status === 'Offer Received').length;
  const inPipeline = applications.filter((a) =>
    ['Applied', 'OA Scheduled', 'OA Cleared', 'Technical Round', 'HR Round'].includes(a.status)
  ).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900">Application Funnel Tracker</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
              {applications.length} Tracked
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Monitor recruitment stages, schedule online assessments, and log interview rounds.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-md transition flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Track New Company</span>
        </button>
      </div>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
          <div className="text-xs font-semibold text-slate-500 uppercase">Total Applied</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{applications.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
          <div className="text-xs font-semibold text-blue-600 uppercase">In Active Rounds</div>
          <div className="text-2xl font-bold text-blue-700 mt-1">{inPipeline}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
          <div className="text-xs font-semibold text-emerald-600 uppercase">Offers Secured</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{totalOffers} 🎉</div>
        </div>
      </div>

      {/* Applications List / Cards */}
      <div className="space-y-3">
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-bold text-lg flex items-center justify-center shrink-0">
                {app.companyName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-slate-900 text-base">{app.companyName}</h3>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    {app.ctc}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-0.5">{app.role}</p>
                {app.notes && (
                  <p className="text-xs text-slate-500 mt-1 italic max-w-xl">
                    "{app.notes}"
                  </p>
                )}
              </div>
            </div>

            {/* Status Change Selector & Actions */}
            <div className="flex items-center justify-between md:justify-end space-x-3 border-t md:border-t-0 pt-3 md:pt-0">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400 font-medium">Stage:</span>
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app._id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {STATUS_COLUMNS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => handleDelete(app._id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                title="Remove application"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">Track New Company Drive</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddApplication} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oracle, Cisco, Walmart Labs"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Job Role
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Associate Software Engineer"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Offered CTC
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 14.5 LPA"
                    value={newCtc}
                    onChange={(e) => setNewCtc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Current Stage
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {STATUS_COLUMNS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Notes / Interview Prep Tips
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Revise Graph BFS/DFS and OS virtual memory concepts..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-md transition"
                >
                  Add Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
