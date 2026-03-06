'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Microscope, TrendingUp, DollarSign, Calendar, User, Building2, ChevronDown, ChevronUp } from 'lucide-react';

interface ResearchProject {
  id: string;
  title: string;
  piName: string;
  department: string;
  fundingAgency: string;
  budget: string;
  status: 'Ongoing' | 'Completed' | 'Planning';
  startDate: string;
  endDate: string;
  description: string;
}

const projects: ResearchProject[] = [
  {
    id: '1',
    title: 'AI-Based IoT Applications for Smart City Infrastructure',
    piName: 'Dr. Rajesh Kumar',
    department: 'CSE',
    fundingAgency: 'DST - Government of India',
    budget: '₹45,00,000',
    status: 'Ongoing',
    startDate: '2023-01',
    endDate: '2025-12',
    description: 'Development of intelligent IoT systems for urban infrastructure management using machine learning and AI algorithms at Chandigarh University.',
  },
  {
    id: '2',
    title: 'Quantum Computing Applications in Cryptography',
    piName: 'Prof. Priya Sharma',
    department: 'CSE',
    fundingAgency: 'SERB (Science and Engineering Research Board)',
    budget: '₹32,50,000',
    status: 'Ongoing',
    startDate: '2022-06',
    endDate: '2025-05',
    description: 'Research on quantum-resistant cryptographic algorithms and their implementation for secure communication systems.',
  },
  {
    id: '3',
    title: 'Advanced VLSI Design for Energy-Efficient Processors',
    piName: 'Dr. Vikram Singh',
    department: 'Electronics & Communication',
    fundingAgency: 'CSIR',
    budget: '₹38,00,000',
    status: 'Ongoing',
    startDate: '2023-03',
    endDate: '2026-02',
    description: 'Design and fabrication of ultra-low power VLSI chips using advanced nanometer technology nodes.',
  },
  {
    id: '4',
    title: 'Sustainable Materials for Renewable Energy Storage',
    piName: 'Dr. Neha Verma',
    department: 'Chemical Engineering',
    fundingAgency: 'DSIR',
    budget: '₹28,50,000',
    status: 'Ongoing',
    startDate: '2023-07',
    endDate: '2025-06',
    description: 'Development of eco-friendly battery materials and energy storage solutions for sustainable power generation.',
  },
  {
    id: '5',
    title: 'Computer Vision for Autonomous Vehicles',
    piName: 'Prof. Arun Patel',
    department: 'CSE',
    fundingAgency: 'IMPRINT India',
    budget: '₹42,00,000',
    status: 'Ongoing',
    startDate: '2022-09',
    endDate: '2026-08',
    description: 'Advanced computer vision algorithms for autonomous navigation and real-time object detection in vehicles.',
  },
  {
    id: '6',
    title: 'Nanotechnology Applications in Water Purification',
    piName: 'Dr. Sunita Desai',
    department: 'Mechanical Engineering',
    fundingAgency: 'MHRD - National Institute Ranking Framework',
    budget: '₹35,00,000',
    status: 'Completed',
    startDate: '2020-01',
    endDate: '2023-12',
    description: 'Development of nano-scale filtration membranes for efficient water treatment and purification.',
  },
  {
    id: '7',
    title: 'Deep Learning for Medical Image Analysis',
    piName: 'Dr. Rohit Kumar',
    department: 'IT',
    fundingAgency: 'DBT - Biotechnology',
    budget: '₹40,00,000',
    status: 'Ongoing',
    startDate: '2023-04',
    endDate: '2026-03',
    description: 'AI-powered medical imaging systems for accurate disease diagnosis and patient monitoring at Chandigarh University Medical Research Centre.',
  },
  {
    id: '8',
    title: 'Blockchain Technology for Supply Chain Management',
    piName: 'Prof. Sanjeev Sharma',
    department: 'CSE',
    fundingAgency: 'NASSCOM',
    budget: '₹31,00,000',
    status: 'Planning',
    startDate: '2024-06',
    endDate: '2027-05',
    description: 'Implementation of distributed ledger technology for transparent and secure supply chain operations.',
  },
];

export default function ResearchProjects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredProjects = filterStatus === 'All' 
    ? projects 
    : projects.filter(p => p.status === filterStatus);

  const ongoingCount = projects.filter(p => p.status === 'Ongoing').length;
  const completedCount = projects.filter(p => p.status === 'Completed').length;
  const totalBudget = projects.reduce((sum, p) => {
    const amount = parseInt(p.budget.replace(/[₹,]/g, ''));
    return sum + amount;
  }, 0);

  const statusColors = {
    'Ongoing': 'bg-blue-50 border-blue-200 text-blue-700',
    'Completed': 'bg-green-50 border-green-200 text-green-700',
    'Planning': 'bg-yellow-50 border-yellow-200 text-yellow-700',
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                Research Projects
              </h2>
              <p className="text-muted-foreground text-sm">
                Chandigarh University Engineering Research Initiatives
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-50/95 border border-blue-200">
                <Microscope className="w-8 h-8 text-blue-600 mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Total Projects</p>
                <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-50/95 border border-green-200">
                <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Ongoing</p>
                <p className="text-3xl font-bold text-green-600">{ongoingCount}</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-50/95 border border-purple-200">
                <Building2 className="w-8 h-8 text-purple-600 mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <p className="text-3xl font-bold text-purple-600">{completedCount}</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-50/95 border border-orange-200">
                <DollarSign className="w-8 h-8 text-orange-600 mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Total Budget</p>
                <p className="text-2xl font-bold text-orange-600">₹{(totalBudget / 10000000).toFixed(1)}Cr</p>
              </Card>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold text-foreground">Filter by Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">All Projects</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Planning">Planning</option>
              </select>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <Card 
                  key={project.id}
                  className="p-6 bg-gradient-to-r from-card to-card/95 border border-border/50 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status]}`}>
                          {project.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>
                      
                      {/* Summary Row */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Principal Investigator</p>
                            <p className="font-semibold text-foreground">{project.piName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Department</p>
                            <p className="font-semibold text-foreground">{project.department}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Budget</p>
                            <p className="font-semibold text-foreground">{project.budget}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Duration</p>
                            <p className="font-semibold text-foreground">{project.startDate} - {project.endDate}</p>
                          </div>
                        </div>
                      </div>

                      {/* Expandable Details */}
                      {expandedId === project.id && (
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-semibold text-foreground mb-2">About Project</p>
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                            </div>
                            <div className="space-y-2">
                              <div className="p-3 bg-secondary rounded">
                                <p className="text-xs text-muted-foreground font-semibold">Funding Agency</p>
                                <p className="text-sm font-semibold text-foreground">{project.fundingAgency}</p>
                              </div>
                              <div className="p-3 bg-secondary rounded">
                                <p className="text-xs text-muted-foreground font-semibold">Project ID</p>
                                <p className="text-sm font-semibold text-foreground">{project.id}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      {expandedId === project.id ? (
                        <ChevronUp className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
