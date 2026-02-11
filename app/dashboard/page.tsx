'use client'

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { EDStrategicKPIs } from '@/components/ed-strategic-kpis'
import {
  PlacementTrendChart,
  ComplianceStatusChart,
  ResearchOutputChart,
  DirectorHealthChart,
} from '@/components/ed-analytics'
import { DirectorsTable } from '@/components/directors-table'
import { RiskAlertPanel } from '@/components/risk-alert-panel'
import { getEDSummary } from '@/lib/ed-data'

export default function DashboardPage() {
  const summary = getEDSummary()

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-foreground mb-2">Executive Director Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Dr. Sachin Ahuja • 25,000 Students • 7 Directors Reporting
            </p>
          </div>
        </div>

        {/* Strategic KPI Cards - 4 Critical Metrics */}
        <div className="mb-8">
          <EDStrategicKPIs
            avgPlacement={summary.avgPlacementRate}
            avgCGPA={summary.avgCGPA}
            avgCompliance={summary.avgCompliance}
            avgResult={summary.avgResult}
            totalProjects={summary.totalProjects}
            totalPublications={summary.totalPublications}
            totalBacklogs={summary.totalBacklogs}
            highRiskCount={summary.highRiskCount}
          />
        </div>

        {/* 4 Critical Metrics Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 1. Student Performance & Placement */}
          <PlacementTrendChart directors={summary.directors} />
          
          {/* 2. Compliance & Reporting */}
          <ComplianceStatusChart directors={summary.directors} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 3. Research & Innovation */}
          <ResearchOutputChart directors={summary.directors} />
          
          {/* 4. Risk & Alerts */}
          <DirectorHealthChart directors={summary.directors} />
        </div>

        {/* Directors Performance Table */}
        <div className="mb-8">
          <DirectorsTable directors={summary.directors} />
        </div>

        {/* Risk Alert Panel */}
        <div className="mb-8">
          <RiskAlertPanel directors={summary.directors} />
        </div>
      </div>
    </DashboardLayout>
  )
}
