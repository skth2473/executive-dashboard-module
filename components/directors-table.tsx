'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { DirectorMetrics } from '@/lib/ed-data'
import { CheckCircle, AlertCircle, Clock, XCircle } from 'lucide-react'

interface DirectorsTableProps {
  directors: DirectorMetrics[]
}

const getComplianceIcon = (status: string) => {
  switch (status) {
    case 'verified':
      return <CheckCircle className="w-4 h-4 text-green-400" />
    case 'submitted':
      return <Clock className="w-4 h-4 text-blue-400" />
    case 'pending':
      return <AlertCircle className="w-4 h-4 text-yellow-400" />
    case 'overdue':
      return <XCircle className="w-4 h-4 text-red-400" />
    default:
      return null
  }
}

const getHealthBadge = (score: number) => {
  if (score >= 90) return <Badge className="bg-green-500 text-white">Excellent</Badge>
  if (score >= 80) return <Badge className="bg-blue-500 text-white">Good</Badge>
  if (score >= 70) return <Badge className="bg-yellow-500 text-white">Fair</Badge>
  return <Badge className="bg-red-500 text-white">Critical</Badge>
}

export function DirectorsTable({ directors }: DirectorsTableProps) {
  return (
    <Card className="bg-gradient-to-br from-card via-card to-card/80 border-border/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Directors Performance Overview</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Director</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Department</th>
              <th className="text-center py-3 px-4 text-muted-foreground font-semibold">Students</th>
              <th className="text-center py-3 px-4 text-muted-foreground font-semibold">Placement %</th>
              <th className="text-center py-3 px-4 text-muted-foreground font-semibold">Avg CGPA</th>
              <th className="text-center py-3 px-4 text-muted-foreground font-semibold">Compliance</th>
              <th className="text-center py-3 px-4 text-muted-foreground font-semibold">Publications</th>
              <th className="text-center py-3 px-4 text-muted-foreground font-semibold">Health</th>
            </tr>
          </thead>
          <tbody>
            {directors.map((director, idx) => (
              <tr key={idx} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-medium text-foreground">{director.name}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-muted-foreground text-xs">{director.department}</div>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-primary font-semibold">{director.students.toLocaleString()}</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={director.placementRate >= 90 ? 'text-green-400 font-semibold' : 'text-yellow-400 font-semibold'}>
                    {director.placementRate}%
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-foreground">{director.averageCGPA}</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {getComplianceIcon(director.complianceStatus)}
                    <span className="text-xs capitalize">{director.complianceStatus}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-primary font-semibold">{director.publications}</span>
                </td>
                <td className="py-3 px-4 text-center">{getHealthBadge(director.healthScore)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
