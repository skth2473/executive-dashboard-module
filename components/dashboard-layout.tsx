'use client'

import React, { ReactNode } from 'react'
import { Sidebar } from './sidebar'
import { TopBar } from './top-bar'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto bg-gradient-to-b from-background via-background to-[#0f2844]">
          {children}
        </main>
      </div>
    </div>
  )
}
