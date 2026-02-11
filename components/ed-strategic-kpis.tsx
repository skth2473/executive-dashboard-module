'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, Users, BookOpen, AlertTriangle } from 'lucide-react'

interface EDStrategicKPIsProps {
  avgPlacement: number
  avgCGPA: number
  avgCompliance: number
  avgResult: number
  totalProjects: number
  totalPublications: number
  totalBacklogs: number
  highRiskCount: number
}

export function EDStrategicKPIs({
  avgPlacement,
  avgCGPA,
  avgCompliance,
  avgResult,
  totalProjects,
  totalPublications,
  totalBacklogs,
  highRiskCount,
}: EDStrategicKPIsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Student Performance & Placement */}
      <Card className="bg-gradient-to-br from-card via-card to-card/80 border-border/50 p-6 hover:border-primary/50 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Placement Rate</p>
            <p className="text-3xl font-bold text-green-400">{avgPlacement}%</p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-400 opacity-50" />
        </div>
        <div className="text-xs text-muted-foreground">
          <p>Avg CGPA: <span className="text-primary">{avgCGPA}</span></p>
          <p>Result: <span className="text-primary">{avgResult}%</span></p>
        </div>
      </Card>

      {/* 2. Compliance & Reporting */}
      <Card className="bg-gradient-to-br from-card via-card to-card/80 border-border/50 p-6 hover:border-primary/50 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Compliance Rate</p>
            <p className="text-3xl font-bold text-blue-400">{avgCompliance}%</p>
          </div>
          <BookOpen className="w-8 h-8 text-blue-400 opacity-50" />
        </div>
        <div className="text-xs text-muted-foreground">
          <p>Reports Verified</p>
          <p className="text-primary">On Track</p>
        </div>
      </Card>

      {/* 3. Research & Innovation */}
      <Card className="bg-gradient-to-br from-card via-card to-card/80 border-border/50 p-6 hover:border-primary/50 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Research Output</p>
            <p className="text-3xl font-bold text-purple-400">{totalPublications}</p>
          </div>
          <Users className="w-8 h-8 text-purple-400 opacity-50" />
        </div>
        <div className="text-xs text-muted-foreground">
          <p>Publications this year</p>
          <p className="text-primary">{totalProjects} Active Projects</p>
        </div>
      </Card>

      {/* 4. Risk & Alerts */}
      <Card className={`bg-gradient-to-br from-card via-card to-card/80 border-border/50 p-6 hover:border-${highRiskCount > 2 ? 'destructive' : 'primary'}/50 transition-colors`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">At-Risk Directors</p>
            <p className={`text-3xl font-bold ${highRiskCount > 2 ? 'text-red-400' : 'text-yellow-400'}`}>
              {highRiskCount}
            </p>
          </div>
          <AlertTriangle className={`w-8 h-8 ${highRiskCount > 2 ? 'text-red-400' : 'text-yellow-400'} opacity-50`} />
        </div>
        <div className="text-xs text-muted-foreground">
          <p>Backlogs: <span className="text-primary">{totalBacklogs}</span></p>
          <p>Needs attention</p>
        </div>
      </Card>
    </div>
  )
}
