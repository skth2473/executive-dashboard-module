'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Clock, TrendingDown, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Department } from '@/lib/ed-data'

export function EDRiskPanel({ departments }: { departments: Department[] }) {
  const delayedDepts = departments
    .filter((d) => d.delayedDays > 7)
    .sort((a, b) => b.delayedDays - a.delayedDays)

  const highLoadDepts = departments
    .filter((d) => d.students > 1200)
    .sort((a, b) => b.students - a.students)

  const lowComplianceDepts = departments
    .filter((d) => d.compliancePercent < 75)
    .sort((a, b) => a.compliancePercent - b.compliancePercent)

  const getRiskLevel = (index: number, total: number) => {
    if (total === 0) return 'bg-green-500/20 text-green-400'
    if (index < Math.ceil(total / 3)) return 'bg-red-500/20 text-red-400'
    if (index < Math.ceil((total * 2) / 3)) return 'bg-yellow-500/20 text-yellow-400'
    return 'bg-blue-500/20 text-blue-400'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Delayed Reporting */}
      <Card className="bg-gradient-to-br from-red-500/5 via-card to-card/80 border-red-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-red-400" />
            Delayed Reporting
          </CardTitle>
          <CardDescription>Overdue by 7+ days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {delayedDepts.length === 0 ? (
              <p className="text-xs text-muted-foreground py-2">All departments on track</p>
            ) : (
              delayedDepts.map((dept, idx) => (
                <div
                  key={dept.id}
                  className="p-2 rounded-lg bg-gradient-to-r from-red-500/10 to-card border border-red-500/20 hover:border-red-500/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">{dept.name}</span>
                    <Badge className="bg-red-500/20 text-red-400 text-xs">{dept.delayedDays}d</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{dept.reportingPerson}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* High Load Departments */}
      <Card className="bg-gradient-to-br from-yellow-500/5 via-card to-card/80 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-yellow-400" />
            High Load Departments
          </CardTitle>
          <CardDescription>Over 1200 students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {highLoadDepts.length === 0 ? (
              <p className="text-xs text-muted-foreground py-2">Load evenly distributed</p>
            ) : (
              highLoadDepts.map((dept) => (
                <div
                  key={dept.id}
                  className="p-2 rounded-lg bg-gradient-to-r from-yellow-500/10 to-card border border-yellow-500/20 hover:border-yellow-500/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">{dept.name}</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">{dept.students}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{dept.reportingPerson}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Low Compliance */}
      <Card className="bg-gradient-to-br from-orange-500/5 via-card to-card/80 border-orange-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingDown className="w-4 h-4 text-orange-400" />
            Low Compliance Departments
          </CardTitle>
          <CardDescription>Below 75%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {lowComplianceDepts.length === 0 ? (
              <p className="text-xs text-muted-foreground py-2">All compliant</p>
            ) : (
              lowComplianceDepts.map((dept) => (
                <div
                  key={dept.id}
                  className="p-2 rounded-lg bg-gradient-to-r from-orange-500/10 to-card border border-orange-500/20 hover:border-orange-500/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">{dept.name}</span>
                    <Badge className="bg-orange-500/20 text-orange-400 text-xs">{dept.compliancePercent}%</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{dept.reportingPerson}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
