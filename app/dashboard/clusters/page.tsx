'use client'

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Users, BookOpen } from 'lucide-react'

interface Cluster {
  id: string
  name: string
  departments: number
  totalStudents: number
  avgPerformance: number
  status: 'excellent' | 'good' | 'fair' | 'poor'
  trends: number
}

const clusters: Cluster[] = [
  {
    id: '1',
    name: 'Engineering Cluster',
    departments: 5,
    totalStudents: 2400,
    avgPerformance: 92,
    status: 'excellent',
    trends: 8,
  },
  {
    id: '2',
    name: 'Business & Management',
    departments: 3,
    totalStudents: 1800,
    avgPerformance: 85,
    status: 'good',
    trends: 5,
  },
  {
    id: '3',
    name: 'Science & Technology',
    departments: 4,
    totalStudents: 2100,
    avgPerformance: 88,
    status: 'good',
    trends: 6,
  },
  {
    id: '4',
    name: 'Arts & Humanities',
    departments: 3,
    totalStudents: 1200,
    avgPerformance: 78,
    status: 'fair',
    trends: 3,
  },
  {
    id: '5',
    name: 'Medical Sciences',
    departments: 4,
    totalStudents: 1500,
    avgPerformance: 95,
    status: 'excellent',
    trends: 12,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent':
      return 'bg-green-500/20 text-green-400'
    case 'good':
      return 'bg-blue-500/20 text-blue-400'
    case 'fair':
      return 'bg-yellow-500/20 text-yellow-400'
    case 'poor':
      return 'bg-red-500/20 text-red-400'
    default:
      return 'bg-gray-500/20 text-gray-400'
  }
}

export default function ClustersPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Cluster Analytics</h1>
          <p className="text-muted-foreground">Performance metrics across institutional clusters</p>
        </div>

        {/* Clusters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clusters.map((cluster) => (
            <div
              key={cluster.id}
              className="group bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 hover:border-primary/20 p-6 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{cluster.name}</h3>
                  <Badge className={`${getStatusColor(cluster.status)} border-0`}>
                    {cluster.status.charAt(0).toUpperCase() + cluster.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Students</p>
                    <p className="text-lg font-bold text-foreground">{cluster.totalStudents.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    <BookOpen className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Departments</p>
                    <p className="text-lg font-bold text-foreground">{cluster.departments}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    <TrendingUp className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Performance</p>
                    <p className="text-lg font-bold text-foreground">{cluster.avgPerformance}%</p>
                  </div>
                </div>
              </div>

              {/* Performance Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Performance</span>
                  <span className="text-xs font-bold text-foreground">{cluster.avgPerformance}%</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${cluster.avgPerformance}%` }}
                  />
                </div>
              </div>

              {/* Trend */}
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-accent font-medium">{cluster.trends}%</span>
                <span className="text-muted-foreground">growth this month</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
