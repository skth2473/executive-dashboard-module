'use client'

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { HierarchyDrilldown } from '@/components/hierarchy-drilldown'

export default function DepartmentsPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Department Performance</h1>
          <p className="text-muted-foreground">Hierarchical view with drill-down analytics</p>
        </div>

        {/* Hierarchy */}
        <HierarchyDrilldown />
      </div>
    </DashboardLayout>
  )
}
