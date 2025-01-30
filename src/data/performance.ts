export interface EmployeePerformance {
  id: string;
  name: string;
  leadsAssigned: number;
  leadsClosed: number;
  dealsWon: number;
  dealsLost: number;
  revenue: number;
  avgFollowUpTime: number;
  conversionRate: number;
}

export const performanceData: EmployeePerformance[] = [
  {
    id: "1",
    name: "Sarah Wilson",
    leadsAssigned: 150,
    leadsClosed: 85,
    dealsWon: 45,
    dealsLost: 40,
    revenue: 450000,
    avgFollowUpTime: 24,
    conversionRate: 53,
  },
  {
    id: "2",
    name: "Mike Brown",
    leadsAssigned: 120,
    leadsClosed: 65,
    dealsWon: 35,
    dealsLost: 30,
    revenue: 320000,
    avgFollowUpTime: 36,
    conversionRate: 48,
  },
  {
    id: "3",
    name: "Emily Chen",
    leadsAssigned: 180,
    leadsClosed: 95,
    dealsWon: 55,
    dealsLost: 40,
    revenue: 580000,
    avgFollowUpTime: 18,
    conversionRate: 58,
  },
];