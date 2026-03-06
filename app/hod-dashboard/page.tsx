'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, Edit2, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

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
          <p className="text-muted-foreground">Loading HOD Dashboard...</p>
        </div>
      </div>
    );
  }

  // Sample department data for HOD
  const departmentData = {
    name: user?.department || 'UILAH',
    institute: user?.institute || 'University Institute of Liberal Arts and Humanities',
    students: 2100,
    faculty: 98,
    scholars: 45,
    events: 28,
    programs: ['B.A (Hons)', 'M.A', 'Ph.D'],
    specializations: ['English', 'Hindi', 'History', 'Political Science', 'Psychology', 'Sociology'],
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="mb-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                  Department Management Portal
                </h2>
                <p className="text-muted-foreground">
                  {departmentData.name} • {departmentData.institute}
                </p>
              </div>

              <div className="bg-blue-50/50 border border-blue-200/50 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  As HOD, you can manage and update all information for your department. Changes will be reflected in the main dashboard.
                </p>
              </div>
            </div>

            {/* Department Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Students</p>
                    <p className="text-3xl font-bold text-foreground">{departmentData.students}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary/20" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Faculty Members</p>
                    <p className="text-3xl font-bold text-foreground">{departmentData.faculty}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-green-600/20" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">PhD Scholars</p>
                    <p className="text-3xl font-bold text-foreground">{departmentData.scholars}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600/20" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Events Conducted</p>
                    <p className="text-3xl font-bold text-foreground">{departmentData.events}</p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-orange-600/20" />
                </div>
              </Card>
            </div>

            {/* Management Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Programs & Specializations */}
              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Degree Programs</h3>
                  <Button
                    onClick={() => router.push('/hod-dashboard/manage/programs')}
                    className="gap-2"
                    size="sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                </div>
                <div className="space-y-2">
                  {departmentData.programs.map((prog) => (
                    <div key={prog} className="p-3 bg-secondary rounded-lg flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{prog}</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Active</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Core Specializations */}
              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Specializations</h3>
                  <Button
                    onClick={() => router.push('/hod-dashboard/manage/specializations')}
                    className="gap-2"
                    size="sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {departmentData.specializations.map((spec) => (
                    <div key={spec} className="p-2 bg-secondary rounded text-sm text-foreground">
                      {spec}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Faculty Management */}
              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Faculty & Staff</h3>
                  <Button
                    onClick={() => router.push('/hod-dashboard/manage/faculty')}
                    className="gap-2"
                    size="sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Manage
                  </Button>
                </div>
                <p className="text-2xl font-bold text-primary mb-2">{departmentData.faculty}</p>
                <p className="text-sm text-muted-foreground">
                  Update faculty details, designations, and administrative officers
                </p>
              </Card>

              {/* Student Information */}
              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Student Records</h3>
                  <Button
                    onClick={() => router.push('/hod-dashboard/manage/students')}
                    className="gap-2"
                    size="sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Manage
                  </Button>
                </div>
                <p className="text-2xl font-bold text-primary mb-2">{departmentData.students}</p>
                <p className="text-sm text-muted-foreground">
                  Update student enrollment, achievements, and academic performance
                </p>
              </Card>
            </div>

            {/* Department Settings */}
            <Card className="mt-6 p-6 bg-gradient-to-br from-card to-card/95 border border-border/50 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Department Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage SPOC, institute affiliation, and other department information
                  </p>
                </div>
                <Button
                  onClick={() => router.push('/hod-dashboard/manage/settings')}
                  className="gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Update Settings
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
