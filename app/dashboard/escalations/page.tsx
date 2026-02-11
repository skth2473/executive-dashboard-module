'use client'

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, ArrowRight } from 'lucide-react'

interface EscalationChain {
  id: string
  condition: string
  triggers: string[]
  chain: {
    role: string
    notified: boolean
    timeframe: string
  }[]
  affectedCount: number
  severity: 'critical' | 'high' | 'medium'
}

const escalationChains: EscalationChain[] = [
  {
    id: '1',
    condition: 'Faculty No Update in 7 Days',
    triggers: ['No submission for 7+ days', 'Status remains pending'],
    chain: [
      { role: 'Department HoD', notified: true, timeframe: 'Immediately' },
      { role: 'Administrative Officer', notified: true, timeframe: '2 hours' },
      { role: 'Executive Director', notified: false, timeframe: '24 hours' },
    ],
    affectedCount: 3,
    severity: 'critical',
  },
  {
    id: '2',
    condition: 'ACO Delayed Monthly Report',
    triggers: ['Report not submitted by deadline', 'Submission pending verification'],
    chain: [
      { role: 'Department HoD', notified: true, timeframe: 'Immediately' },
      { role: 'Finance Director', notified: true, timeframe: '4 hours' },
      { role: 'Executive Director', notified: false, timeframe: '48 hours' },
    ],
    affectedCount: 2,
    severity: 'high',
  },
  {
    id: '3',
    condition: 'AO Verification Pending',
    triggers: ['Verification not completed in 5 days', 'Multiple pending items'],
    chain: [
      { role: 'Finance Department', notified: true, timeframe: 'Immediately' },
      { role: 'Executive Director', notified: false, timeframe: '72 hours' },
    ],
    affectedCount: 5,
    severity: 'medium',
  },
]

const getSeverityIcon = (severity: string) => {
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

export default function EscalationsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(escalationChains[0].id)

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Escalation Engine</h1>
          <p className="text-muted-foreground">Automated escalation rules and notification chains</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
            <p className="text-sm text-muted-foreground mb-2">Active Rules</p>
            <p className="text-4xl font-bold text-foreground">{escalationChains.length}</p>
          </div>
          <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
            <p className="text-sm text-muted-foreground mb-2">Currently Escalated</p>
            <p className="text-4xl font-bold text-foreground">
              {escalationChains.reduce((sum, chain) => sum + chain.affectedCount, 0)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
            <p className="text-sm text-muted-foreground mb-2">Critical Issues</p>
            <p className="text-4xl font-bold text-destructive">
              {escalationChains.filter((c) => c.severity === 'critical').reduce((sum, c) => sum + c.affectedCount, 0)}
            </p>
          </div>
        </div>

        {/* Escalation Rules */}
        <div className="space-y-4">
          {escalationChains.map((chain) => (
            <div
              key={chain.id}
              className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === chain.id ? null : chain.id)}
                className="w-full p-6 flex items-start justify-between hover:bg-background/50 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-lg ${getSeverityIcon(chain.severity)}`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{chain.condition}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-background text-foreground">{chain.affectedCount} affected</Badge>
                      <Badge
                        className={`${getSeverityIcon(chain.severity)} border-0`}
                      >
                        {chain.severity.charAt(0).toUpperCase() + chain.severity.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {chain.triggers.map((trigger, idx) => (
                        <span key={idx} className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                          {trigger}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>

              {expandedId === chain.id && (
                <div className="px-6 pb-6 border-t border-border/50">
                  <h4 className="font-semibold text-foreground mb-4">Escalation Chain</h4>
                  <div className="space-y-4">
                    {chain.chain.map((step, idx) => (
                      <div key={idx}>
                        <div className="flex items-center gap-4">
                          <div
                            className={`px-3 py-1 rounded text-xs font-medium ${
                              step.notified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                          >
                            {step.notified ? 'Notified' : 'Pending'}
                          </div>
                          <span className="font-medium text-foreground">{step.role}</span>
                          <span className="text-sm text-muted-foreground">({step.timeframe})</span>
                        </div>
                        {idx < chain.chain.length - 1 && (
                          <div className="ml-3 h-6 border-l border-border my-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
