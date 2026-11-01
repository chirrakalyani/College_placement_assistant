// AI Campus Placement Counselor & Advisor

const KNOWLEDGE_BASE = [
  {
    triggers: ['cgpa', 'low gpa', 'low cgpa', 'backlog', 'drop in marks'],
    reply: `**How to handle CGPA queries & dips in interviews:**
1. **Never make defensive excuses:** Acknowledge the dip honestly (e.g. "During 3rd semester, I transitioned to advanced core engineering subjects and initially struggled with time management").
2. **Highlight the upward trend:** Point out if your GPA improved in later semesters ("In subsequent semesters, I refined my study habits and achieved an 8.6 in Sem 5 & 6").
3. **Offset with tangible proof:** Shift focus immediately to practical execution: your GitHub repositories, full-stack projects, LeetCode rank, or hackathon wins. Recruiters care about shipping working software.`
  },
  {
    triggers: ['tell me about yourself', 'introduce yourself', 'intro'],
    reply: `**The Winning 90-Second 'Tell Me About Yourself' Formula for Freshers:**
1. **Present (30 sec):** Who you are, your degree, your college, and your core technical focus. ("I'm a final-year Computer Science undergrad at NIT, primarily focused on building scalable web platforms and solving algorithmic problems.")
2. **Past (30 sec):** Key project or internship highlight with numbers. ("Recently, I built a high-concurrency campus recruitment portal using the MERN stack that improved query response times by 40%.")
3. **Future & Fit (30 sec):** Why you are in this interview today. ("I've been following how your engineering team solves distributed caching, and I'm excited to contribute to your core backend systems.")`
  },
  {
    triggers: ['product vs service', 'service based', 'product based', 'tcs vs google', 'faang'],
    reply: `**Product-Based vs. Service-Based Recruitment Criteria:**
• **Product Companies (Google, Microsoft, Amazon, Atlassian, Startups):**
  - **Focus:** Strong Data Structures & Algorithms (LeetCode Medium/Hard), System Design fundamentals, clean code, time & space complexity.
  - **Hiring rounds:** 1-2 Online Assessments, 2-3 Technical DSA rounds, 1 Bar Raiser / System round.
• **Service/Consulting Companies (TCS, Infosys, Accenture, Deloitte):**
  - **Focus:** Quantitative Aptitude, Logical Reasoning, Verbal Ability, Core CS (DBMS, SQL Joins, OOPs concepts), and strong English communication.
  - **Hiring rounds:** National Aptitude Test (e.g. NQT), Technical + Managerial Interview, HR Round.`
  },
  {
    triggers: ['no internship', 'lack of experience', 'fresher without internship', 'projects'],
    reply: `**Can you crack Tier-1 companies without prior internships? Absolutely YES!**
Here is how to structure your profile:
1. **Build 2 production-grade Full Stack or Systems projects:** Do not just build a generic Todo list. Build an application with Authentication (JWT), Database Indexing, third-party API integration, and deploy it live on Vercel/Railway.
2. **Provide live links:** Put the live demo link and GitHub repository URL directly under the project heading in your resume.
3. **Add automated tests or CI/CD:** Having even basic Jest/Mocha tests or GitHub Actions in your repo immediately puts you in the top 5% of campus candidates.`
  },
  {
    triggers: ['why our company', 'why this company', 'why do you want to join'],
    reply: `**How to answer 'Why This Company?' without sounding generic:**
• ❌ Avoid: "Because you are a Fortune 500 company and a great place to start my career." (Everyone says this!)
• ✅ Say: "I read your engineering blog post on how your team migrated to event-driven microservices / handled peak Black Friday traffic. Having built distributed task queues in my own academic projects, being able to tackle engineering at your scale under senior mentors is exactly what excites me."`
  },
  {
    triggers: ['star method', 'behavioral', 'hr round'],
    reply: `**The STAR Method Cheat Sheet for HR & Behavioral Rounds:**
• **S - Situation:** Set the scene in 1-2 sentences. ("During our 6th-semester capstone project, our team had 48 hours before the final submission...")
• **T - Task:** The specific hurdle you were responsible for. ("Our payment gateway webhook kept failing with race conditions...")
• **A - Action:** Specific engineering steps YOU took. ("I implemented mutex locks, wrote unit tests for duplicate requests, and scheduled a 30-minute sync with the team.")
• **R - Result:** Quantified outcome! ("We passed all 50 test cases, submitted on time, and achieved an 'A' grade with zero downtime.")`
  }
];

// @desc    Ask placement counselor chatbot
// @route   POST /api/counselor/ask
const askCounselor = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ message: 'Please enter a placement question or topic.' });
    }

    const q = question.toLowerCase();

    // Check knowledge base
    const match = KNOWLEDGE_BASE.find((entry) =>
      entry.triggers.some((trigger) => q.includes(trigger))
    );

    if (match) {
      return res.json({
        answer: match.reply,
        relatedTopics: [
          'STAR Method for Behavioral Rounds',
          'Tackling Low CGPA or Gap Years',
          'Product vs Service Company Preparation',
          'Elevator Pitch for College Freshers',
        ],
      });
    }

    // Default intelligent campus placement counseling response
    const genericResponse = `**Placement Advisor Insights for:** "${question.trim()}"

Here is strategic advice from campus placement officers and senior alumni:

1. **Alignment with Hiring Rubrics:**
   Most campus recruiters evaluate candidates on a 3-pillar framework:
   - **Foundational Competence:** Can you write clean code without syntax errors, and explain Time/Space complexity?
   - **Core CS Grounding:** Do you know the practical implications of your database choices (SQL vs NoSQL), indexing, and HTTP status codes?
   - **Coachability & Communication:** Do you listen attentively when an interviewer gives a hint, or do you stubbornly push ahead?

2. **Actionable Next Steps:**
   - Review your target company's past interview experiences in our **Company Bank** section.
   - Run your resume through our **AI Resume ATS Reviewer** to verify high-impact metrics.
   - Practice simulating a technical round in our **Mock Interview Simulator**.

Feel free to ask specifically about:
- How to answer specific HR questions
- DSA vs Development time allocation
- How to prepare for Aptitude tests
- Handling multiple placement offers`;

    return res.json({
      answer: genericResponse,
      relatedTopics: [
        'How to explain CGPA dips',
        'Top interview questions for Google / Microsoft',
        'STAR Method behavioral examples',
        'Resume bullet point formula',
      ],
    });
  } catch (error) {
    console.error('Counselor error:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  askCounselor,
};
