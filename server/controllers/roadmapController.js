// AI 30-Day Placement Sprint Roadmap Generator

const ROADMAP_TEMPLATES = {
  'Super Dream (15+ LPA)': {
    week1: {
      theme: 'Mastering Advanced Data Structures & Two Pointers / Sliding Window',
      milestones: [
        'Solve 15 LeetCode Mediums on Two Pointers & Fast-Slow Pointers',
        'Master Sliding Window patterns (Fixed & Variable length)',
        'Binary Search on Answer Space (e.g., Aggressive Cows, Book Allocation)',
        'Stack fundamentals: Monotonic Stack (Next Greater Element)',
      ],
      mustSolveProblems: [
        { name: 'Trapping Rain Water', platform: 'LeetCode 42', difficulty: 'Hard' },
        { name: 'Longest Substring Without Repeating Characters', platform: 'LeetCode 3', difficulty: 'Medium' },
        { name: 'Koko Eating Bananas', platform: 'LeetCode 875', difficulty: 'Medium' },
        { name: 'Daily Temperatures', platform: 'LeetCode 739', difficulty: 'Medium' },
      ],
      coreCsFocus: 'Operating Systems: Threads vs Processes, Virtual Memory, Inverted Page Tables, Mutex vs Semaphore.',
    },
    week2: {
      theme: 'Binary Trees, BST, Heaps & Graph Traversal (BFS / DFS)',
      milestones: [
        'Tree Traversals (Inorder, Preorder, Postorder - both recursive and iterative)',
        'LCA (Lowest Common Ancestor) & Tree Diameter',
        'Top K Elements with Min/Max Heaps',
        'Graph representations (Adjacency List), BFS, DFS, Cycle Detection in Directed/Undirected Graphs',
      ],
      mustSolveProblems: [
        { name: 'Lowest Common Ancestor of a Binary Tree', platform: 'LeetCode 236', difficulty: 'Medium' },
        { name: 'Course Schedule (Topological Sort / Kahn’s)', platform: 'LeetCode 207', difficulty: 'Medium' },
        { name: 'Number of Islands (BFS/DFS)', platform: 'LeetCode 200', difficulty: 'Medium' },
        { name: 'Find Median from Data Stream (Two Heaps)', platform: 'LeetCode 295', difficulty: 'Hard' },
      ],
      coreCsFocus: 'DBMS: B-Tree Indexing internals, ACID transactions, Normalization (1NF to BCNF), and Write-Ahead Logging.',
    },
    week3: {
      theme: 'Dynamic Programming & High-Yield Low-Level System Design',
      milestones: [
        '1D DP (House Robber, Climbing Stairs)',
        '2D Grid DP & Knapsack variants',
        'Longest Common Subsequence (LCS) & Longest Increasing Subsequence (LIS)',
        'OOPs & LLD: Design LRU Cache, Design Parking Lot, Factory & Singleton patterns',
      ],
      mustSolveProblems: [
        { name: 'Coin Change (Unbounded Knapsack)', platform: 'LeetCode 322', difficulty: 'Medium' },
        { name: 'Longest Increasing Subsequence', platform: 'LeetCode 300', difficulty: 'Medium' },
        { name: 'LRU Cache Implementation', platform: 'LeetCode 146', difficulty: 'Medium' },
        { name: 'Word Break', platform: 'LeetCode 139', difficulty: 'Medium' },
      ],
      coreCsFocus: 'Computer Networks: TCP 3-way handshake, TCP Congestion Control, DNS hierarchy, and HTTP/2 vs HTTP/3.',
    },
    week4: {
      theme: 'Mock OA Speed Runs, Resume Defense & STAR Leadership Prep',
      milestones: [
        'Timed Online Assessments (Complete 2 problems in 60 mins)',
        'Project Deep Dive: Defend every single line in your resume',
        'Amazon 16 Leadership Principles & Google Googliness STAR stories',
        'HR & Behavioral round polish (handling salary, weaknesses, career goals)',
      ],
      mustSolveProblems: [
        { name: 'Timed Mock OA Test #1', platform: 'HackerRank / LeetCode Contest', difficulty: 'Mixed' },
        { name: 'Timed Mock OA Test #2', platform: 'Codeforces Div 3 / Codility', difficulty: 'Mixed' },
      ],
      coreCsFocus: 'Behavioral: Prepare 4 bulletproof STAR stories (Conflict, Failure, Technical Challenge, Leadership).',
    },
  },
  'Dream (8-15 LPA)': {
    week1: {
      theme: 'Arrays, Strings, HashMaps, and Basic Recursion',
      milestones: [
        'Array manipulation & Kadane’s Algorithm (Maximum Subarray)',
        'Two Sum and Three Sum using HashMaps and Two Pointers',
        'String anagrams, palindrome verification, and string compression',
        'Recursion basics & Backtracking (Subsets, Permutations)',
      ],
      mustSolveProblems: [
        { name: 'Maximum Subarray (Kadane’s)', platform: 'LeetCode 53', difficulty: 'Medium' },
        { name: 'Two Sum & 3Sum', platform: 'LeetCode 1 & 15', difficulty: 'Medium' },
        { name: 'Valid Parentheses', platform: 'LeetCode 20', difficulty: 'Easy' },
      ],
      coreCsFocus: 'OOPs: Polymorphism (overloading vs overriding), Abstract Classes vs Interfaces.',
    },
    week2: {
      theme: 'Linked Lists, Stacks, Queues, and Binary Search Trees',
      milestones: [
        'Reverse a Linked List & Detect Cycle',
        'Merge Two Sorted Lists',
        'Binary Search implementation and edge cases',
        'Binary Tree Level Order Traversal',
      ],
      mustSolveProblems: [
        { name: 'Reverse Linked List', platform: 'LeetCode 206', difficulty: 'Easy' },
        { name: 'Validate Binary Search Tree', platform: 'LeetCode 98', difficulty: 'Medium' },
        { name: 'Binary Tree Level Order Traversal', platform: 'LeetCode 102', difficulty: 'Medium' },
      ],
      coreCsFocus: 'SQL: Inner/Left/Right/Full Joins, GROUP BY, HAVING, and Subqueries.',
    },
    week3: {
      theme: 'Standard Dynamic Programming & Core CS Revision',
      milestones: [
        'Memoization vs Tabulation approaches',
        '0/1 Knapsack problem and subset sum',
        'Standard Graph BFS/DFS on Matrix Grids',
      ],
      mustSolveProblems: [
        { name: 'Climbing Stairs', platform: 'LeetCode 70', difficulty: 'Easy' },
        { name: 'Number of Islands', platform: 'LeetCode 200', difficulty: 'Medium' },
      ],
      coreCsFocus: 'Operating Systems: Deadlock Coffman conditions, Paging, Virtual Memory.',
    },
    week4: {
      theme: 'Company Past Papers & Managerial Prep',
      milestones: [
        'Solve 5 past placement papers from TCS Digital, Accenture, Deloitte, or Infosys',
        'Resume walkthrough practice (2-minute elevator pitch)',
        'Technical round mock interview practice',
      ],
      mustSolveProblems: [
        { name: 'Company Specific Assessment #1', platform: 'PrepBytes / GeeksforGeeks', difficulty: 'Medium' },
      ],
      coreCsFocus: 'Resume Projects: Prepare architecture diagram, database schema, and deployment process.',
    },
  },
};

// @desc    Generate personalized 30-day placement sprint
// @route   POST /api/roadmap/generate
const generateRoadmap = async (req, res) => {
  try {
    const { targetTier, weakAreas, preparationLevel } = req.body;

    const tierKey = targetTier && ROADMAP_TEMPLATES[targetTier]
      ? targetTier
      : 'Super Dream (15+ LPA)';

    const baseRoadmap = ROADMAP_TEMPLATES[tierKey] || ROADMAP_TEMPLATES['Super Dream (15+ LPA)'];

    const personalized = {
      targetTier: tierKey,
      level: preparationLevel || 'Intermediate',
      weakAreas: weakAreas || ['Dynamic Programming', 'SQL Joins'],
      weeks: [
        { weekNumber: 1, ...baseRoadmap.week1 },
        { weekNumber: 2, ...baseRoadmap.week2 },
        { weekNumber: 3, ...baseRoadmap.week3 },
        { weekNumber: 4, ...baseRoadmap.week4 },
      ],
      dailyHabitRecommendation: [
        '1 hour DSA problem solving (2 problems daily)',
        '45 minutes Core CS subject flashcards (OS / DBMS / Networks / OOPs)',
        '30 minutes project review / commit to GitHub',
        '15 minutes Aptitude or Quantitative reasoning question',
      ],
    };

    return res.json(personalized);
  } catch (error) {
    console.error('Generate roadmap error:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateRoadmap,
};
