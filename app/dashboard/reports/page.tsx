'use client'

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Calendar, Filter } from 'lucide-react'

interface Report {
  id: string
  title: string
  type: 'performance' | 'compliance' | 'financial' | 'research'
  generatedDate: string
  fileSize: string
  status: 'ready' | 'generating' | 'scheduled'
}

const reports: Report[] = [
  {
    id: '1',
    title: 'Monthly Performance Report - February 2026',
    type: 'performance',
    generatedDate: '2026-02-10',
    fileSize: '2.4 MB',
    status: 'ready',
  },
  {
    id: '2',
    title: 'Compliance Summary Q1 2026',
    type: 'compliance',
    generatedDate: '2026-02-08',
    fileSize: '1.8 MB',
    status: 'ready',
  },
  {
    id: '3',
    title: 'Financial Report - FY 2025-26',
    type: 'financial',
    generatedDate: '2026-02-05',
    fileSize: '3.2 MB',
    status: 'ready',
  },
  {
    id: '4',
    title: 'Research Portfolio Overview',
    type: 'research',
    generatedDate: '2026-02-01',
    fileSize: '2.1 MB',
    status: 'ready',
  },
  {
    id: '5',
    title: 'Department Performance Analysis',
    type: 'performance',
    generatedDate: 'Scheduled',
    fileSize: '-',
    status: 'scheduled',
  },
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'performance':
      return 'bg-blue-500/20 text-blue-400'
    case 'compliance':
      return 'bg-green-500/20 text-green-400'
    case 'financial':
      return 'bg-purple-500/20 text-purple-400'
    case 'research':
      return 'bg-orange-500/20 text-orange-400'
    default:
      return 'bg-gray-500/20 text-gray-400'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'ready':
      return 'bg-green-500/20 text-green-400'
    case 'generating':
      return 'bg-yellow-500/20 text-yellow-400'
    case 'scheduled':
      return 'bg-blue-500/20 text-blue-400'
    default:
      return 'bg-gray-500/20 text-gray-400'
  }
}

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredReports = selectedType === 'all' ? reports : reports.filter((r) => r.type === selectedType)

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Reports & Export</h1>
          <p className="text-muted-foreground">Generate and download comprehensive reports</p>
        </div>

        {/* Generation Options */}
        <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Generate New Report</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <select className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Report Type</option>
              <option>Performance Report</option>
              <option>Compliance Report</option>
              <option>Financial Report</option>
              <option>Research Report</option>
            </select>
            <select className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Date Range</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>Last Year</option>
            </select>
            <select className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Format</option>
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
              <option>HTML</option>
            </select>
            <Button className="gap-2">
              <Calendar className="w-4 h-4" />
              Generate Report
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Reports are auto-generated monthly on the first day of each month</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background border border-border hover:border-primary'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType('performance')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === 'performance'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background border border-border hover:border-primary'
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setSelectedType('compliance')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === 'compliance'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background border border-border hover:border-primary'
              }`}
            >
              Compliance
            </button>
            <button
              onClick={() => setSelectedType('financial')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === 'financial'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background border border-border hover:border-primary'
              }`}
            >
              Financial
            </button>
            <button
              onClick={() => setSelectedType('research')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === 'research'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background border border-border hover:border-primary'
              }`}
            >
              Research
            </button>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6 hover:border-primary/20 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={`${getTypeColor(report.type)} border-0`}>
                      {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                    </Badge>
                    <Badge className={`${getStatusIcon(report.status)} border-0`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{report.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Generated: {report.generatedDate}</span>
                    {report.status === 'ready' && <span>Size: {report.fileSize}</span>}
                  </div>
                </div>
                {report.status === 'ready' && (
                  <Button className="gap-2" size="sm">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                )}
                {report.status === 'generating' && (
                  <div className="text-sm text-yellow-400">Generating...</div>
                )}
                {report.status === 'scheduled' && (
                  <div className="text-sm text-blue-400">Scheduled</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
