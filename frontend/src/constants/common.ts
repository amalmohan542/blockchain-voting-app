// Mock data
const mockElections = [
    {
      id: "election-2023",
      title: "University Student Council Election 2023",
      status: "active", // active, upcoming, ended
      startDate: "2023-05-15T08:00:00",
      endDate: "2023-05-16T20:00:00",
      totalVoters: 1200,
      registeredVoters: 850,
      votesCount: 412,
      candidates: [
        { id: "c1", name: "Alex Johnson", party: "Progress Party", votes: 156 },
        { id: "c2", name: "Maria Garcia", party: "Student Voice", votes: 124 },
        { id: "c3", name: "James Wilson", party: "Future Alliance", votes: 87 },
        { id: "c4", name: "Sarah Ahmed", party: "Independent", votes: 45 },
      ],
    },
    {
      id: "election-faculty",
      title: "Faculty Representative Election 2023",
      status: "ended",
      startDate: "2023-04-10T08:00:00",
      endDate: "2023-04-11T20:00:00",
      totalVoters: 500,
      registeredVoters: 420,
      votesCount: 380,
      candidates: [
        { id: "f1", name: "David Lee", party: "Academic Excellence", votes: 145 },
        { id: "f2", name: "Emma Rodriguez", party: "Student First", votes: 135 },
        { id: "f3", name: "Michael Chen", party: "Innovation Group", votes: 100 },
      ],
    },
    {
      id: "election-upcoming",
      title: "Graduate Student Association Election 2023",
      status: "upcoming",
      startDate: "2023-06-01T08:00:00",
      endDate: "2023-06-02T20:00:00",
      totalVoters: 300,
      registeredVoters: 120,
      votesCount: 0,
      candidates: [
        { id: "g1", name: "Sophia Kim", party: "Research Focus", votes: 0 },
        { id: "g2", name: "Daniel Brown", party: "Graduate Voice", votes: 0 },
        { id: "g3", name: "Olivia Martinez", party: "Academic Progress", votes: 0 },
      ],
    },
  ]

  export {mockElections}