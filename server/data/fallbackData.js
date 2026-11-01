const sampleDrives = [
  {
    _id: "drive-1",
    companyName: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    tier: "Super Dream (15+ LPA)",
    role: "Associate Software Engineer",
    ctc: "32.5 LPA (18.5 Base + Stocks)",
    location: "Bangalore / Hyderabad",
    eligibleBranches: ["CSE", "IT", "ECE"],
    minCgpa: 8.0,
    maxBacklogs: 0,
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    driveDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active",
    rounds: [
      { roundNumber: 1, name: "Google Online Challenge", description: "2 DSA problems on Graphs / Dynamic Programming (90 mins)", duration: "90 min" },
      { roundNumber: 2, name: "Technical Round 1", description: "Data structures, problem solving, code efficiency & clean code", duration: "45 min" },
      { roundNumber: 3, name: "Technical Round 2", description: "System design basics, recursion/trees, edge-case analysis", duration: "45 min" },
      { roundNumber: 4, name: "Googliness & Leadership", description: "Situational judgment, teamwork, ethics, and adaptability", duration: "30 min" }
    ],
    testPattern: "Online Challenge (HackerEarth): 2 LeetCode Medium/Hard algorithmic questions",
    requiredSkills: ["C++ / Java / Python", "Data Structures", "Dynamic Programming", "Graph Theory", "Clean Coding"],
    jobDescription: "Join Google as an Associate Software Engineer to solve massive scale computing challenges. You will collaborate on core Google platforms, search, cloud infrastructure, and AI-enabled developer tooling.",
    pastInterviewTips: [
      "Always communicate your thought process out loud before writing any code.",
      "Google interviewers love when you explicitly state Time & Space Complexity up front.",
      "Test your code with empty inputs, negative numbers, and boundary conditions."
    ]
  },
  {
    _id: "drive-2",
    companyName: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    tier: "Super Dream (15+ LPA)",
    role: "Software Engineering Intern / FTE",
    ctc: "26.0 LPA (15.0 Base + Joining Bonus)",
    location: "Hyderabad / Noida / Bangalore",
    eligibleBranches: ["CSE", "IT", "ECE", "EEE"],
    minCgpa: 7.5,
    maxBacklogs: 0,
    deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    driveDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active",
    rounds: [
      { roundNumber: 1, name: "Codility Assessment", description: "3 Coding questions + 1 debugging task", duration: "90 min" },
      { roundNumber: 2, name: "Technical Interview 1", description: "Trees, Linked Lists, Binary Search & Complexity analysis", duration: "60 min" },
      { roundNumber: 3, name: "Technical Interview 2", description: "OOPs principles, Low-level design, Database schemas", duration: "60 min" },
      { roundNumber: 4, name: "AA (As Appropriate) Round", description: "Senior partner review, culture fit, architectural discussions", duration: "45 min" }
    ],
    testPattern: "Codility platform: 3 algorithm problems ranging from arrays to binary trees",
    requiredSkills: ["Data Structures & Algorithms", "C# or Java or C++", "Object-Oriented Design", "Operating Systems"],
    jobDescription: "As a Software Engineer at Microsoft, you will contribute to products used by billions worldwide, from Azure Cloud infrastructure to Teams and Office AI copilot engines.",
    pastInterviewTips: [
      "Be prepared for deep questions on Object-Oriented Design (e.g. Design Parking Lot or LRU Cache).",
      "Revise OS concepts: threading, mutex, deadlock, and virtual memory."
    ]
  },
  {
    _id: "drive-3",
    companyName: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    tier: "Super Dream (15+ LPA)",
    role: "Software Development Engineer - 1",
    ctc: "28.5 LPA (15.5 Base + Sign-on Bonus)",
    location: "Bangalore / Chennai / Hyderabad",
    eligibleBranches: ["CSE", "IT", "ECE"],
    minCgpa: 7.0,
    maxBacklogs: 0,
    deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    driveDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active",
    rounds: [
      { roundNumber: 1, name: "Amazon OA (Online Assessment)", description: "2 Coding Questions + Work Style Assessment", duration: "105 min" },
      { roundNumber: 2, name: "Technical Round 1", description: "Arrays, HashMaps, Heaps, and Amazon Leadership Principles", duration: "60 min" },
      { roundNumber: 3, name: "Technical Round 2", description: "Tree / Graph algorithms, DP, OOPs design", duration: "60 min" },
      { roundNumber: 4, name: "Bar Raiser Round", description: "Deep dive on projects, high-stakes behavioral scenarios using STAR", duration: "60 min" }
    ],
    testPattern: "HackerRank Assessment + 16 Amazon Leadership Principles simulation questions",
    requiredSkills: ["DSA (Priority Queues, Trees)", "Leadership Principles", "Java/C++", "System Fundamentals"],
    jobDescription: "Build distributed, fault-tolerant web-scale services supporting Amazon Prime, AWS, and global retail logistics.",
    pastInterviewTips: [
      "Crucial: Format every behavioral story strictly using the STAR method (Situation, Task, Action, Result).",
      "Mention customer obsession and deliver results in your answers."
    ]
  },
  {
    _id: "drive-4",
    companyName: "TCS Digital",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
    tier: "Dream (8-15 LPA)",
    role: "System Engineer (Digital Cadre)",
    ctc: "7.5 LPA - 9.2 LPA",
    location: "Pan India (Bangalore / Pune / Mumbai / Chennai)",
    eligibleBranches: ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil"],
    minCgpa: 6.5,
    maxBacklogs: 1,
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    driveDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active",
    rounds: [
      { roundNumber: 1, name: "TCS NQT Advanced", description: "Advanced Quantitative Aptitude + Advanced Coding (2 questions)", duration: "110 min" },
      { roundNumber: 2, name: "Technical + Managerial Interview", description: "Core CS subjects, project review, web stacks, SQL queries", duration: "45 min" },
      { roundNumber: 3, name: "HR Interview", description: "Relocation readiness, bond terms, communication evaluation", duration: "20 min" }
    ],
    testPattern: "TCS iON Platform: Advanced Quant, Verbal Reasoning, 2 Hands-on Coding questions",
    requiredSkills: ["Python / Java / C", "DBMS & SQL", "Aptitude & Problem Solving", "Full Stack Basics"],
    jobDescription: "TCS Digital cadre recognizes top engineering talent for advanced transformation projects involving AI, Cloud, Cyber Security, and Enterprise IoT.",
    pastInterviewTips: [
      "Prepare your final year or academic projects thoroughly. Know every library and DB query you used.",
      "Be confident in SQL joins, group by, indexing, and normalization."
    ]
  },
  {
    _id: "drive-5",
    companyName: "Deloitte USI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",
    tier: "Dream (8-15 LPA)",
    role: "Analyst - Technology Consulting",
    ctc: "8.1 LPA + Performance Bonus",
    location: "Hyderabad / Bangalore / Gurgaon",
    eligibleBranches: ["CSE", "IT", "ECE", "EEE"],
    minCgpa: 6.8,
    maxBacklogs: 0,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    driveDate: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Active",
    rounds: [
      { roundNumber: 1, name: "Online Aptitude & Tech Test", description: "Quantitative, Logical, Verbal + Computer Science Fundamentals", duration: "75 min" },
      { roundNumber: 2, name: "Technical Interview", description: "Database concepts, Cloud overview, SDLC models, Case scenario", duration: "40 min" },
      { roundNumber: 3, name: "Leadership / Partner Round", description: "Consulting case discussion, team dynamics, business acumen", duration: "30 min" }
    ],
    testPattern: "Amcat/CoCubes test: Aptitude, Coding fundamentals, and Automata test",
    requiredSkills: ["Analytical Thinking", "SQL", "Cloud Fundamentals (AWS/Azure)", "Agile SDLC", "Communication"],
    jobDescription: "Help Fortune 500 enterprises modernize their business operations through digital transformation, enterprise cloud adoption, and data analytics.",
    pastInterviewTips: [
      "Good communication and structured thinking are given high weightage.",
      "Know how software architectures connect to real business value."
    ]
  },
  {
    _id: "drive-6",
    companyName: "Cisco",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
    tier: "Super Dream (15+ LPA)",
    role: "Software Consulting & NetEng Engineer",
    ctc: "17.8 LPA (13.5 Base + Benefits)",
    location: "Bangalore",
    eligibleBranches: ["CSE", "IT", "ECE", "EEE"],
    minCgpa: 7.2,
    maxBacklogs: 0,
    deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    driveDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Upcoming",
    rounds: [
      { roundNumber: 1, name: "Online Test", description: "20 Computer Networks & OS MCQs + 2 Coding questions", duration: "90 min" },
      { roundNumber: 2, name: "Technical Round 1", description: "Computer Networks (TCP/IP, Routing, OSI layer) & C/Python", duration: "60 min" },
      { roundNumber: 3, name: "Technical Round 2", description: "DSA, Operating Systems, Threading, Linux Internals", duration: "45 min" },
      { roundNumber: 4, name: "Managerial & HR", description: "Situational behavioral questions, cultural alignment", duration: "30 min" }
    ],
    testPattern: "HackerRank: Strong focus on Computer Networks, OSI Model, Subnetting, and Algorithms",
    requiredSkills: ["Computer Networks (TCP/IP, DNS, ARP)", "Operating Systems", "C / C++ / Python", "Data Structures"],
    jobDescription: "Engineer the next generation of software-defined networking, security, and edge intelligence systems.",
    pastInterviewTips: [
      "Computer Networks is non-negotiable for Cisco: prepare 3-way handshake, TCP vs UDP, ARP, DNS resolution step-by-step."
    ]
  }
];

const sampleApplications = [
  {
    _id: "app-1",
    companyName: "Google",
    role: "Associate Software Engineer",
    ctc: "32.5 LPA",
    status: "Technical Round",
    appliedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    nextRoundDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Cleared Google Online Challenge with both test cases passing. Preparing Graph BFS/DFS and Dynamic Programming for Tech Round 1.",
    timeline: [
      { status: "Applied", date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), note: "Application submitted via campus portal" },
      { status: "OA Cleared", date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), note: "Score 100/100 on coding test" },
      { status: "Technical Round", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), note: "Scheduled for interview on Friday" }
    ]
  },
  {
    _id: "app-2",
    companyName: "Microsoft",
    role: "Software Engineering Intern / FTE",
    ctc: "26.0 LPA",
    status: "OA Scheduled",
    appliedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    nextRoundDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Codility test slot booked for Saturday 10:00 AM.",
    timeline: [
      { status: "Applied", date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), note: "Resume shortlisted by college TPO" },
      { status: "OA Scheduled", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), note: "Codility invite link received" }
    ]
  },
  {
    _id: "app-3",
    companyName: "TCS Digital",
    role: "System Engineer (Digital Cadre)",
    ctc: "7.5 LPA",
    status: "Offer Received",
    appliedDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    nextRoundDate: null,
    notes: "Official Letter of Intent (LOI) received. Background verification completed.",
    timeline: [
      { status: "Applied", date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), note: "Campus drive registered" },
      { status: "OA Cleared", date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(), note: "Cleared NQT Advanced" },
      { status: "Technical Round", date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), note: "Interview round was great, asked about MERN stack and SQL" },
      { status: "Offer Received", date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), note: "Selected for TCS Digital Cadre!" }
    ]
  },
  {
    _id: "app-4",
    companyName: "Amazon",
    role: "Software Development Engineer - 1",
    ctc: "28.5 LPA",
    status: "Applied",
    appliedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    nextRoundDate: null,
    notes: "Awaiting HackerRank OA assessment link.",
    timeline: [
      { status: "Applied", date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), note: "Registered through campus placement drive" }
    ]
  }
];

const sampleQuestions = [
  {
    company: "Google",
    role: "Software Engineer",
    category: "Data Structures & Algorithms",
    questionText: "Given a directed graph, how would you detect a cycle? Explain both Kahn's algorithm (topological sort) and DFS approach with their time complexities.",
    idealAnswer: "In DFS, we use three color states (White/Unvisited, Gray/Currently in Recursion Stack, Black/Fully Visited). If an edge points to a Gray node, a back-edge (cycle) exists. In Kahn's algorithm, we compute in-degrees for all nodes and use a queue. If the number of processed nodes is less than V, a cycle exists. Time complexity for both is O(V + E) and space complexity is O(V).",
    tips: "Mention that Kahn's algorithm is iterative and avoids recursion stack overflow for very deep graphs."
  },
  {
    company: "Amazon",
    role: "SDE 1",
    category: "Behavioral / Leadership Principles",
    questionText: "Tell me about a time when you were facing an ambiguous technical problem with a strict deadline. How did you break it down and deliver?",
    idealAnswer: "Structure using STAR: Situation (describe the academic or internship project), Task (what was the deliverable and why it was unclear), Action (talk about how you audited requirements, spoke with teammates or stakeholders, prioritized MVP features, and used incremental testing), and Result (delivered on time, measured impact, e.g. 25% faster load time or successful presentation).",
    tips: "Always quantitate your results with numbers, percentages, or concrete feedback received."
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    category: "Object-Oriented Design & Core CS",
    questionText: "Explain how you would design an In-Memory Caching System (like LRU Cache). What data structures would you pick to guarantee O(1) get and put operations?",
    idealAnswer: "To achieve O(1) for both get() and put(), we combine a Hash Map and a Doubly Linked List. The Hash Map maps keys to Doubly Linked List nodes for O(1) lookups. The Doubly Linked List maintains chronological access order, allowing O(1) node deletion and O(1) insertion at the head. When capacity is exceeded, we evict from the tail in O(1).",
    tips: "Mention dummy head and dummy tail pointers to eliminate edge-case checks for empty lists."
  },
  {
    company: "TCS Digital / Deloitte",
    role: "System Engineer",
    category: "DBMS & SQL",
    questionText: "What is the difference between Clustered and Non-Clustered Indexing in relational databases? How do they impact read and write performance?",
    idealAnswer: "A Clustered Index physically determines the storage order of the rows in the table. Because physical rows can only be sorted in one order, there can be only ONE clustered index per table (typically the Primary Key). A Non-Clustered Index creates a separate B-tree structure holding pointers to the physical data rows; a table can have multiple non-clustered indexes. Indexes speed up SELECT queries drastically but slightly slow down INSERT/UPDATE/DELETE operations due to index rebuilding.",
    tips: "Draw or describe the B-tree leaf node pointing to row pointers (RID) vs data pages directly."
  }
];

const collegePlacementStats = {
  currentSeason: "2026 - 2027 Placement Drive",
  totalEligibleStudents: 480,
  studentsPlaced: 394,
  placementRate: "82.1%",
  highestPackage: "48.2 LPA",
  averagePackage: "11.4 LPA",
  medianPackage: "9.2 LPA",
  totalCompaniesVisited: 86,
  upcomingDrivesThisMonth: 14,
  tierWiseOffers: {
    superDream: 48,
    dream: 152,
    regular: 194
  }
};

module.exports = {
  sampleDrives,
  sampleApplications,
  sampleQuestions,
  collegePlacementStats
};
