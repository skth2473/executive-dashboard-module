'use client'

import React, { useEffect, useState } from 'react'
import { Users, Building2, Briefcase, CheckCircle2, AlertCircle, TrendingDown } from 'lucide-react'

interface EDKPIProps {
  totalStudents: number
  totalDepartments: number
  activeReportingHeads: number
  avgCompliance: number
  delayedCount: number
  highRiskCount: number
}

function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let animationFrame: number
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(target * progress))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])

  return <>{count.toLocaleString()}</>
}

export function EDKPICards({ 
  totalStudents,
  totalDepartments,
  activeReportingHeads,
  avgCompliance,
  delayedCount,
  highRiskCount,
}: EDKPIProps) {
  const getComplianceColor = (percent: number) => {
    if (percent >= 85) return 'from-green-500/20 to-green-600/10 border-green-500/30'
    if (percent >= 70) return 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30'
    return 'from-red-500/20 to-red-600/10 border-red-500/30'
  }

  const getRiskColor = (count: number) => {
    if (count === 0) return 'from-green-500/20 to-green-600/10 border-green-500/30'
    if (count <= 2) return 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30'
    return 'from-red-500/20 to-red-600/10 border-red-500/30'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total Students */}
      <div className="group relative bg-gradient-to-br from-blue-500/10 via-card to-card border border-blue-500/30 rounded-2xl p-6 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Total Students Under ED</span>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-4xl font-bold text-foreground mb-1">
            <AnimatedCounter target={totalStudents} />
          </div>
          <p className="text-xs text-muted-foreground">Across all clusters</p>
        </div>
      </div>

      {/* Total Departments */}
      <div className="group relative bg-gradient-to-br from-purple-500/10 via-card to-card border border-purple-500/30 rounded-2xl p-6 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Total Departments</span>
            <Building2 className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-4xl font-bold text-foreground mb-1">
            <AnimatedCounter target={totalDepartments} />
          </div>
          <p className="text-xs text-muted-foreground">Active units reporting</p>
        </div>
      </div>

      {/* Active Reporting Heads */}
      <div className="group relative bg-gradient-to-br from-amber-500/10 via-card to-card border border-amber-500/30 rounded-2xl p-6 overflow-hidden hover:border-amber-500/50 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Reporting Heads</span>
            <Briefcase className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-4xl font-bold text-foreground mb-1">
            <AnimatedCounter target={activeReportingHeads} />
          </div>
          <p className="text-xs text-muted-foreground">Active coordinators</p>
        </div>
      </div>

      {/* Compliance Rate */}
      <div className={`group relative bg-gradient-to-br ${getComplianceColor(avgCompliance)} rounded-2xl p-6 overflow-hidden transition-all duration-300`}>
        <div className="absolute inset-0 bg-gradient-to-br from-opacity-5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Compliance Rate</span>
            <CheckCircle2 className={`w-5 h-5 ${avgCompliance >= 85 ? 'text-green-400' : avgCompliance >= 70 ? 'text-yellow-400' : 'text-red-400'}`} />
          </div>
          <div className="text-4xl font-bold text-foreground mb-2">
            <AnimatedCounter target={avgCompliance} />%
          </div>
          <div className="h-2 bg-background rounded-full overflow-hidden">
            <div
              className={`h-full ${avgCompliance >= 85 ? 'bg-green-500' : avgCompliance >= 70 ? 'bg-yellow-500' : 'bg-red-500'} transition-all duration-500`}
              style={{ width: `${avgCompliance}%` }}
            />
          </div>
        </div>
      </div>

      {/* Delayed Reports */}
      <div className="group relative bg-gradient-to-br from-orange-500/10 via-card to-card border border-orange-500/30 rounded-2xl p-6 overflow-hidden hover:border-orange-500/50 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Delayed Reports</span>
            <AlertCircle className={`w-5 h-5 ${delayedCount > 0 ? 'text-orange-400' : 'text-green-400'}`} />
          </div>
          <div className="text-4xl font-bold text-foreground mb-1">
            <AnimatedCounter target={delayedCount} />
          </div>
          <p className="text-xs text-muted-foreground">Departments overdue</p>
        </div>
      </div>

      {/* High Risk Units */}
      <div className={`group relative bg-gradient-to-br ${getRiskColor(highRiskCount)} rounded-2xl p-6 overflow-hidden transition-all duration-300`}>
        <div className="absolute inset-0 bg-gradient-to-br from-opacity-5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">High Risk Units</span>
            <TrendingDown className={`w-5 h-5 ${highRiskCount === 0 ? 'text-green-400' : highRiskCount <= 2 ? 'text-yellow-400' : 'text-red-400'}`} />
          </div>
          <div className="text-4xl font-bold text-foreground mb-1">
            <AnimatedCounter target={highRiskCount} />
          </div>
          <p className="text-xs text-muted-foreground">Health score &lt; 75</p>
        </div>
      </div>
    </div>
  )
}
