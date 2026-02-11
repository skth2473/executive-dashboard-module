'use client'

import React from 'react'
import { AlertTriangle, Clock, User, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Escalation {
  id: string
  type: 'faculty' | 'aco' | 'ao'
  title: string
  description: string
  daysOverdue: number
  severity: 'critical' | 'high' | 'medium'
  person: string
}

const escalations: Escalation[] = [
  {
    id: '1',
    type: 'faculty',
    title: 'No Update',
    description: 'Dr. Sharma - Engineering',
    daysOverdue: 12,
    severity: 'critical',
    person: 'Dr. Sharma',
  },
  {
    id: '2',
    type: 'aco',
    title: 'Delayed Report',
    description: 'Monthly Report Overdue',
    daysOverdue: 7,
    severity: 'high',
    person: 'ACO Team',
  },
  {
    id: '3',
    type: 'ao',
    title: 'Verification Pending',
    description: 'Budget Verification Required',
    daysOverdue: 5,
    severity: 'medium',
    person: 'Finance Dept',
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-500/20 text-red-400'
    case 'high':
      return 'bg-orange-500/20 text-orange-400'
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-400'
    default:
      return 'bg-gray-500/20 text-gray-400'
  }
}

export function EscalationPanel() {
  return (
    <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          Escalation Alerts
        </h3>
        <Badge variant="destructive" className="ml-auto">
          {escalations.length}
        </Badge>
      </div>

      <div className="space-y-4">
        {escalations.map((escalation) => (
          <div
            key={escalation.id}
            className="group relative p-4 rounded-lg bg-background border border-border/50 hover:border-destructive/30 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            {/* Background effect for critical */}
            {escalation.severity === 'critical' && (
              <div className="absolute inset-0 bg-gradient-to-r from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            )}

            <div className="relative z-10 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(escalation.severity)}`}>
                    {escalation.severity.charAt(0).toUpperCase() + escalation.severity.slice(1)}
                  </div>
                  <p className="font-medium text-foreground">{escalation.title}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{escalation.person}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{escalation.daysOverdue} days overdue</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 rounded-lg bg-background border border-border hover:border-primary transition-colors text-sm font-medium text-foreground">
        View All Escalations
      </button>
    </div>
  )
}
