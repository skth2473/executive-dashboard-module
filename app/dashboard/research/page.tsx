'use client'

import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Users, TrendingUp, Calendar } from 'lucide-react'

interface Project {
  id: string
  title: string
  principal: string
  department: string
  status: 'active' | 'completed' | 'planning'
  publications: number
  funding: string
  startDate: string
  endDate?: string
}

const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Driven Learning Systems',
    principal: 'Dr. Sharma',
    department: 'Computer Science',
    status: 'active',
    publications: 8,
    funding: '$250,000',
    startDate: '2024-06-01',
  },
  {
    id: '2',
    title: 'Sustainable Energy Research',
    principal: 'Prof. Gupta',
    department: 'Engineering',
    status: 'active',
    publications: 5,
    funding: '$180,000',
    startDate: '2024-09-01',
  },
  {
    id: '3',
    title: 'Climate Change Mitigation',
    principal: 'Dr. Patel',
    department: 'Environmental Science',
    status: 'completed',
    publications: 12,
    funding: '$320,000',
    startDate: '2023-01-01',
    endDate: '2026-01-31',
  },
  {
    id: '4',
    title: 'Quantum Computing Applications',
    principal: 'Prof. Singh',
    department: 'Physics',
    status: 'active',
    publications: 3,
    funding: '$400,000',
    startDate: '2025-03-01',
  },
  {
    id: '5',
    title: 'Biomedical Innovations',
    principal: 'Dr. Khan',
    department: 'Medical Sciences',
    status: 'planning',
    publications: 0,
    funding: '$500,000',
    startDate: '2026-06-01',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-500/20 text-green-400'
    case 'completed':
      return 'bg-blue-500/20 text-blue-400'
    case 'planning':
      return 'bg-yellow-500/20 text-yellow-400'
    default:
      return 'bg-gray-500/20 text-gray-400'
  }
}

export default function ResearchPage() {
  const totalProjects = projects.length
  const activeProjects = projects.filter((p) => p.status === 'active').length
  const totalPublications = projects.reduce((sum, p) => sum + p.publications, 0)
  const totalFunding = projects
    .reduce((sum, p) => sum + parseInt(p.funding.replace(/[$,]/g, '')), 0)

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Research & Projects</h1>
          <p className="text-muted-foreground">Comprehensive research portfolio and publication tracking</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Projects</p>
                <p className="text-4xl font-bold text-foreground">{totalProjects}</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary opacity-30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Active Projects</p>
                <p className="text-4xl font-bold text-foreground">{activeProjects}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-secondary opacity-30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Publications</p>
                <p className="text-4xl font-bold text-foreground">{totalPublications}</p>
              </div>
              <BookOpen className="w-8 h-8 text-accent opacity-30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Funding</p>
                <p className="text-3xl font-bold text-foreground">${(totalFunding / 1000).toFixed(0)}K</p>
              </div>
              <Users className="w-8 h-8 text-primary opacity-30" />
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6 hover:border-primary/20 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{project.principal}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4" />
                      <span>{project.department}</span>
                    </div>
                  </div>
                </div>
                <Badge className={`${getStatusColor(project.status)} border-0`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/30">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Funding</p>
                  <p className="text-lg font-bold text-foreground">{project.funding}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Publications</p>
                  <p className="text-lg font-bold text-foreground">{project.publications}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                  <p className="text-lg font-bold text-foreground text-sm">{project.startDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <p className="text-lg font-bold text-foreground text-sm">
                    {project.endDate ? 'Concluded' : 'Ongoing'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
