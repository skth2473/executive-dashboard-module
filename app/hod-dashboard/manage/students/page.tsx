'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3, TrendingUp } from 'lucide-react';

export default function StudentManagementPage() {
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

  const studentStats = {
    total: 2100,
    byYear: { firstYear: 520, secondYear: 525, thirdYear: 530, fourthYear: 525 },
    performance: { excellent: 34, good: 48, average: 16, poor: 2 },
    attendance: 87.5,
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.back()}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </div>
              <h2 className="text-3xl font-bold text-foreground">Manage Student Records</h2>
              <p className="text-muted-foreground mt-1">{user?.department}</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Total Students</p>
                <p className="text-3xl font-bold text-foreground">{studentStats.total}</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Average Attendance</p>
                <p className="text-3xl font-bold text-green-600">{studentStats.attendance}%</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Excellent Performance</p>
                <p className="text-3xl font-bold text-blue-600">{studentStats.performance.excellent}%</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Avg. CGPA</p>
                <p className="text-3xl font-bold text-purple-600">7.8</p>
              </Card>
            </div>

            {/* Student Breakdown by Year */}
            <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Students by Year</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(studentStats.byYear).map(([year, count]) => (
                  <div key={year} className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground capitalize mb-1">{year.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="text-2xl font-bold text-primary">{count}</p>
                    <div className="w-full bg-primary/10 rounded-full h-2 mt-3">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${(count / 530) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Academic Performance Distribution */}
            <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Academic Performance Distribution</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-900 font-semibold mb-1">Excellent (A+)</p>
                  <p className="text-3xl font-bold text-green-600">{studentStats.performance.excellent}%</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 font-semibold mb-1">Good (A)</p>
                  <p className="text-3xl font-bold text-blue-600">{studentStats.performance.good}%</p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-900 font-semibold mb-1">Average (B)</p>
                  <p className="text-3xl font-bold text-yellow-600">{studentStats.performance.average}%</p>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-900 font-semibold mb-1">Below Average (C)</p>
                  <p className="text-3xl font-bold text-red-600">{studentStats.performance.poor}%</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
