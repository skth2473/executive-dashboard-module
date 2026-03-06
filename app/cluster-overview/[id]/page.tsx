'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Users, BookOpen, Microscope, Calendar } from 'lucide-react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';

const departmentDetails: Record<string, any> = {
  '1': {
    name: 'Engineering Foundation',
    spoc: 'Dr. Vikas Wasson',
    spocDesignation: 'Director',
    studentCount: 7500,
    facultyCount: 180,
    researchCount: 25,
    eventsCount: 35,
    faculty: [
      { name: 'Dr. Vikas Wasson', designation: 'Director, HOD', expertise: 'Foundation Engineering' },
      { name: 'Prof. Rajesh Verma', designation: 'Administrative Officer', expertise: 'Curriculum Design' },
      { name: 'Dr. Priya Singh', designation: 'Associate Professor', expertise: 'Physics & Mathematics' },
    ],
    programs: ['BE (Foundation)', 'Integrated Programs'],
    specializations: ['Mathematics', 'Physics', 'Chemistry', 'Communication Skills'],
  },
  '2': {
    name: 'CSE - 2nd Year',
    spoc: 'Dr. Puneet Kumar',
    spocDesignation: 'Associate Director',
    studentCount: 5000,
    facultyCount: 120,
    researchCount: 18,
    eventsCount: 28,
    faculty: [
      { name: 'Dr. Puneet Kumar', designation: 'Associate Director, HOD', expertise: 'Data Structures & Algorithms' },
      { name: 'Prof. Ananya Sharma', designation: 'Administrative Officer', expertise: 'Database Management' },
      { name: 'Dr. Vikram Patel', designation: 'Associate Professor', expertise: 'Web Development' },
    ],
    programs: ['BE CSE (2nd Year)'],
    specializations: ['DSA', 'DBMS', 'Web Dev', 'Operating Systems'],
  },
  '3': {
    name: 'CSE - 3rd Year',
    spoc: 'Dr. Sandeep Singh Kang',
    spocDesignation: 'Associate Professor & HOD',
    studentCount: 4500,
    facultyCount: 115,
    researchCount: 22,
    eventsCount: 32,
    faculty: [
      { name: 'Dr. Sandeep Singh Kang', designation: 'Associate Professor & HOD', expertise: 'AI & Machine Learning' },
      { name: 'Prof. Meera Desai', designation: 'Administrative Officer', expertise: 'Cloud Computing' },
      { name: 'Dr. Rohit Saxena', designation: 'Assistant Professor', expertise: 'Software Engineering' },
    ],
    programs: ['BE CSE (3rd Year)'],
    specializations: ['AI/ML', 'Cloud Computing', 'Software Eng', 'Cybersecurity'],
  },
  '4': {
    name: 'CSE - 4th Year',
    spoc: 'Dr. Navpreet Kaur Walia',
    spocDesignation: 'Director & HOD',
    studentCount: 4500,
    facultyCount: 110,
    researchCount: 20,
    eventsCount: 30,
    faculty: [
      { name: 'Dr. Navpreet Kaur Walia', designation: 'Director & HOD', expertise: 'Advanced Algorithms' },
      { name: 'Prof. Akshay Gupta', designation: 'Administrative Officer', expertise: 'Project Management' },
      { name: 'Dr. Pooja Singh', designation: 'Associate Professor', expertise: 'Blockchain Technology' },
    ],
    programs: ['BE CSE (4th Year)', 'Specialization Tracks'],
    specializations: ['Advanced DSA', 'Blockchain', 'IoT', 'Big Data'],
  },
  '5': {
    name: 'Core Engineering',
    spoc: 'Dr. Tripti Sharma',
    spocDesignation: 'Associate Professor & HOD',
    studentCount: 2500,
    facultyCount: 75,
    researchCount: 15,
    eventsCount: 20,
    faculty: [
      { name: 'Dr. Tripti Sharma', designation: 'Associate Professor & HOD', expertise: 'Mechanical Engineering' },
      { name: 'Prof. Sunil Kumar', designation: 'Administrative Officer', expertise: 'CAD & Simulation' },
      { name: 'Dr. Neha Srivastava', designation: 'Assistant Professor', expertise: 'Thermal Systems' },
    ],
    programs: ['BE Mechanical', 'BE Civil', 'BE ECE'],
    specializations: ['Mechanical Design', 'Structural Analysis', 'Electronics Design'],
  },
};

export default function DepartmentDetail() {
  const router = useRouter();
  const params = useParams();
  const dept = departmentDetails[params.id as string];

  if (!dept) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <Card className="p-8 text-center">
              <p className="text-foreground font-semibold">Department not found</p>
            </Card>
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
          <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cluster Overview
            </button>

            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                {dept.name} Department
              </h2>
              <p className="text-muted-foreground">SPOC: {dept.spoc} • {dept.spocDesignation}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-50/50 border-blue-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Students</p>
                    <p className="text-3xl font-bold text-foreground">{dept.studentCount}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600/30" />
                </div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-50/50 border-green-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Faculty</p>
                    <p className="text-3xl font-bold text-foreground">{dept.facultyCount}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-green-600/30" />
                </div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-50/50 border-purple-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Research</p>
                    <p className="text-3xl font-bold text-foreground">{dept.researchCount}</p>
                  </div>
                  <Microscope className="w-8 h-8 text-purple-600/30" />
                </div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-50/50 border-orange-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Events</p>
                    <p className="text-3xl font-bold text-foreground">{dept.eventsCount}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-600/30" />
                </div>
              </Card>
            </div>

            {/* Administrative & Faculty List */}
            <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Administrative Officers & HOD</h3>
              <div className="space-y-3">
                {dept.faculty.map((member: any, idx: number) => (
                  <div key={idx} className="p-4 bg-secondary rounded-lg border border-border/50">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.designation}</p>
                      </div>
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200/50">
                        {member.expertise}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Programs & Specializations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">Degree Programs</h3>
                <ul className="space-y-2">
                  {dept.programs.map((prog: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {prog}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">Core Subjects & Specializations</h3>
                <ul className="space-y-2">
                  {dept.specializations.map((spec: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
