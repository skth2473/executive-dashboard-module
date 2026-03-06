'use client';

import { useRouter } from 'next/navigation';
import { Building2, Users, BookOpen, ChevronRight } from 'lucide-react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';

interface Department {
  id: string;
  name: string;
  spoc: string;
  spocDesignation: string;
  studentCount: number;
  facultyCount: number;
}

const departments: Department[] = [
  {
    id: '1',
    name: 'UITTR - Teachers Training & Research',
    spoc: 'Dr. Neelam Sharma',
    spocDesignation: 'Director',
    studentCount: 850,
    facultyCount: 45,
  },
  {
    id: '2',
    name: 'UID - Interior Design',
    spoc: 'Prof. Rajesh Gupta',
    spocDesignation: 'Associate Director',
    studentCount: 680,
    facultyCount: 38,
  },
  {
    id: '3',
    name: 'UID - Industrial Design',
    spoc: 'Dr. Priya Verma',
    spocDesignation: 'Associate Professor',
    studentCount: 620,
    facultyCount: 35,
  },
  {
    id: '4',
    name: 'UID - Fine Arts',
    spoc: 'Prof. Vikram Singh',
    spocDesignation: 'Director',
    studentCount: 450,
    facultyCount: 28,
  },
  {
    id: '5',
    name: 'UID - Fashion & Design',
    spoc: 'Dr. Anjali Kapoor',
    spocDesignation: 'Associate Professor',
    studentCount: 520,
    facultyCount: 32,
  },
  {
    id: '6',
    name: 'UILAH - Liberal Arts & Humanities',
    spoc: 'Prof. Dr. Santosh Kumar',
    spocDesignation: 'Senior ED',
    studentCount: 2100,
    facultyCount: 98,
  },
  {
    id: '7',
    name: 'UIA - Architecture',
    spoc: 'Dr. Mohit Patel',
    spocDesignation: 'Director',
    studentCount: 750,
    facultyCount: 42,
  },
  {
    id: '8',
    name: 'UIFVA - Animation, VFX & Gaming',
    spoc: 'Prof. Deepak Nair',
    spocDesignation: 'Associate Director',
    studentCount: 580,
    facultyCount: 35,
  },
  {
    id: '9',
    name: 'UIFVA - Film Studies',
    spoc: 'Dr. Pooja Desai',
    spocDesignation: 'Associate Professor',
    studentCount: 420,
    facultyCount: 24,
  },
  {
    id: '10',
    name: 'UIMS - Media Studies',
    spoc: 'Prof. Arun Kumar',
    spocDesignation: 'Director',
    studentCount: 680,
    facultyCount: 38,
  },
  {
    id: '11',
    name: 'UITHM - Tourism & Hospitality Management',
    spoc: 'Dr. Swati Singh',
    spocDesignation: 'Associate Professor',
    studentCount: 360,
    facultyCount: 22,
  },
];

export default function ClusterOverview() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                Liberal Arts & Humanities Cluster Overview
              </h2>
              <p className="text-muted-foreground text-sm">
                {departments.length} Departments across 7 Institutes - 8,500 Students & 380 Faculty Members
              </p>
            </div>

            {/* Department Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <Card
                  key={dept.id}
                  className="p-6 border border-border/50 hover:border-primary/30 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 bg-gradient-to-br from-card to-card/95"
                  onClick={() => router.push(`/cluster-overview/${dept.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-1">{dept.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">Department</p>
                    </div>
                    <Building2 className="w-6 h-6 text-primary/30" />
                  </div>

                  {/* SPOC Info */}
                  <div className="mb-4 pb-4 border-b border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">SPOC</p>
                    <p className="text-sm font-semibold text-foreground">{dept.spoc}</p>
                    <p className="text-xs text-muted-foreground">{dept.spocDesignation}</p>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-muted-foreground">Students</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{dept.studentCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-muted-foreground">Faculty</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{dept.facultyCount}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-primary hover:gap-2 transition-all duration-300 text-sm font-semibold">
                    View Details
                    <ChevronRight className="w-4 h-4" />
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
