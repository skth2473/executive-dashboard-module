'use client'

import { Card } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'
import type { DirectorMetrics } from '@/lib/ed-data'

interface ChartsProps {
  directors: DirectorMetrics[]
}

export function PlacementTrendChart({ directors }: ChartsProps) {
  const data = directors.map((d) => ({
    name: d.name.split(' ').pop(),
    placement: d.placementRate,
    cgpa: (d.averageCGPA * 10).toFixed(0),
    result: d.resultPercentage,
  }))

  return (
    <Card className="bg-gradient-to-br from-card via-card to-card/80 border-border/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Student Performance & Placement</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(20,20,30,0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar dataKey="placement" fill="#22c55e" name="Placement %" />
          <Bar dataKey="result" fill="#3b82f6" name="Result %" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function ComplianceStatusChart({ directors }: ChartsProps) {
  const data = directors.map((d) => ({
    name: d.name.split(' ').pop(),
    verified: d.complianceStatus === 'verified' ? 100 : 0,
    submitted: d.complianceStatus === 'submitted' ? 100 : 0,
    pending: d.complianceStatus === 'pending' ? 100 : 0,
    delayed: d.delayedDays,
  }))

  return (
    <Card className="bg-gradient-to-br from-card via-card to-card/80 border-border/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Compliance & Reporting Status</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(20,20,30,0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar dataKey="verified" fill="#22c55e" name="Verified" />
          <Bar dataKey="submitted" fill="#f59e0b" name="Submitted" />
          <Bar dataKey="pending" fill="#ef4444" name="Pending" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function ResearchOutputChart({ directors }: ChartsProps) {
  const data = directors.map((d) => ({
    name: d.name.split(' ').pop(),
    publications: d.publications,
    projects: d.activeProjects,
    patents: d.patents * 3,
  }))

  return (
    <Card className="bg-gradient-to-br from-card via-card to-card/80 border-border/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Research & Innovation Output</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(20,20,30,0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="publications" stroke="#a855f7" strokeWidth={2} name="Publications" />
          <Line type="monotone" dataKey="projects" stroke="#0ea5e9" strokeWidth={2} name="Active Projects" />
          <Line type="monotone" dataKey="patents" stroke="#f59e0b" strokeWidth={2} name="Patents (scaled)" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function DirectorHealthChart({ directors }: ChartsProps) {
  const data = directors.map((d) => ({
    name: d.name.split(' ').pop(),
    health: d.healthScore,
    risk: 100 - d.healthScore,
    backlogs: Math.min(d.backlogs / 2, 50),
  }))

  return (
    <Card className="bg-gradient-to-br from-card via-card to-card/80 border-border/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Risk & Alerts Dashboard</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(20,20,30,0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar dataKey="health" fill="#22c55e" name="Health Score" />
          <Bar dataKey="risk" fill="#ef4444" name="Risk Level" />
          <Bar dataKey="backlogs" fill="#f59e0b" name="Backlogs (scaled)" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
