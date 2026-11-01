import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Database,
  Save,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfileSettingsPage = () => {
  const { user, updateProfile, dbStatus, loadDemoUser, refreshHealth } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || 'Aarav Sharma',
    email: user?.email || 'aarav.sharma@campus.edu',
    college: user?.college || 'National Institute of Technology',
    branch: user?.branch || 'Computer Science and Engineering',
    semester: user?.semester || 7,
    cgpa: user?.cgpa || 8.45,
    backlogs: user?.backlogs || 0,
    skills: user?.skills?.join(', ') || 'JavaScript, React, Node.js, Python, SQL, DSA',
    targetRoles: user?.targetRoles?.join(', ') || 'Software Development Engineer, Full Stack Developer',
    targetCompanies: user?.targetCompanies?.join(', ') || 'Google, Microsoft, Amazon, TCS Digital, Deloitte',
    bio: user?.bio || 'Final year CSE undergraduate preparing for campus placement drives.',
  });

  const [savedSuccess, setSavedSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        college: formData.college,
        branch: formData.branch,
        semester: Number(formData.semester),
        cgpa: parseFloat(formData.cgpa),
        backlogs: parseInt(formData.backlogs, 10),
        skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
        targetRoles: formData.targetRoles.split(',').map((s) => s.trim()).filter(Boolean),
        targetCompanies: formData.targetCompanies.split(',').map((s) => s.trim()).filter(Boolean),
        bio: formData.bio,
      });
      setSavedSuccess('Profile updated successfully! All drive eligibility checks will now reflect your new CGPA & Branch.');
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const copyEnvSample = () => {
    navigator.clipboard.writeText(
      'MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/college_placement?retryWrites=true&w=majority'
    );
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-slate-900">Student Profile & Readiness Matrix</h1>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
            T&P Cell Academic Record
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Update your academic parameters (CGPA, active backlogs, branch) to automatically evaluate criteria against visiting campus recruiters.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{savedSuccess}</span>
        </div>
      )}

      {/* Main Student Profile Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <span>Academic & Candidate Profile</span>
            </h2>
            <button
              type="button"
              onClick={loadDemoUser}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
            >
              Reset to High-Performing Demo Student
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                College Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Engineering Branch / Dept
              </label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Computer Science and Engineering">Computer Science and Engineering (CSE)</option>
                <option value="Information Technology">Information Technology (IT)</option>
                <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
                <option value="Electrical & Electronics">Electrical & Electronics (EEE)</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Cumulative CGPA (Out of 10)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Active Backlogs
              </label>
              <input
                type="number"
                min="0"
                max="10"
                name="backlogs"
                value={formData.backlogs}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Skills & Tech Stack (Comma-separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Target Roles
              </label>
              <input
                type="text"
                name="targetRoles"
                value={formData.targetRoles}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Dream Companies
              </label>
              <input
                type="text"
                name="targetCompanies"
                value={formData.targetCompanies}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Elevator Pitch / Summary
            </label>
            <textarea
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center justify-end pt-3 border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-md transition flex items-center space-x-2 disabled:opacity-50"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Profile Parameters</span>
            </button>
          </div>
        </form>
      </div>

      {/* MongoDB Atlas Setup & Vercel Deployment Guide Card */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4 border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">MongoDB Atlas & Vercel Deployment</h3>
              <p className="text-xs text-slate-400">Database connection and production configuration</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-semibold text-emerald-300">{dbStatus}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The app features an intelligent connection pool. If you haven't linked your MongoDB Atlas cluster yet, it seamlessly runs in <strong>safe in-memory fallback mode</strong> so there are zero 500 errors on Vercel!
        </p>

        {/* Step by step for Atlas */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-3 text-xs text-slate-300">
          <div className="font-bold text-white uppercase tracking-wider text-[11px]">
            To Connect Your MongoDB Atlas Cluster:
          </div>
          <ol className="list-decimal list-inside space-y-1.5 leading-relaxed text-slate-300">
            <li>
              In MongoDB Atlas, navigate to <strong>Network Access</strong> → Add IP Address → Click <strong>"Allow Access from Anywhere" (`0.0.0.0/0`)</strong>. (Crucial for Vercel's serverless functions!)
            </li>
            <li>
              Navigate to <strong>Database</strong> → <strong>Connect</strong> → <strong>Drivers</strong> → Copy your connection string.
            </li>
            <li>
              Add the variable <code className="bg-black/40 px-1.5 py-0.5 rounded text-amber-300">MONGO_URI</code> to your local <code className="bg-black/40 px-1.5 py-0.5 rounded text-amber-300">.env</code> file or in Vercel's <strong>Project Settings → Environment Variables</strong>.
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={copyEnvSample}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition flex items-center justify-center space-x-2"
          >
            {copiedEnv ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedEnv ? 'Copied Template!' : 'Copy MONGO_URI Template'}</span>
          </button>

          <button
            onClick={refreshHealth}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition flex items-center justify-center space-x-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Test Database Connection</span>
          </button>
        </div>
      </div>
    </div>
  );
};
