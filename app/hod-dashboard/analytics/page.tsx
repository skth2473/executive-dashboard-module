'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Users, BookOpen, Microscope, Calendar, TrendingUp, BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
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
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Sample analytics data
  const analyticsData = {
    students: 2100,
    faculty: 98,
    phdScholars: 45,
    activeProjects: 5,
    totalBudget: 2500000,
    events: 8,
    publications: 12,
    weeklyUpdateCompletion: 85,
  };

  const performanceMetrics = [
    { label: 'Academic Updates (Weekly)', value: 85, target: 100, unit: '%' },
    { label: 'Research Project Updates', value: 78, target: 100, unit: '%' },
    { label: 'Event Management', value: 92, target: 95, unit: '%' },
    { label: 'Faculty Participation', value: 88, target: 90, unit: '%' },
  ];

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
                  Department Analytics
                </h1>
                <p className="text-muted-foreground">
                  {user?.department} • Comprehensive Overview
                </p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-50/50 border-blue-200/50">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-blue-700" />
                  <span className="text-xs font-semibold text-blue-700">+5.2%</span>
                </div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Total Students</p>
                <p className="text-2xl font-bold text-blue-700">{analyticsData.students}</p>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-50/50 border-green-200/50">
                <div className="flex items-center justify-between mb-2">
                  <BookOpen className="w-5 h-5 text-green-700" />
                  <span className="text-xs font-semibold text-green-700">+2.1%</span>
                </div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Faculty Members</p>
                <p className="text-2xl font-bold text-green-700">{analyticsData.faculty}</p>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-50/50 border-purple-200/50">
                <div className="flex items-center justify-between mb-2">
                  <Microscope className="w-5 h-5 text-purple-700" />
                  <span className="text-xs font-semibold text-purple-700">+3.8%</span>
                </div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">PhD Scholars</p>
                <p className="text-2xl font-bold text-purple-700">{analyticsData.phdScholars}</p>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-50/50 border-orange-200/50">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5 text-orange-700" />
                  <span className="text-xs font-semibold text-orange-700">+1.2%</span>
                </div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Publications</p>
                <p className="text-2xl font-bold text-orange-700">{analyticsData.publications}</p>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card className="p-6 mb-8 border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Performance Metrics</h2>
              <div className="space-y-4">
                {performanceMetrics.map((metric, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-foreground">{metric.label}</p>
                      <p className="text-sm font-bold text-primary">
                        {metric.value}/{metric.target}{metric.unit}
                      </p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all"
                        style={{ width: `${(metric.value / metric.target) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">Research Budget</h3>
                  <Microscope className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold text-primary mb-2">
                  ₹{(analyticsData.totalBudget / 100000).toFixed(1)}L
                </p>
                <p className="text-sm text-muted-foreground">Total research funding allocated</p>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">Active Projects</h3>
                  <BarChart3 className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold text-primary mb-2">{analyticsData.activeProjects}</p>
                <p className="text-sm text-muted-foreground">Ongoing research initiatives</p>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">Events</h3>
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold text-primary mb-2">{analyticsData.events}</p>
                <p className="text-sm text-muted-foreground">Organized this academic year</p>
              </Card>
            </div>

            {/* Weekly Update Status */}
            <Card className="p-6 border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Weekly Update Status</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-foreground">Year 1 - Foundation</p>
                    <span className="text-xs font-semibold text-green-700">Submitted</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div className="bg-green-600 h-2 rounded-full w-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-foreground">Year 2 - Core Subjects</p>
                    <span className="text-xs font-semibold text-blue-700">Under Review</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-foreground">Year 3 - Specialization</p>
                    <span className="text-xs font-semibold text-yellow-700">Pending</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>
            </Card>

            {/* Footer Info */}
            <Card className="p-6 bg-blue-50/50 border-blue-200/50 mt-8">
              <h3 className="font-semibold text-blue-900 mb-2">Analytics Information</h3>
              <p className="text-sm text-blue-800">
                This dashboard compiles all weekly academic updates, research project progress, and event management data. Data is automatically synced and aggregated for comprehensive departmental analysis. Last updated: Today at 2:30 PM
              </p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
