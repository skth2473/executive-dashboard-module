'use client'

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts'

const facultyProductivityData = [
  { name: 'Dr. Sharma', score: 92, publications: 8, projects: 5 },
  { name: 'Prof. Gupta', score: 87, publications: 6, projects: 4 },
  { name: 'Dr. Patel', score: 94, publications: 9, projects: 6 },
  { name: 'Prof. Singh', score: 78, publications: 4, projects: 3 },
  { name: 'Dr. Khan', score: 85, publications: 7, projects: 5 },
  { name: 'Prof. Desai', score: 90, publications: 8, projects: 5 },
]

const acoEfficiencyData = [
  { name: 'ACO Team A', efficiency: 95, onTime: 98 },
  { name: 'ACO Team B', efficiency: 87, onTime: 89 },
  { name: 'ACO Team C', efficiency: 92, onTime: 95 },
  { name: 'ACO Team D', efficiency: 80, onTime: 82 },
  { name: 'ACO Team E', efficiency: 88, onTime: 91 },
]

export default function FacultyPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Faculty Productivity</h1>
          <p className="text-muted-foreground">Performance metrics and efficiency analysis</p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Faculty Productivity Index */}
          <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Faculty Productivity Index</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={facultyProductivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 25%, 20%)" />
                <XAxis dataKey="name" stroke="hsl(210, 20%, 75%)" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="hsl(210, 20%, 75%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(210, 35%, 12%)',
                    border: '1px solid hsl(210, 25%, 20%)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(210, 40%, 96%)' }}
                />
                <Legend />
                <Bar dataKey="score" fill="hsl(210, 100%, 50%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ACO Efficiency Score */}
          <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">ACO Efficiency Score</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={acoEfficiencyData}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 25%, 20%)" />
                <XAxis type="number" stroke="hsl(210, 20%, 75%)" />
                <YAxis dataKey="name" type="category" stroke="hsl(210, 20%, 75%)" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(210, 35%, 12%)',
                    border: '1px solid hsl(210, 25%, 20%)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(210, 40%, 96%)' }}
                />
                <Bar dataKey="efficiency" fill="hsl(270, 80%, 50%)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Faculty Details Table */}
        <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 overflow-hidden">
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground">Faculty Metrics</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Faculty Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Productivity Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Publications</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Projects</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {facultyProductivityData.map((faculty, idx) => (
                  <tr key={idx} className="border-b border-border/30 hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{faculty.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-background rounded-full overflow-hidden max-w-xs">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: `${faculty.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-foreground">{faculty.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{faculty.publications}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{faculty.projects}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          faculty.score >= 90
                            ? 'bg-green-500/20 text-green-400'
                            : faculty.score >= 80
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {faculty.score >= 90 ? 'Excellent' : faculty.score >= 80 ? 'Good' : 'Fair'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
