import { departmentsData } from './departments-data'; // Assuming departmentsData is imported from another file

export interface DirectorMetrics {
  id: string
  name: string
  department: string
  cluster: 'UIE' | 'UIC' | 'AIT'
  students: number
  
  // Student Performance & Placement
  placementRate: number
  averageCGPA: number
  resultPercentage: number
  backlogs: number
  topicChallenges: string[]
  
  // Compliance & Reporting
  lastReportDate: string
  reportsSubmitted: number
  complianceStatus: 'verified' | 'submitted' | 'pending' | 'overdue'
  delayedDays: number
  
  // Research & Innovation
  activeProjects: number
  publications: number
  patents: number
  industryPartnerships: number
  
  // Risk & Alerts
  healthScore: number
  riskLevel: 'critical' | 'high' | 'medium' | 'low'
  flags: string[]
}

interface Department {
  id: string
  cluster: 'UIE' | 'UIC' | 'AIT'
  name: string
  reportingPerson: string
  students: number
  lastReportDate: string
  compliancePercent: number
  delayedDays: number
  healthScore: number
}

interface Cluster {
  id: string
  name: string
  departments: Department[]
  totalStudents: number
  compliancePercent: number
  averageHealthScore: number
}

export const directorsData: DirectorMetrics[] = [
  // UIE Directors
  {
    id: 'dir-1',
    name: 'Dr. Vikas Wasson',
    department: 'Engineering Foundations',
    cluster: 'UIE',
    students: 3500,
    placementRate: 94,
    averageCGPA: 7.8,
    resultPercentage: 96,
    backlogs: 45,
    topicChallenges: ['Mathematics', 'Programming'],
    lastReportDate: '2026-02-10',
    reportsSubmitted: 12,
    complianceStatus: 'verified',
    delayedDays: 0,
    activeProjects: 12,
    publications: 8,
    patents: 2,
    industryPartnerships: 8,
    healthScore: 92,
    riskLevel: 'low',
    flags: [],
  },
  {
    id: 'dir-2',
    name: 'Dr. Puneet Kumar',
    department: 'CSE 2nd Year',
    cluster: 'UIE',
    students: 3800,
    placementRate: 91,
    averageCGPA: 7.5,
    resultPercentage: 94,
    backlogs: 62,
    topicChallenges: ['Data Structures', 'Algorithms'],
    lastReportDate: '2026-02-09',
    reportsSubmitted: 11,
    complianceStatus: 'verified',
    delayedDays: 1,
    activeProjects: 15,
    publications: 6,
    patents: 1,
    industryPartnerships: 7,
    healthScore: 88,
    riskLevel: 'low',
    flags: [],
  },
  {
    id: 'dir-3',
    name: 'Dr. Sandeep Singh Kang',
    department: 'CSE 3rd Year',
    cluster: 'UIE',
    students: 3200,
    placementRate: 88,
    averageCGPA: 7.6,
    resultPercentage: 95,
    backlogs: 38,
    topicChallenges: ['Web Development', 'Databases'],
    lastReportDate: '2026-02-08',
    reportsSubmitted: 12,
    complianceStatus: 'verified',
    delayedDays: 2,
    activeProjects: 18,
    publications: 9,
    patents: 2,
    industryPartnerships: 10,
    healthScore: 90,
    riskLevel: 'low',
    flags: [],
  },
  {
    id: 'dir-4',
    name: 'Dr. Navpreet Kaur Walia',
    department: 'CSE 4th Year',
    cluster: 'UIE',
    students: 2900,
    placementRate: 96,
    averageCGPA: 7.9,
    resultPercentage: 97,
    backlogs: 22,
    topicChallenges: [],
    lastReportDate: '2026-02-10',
    reportsSubmitted: 12,
    complianceStatus: 'verified',
    delayedDays: 0,
    activeProjects: 20,
    publications: 11,
    patents: 3,
    industryPartnerships: 12,
    healthScore: 95,
    riskLevel: 'low',
    flags: [],
  },
  {
    id: 'dir-5',
    name: 'Dr. Tripti',
    department: 'Core Engineering',
    cluster: 'UIE',
    students: 4100,
    placementRate: 89,
    averageCGPA: 7.4,
    resultPercentage: 93,
    backlogs: 78,
    topicChallenges: ['Thermodynamics', 'Mechanics'],
    lastReportDate: '2026-02-06',
    reportsSubmitted: 10,
    complianceStatus: 'submitted',
    delayedDays: 4,
    activeProjects: 14,
    publications: 7,
    patents: 1,
    industryPartnerships: 6,
    healthScore: 82,
    riskLevel: 'medium',
    flags: ['Pending verification', 'High backlog count'],
  },

  // AIT Director
  {
    id: 'dir-6',
    name: 'Dr. Jagdish Chandra Patni',
    department: 'AIT CSE',
    cluster: 'AIT',
    students: 2100,
    placementRate: 92,
    averageCGPA: 7.7,
    resultPercentage: 95,
    backlogs: 35,
    topicChallenges: ['AI/ML Integration', 'Cloud Computing'],
    lastReportDate: '2026-02-09',
    reportsSubmitted: 11,
    complianceStatus: 'verified',
    delayedDays: 1,
    activeProjects: 16,
    publications: 10,
    patents: 2,
    industryPartnerships: 9,
    healthScore: 91,
    riskLevel: 'low',
    flags: [],
  },

  // UIC Director
  {
    id: 'dir-7',
    name: 'Dr. Manisha',
    department: 'UIC',
    cluster: 'UIC',
    students: 1400,
    placementRate: 85,
    averageCGPA: 7.3,
    resultPercentage: 91,
    backlogs: 52,
    topicChallenges: ['IT Infrastructure', 'Compliance'],
    lastReportDate: '2026-02-05',
    reportsSubmitted: 9,
    complianceStatus: 'pending',
    delayedDays: 5,
    activeProjects: 11,
    publications: 5,
    patents: 0,
    industryPartnerships: 5,
    healthScore: 78,
    riskLevel: 'high',
    flags: ['Report pending verification', 'Below target placement'],
  },
]

export function getEDSummary() {
  const totalStudents = directorsData.reduce((sum, d) => sum + d.students, 0)
  const avgPlacementRate = Math.round(directorsData.reduce((sum, d) => sum + d.placementRate, 0) / directorsData.length)
  const avgCGPA = Number((directorsData.reduce((sum, d) => sum + d.averageCGPA, 0) / directorsData.length).toFixed(2))
  const avgCompliance = Math.round(
    (directorsData.filter((d) => d.complianceStatus === 'verified').length / directorsData.length) * 100,
  )
  const delayedCount = directorsData.filter((d) => d.delayedDays > 7).length
  const highRiskCount = directorsData.filter((d) => d.healthScore < 80).length
  const pendingReports = directorsData.filter((d) => d.complianceStatus === 'pending' || d.complianceStatus === 'overdue').length

  const totalProjects = directorsData.reduce((sum, d) => sum + d.activeProjects, 0)
  const totalPublications = directorsData.reduce((sum, d) => sum + d.publications, 0)
  const totalPatents = directorsData.reduce((sum, d) => sum + d.patents, 0)
  const totalPartnerships = directorsData.reduce((sum, d) => sum + d.industryPartnerships, 0)
  const totalBacklogs = directorsData.reduce((sum, d) => sum + d.backlogs, 0)
  const avgResult = Math.round(directorsData.reduce((sum, d) => sum + d.resultPercentage, 0) / directorsData.length)

  return {
    // Overview Metrics
    totalStudents,
    totalDirectors: directorsData.length,
    
    // Student Performance & Placement
    avgPlacementRate,
    avgCGPA,
    avgResult,
    totalBacklogs,
    
    // Compliance & Reporting
    avgCompliance,
    delayedCount,
    pendingReports,
    
    // Research & Innovation
    totalProjects,
    totalPublications,
    totalPatents,
    totalPartnerships,
    
    // Risk & Alerts
    highRiskCount,
    
    // Raw data
    directors: directorsData,
  }
}
