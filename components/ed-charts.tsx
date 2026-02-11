'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import type { Department, Cluster } from '@/lib/ed-data'

const COLORS = {
  uie: '#0ea5e9',
  uic: '#8b5cf6',
  ait: '#f59e0b',
  green: '#10b981',
  yellow: '#f59e0b',
  red: '#ef4444',
}

export function ClusterDistributionChart({ clusters }: { clusters: Cluster[] }) {
  const data = clusters.map((c) => ({
    name: c.name.split('(')[0].trim(),
    value: c.totalStudents,
  }))

  return (
    <Card className="bg-gradient-to-br from-card via-card to-card/80 border-border/50">
      <CardHeader>
        <CardTitle>Cluster Distribution</CardTitle>
        <CardDescription>Student distribution across clusters</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={[COLORS.uie, COLORS.uic, COLORS.ait][index]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function DepartmentStrengthChart({ departments }: { departments: Department[] }) {
  const data = departments.map((d) => ({
    name: d.name.substring(0, 12),
    students: d.students,
    compliance: d.compliancePercent,
  }))

  return (
    <Card className="bg-gradient-to-br from-card via-card to-card/80 border-border/50">
      <CardHeader>
        <CardTitle>Department Strength</CardTitle>
        <CardDescription>Student enrollment and compliance by department</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(20, 30, 50, 0.9)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="students" fill={COLORS.uie} name="Students" />
            <Bar yAxisId="right" dataKey="compliance" fill={COLORS.green} name="Compliance %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function ComplianceHeatmap({ departments }: { departments: Department[] }) {
  const sortedDepts = [...departments].sort((a, b) => b.compliancePercent - a.compliancePercent)

  return (
    <Card className="bg-gradient-to-br from-card via-card to-card/80 border-border/50">
      <CardHeader>
        <CardTitle>Compliance Status</CardTitle>
        <CardDescription>Real-time compliance tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedDepts.map((dept) => {
            const getColor = (percent: number) => {
              if (percent >= 90) return 'bg-green-500/80'
              if (percent >= 70) return 'bg-yellow-500/80'
              return 'bg-red-500/80'
            }

            return (
              <div key={dept.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{dept.name}</span>
                  <span className={`font-semibold ${dept.compliancePercent >= 90 ? 'text-green-400' : dept.compliancePercent >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {dept.compliancePercent}%
                  </span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getColor(dept.compliancePercent)} transition-all duration-300`}
                    style={{ width: `${dept.compliancePercent}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export function ReportingTimelinessTrend({ departments }: { departments: Department[] }) {
  const data = departments.map((d) => ({
    name: d.name.substring(0, 10),
    delayed: d.delayedDays,
    compliance: d.compliancePercent,
  }))

  return (
    <Card className="bg-gradient-to-br from-card via-card to-card/80 border-border/50">
      <CardHeader>
        <CardTitle>Reporting Timeline</CardTitle>
        <CardDescription>Days since last update vs compliance rate</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(20, 30, 50, 0.9)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="delayed"
              stroke={COLORS.red}
              name="Days Delayed"
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="compliance"
              stroke={COLORS.green}
              name="Compliance %"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
