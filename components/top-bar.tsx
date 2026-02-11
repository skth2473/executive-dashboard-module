'use client'

import React from 'react'
import { Search, Bell, Calendar, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TopBar() {
  const [notificationCount] = React.useState(3)

  return (
    <header className="h-16 bg-sidebar border-b border-sidebar-border px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Global search..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Date Filter */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover:border-primary/30 cursor-pointer transition-colors">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-foreground">Last 30 days</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-background transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-white text-xs font-bold">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-background transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white text-sm font-bold">ED</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  )
}
