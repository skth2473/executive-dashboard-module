'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Microscope, Users, Calendar, ArrowRight, TrendingUp, FileText } from 'lucide-react';

export default function HODDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);

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
          <p className="text-muted-foreground">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const modules = [
    {
      id: 'academic-updates',
      title: 'Academic Updates',
      description: 'Submit weekly section-wise academic updates for Year 1, 2, and 3 students.',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-700',
      href: '/hod-dashboard/academic-updates',
      stats: { submitted: 0, pending: 3, sections: 3 },
    },
    {
      id: 'research-projects',
      title: 'Research Projects',
      description: 'Manage research projects, PhD scholars, and supervisors. Track weekly updates.',
      icon: <Microscope className="w-8 h-8" />,
      color: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-700',
      href: '/hod-dashboard/research-projects',
      stats: { total: 0, phd: 0, active: 0 },
    },
    {
      id: 'events-management',
      title: 'Events Management',
      description: 'Event coordinators add events with descriptions, budgets, and outcomes.',
      icon: <Calendar className="w-8 h-8" />,
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-700',
      href: '/hod-dashboard/events-management',
      stats: { upcoming: 0, completed: 0, coordinators: 1 },
    },
    {
      id: 'department-analytics',
      title: 'Department Analytics',
      description: 'View aggregate analytics of student performance, faculty, and resources.',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-700',
      href: '/hod-dashboard/analytics',
      stats: { students: 0, faculty: 0, programs: 0 },
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                Department Portal
              </h1>
              <p className="text-muted-foreground text-base">
                {user?.name} • {user?.department}
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Manage academic updates, research projects, events, and view department analytics
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-50/50 border-blue-200/50">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Academic Updates</p>
                <p className="text-2xl font-bold text-primary">0/3</p>
                <p className="text-xs text-muted-foreground mt-1">Weekly submissions</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-50/50 border-purple-200/50">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Research Projects</p>
                <p className="text-2xl font-bold text-purple-700">0</p>
                <p className="text-xs text-muted-foreground mt-1">Active projects</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-50/50 border-green-200/50">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Events</p>
                <p className="text-2xl font-bold text-green-700">0</p>
                <p className="text-xs text-muted-foreground mt-1">Upcoming events</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-50/50 border-orange-200/50">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Department</p>
                <p className="text-2xl font-bold text-orange-700">4</p>
                <p className="text-xs text-muted-foreground mt-1">Management modules</p>
              </Card>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module) => (
                <Card
                  key={module.id}
                  className={`p-6 border-2 hover:shadow-lg transition-all cursor-pointer ${module.color}`}
                  onClick={() => router.push(module.href)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-white ${module.textColor}`}>
                      {module.icon}
                    </div>
                    <ArrowRight className={`w-5 h-5 ${module.textColor} opacity-50`} />
                  </div>

                  <h3 className={`text-xl font-bold ${module.textColor} mb-2`}>
                    {module.title}
                  </h3>
                  <p className="text-sm text-foreground/80 mb-4">
                    {module.description}
                  </p>

                  {/* Module Stats */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-current/10">
                    {Object.entries(module.stats).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xs font-semibold text-foreground/60 uppercase mb-1">
                          {key.replace(/_/g, ' ')}
                        </p>
                        <p className={`text-lg font-bold ${module.textColor}`}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full mt-4 font-semibold"
                    variant="outline"
                  >
                    Access Module
                  </Button>
                </Card>
              ))}
            </div>

            {/* Info Box */}
            <Card className="p-6 bg-blue-50/50 border-blue-200/50 mt-8">
              <div className="flex gap-4">
                <FileText className="w-5 h-5 text-blue-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Important Notes</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Weekly academic updates are aggregated and sent to Senior ED every Friday</li>
                    <li>• Research project updates from PhD supervisors are synced weekly</li>
                    <li>• Event coordinators can add events with budget tracking and outcome reporting</li>
                    <li>• All data is automatically compiled in the departmental analytics dashboard</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
