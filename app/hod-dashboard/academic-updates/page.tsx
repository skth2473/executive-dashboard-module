'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus, Edit2, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';

interface AcademicSection {
  id: string;
  name: string;
  year: number;
  studentCount: number;
  lastUpdate?: string;
  status: 'submitted' | 'pending' | 'under_review';
}

interface AcademicUpdate {
  id: string;
  week: number;
  date: string;
  curriculum: string;
  attendance: number;
  assessments: string;
  challenges: string;
  nextWeekPlan: string;
  submittedAt?: string;
}

export default function AcademicUpdatesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [activeSection, setActiveSection] = useState<AcademicSection | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [updates, setUpdates] = useState<AcademicUpdate[]>([]);

  const sections: AcademicSection[] = [
    { id: 'year1', name: 'Year 1 - Foundation', year: 1, studentCount: 450, status: 'pending' },
    { id: 'year2', name: 'Year 2 - Core Subjects', year: 2, studentCount: 420, status: 'submitted', lastUpdate: '2024-03-04' },
    { id: 'year3', name: 'Year 3 - Specialization', year: 3, studentCount: 380, status: 'under_review', lastUpdate: '2024-02-26' },
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'under_review':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'under_review':
        return <Calendar className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (activeSection) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setActiveSection(null)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {activeSection.name}
                  </h1>
                  <p className="text-muted-foreground">
                    {activeSection.studentCount} Students • {activeSection.department || 'No department'}
                  </p>
                </div>
              </div>

              {/* Submit New Update Button */}
              <Button
                onClick={() => setShowForm(!showForm)}
                className="mb-6"
                size="lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Submit Weekly Update
              </Button>

              {/* Update Form */}
              {showForm && (
                <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50/50 to-blue-50/50 border-blue-200">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Week {updates.length + 1} Academic Update
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Curriculum Covered
                      </label>
                      <textarea
                        placeholder="Describe the topics and concepts covered this week..."
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Attendance (%)
                        </label>
                        <input
                          type="number"
                          placeholder="85"
                          min="0"
                          max="100"
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Assessments Conducted
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Quiz, Assignment, Test"
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Challenges & Observations
                      </label>
                      <textarea
                        placeholder="Mention any challenges faced and observations..."
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Next Week Plan
                      </label>
                      <textarea
                        placeholder="Outline topics and activities planned for next week..."
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1">Submit Update</Button>
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

              {/* Previous Updates */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Previous Updates</h2>
                {updates.length === 0 ? (
                  <Card className="p-6 text-center text-muted-foreground">
                    <p>No updates submitted yet</p>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {updates.map((update) => (
                      <Card key={update.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">Week {update.week}</h3>
                            <p className="text-sm text-muted-foreground">{update.date}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.back()}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Academic Updates
                </h1>
                <p className="text-muted-foreground">
                  Submit weekly updates for each year/section
                </p>
              </div>
            </div>

            {/* Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sections.map((section) => (
                <Card
                  key={section.id}
                  className={`p-6 border-2 cursor-pointer hover:shadow-lg transition-all ${getStatusColor(section.status)}`}
                  onClick={() => setActiveSection(section)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{section.name}</h3>
                      <p className="text-sm opacity-75">{section.studentCount} Students</p>
                    </div>
                    {getStatusIcon(section.status)}
                  </div>

                  <div className="pt-4 border-t border-current/20">
                    <p className="text-xs font-semibold opacity-75 mb-1">Status</p>
                    <p className="font-semibold capitalize">{section.status.replace(/_/g, ' ')}</p>
                    {section.lastUpdate && (
                      <p className="text-xs opacity-75 mt-2">
                        Last Updated: {new Date(section.lastUpdate).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <Button className="w-full mt-4" variant="outline">
                    Manage Updates
                  </Button>
                </Card>
              ))}
            </div>

            {/* Info Box */}
            <Card className="p-6 bg-blue-50/50 border-blue-200/50 mt-8">
              <h3 className="font-semibold text-blue-900 mb-2">How it Works</h3>
              <p className="text-sm text-blue-800">
                Submit weekly academic updates for each year/section. Updates are automatically aggregated and sent to the Senior ED every Friday. Include curriculum covered, attendance, assessments, challenges, and next week's plan.
              </p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
