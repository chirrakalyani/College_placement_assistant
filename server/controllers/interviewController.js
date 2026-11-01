const { sampleQuestions } = require('../data/fallbackData');

const INTERVIEW_POOLS = {
  sde: [
    {
      id: 'sde-1',
      category: 'Data Structures & Algorithms',
      question: 'How would you detect a cycle in a linked list? Can you explain both the hash set approach and Floyd’s Cycle-Finding Algorithm (tortoise and hare)? What are the time and space complexities of both?',
      idealKeyPoints: ['Floyd algorithm uses slow and fast pointers', 'Slow moves 1 step, fast moves 2 steps', 'If they meet, cycle exists', 'Space O(1) for Floyd vs O(N) for Hash Set', 'Time complexity is O(N)'],
      followUp: 'How do you find the exact node where the cycle begins once slow and fast meet?'
    },
    {
      id: 'sde-2',
      category: 'System & Concurrency',
      question: 'What is a deadlock in Operating Systems? What are the four Coffman conditions necessary for a deadlock to occur, and how can an engineer prevent at least one of them?',
      idealKeyPoints: ['Mutual Exclusion', 'Hold and Wait', 'No Preemption', 'Circular Wait', 'Prevention strategies like Lock Ordering or Banker’s Algorithm'],
      followUp: 'What is the difference between a deadlock and a livelock in multithreaded systems?'
    },
    {
      id: 'sde-3',
      category: 'Data Structures & Algorithms',
      question: 'Given an unsorted array of integers, how do you find the length of the longest consecutive elements sequence in O(n) time? Why doesn’t normal sorting work here?',
      idealKeyPoints: ['Sorting takes O(N log N) which violates the O(N) constraint', 'Use an unordered Hash Set for O(1) lookups', 'Only start counting if (num - 1) is NOT in the set (identifies start of streak)', 'Overall time is O(N) because each element is visited at most twice'],
      followUp: 'What would happen if the array contains duplicate elements?'
    }
  ],
  core: [
    {
      id: 'core-1',
      category: 'DBMS & Transactions',
      question: 'Explain ACID properties in Database Management Systems with a real-world bank transfer example between Account A and Account B.',
      idealKeyPoints: ['Atomicity: All-or-nothing debit and credit', 'Consistency: Total balance remains valid', 'Isolation: Concurrent transfers do not see dirty states', 'Durability: Committed transfer survives power failure', 'Write-ahead logging (WAL)'],
      followUp: 'What are the four SQL transaction isolation levels and what read phenomena do they prevent?'
    },
    {
      id: 'core-2',
      category: 'Computer Networks',
      question: 'What happens when you type https://www.google.com in your browser and press Enter? Walk me through DNS resolution, TCP handshake, TLS negotiation, and HTTP request/response.',
      idealKeyPoints: ['Browser cache -> OS cache -> Resolver -> Root/TLD/Authoritative DNS', 'SYN, SYN-ACK, ACK TCP 3-way handshake', 'TLS handshake certificate verification', 'HTTP GET request and server response', 'Browser DOM rendering & CSSOM tree'],
      followUp: 'Why does HTTPS use asymmetric encryption for key exchange and symmetric encryption for data transfer?'
    },
    {
      id: 'core-3',
      category: 'Object-Oriented Programming',
      question: 'Explain the four core principles of OOPs (Encapsulation, Abstraction, Inheritance, Polymorphism). Differentiate between Compile-time (Method Overloading) and Runtime Polymorphism (Method Overriding) with code logic.',
      idealKeyPoints: ['Encapsulation: data hiding with private fields and getters/setters', 'Abstraction: exposing interfaces while hiding internal logic', 'Inheritance: code reuse via base/derived classes', 'Polymorphism: many forms', 'Overloading is static binding, Overriding uses virtual tables (vtable) and dynamic binding'],
      followUp: 'Why is composition often preferred over inheritance in modern software design?'
    }
  ],
  behavioral: [
    {
      id: 'beh-1',
      category: 'STAR Behavioral / Amazon Leadership',
      question: 'Tell me about a time when you faced a major conflict with a teammate during an academic or hackathon project. How did you handle the disagreement and what was the outcome?',
      idealKeyPoints: ['Situation: Clear background context', 'Task: The core conflict or disagreement', 'Action: Active listening, objective evaluation of ideas, data-backed consensus', 'Result: Delivered successfully, positive team relationship preserved', 'Quantifiable impact'],
      followUp: 'Looking back, is there anything you would have done differently to avoid that friction earlier?'
    },
    {
      id: 'beh-2',
      category: 'STAR Behavioral / Problem Solving',
      question: 'Describe a situation where a project or code you built failed or did not meet expectations. How did you diagnose the issue and what did you learn from the experience?',
      idealKeyPoints: ['Accountability and self-awareness without blaming others', 'Root-cause analysis (logs, post-mortem)', 'Remediation steps taken', 'Lessons implemented to avoid recurrence', 'Constructive humility'],
      followUp: 'How do you balance shipping fast vs. ensuring code reliability under tight deadlines?'
    }
  ],
  hr: [
    {
      id: 'hr-1',
      category: 'HR & Cultural Alignment',
      question: 'Why do you want to join our company specifically, and where do you see your career heading in the next 3 to 5 years after graduating college?',
      idealKeyPoints: ['Genuine knowledge of company products, culture, or engineering blog', 'Specific engineering challenges that excite you', 'Desire to grow from junior SDE to independently driving modules', 'Commitment to continuous learning'],
      followUp: 'What are you doing currently outside of your college syllabus to upskill yourself?'
    },
    {
      id: 'hr-2',
      category: 'HR & Self Assessment',
      question: 'What is your greatest technical strength, and what is one genuine area of improvement you are actively working on?',
      idealKeyPoints: ['Specific technical strength with proof (e.g. debugging, clean architectural thinking)', 'Genuine weakness (not a clichéd "I work too hard")', 'Action plan showing current steps taken to overcome the weakness'],
      followUp: 'How do you handle constructive criticism when a senior engineer points out flaws in your pull request?'
    }
  ]
};

// @desc    Generate questions for a mock interview track
// @route   POST /api/interview/generate
const generateInterview = async (req, res) => {
  try {
    const { track, company, role } = req.body;
    const selectedTrack = track && INTERVIEW_POOLS[track] ? track : 'sde';

    const pool = INTERVIEW_POOLS[selectedTrack] || INTERVIEW_POOLS.sde;
    const questions = pool.map((q) => ({
      id: q.id,
      category: q.category,
      questionText: q.question,
      followUp: q.followUp,
    }));

    return res.json({
      track: selectedTrack,
      company: company || 'Campus Recruiter',
      role: role || 'Software Development Engineer',
      totalQuestions: questions.length,
      questions,
    });
  } catch (error) {
    console.error('Generate interview error:', error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Evaluate student answer using campus placement interview rubric
// @route   POST /api/interview/evaluate
const evaluateAnswer = async (req, res) => {
  try {
    const { questionId, questionText, studentAnswer, track } = req.body;

    if (!studentAnswer || studentAnswer.trim().length < 15) {
      return res.status(400).json({
        message: 'Your answer is too short for meaningful technical feedback. Please provide at least 2 to 3 sentences explaining your thought process.',
      });
    }

    const answer = studentAnswer.trim();
    const answerLower = answer.toLowerCase();

    // Find question context in pool
    let matchedQ = null;
    Object.values(INTERVIEW_POOLS).forEach((pool) => {
      const found = pool.find((q) => q.id === questionId || q.question.toLowerCase().includes(questionText ? questionText.toLowerCase().slice(0, 30) : ''));
      if (found) matchedQ = found;
    });

    const keyPoints = matchedQ ? matchedQ.idealKeyPoints : ['Clear structure', 'Technical precision', 'Complexity analysis'];

    // Rubric checks
    let matchedPoints = 0;
    const detectedConcepts = [];

    keyPoints.forEach((point) => {
      const words = point.toLowerCase().split(' ').filter((w) => w.length > 4);
      const isPresent = words.some((w) => answerLower.includes(w));
      if (isPresent) {
        matchedPoints++;
        detectedConcepts.push(point);
      }
    });

    // Length & depth factor
    const wordCount = answer.split(/\s+/).length;
    let lengthScore = 0;
    if (wordCount >= 80) lengthScore = 30;
    else if (wordCount >= 40) lengthScore = 20;
    else lengthScore = 10;

    // Technical clarity
    const conceptRatio = matchedPoints / (keyPoints.length || 1);
    const conceptScore = Math.round(conceptRatio * 50);

    // STAR / Structure check
    const hasStructure = /first|second|then|result|because|complexity|approach|time|space/i.test(answer);
    const structureScore = hasStructure ? 20 : 10;

    const totalScore = Math.min(96, Math.max(35, lengthScore + conceptScore + structureScore));

    const strengths = [];
    const improvements = [];

    if (detectedConcepts.length > 0) {
      strengths.push(`Addressed core concepts: Successfully covered key aspects like "${detectedConcepts[0]}".`);
    }
    if (wordCount >= 50) {
      strengths.push('Good answer depth: Provided sufficient technical explanation rather than a one-word answer.');
    }
    if (hasStructure) {
      strengths.push('Logical progression: Explained the rationale step-by-step with clear transition words.');
    }

    if (detectedConcepts.length < keyPoints.length) {
      const missing = keyPoints.filter((kp) => !detectedConcepts.includes(kp));
      if (missing.length > 0) {
        improvements.push(`Missed key technical detail: Ensure you mention "${missing[0]}".`);
      }
    }

    if (!/time|space|o\(|complexity/i.test(answer)) {
      improvements.push('Big-O Complexity omission: Always state both Time Complexity and Space Complexity explicitly without the interviewer having to prompt you.');
    }

    if (wordCount < 40) {
      improvements.push('Expand your explanation: In a real campus interview, walk the interviewer through your mental model and boundary checks.');
    }

    const modelAnswer = matchedQ
      ? `A top-tier response should explicitly state: 1) The core mechanism (${matchedQ.idealKeyPoints.slice(0, 2).join('; ')}), 2) Edge-case considerations, and 3) Final trade-offs and complexity guarantees (${matchedQ.idealKeyPoints.slice(2).join('; ')}).`
      : 'Structure your answer with: Direct Answer -> Underlying Architectural Reason -> Concrete Example -> Time & Space Complexity.';

    return res.json({
      score: totalScore,
      strengths,
      improvements,
      detectedConcepts,
      starAdherence: /situation|task|action|result/i.test(answer)
        ? 'Excellent: Followed STAR behavioral structure cleanly.'
        : 'Tip: For behavioral or scenario questions, explicitly frame your response into Situation, Task, Action, and Result.',
      modelAnswer,
      followUpQuestion: matchedQ ? matchedQ.followUp : 'How would your solution scale if input size increased by a factor of 10,000?',
    });
  } catch (error) {
    console.error('Evaluate answer error:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateInterview,
  evaluateAnswer,
};
