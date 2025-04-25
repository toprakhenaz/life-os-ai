const defaultData = {
  user: {
    name: "User",
    topPriorities: ["Mastering Influence", "Building Wealth"],
    mentalEnergyLog: Array(30).fill(null).map(() => Math.floor(Math.random() * 10) + 1),
    completionRates: [35, 42, 50, 55, 60, 62, 68],
    stressLevels: Array(30).fill(null).map(() => Math.floor(Math.random() * 10) + 1),
    influenceSkillProgress: [
      { date: "2025-04-01", score: 3 },
      { date: "2025-04-08", score: 4 },
      { date: "2025-04-15", score: 5 },
      { date: "2025-04-22", score: 6 }
    ],
    wealthMetrics: [
      { date: "2025-04-01", savings: 100, skills: 2, network: 1 },
      { date: "2025-04-08", savings: 150, skills: 3, network: 2 },
      { date: "2025-04-15", savings: 200, skills: 3, network: 3 },
      { date: "2025-04-22", savings: 280, skills: 4, network: 4 }
    ],
    projectCompletionHistory: [
      { name: "Personal Website", status: "completed", date: "2025-03-15", size: "medium" },
      { name: "Book Summary Notes", status: "abandoned", date: "2025-03-22", size: "small" },
      { name: "Learning Python Basics", status: "completed", date: "2025-03-30", size: "large" },
      { name: "Networking Event", status: "completed", date: "2025-04-05", size: "small" },
      { name: "Investment Research", status: "in-progress", date: "2025-04-20", size: "medium" }
    ]
  },
  habits: [
    // Your habit data...
  ],
  weeklySchedule: {
    // Your weekly schedule data...
  },
  weeklyProgress: {
    influencePractice: 0,
    wealthActions: 0,
    problemsSolved: 0,
    pagesRead: 0,
    gymSessions: 0,
    englishPractice: 0
  },
  currentDate: new Date().toISOString().split('T')[0]
};

export default defaultData;