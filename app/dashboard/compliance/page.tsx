'use client'

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Filter, Download, MoreVertical } from 'lucide-react'

interface ComplianceReport {
  id: string
  department: string
  submittedBy: string
  status: 'verified' | 'pending' | 'overdue' | 'submitted'
  submittedDate: string
  verifiedDate?: string
  completeness: number
}

const reports: ComplianceReport[] = [
  {
    id: '1',
    department: 'Engineering',
    submittedBy: 'Dr. Sharma',
    status: 'verified',
    submittedDate: '2026-02-08',
    verifiedDate: '2026-02-09',
    completeness: 100,
  },
  {
    id: '2',
    department: 'Business School',
    submittedBy: 'Prof. Gupta',
    status: 'submitted',
    submittedDate: '2026-02-10',
    completeness: 95,
  },
  {
    id: '3',
    department: 'Science',
    submittedBy: 'Dr. Patel',
    status: 'pending',
    submittedDate: '2026-02-05',
    completeness: 60,
  },
  {
    id: '4',
    department: 'Arts',
    submittedBy: 'Prof. Singh',
    status: 'overdue',
    submittedDate: '2026-01-25',
    completeness: 35,
  },
  {
    id: '5',
    department: 'Medical',
    submittedBy: 'Dr. Desai',
    status: 'verified',
    submittedDate: '2026-02-07',
    verifiedDate: '2026-02-08',
    completeness: 100,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'verified':
      return 'bg-green-500/20 text-green-400'
    case 'submitted':
      return 'bg-blue-500/20 text-blue-400'
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-400'
    case 'overdue':
      return 'bg-red-500/20 text-red-400'
    default:
      return 'bg-gray-500/20 text-gray-400'
  }
}

const getCompletionColor = (completeness: number) => {
  if (completeness >= 90) return 'bg-green-500'
  if (completeness >= 70) return 'bg-yellow-500'
  return 'bg-red-500'
}

export default function CompliancePage() {
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredReports = filterStatus === 'all' ? reports : reports.filter((r) => r.status === filterStatus)

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Compliance Tracker</h1>
          <p className="text-muted-foreground">Monitor reporting submissions and verification status</p>
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'all' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border hover:border-primary'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('verified')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'verified' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border hover:border-primary'
                }`}
              >
                Verified
              </button>
              <button
                onClick={() => setFilterStatus('submitted')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'submitted' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border hover:border-primary'
                }`}
              >
                Submitted
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'pending' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border hover:border-primary'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilterStatus('overdue')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'overdue' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border hover:border-primary'
                }`}
              >
                Overdue
              </button>
            </div>
          </div>

          <Button className="gap-2 bg-transparent" variant="outline">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Table */}
        <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Submitted By</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Submitted Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Completeness</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b border-border/30 hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{report.department}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{report.submittedBy}</td>
                    <td className="px-6 py-4">
                      <Badge className={`${getStatusColor(report.status)} border-0`}>{report.status.charAt(0).toUpperCase() + report.status.slice(1)}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{report.submittedDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getCompletionColor(report.completeness)} rounded-full transition-all`}
                            style={{ width: `${report.completeness}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-foreground w-12">{report.completeness}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 hover:bg-background rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
