'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { DirectorMetrics } from '@/lib/ed-data'
import { AlertTriangle, TrendingDown, Clock, Users } from 'lucide-react'

interface RiskAlertPanelProps {
  directors: DirectorMetrics[]
}

export function RiskAlertPanel({ directors }: RiskAlertPanelProps) {
  const lowPlacementDirectors = directors.filter((d) => d.placementRate < 90)
  const delayedReports = directors.filter((d) => d.delayedDays > 7)
  const highBacklogDirectors = directors.filter((d) => d.backlogs > 50)
  const lowComplianceDirectors = directors.filter((d) => d.healthScore < 80)

  const allAlerts = [
    ...lowPlacementDirectors.map((d) => ({
      type: 'placement',
      director: d.name,
      message: `Low Placement Rate: ${d.placementRate}%`,
      severity: 'medium' as const,
      icon: TrendingDown,
    })),
    ...delayedReports.map((d) => ({
      type: 'report',
      director: d.name,
      message: `Report delayed by ${d.delayedDays} days`,
      severity: 'high' as const,
      icon: Clock,
    })),
    ...highBacklogDirectors.map((d) => ({
      type: 'backlog',
      director: d.name,
      message: `${d.backlogs} backlog students`,
      severity: 'medium' as const,
      icon: Users,
    })),
    ...lowComplianceDirectors.map((d) => ({
      type: 'health',
      director: d.name,
      message: `Health score: ${d.healthScore}/100`,
      severity: 'high' as const,
      icon: AlertTriangle,
    })),
  ]

  const criticalAlerts = allAlerts.filter((a) => a.severity === 'high')
  const warningAlerts = allAlerts.filter((a) => a.severity === 'medium')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Critical Alerts */}
      <Card className="bg-gradient-to-br from-card via-card to-card/80 border-destructive/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-semibold text-foreground">Critical Alerts</h3>
          <Badge className="ml-auto bg-red-500 text-white">{criticalAlerts.length}</Badge>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {criticalAlerts.length > 0 ? (
            criticalAlerts.map((alert, idx) => (
              <div key={idx} className="bg-card/50 border border-red-500/30 rounded-lg p-3 hover:border-red-500/50 transition-colors">
                <p className="text-sm font-medium text-foreground">{alert.director}</p>
                <p className="text-xs text-red-400 mt-1">{alert.message}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No critical alerts</p>
          )}
        </div>
      </Card>

      {/* Warning Alerts */}
      <Card className="bg-gradient-to-br from-card via-card to-card/80 border-yellow-500/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-foreground">Warning Alerts</h3>
          <Badge className="ml-auto bg-yellow-500 text-white">{warningAlerts.length}</Badge>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {warningAlerts.length > 0 ? (
            warningAlerts.map((alert, idx) => (
              <div key={idx} className="bg-card/50 border border-yellow-500/30 rounded-lg p-3 hover:border-yellow-500/50 transition-colors">
                <p className="text-sm font-medium text-foreground">{alert.director}</p>
                <p className="text-xs text-yellow-400 mt-1">{alert.message}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No warning alerts</p>
          )}
        </div>
      </Card>
    </div>
  )
}
