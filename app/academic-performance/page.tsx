'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { BookOpen, TrendingUp, AlertCircle, CheckCircle2, Users } from 'lucide-react';

interface AcademicData {
  department: string;
  studentStrength: number;
  attendance: number;
  passPercentage: number;
  backlogs: number;
  dsaMastery?: number;
  coreAlgoScore?: number;
  compProgramming?: number;
  dataStructures?: number;
}

const academicData: AcademicData[] = [
  { 
    department: 'Engineering Foundation', 
    studentStrength: 7500, 
    attendance: 88, 
    passPercentage: 94, 
    backlogs: 180,
    dsaMastery: 78,
    coreAlgoScore: 82,
    compProgramming: 75,
    dataStructures: 80
  },
  { 
    department: 'CSE - 2nd Year', 
    studentStrength: 5000, 
    attendance: 86, 
    passPercentage: 91, 
    backlogs: 150,
    dsaMastery: 85,
    coreAlgoScore: 88,
    compProgramming: 83,
    dataStructures: 87
  },
  { 
    department: 'CSE - 3rd Year', 
    studentStrength: 4500, 
    attendance: 87, 
    passPercentage: 92, 
    backlogs: 135,
    dsaMastery: 88,
    coreAlgoScore: 91,
    compProgramming: 86,
    dataStructures: 90
  },
  { 
    department: 'CSE - 4th Year', 
    studentStrength: 4500, 
    attendance: 85, 
    passPercentage: 89, 
    backlogs: 180,
    dsaMastery: 92,
    coreAlgoScore: 94,
    compProgramming: 90,
    dataStructures: 93
  },
  { 
    department: 'Core Engineering', 
    studentStrength: 2500, 
    attendance: 89, 
    passPercentage: 93, 
    backlogs: 50,
    dsaMastery: 80,
    coreAlgoScore: 85,
    compProgramming: 78,
    dataStructures: 83
  },
];

export default function AcademicPerformance() {
  const [selectedDept, setSelectedDept] = useState<string>('');

  const filteredData = selectedDept 
    ? academicData.filter(d => d.department === selectedDept)
    : academicData;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                Academic Performance
              </h2>
              <p className="text-muted-foreground text-sm">
                Engineering Department Performance Analytics
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold text-foreground">Filter by Department:</label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Departments</option>
                {academicData.map((d) => (
                  <option key={d.department} value={d.department}>
                    {d.department}
                  </option>
                ))}
              </select>
            </div>

            {/* Performance Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {filteredData.map((dept, idx) => (
                <div key={idx} className="group">
                  {/* Student Count Card */}
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-50/95 border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-foreground line-clamp-2">{dept.department}</h3>
                      <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600 mb-2">{dept.studentStrength.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Students</p>
                  </Card>
                </div>
              ))}
            </div>

            {/* Detailed Performance Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Detailed Performance Metrics</h3>
              <div className="grid grid-cols-1 gap-4">
                {filteredData.map((dept, idx) => (
                  <Card key={idx} className="p-6 bg-gradient-to-r from-card to-card/95 border border-border/50 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">{dept.department}</h4>
                        <p className="text-sm text-muted-foreground">{dept.studentStrength.toLocaleString()} students</p>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Attendance */}
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-2 font-semibold">Attendance</p>
                        <p className="text-2xl font-bold text-amber-600 mb-1">{dept.attendance}%</p>
                        <div className="w-full bg-amber-200 rounded-full h-2">
                          <div 
                            className="bg-amber-600 h-2 rounded-full" 
                            style={{ width: `${dept.attendance}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Pass Percentage */}
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-2 font-semibold">Pass Rate</p>
                        <p className="text-2xl font-bold text-green-600 mb-1">{dept.passPercentage}%</p>
                        <div className="w-full bg-green-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${dept.passPercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Backlogs */}
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-2 font-semibold">Backlogs</p>
                        <p className="text-2xl font-bold text-red-600 mb-1">{dept.backlogs}</p>
                        <p className="text-xs text-red-600">
                          {((dept.backlogs / dept.studentStrength) * 100).toFixed(1)}% of students
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg flex flex-col justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground mb-2 font-semibold">Status</p>
                          {dept.passPercentage >= 90 ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                              <span className="text-sm font-bold text-green-600">Excellent</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-5 h-5 text-yellow-600" />
                              <span className="text-sm font-bold text-yellow-600">Good</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* DSA & Algorithm Metrics */}
                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-sm font-semibold text-foreground mb-4">DSA & Algorithm Performance</p>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">DSA Mastery</p>
                          <p className="text-xl font-bold text-indigo-600">{dept.dsaMastery}%</p>
                          <div className="w-full bg-indigo-200 rounded-full h-1.5 mt-2">
                            <div 
                              className="bg-indigo-600 h-1.5 rounded-full" 
                              style={{ width: `${dept.dsaMastery}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Core Algorithms</p>
                          <p className="text-xl font-bold text-cyan-600">{dept.coreAlgoScore}%</p>
                          <div className="w-full bg-cyan-200 rounded-full h-1.5 mt-2">
                            <div 
                              className="bg-cyan-600 h-1.5 rounded-full" 
                              style={{ width: `${dept.coreAlgoScore}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Competitive Programming</p>
                          <p className="text-xl font-bold text-purple-600">{dept.compProgramming}%</p>
                          <div className="w-full bg-purple-200 rounded-full h-1.5 mt-2">
                            <div 
                              className="bg-purple-600 h-1.5 rounded-full" 
                              style={{ width: `${dept.compProgramming}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="p-3 bg-pink-50 border border-pink-200 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Data Structures</p>
                          <p className="text-xl font-bold text-pink-600">{dept.dataStructures}%</p>
                          <div className="w-full bg-pink-200 rounded-full h-1.5 mt-2">
                            <div 
                              className="bg-pink-600 h-1.5 rounded-full" 
                              style={{ width: `${dept.dataStructures}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
