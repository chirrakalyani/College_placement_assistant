// AI Resume ATS & Impact Analyzer

const ROLE_KEYWORDS = {
  'Software Development Engineer': [
    'data structures', 'algorithms', 'system design', 'oop', 'c++', 'java', 'python',
    'sql', 'nosql', 'git', 'distributed systems', 'rest api', 'unit testing', 'docker', 'ci/cd'
  ],
  'Full Stack Developer': [
    'react', 'node.js', 'express', 'mongodb', 'javascript', 'typescript', 'tailwind',
    'rest api', 'jwt', 'state management', 'redux', 'next.js', 'html5', 'css3', 'git'
  ],
  'Data Analyst / Scientist': [
    'python', 'pandas', 'numpy', 'sql', 'tableau', 'power bi', 'data visualization',
    'machine learning', 'scikit-learn', 'statistics', 'a/b testing', 'data cleaning', 'eda'
  ],
  'DevOps & Cloud Engineer': [
    'docker', 'kubernetes', 'aws', 'ci/cd', 'linux', 'bash', 'terraform', 'jenkins',
    'microservices', 'monitoring', 'git', 'networking', 'security'
  ],
  'Generic Tech Fresher': [
    'problem solving', 'dsa', 'oops', 'dbms', 'operating systems', 'computer networks',
    'git', 'sql', 'project', 'full stack', 'agile'
  ]
};

const STRONG_ACTION_VERBS = [
  'engineered', 'architected', 'spearheaded', 'automated', 'optimized',
  'refactored', 'implemented', 'orchestrated', 'designed', 'accelerated',
  'reduced', 'increased', 'developed', 'launched', 'scaled', 'mentored',
  'delivered', 'streamlined', 'analyzed', 'integrated'
];

const WEAK_WORDS = [
  'worked on', 'helped with', 'responsible for', 'assisted', 'participated in',
  'familiar with', 'tried to', 'handled', 'did', 'made'
];

// @desc    Analyze student resume text for ATS score and college placement readiness
// @route   POST /api/resume/analyze
const analyzeResume = async (req, res) => {
  try {
    const { resumeText, targetRole } = req.body;

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        message: 'Please provide at least 50 characters of resume content for meaningful ATS analysis.',
      });
    }

    const text = resumeText.toLowerCase();
    const rawLines = resumeText.split('\n').filter((l) => l.trim().length > 0);

    // 1. Check Essential Sections
    const sectionChecks = {
      education: /education|academics|b\.tech|bachelor|degree|cgpa|gpa/.test(text),
      skills: /skills|technical skills|technologies|proficiencies|languages/.test(text),
      projects: /projects|experience|work history|internship|academic projects/.test(text),
      contact: /@|github|linkedin|\+91|[0-9]{10}/.test(text),
      achievements: /achievements|certifications|awards|honors|extracurricular|publications/.test(text),
    };

    let sectionScore = 0;
    if (sectionChecks.education) sectionScore += 6;
    if (sectionChecks.skills) sectionScore += 7;
    if (sectionChecks.projects) sectionScore += 7;
    if (sectionChecks.contact) sectionScore += 5;
    if (sectionChecks.achievements) sectionScore += 5; // Max 30 points

    // 2. Quantifiable Impact & Metrics (X-Y-Z formula)
    // Checks for percentages, numbers, latency metrics, scale indicators
    const metricMatches = resumeText.match(/\b\d+(\.\d+)?%|\b\d+x\b|\b\d{2,}\b|\bms\b|\blatency\b|\bthroughput\b|\busers\b/gi) || [];
    const metricScore = Math.min(25, metricMatches.length * 5); // Max 25 points

    // 3. Action Verbs vs Passive Verbs
    let strongVerbCount = 0;
    STRONG_ACTION_VERBS.forEach((verb) => {
      const regex = new RegExp(`\\b${verb}\\b`, 'gi');
      const matches = resumeText.match(regex);
      if (matches) strongVerbCount += matches.length;
    });

    let weakWordsFound = [];
    WEAK_WORDS.forEach((weak) => {
      if (text.includes(weak)) weakWordsFound.push(weak);
    });

    let actionVerbScore = Math.min(20, strongVerbCount * 4);
    if (weakWordsFound.length > 0) {
      actionVerbScore = Math.max(5, actionVerbScore - weakWordsFound.length * 2);
    }

    // 4. Role Keyword Match
    const roleKey = Object.keys(ROLE_KEYWORDS).find((r) =>
      r.toLowerCase().includes((targetRole || '').toLowerCase())
    ) || 'Software Development Engineer';

    const expectedKeywords = ROLE_KEYWORDS[roleKey] || ROLE_KEYWORDS['Software Development Engineer'];
    const matchedKeywords = [];
    const missingKeywords = [];

    expectedKeywords.forEach((kw) => {
      if (text.includes(kw.toLowerCase())) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    const keywordRatio = matchedKeywords.length / expectedKeywords.length;
    const keywordScore = Math.round(keywordRatio * 25); // Max 25 points

    // Overall ATS Score calculation
    const totalAtsScore = Math.min(98, Math.max(25, sectionScore + metricScore + actionVerbScore + keywordScore));

    // Construct Strengths & Actionable Recommendations
    const strengths = [];
    const recommendations = [];

    if (metricMatches.length >= 3) {
      strengths.push(`Strong quantifiable impact: Found ${metricMatches.length} metrics/percentages validating your achievements.`);
    } else {
      recommendations.push("Quantify your project outcomes: Use Google's X-Y-Z formula ('Accomplished [X] as measured by [Y], by doing [Z]'). E.g. 'Reduced latency by 30%'.");
    }

    if (strongVerbCount >= 4) {
      strengths.push(`Effective action verbs: Used punchy verbs like '${STRONG_ACTION_VERBS.filter(v => text.includes(v)).slice(0, 3).join(', ')}'.`);
    } else {
      recommendations.push("Replace passive phrasing ('worked on', 'helped with') with strong impact verbs ('engineered', 'spearheaded', 'orchestrated').");
    }

    if (keywordRatio >= 0.6) {
      strengths.push(`High keyword density for ${roleKey} (${matchedKeywords.length}/${expectedKeywords.length} keywords matched).`);
    } else {
      recommendations.push(`Include high-frequency keywords for ${roleKey}: ${missingKeywords.slice(0, 5).join(', ')}.`);
    }

    if (!sectionChecks.contact) {
      recommendations.push("Ensure your LinkedIn, GitHub, email, and phone number are clearly present at the top header.");
    }

    if (weakWordsFound.length > 0) {
      recommendations.push(`Weak phrases detected: "${weakWordsFound.slice(0, 3).join('", "')}". Rephrase these to emphasize personal ownership.`);
    }

    return res.json({
      atsScore: totalAtsScore,
      targetRole: roleKey,
      breakdown: {
        sectionCompleteness: { score: sectionScore, max: 30 },
        quantifiableImpact: { score: metricScore, max: 25 },
        actionVerbs: { score: actionVerbScore, max: 20 },
        keywordMatching: { score: keywordScore, max: 25 },
      },
      matchedKeywords,
      missingKeywords: missingKeywords.slice(0, 8),
      strengths,
      recommendations,
      detectedMetricsCount: metricMatches.length,
      weakPhrasesCount: weakWordsFound.length,
      weakPhrases: weakWordsFound,
    });
  } catch (error) {
    console.error('Analyze resume error:', error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Rewrite a weak resume bullet point into high-impact X-Y-Z statements
// @route   POST /api/resume/rewrite-bullet
const rewriteBullet = async (req, res) => {
  try {
    const { bulletText, roleContext } = req.body;

    if (!bulletText || bulletText.trim().length < 8) {
      return res.status(400).json({ message: 'Please provide a bullet point to enhance.' });
    }

    const input = bulletText.trim();

    // Human-curated intelligent rewrites matching real tech placement standards
    const suggestions = [
      {
        style: 'Impact & Metrics Driven (X-Y-Z Formula)',
        tag: 'Recommended for Campus Placements',
        rewritten: `Engineered ${input.replace(/^(i |we |worked on |made |created |did )/i, '')}, resulting in a 35% improvement in processing efficiency and serving 2,000+ active users with 99.9% uptime.`,
        explanation: 'Adds tangible scope (2,000+ users), quantifiable outcome (35% efficiency), and industry standard reliability metrics.',
      },
      {
        style: 'Technical Depth & Architecture',
        tag: 'Best for SDE & Tech Rounds',
        rewritten: `Architected a scalable solution for ${input.replace(/^(i |we |worked on |made |created |did )/i, '')} leveraging RESTful microservices, state management, and optimized database indexing to handle concurrent requests under 120ms latency.`,
        explanation: 'Demonstrates deep engineering awareness of latency, database indexing, and modular software design.',
      },
      {
        style: 'Leadership & Problem Ownership',
        tag: 'Great for Amazon & Consulting Interviews',
        rewritten: `Spearheaded end-to-end development of ${input.replace(/^(i |we |worked on |made |created |did )/i, '')}, driving design reviews, implementing automated testing suites, and delivering the milestone 2 weeks ahead of schedule.`,
        explanation: 'Demonstrates initiative, team leadership, proactive delivery, and quality assurance.',
      },
    ];

    return res.json({
      original: bulletText,
      suggestions,
    });
  } catch (error) {
    console.error('Rewrite bullet error:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  analyzeResume,
  rewriteBullet,
};
