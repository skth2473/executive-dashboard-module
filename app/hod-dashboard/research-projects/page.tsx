'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus, Edit2, User, FileText, TrendingUp, Calendar } from 'lucide-react';

interface Supervisor {
  id: string;
  name: string;
  email: string;
  specialization: string;
}

interface ResearchProject {
  id: string;
  title: string;
  supervisors: Supervisor[];
  scholars: number;
  startYear: number;
  status: 'ongoing' | 'completed' | 'on_hold';
  fundingAgency?: string;
  budget?: number;
  publications?: number;
  lastUpdate?: string;
  type: 'phd' | 'research';
}

export default function ResearchProjectsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [projectType, setProjectType] = useState<'phd' | 'research'>('phd');

  const projects: ResearchProject[] = [
    {
      id: 'phd-001',
      title: 'Contemporary Indian Literature and Cultural Identity',
      type: 'phd',
      supervisors: [
        { id: 's1', name: 'Dr. Rajesh Sharma', email: 'rajesh@uilah.edu.in', specialization: 'Modern Literature' }
      ],
      scholars: 3,
      startYear: 2021,
      status: 'ongoing',
      fundingAgency: 'UGC',
      budget: 500000,
      publications: 2,
      lastUpdate: '2024-03-04',
    },
    {
      id: 'phd-002',
      title: 'Digital Humanities: Archive Digitization and Analysis',
      type: 'phd',
      supervisors: [
        { id: 's2', name: 'Prof. Meera Gupta', email: 'meera@uilah.edu.in', specialization: 'Digital Studies' }
      ],
      scholars: 2,
      startYear: 2022,
      status: 'ongoing',
      fundingAgency: 'DBT',
      budget: 750000,
      publications: 1,
      lastUpdate: '2024-02-28',
    },
    {
      id: 'res-001',
      title: 'Community Engagement: Oral Histories of Chandigarh',
      type: 'research',
      supervisors: [
        { id: 's3', name: 'Dr. Vikram Patel', email: 'vikram@uilah.edu.in', specialization: 'History' }
      ],
      scholars: 5,
      startYear: 2023,
      status: 'ongoing',
      publications: 0,
      lastUpdate: '2024-03-01',
    },
  ];

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } else if (user.role !== 'hod') {
        router.replace('/');
      } else {
        setIsReady(true);
      }
    }
  }, [user, loading, router]);

  if (loading || !isReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const phdProjects = projects.filter(p => p.type === 'phd');
  const researchProjects = projects.filter(p => p.type === 'research');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-50 border-green-200';
      case 'completed':
        return 'bg-blue-50 border-blue-200';
      case 'on_hold':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.back()}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Research Projects
                  </h1>
                  <p className="text-muted-foreground">
                    Manage PhD & regular research projects with supervisor access
                  </p>
                </div>
              </div>
              <Button onClick={() => setShowForm(!showForm)} size="lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-50/50 border-purple-200/50">
                <p className="text-xs font-semibold text-muted-foreground mb-1">PhD Projects</p>
                <p className="text-2xl font-bold text-purple-700">{phdProjects.length}</p>
                <p className="text-xs text-muted-foreground mt-1">{phdProjects.reduce((s, p) => s + p.scholars, 0)} Scholars</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-50/50 border-blue-200/50">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Research Projects</p>
                <p className="text-2xl font-bold text-blue-700">{researchProjects.length}</p>
                <p className="text-xs text-muted-foreground mt-1">{researchProjects.reduce((s, p) => s + p.scholars, 0)} Team Members</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-50/50 border-green-200/50">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Total Budget</p>
                <p className="text-2xl font-bold text-green-700">₹{(phdProjects.reduce((s, p) => s + (p.budget || 0), 0) / 100000).toFixed(1)}L</p>
                <p className="text-xs text-muted-foreground mt-1">Allocated funding</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-50/50 border-orange-200/50">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Publications</p>
                <p className="text-2xl font-bold text-orange-700">{projects.reduce((s, p) => s + (p.publications || 0), 0)}</p>
                <p className="text-xs text-muted-foreground mt-1">Generated so far</p>
              </Card>
            </div>

            {/* Add Project Form */}
            {showForm && (
              <Card className="p-6 mb-8 bg-gradient-to-br from-blue-50/50 to-blue-50/50 border-blue-200">
                <h3 className="text-lg font-semibold text-foreground mb-4">Add New Research Project</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Project Type</label>
                    <div className="flex gap-4">
                      {['phd', 'research'].map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value={type}
                            checked={projectType === type}
                            onChange={(e) => setProjectType(e.target.value as 'phd' | 'research')}
                          />
                          <span className="text-sm font-medium">
                            {type === 'phd' ? 'PhD Project' : 'Regular Research'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Project Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Contemporary Indian Literature and Cultural Identity"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  {projectType === 'phd' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Funding Agency</label>
                        <input
                          type="text"
                          placeholder="e.g., UGC, DBT, CSIR"
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Budget (₹)</label>
                        <input
                          type="number"
                          placeholder="500000"
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1">Add Project</Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* PhD Projects Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">PhD Research Projects</h2>
              <div className="grid grid-cols-1 gap-4">
                {phdProjects.length === 0 ? (
                  <Card className="p-6 text-center text-muted-foreground">
                    <p>No PhD projects yet</p>
                  </Card>
                ) : (
                  phdProjects.map(project => (
                    <Card key={project.id} className={`p-6 border-2 ${getStatusColor(project.status)} hover:shadow-lg transition-all`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              Since {project.startYear}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" />
                              {project.scholars} Scholars
                            </span>
                            {project.fundingAgency && (
                              <span className="flex items-center gap-1">
                                <FileText className="w-3.5 h-3.5" />
                                {project.fundingAgency}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Supervisors */}
                      <div className="mb-4 p-4 bg-white/50 rounded-lg">
                        <p className="text-sm font-semibold text-foreground mb-2">PhD Supervisors (Can update data)</p>
                        <div className="space-y-2">
                          {project.supervisors.map(sup => (
                            <div key={sup.id} className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-foreground">{sup.name}</p>
                                <p className="text-xs text-muted-foreground">{sup.email}</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div>
                          <p className="text-xs font-semibold opacity-75">Budget</p>
                          <p className="font-semibold">₹{(project.budget || 0) / 100000}L</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold opacity-75">Status</p>
                          <p className="font-semibold capitalize">{project.status}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold opacity-75">Publications</p>
                          <p className="font-semibold">{project.publications}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold opacity-75">Last Updated</p>
                          <p className="font-semibold text-xs">{project.lastUpdate ? new Date(project.lastUpdate).toLocaleDateString() : 'N/A'}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Regular Research Projects Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Research Initiatives</h2>
              <div className="grid grid-cols-1 gap-4">
                {researchProjects.length === 0 ? (
                  <Card className="p-6 text-center text-muted-foreground">
                    <p>No research projects yet</p>
                  </Card>
                ) : (
                  researchProjects.map(project => (
                    <Card key={project.id} className={`p-6 border-2 ${getStatusColor(project.status)} hover:shadow-lg transition-all`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">Team: {project.scholars} Members</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-xs font-semibold opacity-75">Lead Investigator</p>
                          <p className="font-semibold">{project.supervisors[0].name}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold opacity-75">Status</p>
                          <p className="font-semibold capitalize">{project.status}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold opacity-75">Since</p>
                          <p className="font-semibold">{project.startYear}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Info Box */}
            <Card className="p-6 bg-blue-50/50 border-blue-200/50 mt-8">
              <h3 className="font-semibold text-blue-900 mb-2">Research Project Management</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• PhD Supervisors have direct access to update project status and progress</li>
                <li>• Weekly updates from supervisors are automatically synced to Senior ED</li>
                <li>• Track budget allocation, publications, and scholar progress</li>
                <li>• All research data is compiled in departmental analytics</li>
              </ul>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
