'use client'

import React from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const monthlyTrendData = [
  { month: 'Jan', value: 65, target: 80 },
  { month: 'Feb', value: 72, target: 80 },
  { month: 'Mar', value: 78, target: 80 },
  { month: 'Apr', value: 85, target: 80 },
  { month: 'May', value: 88, target: 80 },
  { month: 'Jun', value: 92, target: 80 },
]

const departmentHealthData = [
  { name: 'Engineering', value: 92, fill: 'hsl(210, 100%, 50%)' },
  { name: 'Business', value: 78, fill: 'hsl(270, 80%, 50%)' },
  { name: 'Science', value: 85, fill: 'hsl(45, 100%, 51%)' },
  { name: 'Arts', value: 72, fill: 'hsl(150, 75%, 45%)' },
]

const complianceData = [
  { name: 'Verified', value: 65, fill: 'hsl(150, 75%, 45%)' },
  { name: 'Pending', value: 25, fill: 'hsl(45, 100%, 51%)' },
  { name: 'Overdue', value: 10, fill: 'hsl(0, 84.2%, 60.2%)' },
]

export function MonthlyTrendChart() {
  return (
    <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Monthly Growth Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyTrendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 25%, 20%)" />
          <XAxis stroke="hsl(210, 20%, 75%)" />
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
          <Line type="monotone" dataKey="value" stroke="hsl(210, 100%, 50%)" strokeWidth={3} dot={{ fill: 'hsl(210, 100%, 50%)', r: 5 }} />
          <Line type="monotone" dataKey="target" stroke="hsl(270, 80%, 50%)" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function DepartmentHealthChart() {
  return (
    <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Department Health Meter</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={departmentHealthData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 25%, 20%)" />
          <XAxis stroke="hsl(210, 20%, 75%)" />
          <YAxis stroke="hsl(210, 20%, 75%)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(210, 35%, 12%)',
              border: '1px solid hsl(210, 25%, 20%)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'hsl(210, 40%, 96%)' }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {departmentHealthData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ComplianceChart() {
  return (
    <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Compliance Rate</h3>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={complianceData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={2} dataKey="value">
              {complianceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(210, 35%, 12%)',
                border: '1px solid hsl(210, 25%, 20%)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(210, 40%, 96%)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {complianceData.map((item) => (
          <div key={item.name} className="text-center">
            <p className="text-sm text-muted-foreground">{item.name}</p>
            <p className="text-2xl font-bold text-foreground">{item.value}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}
