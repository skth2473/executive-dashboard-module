'use client'

import React, { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface HierarchyItem {
  id: string
  name: string
  role: string
  level: 'cluster' | 'department' | 'hod' | 'ao' | 'aco' | 'faculty' | 'student'
  performanceScore: number
  reportingStatus: 'completed' | 'pending' | 'overdue'
  compliance: number
  lastUpdate: string
  children?: HierarchyItem[]
}

const hierarchyData: HierarchyItem[] = [
  {
    id: '1',
    name: 'Engineering Cluster',
    role: 'Cluster',
    level: 'cluster',
    performanceScore: 92,
    reportingStatus: 'completed',
    compliance: 95,
    lastUpdate: '2026-02-10',
    children: [
      {
        id: '1-1',
        name: 'Computer Science Department',
        role: 'Department',
        level: 'department',
        performanceScore: 94,
        reportingStatus: 'completed',
        compliance: 98,
        lastUpdate: '2026-02-10',
        children: [
          {
            id: '1-1-1',
            name: 'Dr. Sharma',
            role: 'Head of Department',
            level: 'hod',
            performanceScore: 96,
            reportingStatus: 'completed',
            compliance: 100,
            lastUpdate: '2026-02-10',
          },
        ],
      },
    ],
  },
]

interface HierarchyNodeProps {
  item: HierarchyItem
  onSelect: (item: HierarchyItem) => void
  level: number
}

function HierarchyNode({ item, onSelect, level }: HierarchyNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400'
      case 'pending':
        return 'text-yellow-400'
      case 'overdue':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500/20'
    if (score >= 70) return 'bg-yellow-500/20'
    return 'bg-red-500/20'
  }

  return (
    <div>
      <div
        className="group p-4 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-all duration-200 cursor-pointer mb-2"
        onClick={() => onSelect(item)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 flex items-start gap-3">
            {item.children && item.children.length > 0 && (
              <button onClick={() => setIsExpanded(!isExpanded)} className="p-1 hover:bg-background rounded transition-colors mt-1">
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            )}
            {!item.children && <div className="w-6 flex-shrink-0" />}

            <div className="flex-1">
              <p className="font-semibold text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className={`px-3 py-1 rounded-lg text-xs font-medium ${getScoreBg(item.performanceScore)} text-foreground`}>
              {item.performanceScore}%
            </div>
            <Badge className={`${getStatusColor(item.reportingStatus)} border-0`}>{item.reportingStatus}</Badge>
          </div>
        </div>

        <div className="mt-3 ml-9 grid grid-cols-3 gap-4 text-xs">
          <div>
            <p className="text-muted-foreground mb-1">Compliance</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-accent w-full" style={{ width: `${item.compliance}%` }} />
              </div>
              <span className="text-foreground font-medium">{item.compliance}%</span>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Last Update</p>
            <p className="text-foreground font-medium">{item.lastUpdate}</p>
          </div>
        </div>
      </div>

      {isExpanded && item.children && item.children.length > 0 && (
        <div className="ml-4 border-l border-border space-y-0">
          {item.children.map((child) => (
            <HierarchyNode key={child.id} item={child} onSelect={onSelect} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function HierarchyDrilldown() {
  const [selectedItem, setSelectedItem] = useState<HierarchyItem | null>(hierarchyData[0])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Tree View */}
      <div className="lg:col-span-2 bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Hierarchical Structure</h3>
        <div className="space-y-0">
          {hierarchyData.map((item) => (
            <HierarchyNode key={item.id} item={item} onSelect={setSelectedItem} level={0} />
          ))}
        </div>
      </div>

      {/* Details Panel */}
      <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Details</h3>
        {selectedItem && (
          <div className="space-y-6">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Name</p>
              <p className="text-foreground font-medium">{selectedItem.name}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Role</p>
              <Badge variant="secondary">{selectedItem.role}</Badge>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Performance Score</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${selectedItem.performanceScore}%` }} />
                </div>
                <span className="text-lg font-bold text-foreground">{selectedItem.performanceScore}%</span>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Compliance Rate</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${selectedItem.compliance}%` }} />
                </div>
                <span className="text-lg font-bold text-foreground">{selectedItem.compliance}%</span>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Reporting Status</p>
              <Badge
                className={`${
                  selectedItem.reportingStatus === 'completed'
                    ? 'bg-green-500/20 text-green-400'
                    : selectedItem.reportingStatus === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                } border-0`}
              >
                {selectedItem.reportingStatus.charAt(0).toUpperCase() + selectedItem.reportingStatus.slice(1)}
              </Badge>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Last Updated</p>
              <p className="text-foreground font-medium">{selectedItem.lastUpdate}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
