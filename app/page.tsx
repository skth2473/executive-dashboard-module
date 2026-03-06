'use client';

import { useRouter } from 'next/navigation';
import { Users, Building2, BookOpen, Microscope, Calendar, Trophy } from 'lucide-react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { MetricCard } from '@/components/metric-card';

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                  Welcome back, Prof. Sachin Ahuja
                </h2>
                <p className="text-muted-foreground text-sm">
                  Engineering Cluster Management Dashboard - Chandigarh University
                </p>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
                <p className="text-sm font-semibold text-foreground">
                  {new Date().toLocaleDateString('en-IN', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {/* 6 Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard
                title="Total Students"
                value="40,000"
                icon={<Users className="w-8 h-8" />}
                trend={5.2}
                variant="blue"
                onClick={() => router.push('/cluster-overview')}
              />
              <MetricCard
                title="Total Faculty"
                value="1,200"
                icon={<BookOpen className="w-8 h-8" />}
                trend={2.8}
                variant="green"
                onClick={() => router.push('/faculty-phd')}
              />
              <MetricCard
                title="PhD Scholars"
                value="500"
                icon={<Microscope className="w-8 h-8" />}
                trend={-1.5}
                variant="purple"
                onClick={() => router.push('/research-projects')}
              />
              <MetricCard
                title="Events"
                value="450"
                icon={<Calendar className="w-8 h-8" />}
                trend={12.3}
                variant="orange"
                onClick={() => router.push('/events')}
              />
              <MetricCard
                title="Competitions"
                value="150"
                icon={<Trophy className="w-8 h-8" />}
                trend={8.5}
                variant="pink"
                onClick={() => router.push('/competitions')}
              />
              <MetricCard
                title="Research Ongoing"
                value="50"
                icon={<Building2 className="w-8 h-8" />}
                trend={3.2}
                variant="blue"
                onClick={() => router.push('/research-projects')}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
