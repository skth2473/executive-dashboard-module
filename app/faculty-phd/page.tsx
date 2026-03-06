'use client';

import { useState } from 'react';
import { ArrowLeft, BookOpen, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';

const facultyData = [
  { id: 1, name: 'Dr. Rajesh Kumar', department: 'Philosophy', designation: 'Professor', attendance: 94, avgRating: 4.6, yearsOfService: 18, courses: 4, status: 'green' },
  { id: 2, name: 'Prof. Neha Sharma', department: 'Literature', designation: 'Associate Professor', attendance: 87, avgRating: 4.5, yearsOfService: 12, courses: 3, status: 'yellow' },
  { id: 3, name: 'Dr. Amit Singh', department: 'History', designation: 'Assistant Professor', attendance: 92, avgRating: 4.7, yearsOfService: 7, courses: 5, status: 'green' },
  { id: 4, name: 'Prof. Priya Patel', department: 'Languages', designation: 'Professor', attendance: 96, avgRating: 4.8, yearsOfService: 22, courses: 3, status: 'green' },
  { id: 5, name: 'Dr. Vikram Reddy', department: 'Political Science', designation: 'Associate Professor', attendance: 79, avgRating: 4.2, yearsOfService: 9, courses: 4, status: 'red' },
  { id: 6, name: 'Prof. Anjali Gupta', department: 'Fine Arts', designation: 'Assistant Professor', attendance: 85, avgRating: 4.4, yearsOfService: 5, courses: 6, status: 'yellow' },
  { id: 7, name: 'Dr. Sanjay Verma', department: 'Communication', designation: 'Professor', attendance: 91, avgRating: 4.5, yearsOfService: 16, courses: 3, status: 'green' },
  { id: 8, name: 'Prof. Ritika Chopra', department: 'Social Studies', designation: 'Associate Professor', attendance: 88, avgRating: 4.6, yearsOfService: 11, courses: 4, status: 'yellow' },
];

const departmentStats = [
  { name: 'Philosophy', avgAttendance: 92.5, totalFaculty: 5, courses: 8 },
  { name: 'Literature', avgAttendance: 88.3, totalFaculty: 4, courses: 6 },
  { name: 'History', avgAttendance: 90.8, totalFaculty: 4, courses: 7 },
  { name: 'Languages', avgAttendance: 94.1, totalFaculty: 3, courses: 5 },
  { name: 'Political Science', avgAttendance: 85.6, totalFaculty: 3, courses: 5 },
  { name: 'Fine Arts', avgAttendance: 87.9, totalFaculty: 4, courses: 6 },
  { name: 'Communication', avgAttendance: 91.2, totalFaculty: 3, courses: 4 },
  { name: 'Social Studies', avgAttendance: 89.4, totalFaculty: 3, courses: 5 },
];

export default function FacultyPage() {
  const [selectedFaculty, setSelectedFaculty] = useState<typeof facultyData[0] | null>(null);
  const avgAttendance = (facultyData.reduce((sum, f) => sum + f.attendance, 0) / facultyData.length).toFixed(1);
  const avgRating = (facultyData.reduce((sum, f) => sum + f.avgRating, 0) / facultyData.length).toFixed(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green':
        return 'bg-green-50 border-l-4 border-l-green-500';
      case 'yellow':
        return 'bg-yellow-50 border-l-4 border-l-yellow-500';
      case 'red':
        return 'bg-red-50 border-l-4 border-l-red-500';
      default:
        return '';
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Back Button */}
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>

            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Faculty Management</h1>
              <p className="text-muted-foreground">400 Faculty Members - Liberal Arts and Humanities</p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="p-6 border border-border shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">Total Faculty</p>
                    <p className="text-3xl font-bold text-foreground">400</p>
                    <p className="text-xs text-muted-foreground mt-2">Across 8 departments</p>
                  </div>
                  <div className="text-primary/30">
                    <BookOpen className="w-12 h-12" />
                  </div>
                </div>
              </Card>
              <Card className="p-6 border border-border shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">Avg Attendance</p>
                    <p className="text-3xl font-bold text-foreground">{avgAttendance}%</p>
                    <p className="text-xs text-green-600 mt-2">↑ 2.3% vs last quarter</p>
                  </div>
                  <div className="text-green-500/30">
                    <TrendingUp className="w-12 h-12" />
                  </div>
                </div>
              </Card>
              <Card className="p-6 border border-border shadow-sm">
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Average Rating</p>
                  <p className="text-3xl font-bold text-foreground">{avgRating}/5.0</p>
                  <p className="text-xs text-muted-foreground mt-2">Based on student feedback</p>
                </div>
              </Card>
            </div>

            {/* Department Stats */}
            <Card className="border border-border shadow-sm mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Department-wise Attendance</h2>
                <div className="space-y-4">
                  {departmentStats.map((dept, idx) => (
                    <div key={idx} className="flex items-center justify-between pb-4 border-b border-border last:border-b-0">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{dept.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{dept.totalFaculty} faculty | {dept.courses} courses</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">{dept.avgAttendance}%</p>
                        </div>
                        <div className="w-32">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                dept.avgAttendance >= 90 ? 'bg-green-500' : dept.avgAttendance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${dept.avgAttendance}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Faculty List */}
            <Card className="border border-border shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Faculty Directory</h2>
                <div className="space-y-3">
                  {facultyData.map((faculty) => (
                    <div
                      key={faculty.id}
                      onClick={() => setSelectedFaculty(faculty)}
                      className={`p-4 border border-border rounded-lg hover:shadow-md cursor-pointer transition-all ${getStatusColor(faculty.status)}`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                        <div className="md:col-span-2">
                          <h3 className="font-semibold text-foreground">{faculty.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{faculty.designation}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Attendance</p>
                          <p className={`text-lg font-bold ${faculty.attendance >= 90 ? 'text-green-600' : faculty.attendance >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {faculty.attendance}%
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Rating</p>
                          <p className="text-lg font-bold text-foreground">{faculty.avgRating}/5</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Courses</p>
                          <p className="text-lg font-bold text-foreground">{faculty.courses}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Experience</p>
                          <p className="text-lg font-bold text-foreground">{faculty.yearsOfService} yrs</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Faculty Detail Modal */}
            {selectedFaculty && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-auto">
                <Card className="max-w-4xl w-full max-h-[95vh] overflow-auto border border-border shadow-lg my-8">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">{selectedFaculty.name}</h2>
                        <p className="text-muted-foreground">{selectedFaculty.designation} • {selectedFaculty.department}</p>
                      </div>
                      <button
                        onClick={() => setSelectedFaculty(null)}
                        className="text-muted-foreground hover:text-foreground text-2xl font-light"
                      >
                        ×
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Core Metrics */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-4">Performance Metrics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className={`p-4 rounded-lg border ${selectedFaculty.attendance >= 90 ? 'bg-green-50 border-green-100' : selectedFaculty.attendance >= 80 ? 'bg-yellow-50 border-yellow-100' : 'bg-red-50 border-red-100'}`}>
                            <p className="text-xs text-muted-foreground mb-1">Attendance</p>
                            <p className={`text-2xl font-bold ${selectedFaculty.attendance >= 90 ? 'text-green-600' : selectedFaculty.attendance >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {selectedFaculty.attendance}%
                            </p>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                            <p className="text-xs text-muted-foreground mb-1">Student Rating</p>
                            <p className="text-2xl font-bold text-purple-600">{selectedFaculty.avgRating}/5</p>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <p className="text-xs text-muted-foreground mb-1">Courses</p>
                            <p className="text-2xl font-bold text-blue-600">{selectedFaculty.courses}</p>
                          </div>
                          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                            <p className="text-xs text-muted-foreground mb-1">Years of Service</p>
                            <p className="text-2xl font-bold text-amber-600">{selectedFaculty.yearsOfService}</p>
                          </div>
                        </div>
                      </div>

                      {/* Attendance */}
                      <div className="border-t border-border pt-6">
                        <h3 className="font-semibold text-foreground mb-4">Attendance Tracking</h3>
                        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg border border-primary/20">
                          <div className="flex justify-between mb-3">
                            <span className="text-sm text-muted-foreground">Current Month Attendance</span>
                            <span className="font-semibold text-foreground">{selectedFaculty.attendance}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${selectedFaculty.attendance}%` }}></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-3">Last 3 months: {selectedFaculty.attendance}% → {selectedFaculty.attendance + 1}% → {selectedFaculty.attendance - 1}%</p>
                        </div>
                      </div>

                      {/* Academic Background */}
                      <div className="border-t border-border pt-6">
                        <h3 className="font-semibold text-foreground mb-4">Academic Background</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between p-3 bg-secondary rounded">
                            <span className="text-muted-foreground">Highest Qualification</span>
                            <span className="font-bold text-foreground">{selectedFaculty.designation === 'Professor' ? 'PhD' : 'M.Tech/MA'}</span>
                          </div>
                          <div className="flex justify-between p-3 bg-secondary rounded">
                            <span className="text-muted-foreground">Specialization</span>
                            <span className="font-bold text-foreground">{selectedFaculty.department}</span>
                          </div>
                        </div>
                      </div>

                      {/* Publications & Research */}
                      <div className="border-t border-border pt-6">
                        <h3 className="font-semibold text-foreground mb-4">Research & Publications</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between p-3 bg-secondary rounded">
                            <span className="text-muted-foreground">Journal Publications</span>
                            <span className="font-bold text-foreground">{Math.floor(Math.random() * 20) + 5}</span>
                          </div>
                          <div className="flex justify-between p-3 bg-secondary rounded">
                            <span className="text-muted-foreground">Conference Papers</span>
                            <span className="font-bold text-foreground">{Math.floor(Math.random() * 15) + 3}</span>
                          </div>
                          <div className="flex justify-between p-3 bg-secondary rounded">
                            <span className="text-muted-foreground">Research Projects</span>
                            <span className="font-bold text-foreground">{Math.floor(Math.random() * 8) + 2}</span>
                          </div>
                        </div>
                      </div>

                      {/* Faculty Development */}
                      <div className="border-t border-border pt-6">
                        <h3 className="font-semibold text-foreground mb-4">Professional Development</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between p-3 bg-secondary rounded">
                            <span className="text-muted-foreground">FDPs Attended</span>
                            <span className="font-bold text-foreground">{Math.floor(Math.random() * 8) + 2}</span>
                          </div>
                          <div className="flex justify-between p-3 bg-secondary rounded">
                            <span className="text-muted-foreground">Conferences/Seminars</span>
                            <span className="font-bold text-foreground">{Math.floor(Math.random() * 12) + 4}</span>
                          </div>
                          <div className="flex justify-between p-3 bg-secondary rounded">
                            <span className="text-muted-foreground">Institution Building</span>
                            <span className="font-bold text-foreground">{Math.floor(Math.random() * 6) + 1} projects</span>
                          </div>
                        </div>
                      </div>

                      {/* Personal Details */}
                      <div className="border-t border-border pt-6">
                        <h3 className="font-semibold text-foreground mb-4">Professional Details</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Department</span>
                            <span className="font-medium text-foreground">{selectedFaculty.department}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Designation</span>
                            <span className="font-medium text-foreground">{selectedFaculty.designation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Years of Service</span>
                            <span className="font-medium text-foreground">{selectedFaculty.yearsOfService} years</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Courses Teaching</span>
                            <span className="font-medium text-foreground">{selectedFaculty.courses} courses</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
