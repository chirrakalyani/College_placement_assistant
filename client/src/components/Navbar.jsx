import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Building2,
  FileCheck2,
  Mic2,
  Kanban,
  CalendarDays,
  MessageSquareCode,
  Settings,
  Menu,
  X,
  Database,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, dbStatus } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: GraduationCap },
    { name: 'Campus Drives', path: '/drives', icon: Building2 },
    { name: 'AI Resume ATS', path: '/resume', icon: FileCheck2 },
    { name: 'Mock Interview', path: '/interview', icon: Mic2 },
    { name: 'Application Tracker', path: '/tracker', icon: Kanban },
    { name: '30-Day Sprint', path: '/roadmap', icon: CalendarDays },
    { name: 'Placement Advisor', path: '/advisor', icon: MessageSquareCode },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top collegiate season announcement bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white tracking-wide">
            Campus Placement Season 2026-27
          </span>
          <span className="hidden sm:inline text-slate-400">| Training & Placement Cell</span>
        </div>
        <div className="flex items-center space-x-4 text-slate-400">
          <Link
            to="/settings"
            className="flex items-center space-x-1.5 hover:text-white transition"
            title="Database & MongoDB Atlas configuration"
          >
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-300">
              {dbStatus.includes('Atlas') ? 'Atlas: Connected' : 'Demo DB Mode'}
            </span>
          </Link>
          <span className="hidden md:inline">NIT Campus Portal v1.0</span>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-md group-hover:bg-blue-800 transition">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900 leading-tight text-base sm:text-lg flex items-center space-x-1.5">
                <span>Placement AI</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-800">
                  Assistant
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                College Recruitment & Readiness System
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Student Profile Badge */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              to="/settings"
              className="flex items-center space-x-2.5 p-1.5 pr-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                {user?.name ? user.name.charAt(0) : 'S'}
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-slate-800 leading-none">{user?.name || 'Aarav Sharma'}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  CGPA {user?.cgpa || '8.45'} • {user?.branch ? user.branch.split(' ')[0] : 'CSE'}
                </div>
              </div>
              <Settings className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  active ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-slate-500'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <Settings className="w-5 h-5 text-slate-500" />
              <span>Student Profile & Atlas Settings</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
