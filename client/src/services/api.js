// API client for College Placement Assistant AI

const API_BASE = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('placement_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Health & Atlas Status
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch {
      return { status: 'offline', database: 'In-Memory Mode' };
    }
  },

  // Auth & Profile
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  async register(studentData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  async demoLogin() {
    const res = await fetch(`${API_BASE}/auth/demo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  },

  async getProfile() {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async updateProfile(profileData) {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return await res.json();
  },

  // Campus Drives
  async getDrives(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/drives?${query}`);
    return await res.json();
  },

  async getDriveById(id) {
    const res = await fetch(`${API_BASE}/drives/${id}`);
    return await res.json();
  },

  async checkEligibility(driveId, studentProfile) {
    const res = await fetch(`${API_BASE}/drives/${driveId}/check-eligibility`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentProfile),
    });
    return await res.json();
  },

  // Applications Tracker
  async getApplications() {
    const res = await fetch(`${API_BASE}/applications`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async createApplication(appData) {
    const res = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(appData),
    });
    return await res.json();
  },

  async updateApplication(id, updateData) {
    const res = await fetch(`${API_BASE}/applications/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData),
    });
    return await res.json();
  },

  async deleteApplication(id) {
    const res = await fetch(`${API_BASE}/applications/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async getPlacementStats() {
    const res = await fetch(`${API_BASE}/applications/stats`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  // Resume ATS Review
  async analyzeResume(resumeText, targetRole) {
    const res = await fetch(`${API_BASE}/resume/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText, targetRole }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Analysis failed');
    return data;
  },

  async rewriteBullet(bulletText, roleContext) {
    const res = await fetch(`${API_BASE}/resume/rewrite-bullet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bulletText, roleContext }),
    });
    return await res.json();
  },

  // Mock Interview
  async generateInterview(track, company, role) {
    const res = await fetch(`${API_BASE}/interview/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ track, company, role }),
    });
    return await res.json();
  },

  async evaluateAnswer(payload) {
    const res = await fetch(`${API_BASE}/interview/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Evaluation failed');
    return data;
  },

  // 30-Day Roadmap
  async generateRoadmap(payload) {
    const res = await fetch(`${API_BASE}/roadmap/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  },

  // Placement Counselor Chat
  async askCounselor(question) {
    const res = await fetch(`${API_BASE}/counselor/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    return await res.json();
  },
};
