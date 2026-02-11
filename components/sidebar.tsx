'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  Building2,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  BookOpen,
  FileText,
  Settings,
  LayoutDashboard,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Building2, label: 'Cluster Analytics', href: '/dashboard/clusters' },
  { icon: BarChart3, label: 'Department Performance', href: '/dashboard/departments' },
  { icon: CheckCircle2, label: 'Compliance Tracker', href: '/dashboard/compliance' },
  { icon: AlertTriangle, label: 'Escalation Alerts', href: '/dashboard/escalations' },
  { icon: TrendingUp, label: 'Faculty Productivity', href: '/dashboard/faculty' },
  { icon: BookOpen, label: 'Research & Projects', href: '/dashboard/research' },
  { icon: FileText, label: 'Reports Export', href: '/dashboard/reports' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-sm">UE</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sidebar-foreground text-sm">University ERP</span>
            <span className="text-xs text-sidebar-foreground/60">CMAM</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/20'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent',
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/60">
        <p>© 2026 University ERP</p>
      </div>
    </aside>
  )
}
