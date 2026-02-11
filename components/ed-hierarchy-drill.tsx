'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronRight, ChevronDown } from 'lucide-react'
import type { Cluster, Department } from '@/lib/ed-data'

export function EDHierarchyDrill({ clusters }: { clusters: Cluster[] }) {
  const [expandedCluster, setExpandedCluster] = useState<string | null>(null)
  const [expandedDept, setExpandedDept] = useState<string | null>(null)

  const getComplianceColor = (percent: number) => {
    if (percent >= 90) return 'bg-green-500/20 text-green-400'
    if (percent >= 70) return 'bg-yellow-500/20 text-yellow-400'
    return 'bg-red-500/20 text-red-400'
  }

  const getHealthColor = (score: number) => {
    if (score >= 85) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <Card className="bg-gradient-to-br from-card via-card to-card/80 border-border/50">
      <CardHeader>
        <CardTitle>Hierarchy Drill-Down</CardTitle>
        <CardDescription>Click to explore cluster → department → reporting structure</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {clusters.map((cluster) => (
            <div key={cluster.id} className="space-y-1">
              {/* Cluster Level */}
              <button
                onClick={() => setExpandedCluster(expandedCluster === cluster.id ? null : cluster.id)}
                className="w-full group flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-card to-card/50 border border-border/50 hover:border-primary/30 hover:bg-gradient-to-r hover:from-primary/10 hover:to-card/80 transition-all duration-200"
              >
                <div className={`transition-transform ${expandedCluster === cluster.id ? 'rotate-90' : ''}`}>
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-foreground text-sm">{cluster.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {cluster.totalStudents.toLocaleString()} students • {cluster.departments.length} departments
                  </div>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className={`px-2 py-1 rounded-full ${getComplianceColor(cluster.compliancePercent)}`}>
                    {cluster.compliancePercent}%
                  </span>
                  <span className={`px-2 py-1 rounded-full bg-card border border-border/50 ${getHealthColor(cluster.averageHealthScore)}`}>
                    Score: {cluster.averageHealthScore}
                  </span>
                </div>
              </button>

              {/* Department Level */}
              {expandedCluster === cluster.id && (
                <div className="pl-4 space-y-1 animate-in fade-in duration-200">
                  {cluster.departments.map((dept) => (
                    <div key={dept.id} className="space-y-1">
                      <button
                        onClick={() => setExpandedDept(expandedDept === dept.id ? null : dept.id)}
                        className="w-full group flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-card/50 to-card/30 border border-border/30 hover:border-secondary/30 hover:bg-gradient-to-r hover:from-secondary/5 hover:to-card/50 transition-all duration-200"
                      >
                        <div className={`transition-transform ${expandedDept === dept.id ? 'rotate-90' : ''}`}>
                          <ChevronRight className="w-4 h-4 text-secondary" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-foreground text-sm">{dept.name}</div>
                          <div className="text-xs text-muted-foreground">{dept.students} students</div>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <span className={`px-2 py-1 rounded-full ${getComplianceColor(dept.compliancePercent)}`}>
                            {dept.compliancePercent}%
                          </span>
                          <span className={`px-2 py-1 rounded-full bg-card border border-border/50 ${getHealthColor(dept.healthScore)}`}>
                            {dept.healthScore}
                          </span>
                        </div>
                      </button>

                      {/* Reporting Person Details */}
                      {expandedDept === dept.id && (
                        <div className="pl-4 p-3 rounded-lg bg-gradient-to-r from-background to-background/50 border border-border/20 space-y-2 animate-in fade-in duration-200">
                          <div>
                            <span className="text-xs font-medium text-muted-foreground">Reporting Person</span>
                            <div className="text-sm font-semibold text-foreground">{dept.reportingPerson}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Last Report</span>
                              <div className="font-medium text-foreground">
                                {new Date(dept.lastReportDate).toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Days Delayed</span>
                              <div className={`font-medium ${dept.delayedDays > 7 ? 'text-red-400' : 'text-green-400'}`}>
                                {dept.delayedDays} days
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
