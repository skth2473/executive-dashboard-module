'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Users, BookOpen, Microscope, Calendar } from 'lucide-react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';

const departmentDetails: Record<string, any> = {
  '1': {
    name: 'UITTR - Teachers Training & Research',
    spoc: 'Dr. Neelam Sharma',
    spocDesignation: 'Director',
    studentCount: 850,
    facultyCount: 45,
    researchCount: 12,
    eventsCount: 18,
    faculty: [
      { name: 'Dr. Neelam Sharma', designation: 'Director & HOD', expertise: 'Teacher Education' },
      { name: 'Prof. Rakesh Kumar', designation: 'Administrative Officer', expertise: 'Pedagogy & Curriculum' },
      { name: 'Dr. Kavita Desai', designation: 'Associate Professor', expertise: 'Research Methodology' },
    ],
    programs: ['B.Ed', 'M.Ed', 'Ph.D in Education'],
    specializations: ['Teacher Training', 'Educational Research', 'Curriculum Development', 'Educational Psychology'],
  },
  '2': {
    name: 'UID - Interior Design',
    spoc: 'Prof. Rajesh Gupta',
    spocDesignation: 'Associate Director',
    studentCount: 680,
    facultyCount: 38,
    researchCount: 8,
    eventsCount: 14,
    faculty: [
      { name: 'Prof. Rajesh Gupta', designation: 'Associate Director & HOD', expertise: 'Contemporary Design' },
      { name: 'Prof. Meera Iyer', designation: 'Administrative Officer', expertise: 'Space Planning' },
      { name: 'Dr. Anil Sharma', designation: 'Assistant Professor', expertise: 'Sustainable Design' },
    ],
    programs: ['B.Design (Interior)', 'M.Design (Interior)'],
    specializations: ['Residential Design', 'Commercial Spaces', 'Sustainable Interiors', 'Digital Visualization'],
  },
  '3': {
    name: 'UID - Industrial Design',
    spoc: 'Dr. Priya Verma',
    spocDesignation: 'Associate Professor',
    studentCount: 620,
    facultyCount: 35,
    researchCount: 9,
    eventsCount: 13,
    faculty: [
      { name: 'Dr. Priya Verma', designation: 'Associate Professor & HOD', expertise: 'Product Design' },
      { name: 'Prof. Sukhdev Singh', designation: 'Administrative Officer', expertise: 'Design Thinking' },
      { name: 'Dr. Ritu Patel', designation: 'Assistant Professor', expertise: 'User Experience Design' },
    ],
    programs: ['B.Design (Industrial)', 'M.Design (Industrial)'],
    specializations: ['Product Design', 'Ergonomics', 'Sustainable Manufacturing', 'Digital Design Tools'],
  },
  '4': {
    name: 'UID - Fine Arts',
    spoc: 'Prof. Vikram Singh',
    spocDesignation: 'Director',
    studentCount: 450,
    facultyCount: 28,
    researchCount: 6,
    eventsCount: 10,
    faculty: [
      { name: 'Prof. Vikram Singh', designation: 'Director & HOD', expertise: 'Contemporary Art' },
      { name: 'Prof. Deepa Nair', designation: 'Administrative Officer', expertise: 'Art History' },
      { name: 'Dr. Arjun Kumar', designation: 'Associate Professor', expertise: 'Painting & Sculpture' },
    ],
    programs: ['B.F.A', 'M.F.A'],
    specializations: ['Painting', 'Sculpture', 'Printmaking', 'Digital Art'],
  },
  '5': {
    name: 'UID - Fashion & Design',
    spoc: 'Dr. Anjali Kapoor',
    spocDesignation: 'Associate Professor',
    studentCount: 520,
    facultyCount: 32,
    researchCount: 7,
    eventsCount: 12,
    faculty: [
      { name: 'Dr. Anjali Kapoor', designation: 'Associate Professor & HOD', expertise: 'Fashion Design' },
      { name: 'Prof. Simran Kaur', designation: 'Administrative Officer', expertise: 'Fashion Trends' },
      { name: 'Dr. Isha Malhotra', designation: 'Assistant Professor', expertise: 'Textile Design' },
    ],
    programs: ['B.Design (Fashion)', 'M.Design (Fashion)'],
    specializations: ['Apparel Design', 'Textile Design', 'Fashion Branding', 'Sustainable Fashion'],
  },
  '6': {
    name: 'UILAH - Liberal Arts & Humanities',
    spoc: 'Prof. Dr. Santosh Kumar',
    spocDesignation: 'Senior ED',
    studentCount: 2100,
    facultyCount: 98,
    researchCount: 28,
    eventsCount: 35,
    faculty: [
      { name: 'Prof. Dr. Santosh Kumar', designation: 'Senior ED & HOD', expertise: 'Liberal Arts Education' },
      { name: 'Prof. Harpreet Singh', designation: 'Administrative Officer', expertise: 'Interdisciplinary Studies' },
      { name: 'Dr. Neha Sharma', designation: 'Associate Professor', expertise: 'Humanities Research' },
    ],
    programs: ['B.A (Hons)', 'M.A', 'Ph.D'],
    specializations: ['English', 'Hindi', 'History', 'Political Science', 'Psychology', 'Sociology'],
  },
  '7': {
    name: 'UIA - Architecture',
    spoc: 'Dr. Mohit Patel',
    spocDesignation: 'Director',
    studentCount: 750,
    facultyCount: 42,
    researchCount: 14,
    eventsCount: 16,
    faculty: [
      { name: 'Dr. Mohit Patel', designation: 'Director & HOD', expertise: 'Urban Planning' },
      { name: 'Prof. Gurpreet Kaur', designation: 'Administrative Officer', expertise: 'Building Design' },
      { name: 'Dr. Sameer Khan', designation: 'Associate Professor', expertise: 'Architectural History' },
    ],
    programs: ['B.Arch', 'M.Arch'],
    specializations: ['Urban Design', 'Heritage Conservation', 'Sustainable Architecture', 'Landscape Design'],
  },
  '8': {
    name: 'UIFVA - Animation, VFX & Gaming',
    spoc: 'Prof. Deepak Nair',
    spocDesignation: 'Associate Director',
    studentCount: 580,
    facultyCount: 35,
    researchCount: 10,
    eventsCount: 15,
    faculty: [
      { name: 'Prof. Deepak Nair', designation: 'Associate Director & HOD', expertise: '3D Animation' },
      { name: 'Prof. Priya Bansal', designation: 'Administrative Officer', expertise: 'VFX Technology' },
      { name: 'Dr. Vikrant Singh', designation: 'Assistant Professor', expertise: 'Game Design' },
    ],
    programs: ['B.Sc (Animation & VFX)', 'M.Sc (Digital Media)'],
    specializations: ['3D Animation', 'VFX', 'Game Development', 'Motion Graphics'],
  },
  '9': {
    name: 'UIFVA - Film Studies',
    spoc: 'Dr. Pooja Desai',
    spocDesignation: 'Associate Professor',
    studentCount: 420,
    facultyCount: 24,
    researchCount: 8,
    eventsCount: 11,
    faculty: [
      { name: 'Dr. Pooja Desai', designation: 'Associate Professor & HOD', expertise: 'Filmmaking' },
      { name: 'Prof. Rajesh Malik', designation: 'Administrative Officer', expertise: 'Film Analysis' },
      { name: 'Dr. Ananya Verma', designation: 'Assistant Professor', expertise: 'Documentary Studies' },
    ],
    programs: ['B.A (Film Studies)', 'M.A (Filmmaking)'],
    specializations: ['Cinematography', 'Film Editing', 'Directing', 'Film Theory'],
  },
  '10': {
    name: 'UIMS - Media Studies',
    spoc: 'Prof. Arun Kumar',
    spocDesignation: 'Director',
    studentCount: 680,
    facultyCount: 38,
    researchCount: 11,
    eventsCount: 14,
    faculty: [
      { name: 'Prof. Arun Kumar', designation: 'Director & HOD', expertise: 'Digital Media' },
      { name: 'Prof. Sneha Patel', designation: 'Administrative Officer', expertise: 'Journalism Studies' },
      { name: 'Dr. Vikram Das', designation: 'Associate Professor', expertise: 'Media Research' },
    ],
    programs: ['B.A (Journalism & Media)', 'M.A (Media Studies)'],
    specializations: ['Journalism', 'Digital Content', 'Public Relations', 'Media Management'],
  },
  '11': {
    name: 'UITHM - Tourism & Hospitality Management',
    spoc: 'Dr. Swati Singh',
    spocDesignation: 'Associate Professor',
    studentCount: 360,
    facultyCount: 22,
    researchCount: 6,
    eventsCount: 8,
    faculty: [
      { name: 'Dr. Swati Singh', designation: 'Associate Professor & HOD', expertise: 'Tourism Management' },
      { name: 'Prof. Manish Tomar', designation: 'Administrative Officer', expertise: 'Hospitality Service' },
      { name: 'Dr. Riya Sharma', designation: 'Assistant Professor', expertise: 'Event Management' },
    ],
    programs: ['B.Sc (Tourism & Hospitality)', 'M.Sc (Hospitality Management)'],
    specializations: ['Hotel Management', 'Tourism Planning', 'Event Management', 'Hospitality Marketing'],
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
