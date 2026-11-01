# 🎓 College Placement Assistant AI (MERN Stack)

A human-crafted, full-stack MERN website built specifically for college students and Training & Placement (T&P) cells to master campus recruitment drives, verify company eligibility cutoffs, analyze resumes against ATS parsers, simulate technical and STAR interviews, and track application funnels.

---

## 🌟 Key Features

1. **Campus Drives & Instant Eligibility Matrix**:
   - Browse visiting recruiters (Google, Microsoft, Amazon, TCS Digital, Deloitte, Cisco, etc.).
   - 1-Click Eligibility Check: compares your CGPA, Branch, and Backlog count against company requirements with exact margin feedback.
   - Comprehensive test patterns and past interview advice from placed alumni.

2. **AI Resume ATS & Bullet Point Rewriter**:
   - Composite ATS score (0 - 100) based on quantifiable metrics, action verbs, section completeness, and role keyword matching.
   - **X-Y-Z Bullet Point Rewriter**: Converts weak bullets (*"Worked on student portal"*) into high-impact statements (*"Engineered a full-stack portal serving 1,200+ students, reducing query latency by 40%"*).

3. **AI Mock Interview Simulator**:
   - Multiple interview tracks: **SDE Technical (DSA)**, **Core CS (OS, DBMS, Networks, OOPs)**, **Amazon STAR Behavioral**, and **HR Fit**.
   - Active timer, real-time rubric evaluation, STAR method compliance checking, ideal model answers, and follow-up interviewer questions.

4. **Application Funnel Tracker**:
   - Log and track company applications across stages: *Applied → OA Scheduled → Technical Round → HR Round → Offer Received*.
   - Interactive milestone timeline and confetti celebration upon receiving job offers!

5. **30-Day Placement Sprint Roadmap**:
   - Week-by-week curriculum customized for **Super Dream (15+ LPA)** and **Dream (8-15 LPA)** roles.
   - Curated high-yield practice problems and daily study habit recommendations.

6. **Placement AI Counselor (Advisor Chat)**:
   - Dedicated chatbot answering genuine student placement dilemmas: explaining CGPA dips, the 90-second fresher elevator pitch, product vs. service companies, and salary negotiation.

7. **Zero-Error Fallback Architecture**:
   - If MongoDB Atlas is not yet connected or if network access is restricted, the platform automatically runs in **intelligent in-memory demo mode** so it **never crashes or throws 500 errors on Vercel**.

---

## 🛠️ Tech Stack (100% JavaScript)

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, React Router v7, Canvas Confetti.
- **Backend**: Node.js, Express.js, Mongoose, JWT, Bcrypt.js.
- **Database**: MongoDB Atlas.
- **Deployment**: Vercel ready (Monorepo with `/api` serverless function handler & `client/dist`).

---

## 🚀 Local Development Setup

### 1. Clone & Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (or edit the existing one):
```env
# MongoDB Atlas Connection URI
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/college_placement?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=college_placement_assistant_secret_jwt_key_2026_nit

# Port
PORT=5000
```
*(Note: If you leave `MONGO_URI` empty, the application will seamlessly run in fallback demo mode!)*

### 3. Run Development Server
```bash
npm run dev
```
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

---

## 🌐 Deploying to Vercel (Guaranteed 0 Errors)

This repository is pre-configured with `vercel.json` and a serverless entry point at `/api/index.js` for instant Vercel deployment:

1. **Push your code to GitHub / GitLab**.
2. **Import the repository in Vercel**:
   - **Framework Preset**: *Vite* or *Other* (detected automatically).
   - **Build Command**: `npm run build` (configured in `package.json` to build the client).
   - **Output Directory**: `client/dist`.
3. **Add Environment Variables in Vercel**:
   - Go to **Project Settings → Environment Variables**:
     - `MONGO_URI`: *Your MongoDB Atlas connection string*
     - `JWT_SECRET`: *Your JWT secret phrase*
     - `NODE_ENV`: `production`
4. **Deploy!**
   - Vercel will build the React frontend to `client/dist` and route `/api/*` requests to the serverless function `/api/index.js`.

---

## 🛡️ Critical MongoDB Atlas Setup (Allow Access from Anywhere)

To ensure Vercel's serverless functions can connect to MongoDB Atlas without connection timeout errors:
1. Open [MongoDB Atlas](https://cloud.mongodb.com/).
2. In the left sidebar, navigate to **Security → Network Access**.
3. Click **Add IP Address**.
4. Choose **"Allow Access from Anywhere"** (`0.0.0.0/0`) and click **Confirm**.
*(Vercel uses rotating dynamic serverless IPs, so this setting is essential for smooth connectivity).*
