'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Calendar, Users, Zap, Download, FileText } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  department: string;
  date: string;
  participants: number;
  type: 'Workshop' | 'Seminar' | 'Conference' | 'Hackathon' | 'Technical';
  status: 'Upcoming' | 'Completed';
  description: string;
  reportLink?: string;
  flyerLink?: string;
  approvalStatus: 'Approved' | 'Pending' | 'Rejected';
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    name: 'AI & Machine Learning Workshop 2024',
    department: 'CSE',
    date: '2024-03-15',
    participants: 250,
    type: 'Workshop',
    status: 'Upcoming',
    description: 'Hands-on workshop on advanced AI/ML techniques including deep learning, NLP, and computer vision applications.',
    flyerLink: '/events/flyers/ai-workshop-2024.pdf',
    approvalStatus: 'Approved',
  },
  {
    id: '2',
    name: 'National Hackathon on IoT Solutions',
    department: 'Engineering',
    date: '2024-03-22',
    participants: 400,
    type: 'Hackathon',
    status: 'Upcoming',
    description: '48-hour hackathon focused on developing innovative IoT solutions for smart cities and industry 4.0.',
    flyerLink: '/events/flyers/hackathon-iot-2024.pdf',
    approvalStatus: 'Approved',
  },
  {
    id: '3',
    name: 'Quantum Computing Seminar',
    department: 'CSE',
    date: '2024-04-10',
    participants: 350,
    type: 'Technical',
    status: 'Upcoming',
    description: 'International seminar on quantum computing fundamentals, applications, and future prospects in cryptography and optimization.',
    flyerLink: '/events/flyers/quantum-seminar-2024.pdf',
    approvalStatus: 'Pending',
  },
  {
    id: '4',
    name: 'Cybersecurity Conference - Chandigarh Tech Summit',
    department: 'IT Security',
    date: '2024-04-25',
    participants: 500,
    type: 'Conference',
    status: 'Upcoming',
    description: 'Annual cybersecurity conference featuring industry experts, research presentations, and networking opportunities.',
    flyerLink: '/events/flyers/cybersecurity-conf-2024.pdf',
    approvalStatus: 'Approved',
  },
];

const completedEvents: Event[] = [
  {
    id: '5',
    name: 'Annual Hackathon 2023 - Innovation Challenge',
    department: 'Engineering',
    date: '2024-01-20',
    participants: 350,
    type: 'Hackathon',
    status: 'Completed',
    description: 'Successful 48-hour hackathon with 50+ teams developing innovative solutions for social impact.',
    reportLink: '/events/reports/hackathon-2023.pdf',
    flyerLink: '/events/flyers/hackathon-2023.pdf',
    approvalStatus: 'Approved',
  },
  {
    id: '6',
    name: 'Cloud Computing & DevOps Workshop',
    department: 'CSE',
    date: '2024-02-05',
    participants: 200,
    type: 'Workshop',
    status: 'Completed',
    description: 'Comprehensive workshop on AWS, Azure, Docker, and Kubernetes with hands-on labs.',
    reportLink: '/events/reports/cloud-workshop-2024.pdf',
    flyerLink: '/events/flyers/cloud-workshop-2024.pdf',
    approvalStatus: 'Approved',
  },
  {
    id: '7',
    name: 'Blockchain Technology Seminar',
    department: 'CSE',
    date: '2024-02-20',
    participants: 280,
    type: 'Technical',
    status: 'Completed',
    description: 'Technical seminar on blockchain fundamentals, smart contracts, and enterprise applications.',
    reportLink: '/events/reports/blockchain-seminar-2024.pdf',
    flyerLink: '/events/flyers/blockchain-seminar-2024.pdf',
    approvalStatus: 'Approved',
  },
];

const typeColors = {
  Workshop: 'bg-blue-50 text-blue-700 border-blue-200/50',
  Seminar: 'bg-green-50 text-green-700 border-green-200/50',
  Conference: 'bg-purple-50 text-purple-700 border-purple-200/50',
  Hackathon: 'bg-orange-50 text-orange-700 border-orange-200/50',
  Technical: 'bg-indigo-50 text-indigo-700 border-indigo-200/50',
};

const approvalColors = {
  Approved: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Rejected: 'bg-red-100 text-red-700',
};

export default function Events() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  const events = activeTab === 'upcoming' ? upcomingEvents : completedEvents;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                Events
              </h2>
              <p className="text-muted-foreground text-sm rounded-4xl">
                Cluster seminars, workshops, conferences and cultural programs
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-border">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
                  activeTab === 'upcoming'
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                Upcoming ({upcomingEvents.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
                  activeTab === 'completed'
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                Completed ({completedEvents.length})
              </button>
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-1">{event.name}</h3>
                        <p className="text-sm text-muted-foreground">{event.department}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${typeColors[event.type]}`}>
                          {event.type}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${approvalColors[event.approvalStatus]}`}>
                          {event.approvalStatus}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-foreground leading-relaxed">{event.description}</p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-border/50">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Date</p>
                          <p className="text-sm font-semibold text-foreground">
                            {new Date(event.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-xs text-muted-foreground">Participants</p>
                          <p className="text-sm font-semibold text-foreground">{event.participants}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-yellow-600" />
                        <div>
                          <p className="text-xs text-muted-foreground">Status</p>
                          <p className="text-sm font-semibold text-foreground">{event.status}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2 flex-wrap">
                      {event.flyerLink && (
                        <a
                          href={event.flyerLink}
                          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-xs font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          View Flyer
                        </a>
                      )}
                      {event.reportLink && (
                        <a
                          href={event.reportLink}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download Report
                        </a>
                      )}
                      {event.approvalStatus === 'Pending' && (
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600 transition-colors">
                          Approve Event
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
