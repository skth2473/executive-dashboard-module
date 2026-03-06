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
    name: 'Engineering Foundation',
    spoc: 'Dr. Vikas Wasson',
    spocDesignation: 'Director',
    studentCount: 7500,
    facultyCount: 180,
  },
  {
    id: '2',
    name: 'CSE - 2nd Year',
    spoc: 'Dr. Puneet Kumar',
    spocDesignation: 'Associate Director',
    studentCount: 5000,
    facultyCount: 120,
  },
  {
    id: '3',
    name: 'CSE - 3rd Year',
    spoc: 'Dr. Sandeep Singh Kang',
    spocDesignation: 'Associate Professor',
    studentCount: 4500,
    facultyCount: 115,
  },
  {
    id: '4',
    name: 'CSE - 4th Year',
    spoc: 'Dr. Navpreet Kaur Walia',
    spocDesignation: 'Director',
    studentCount: 4500,
    facultyCount: 110,
  },
  {
    id: '5',
    name: 'Core Engineering',
    spoc: 'Dr. Tripti Sharma',
    spocDesignation: 'Associate Professor',
    studentCount: 2500,
    facultyCount: 75,
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
                Engineering Cluster Overview
              </h2>
              <p className="text-muted-foreground text-sm">
                {departments.length} Departments - 40,000 Students & 1,200 Faculty Members
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
