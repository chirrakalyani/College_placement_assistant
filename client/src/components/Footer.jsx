import React from 'react';
import { GraduationCap, ShieldCheck, Database, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm tracking-wide">College Placement Assistant AI</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              An end-to-end recruitment preparation platform designed for campus placement drives, technical interviews, and resume ATS compliance.
            </p>
            <div className="flex items-center space-x-2 text-emerald-400 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Training & Placement Cell Verified</span>
            </div>
          </div>

          {/* Placement Modules */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Preparation Modules
            </h4>
            <ul className="space-y-2">
              <li><Link to="/drives" className="hover:text-white transition">Active Campus Drives</Link></li>
              <li><Link to="/resume" className="hover:text-white transition">AI Resume ATS & Bullet Rewriter</Link></li>
              <li><Link to="/interview" className="hover:text-white transition">Technical & STAR Mock Interview</Link></li>
              <li><Link to="/tracker" className="hover:text-white transition">Application Funnel Tracker</Link></li>
              <li><Link to="/roadmap" className="hover:text-white transition">30-Day Placement Sprint</Link></li>
            </ul>
          </div>

          {/* Campus Resources */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Student Resources
            </h4>
            <ul className="space-y-2">
              <li><Link to="/advisor" className="hover:text-white transition">Placement Q&A Advisor</Link></li>
              <li><Link to="/settings" className="hover:text-white transition">Student Readiness Matrix</Link></li>
              <li><span className="text-slate-400">T&P Placement Policy 2026</span></li>
              <li><span className="text-slate-400">Super Dream Eligibility Rules</span></li>
              <li><span className="text-slate-400">Salary Package (CTC) Breakdown Guide</span></li>
            </ul>
          </div>

          {/* Database & Vercel Info */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Deployment & Database
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Built on MERN stack. Ready for seamless deployment on <strong>Vercel</strong> with zero-config serverless API routes.
            </p>
            <Link
              to="/settings"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition border border-slate-700 text-xs"
            >
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>MongoDB Atlas Setup Guide</span>
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-xs">
          <p>© 2026-2027 College Placement Cell. Designed for student success.</p>
          <div className="flex items-center space-x-1 mt-3 sm:mt-0 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>using React, Node, Express & MongoDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
