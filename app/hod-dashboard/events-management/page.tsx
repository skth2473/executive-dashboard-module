'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus, Edit2, Trash2, Users, DollarSign, CheckCircle2, Calendar } from 'lucide-react';

interface EventCoordinator {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  coordinator: EventCoordinator;
  description: string;
  budget: number;
  participants: number;
  outcome?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export default function EventsManagementPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCoordinatorForm, setShowCoordinatorForm] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const coordinators: EventCoordinator[] = [
    { id: 'c1', name: 'Dr. Priya Singh', email: 'priya@uilah.edu.in', phone: '9876543210' },
    { id: 'c2', name: 'Prof. Arun Kumar', email: 'arun@uilah.edu.in', phone: '9876543211' },
  ];

  const sampleEvents: Event[] = [
    {
      id: 'e1',
      title: 'Annual Literary Festival 2024',
      date: '2024-03-20',
      coordinator: coordinators[0],
      description: 'Celebration of literature, poetry, and creative writing with participation from students and faculty.',
      budget: 150000,
      participants: 250,
      status: 'upcoming',
    },
    {
      id: 'e2',
      title: 'Seminar: Contemporary Indian Politics',
      date: '2024-02-15',
      coordinator: coordinators[1],
      description: 'Expert discussion on current political trends in India',
      budget: 50000,
      participants: 150,
      outcome: 'Successful seminar with guest speaker from Delhi University. Recorded and shared with 300+ online viewers.',
      status: 'completed',
    },
  ];

  useEffect(() => {
    setEvents(sampleEvents);
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } else if (user.role !== 'hod') {
        router.replace('/');
      } else {
        setIsReady(true);
      }
    }
  }, [user, loading, router]);

  if (loading || !isReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-50 border-blue-200';
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'cancelled':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const completedEvents = events.filter(e => e.status === 'completed');
  const totalBudget = events.reduce((sum, e) => sum + e.budget, 0);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.back()}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Events Management
                  </h1>
                  <p className="text-muted-foreground">
                    Manage departmental events and coordinators
                  </p>
                </div>
              </div>
              <Button onClick={() => setShowForm(!showForm)} size="lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-50/50 border-blue-200/50">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Upcoming Events</p>
                <p className="text-2xl font-bold text-blue-700">{upcomingEvents.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Scheduled events</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-50/50 border-green-200/50">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Completed Events</p>
                <p className="text-2xl font-bold text-green-700">{completedEvents.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Successfully concluded</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-50/50 border-orange-200/50">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Total Budget</p>
                <p className="text-2xl font-bold text-orange-700">₹{totalBudget / 100000}L</p>
                <p className="text-xs text-muted-foreground mt-1">Allocated for events</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-50/50 border-purple-200/50">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Coordinators</p>
                <p className="text-2xl font-bold text-purple-700">{coordinators.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Active event coordinators</p>
              </Card>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-border">
              <div className="flex gap-8">
                <button className="px-4 py-3 font-semibold text-foreground border-b-2 border-primary">
                  Events ({events.length})
                </button>
                <button 
                  onClick={() => setShowCoordinatorForm(!showCoordinatorForm)}
                  className="px-4 py-3 font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Coordinators ({coordinators.length})
                </button>
              </div>
            </div>

            {/* Add Event Form */}
            {showForm && (
              <Card className="p-6 mb-8 bg-gradient-to-br from-blue-50/50 to-blue-50/50 border-blue-200">
                <h3 className="text-lg font-semibold text-foreground mb-4">Add New Event</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Event Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Annual Literary Festival 2024"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Event Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Event Coordinator</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
                        {coordinators.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
                    <textarea
                      placeholder="Detailed description of the event..."
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Budget (₹)</label>
                      <input
                        type="number"
                        placeholder="150000"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Expected Participants</label>
                      <input
                        type="number"
                        placeholder="250"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1">Add Event</Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Events List */}
            <div className="space-y-4">
              {events.length === 0 ? (
                <Card className="p-6 text-center text-muted-foreground">
                  <p>No events added yet</p>
                </Card>
              ) : (
                events.map(event => (
                  <Card key={event.id} className={`p-6 border-2 ${getStatusColor(event.status)} hover:shadow-lg transition-all`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground">{event.title}</h3>
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {event.participants} Participants
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3.5 h-3.5" />
                            ₹{event.budget}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-foreground mb-4">{event.description}</p>

                    <div className="p-4 bg-white/50 rounded-lg mb-4">
                      <p className="text-sm font-semibold text-foreground mb-1">Coordinator</p>
                      <p className="text-sm">{event.coordinator.name}</p>
                      <p className="text-xs text-muted-foreground">{event.coordinator.email} • {event.coordinator.phone}</p>
                    </div>

                    {event.status === 'completed' && event.outcome && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm font-semibold text-green-900 mb-1 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Event Outcome
                        </p>
                        <p className="text-sm text-green-800">{event.outcome}</p>
                      </div>
                    )}

                    <div className="mt-4 text-sm text-muted-foreground">
                      Status: <span className="font-semibold capitalize">{event.status}</span>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {/* Info Box */}
            <Card className="p-6 bg-blue-50/50 border-blue-200/50 mt-8">
              <h3 className="font-semibold text-blue-900 mb-2">Event Management Workflow</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Event Coordinators add events with descriptions and budgets</li>
                <li>• Track participants and actual expenses for each event</li>
                <li>• Upon completion, coordinators submit outcomes and results</li>
                <li>• All event data is compiled for departmental analytics</li>
              </ul>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
