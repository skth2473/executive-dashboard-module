'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus, Calendar, Users, DollarSign, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface Event {
  id: string;
  registration_number: string;
  event_name: string;
  event_type: string;
  event_date: string;
  venue: string;
  event_mode: string;
  status: string;
  expected_participants?: number;
  budget?: number;
  brief_description: string;
}

export default function EventsManagementPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } else if (user.role !== 'hod') {
        router.replace('/');
      } else {
        setIsReady(true);
        fetchEvents();
      }
    }
  }, [user, loading, router]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      setDbError(null);
      const response = await fetch(`/api/events?coordinatorId=${user?.id}`);
      const result = await response.json();
      
      if (result.success) {
        setEvents(result.data || []);
        setDbError(null);
      } else {
        if (result.setupUrl) {
          setDbError('Database tables not initialized. Redirecting to setup in 2 seconds...');
          setTimeout(() => {
            router.push(result.setupUrl);
          }, 2000);
        } else if (result.error?.includes('Database not initialized') || result.error?.includes('Could not find the table')) {
          setDbError('Database tables not initialized. Please run the setup first.');
          setTimeout(() => {
            router.push('/admin/setup-events');
          }, 2000);
        } else {
          setDbError(result.error || 'Failed to load events');
        }
      }
    } catch (error: any) {
      console.error('Failed to fetch events:', error);
      setDbError('Failed to load events. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEvents = filterStatus === 'all' 
    ? events 
    : events.filter(e => e.status === filterStatus);

  const stats = {
    total: events.length,
    proposed: events.filter(e => e.status === 'proposed').length,
    approved: events.filter(e => e.status === 'approved').length,
    completed: events.filter(e => e.status === 'completed').length,
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'proposed': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'pending_approval': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'approved': return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-300';
      case 'completed': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'approved': return <CheckCircle2 className="w-4 h-4" />;
      case 'rejected': return <AlertCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  if (loading || !isReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Header />
        
        <div className="p-8 max-w-7xl mx-auto">
          {/* Database Error Alert */}
          {dbError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-4">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-red-900">Setup Required</p>
                <p className="text-sm text-red-800 mt-1">{dbError}</p>
                <Button 
                  onClick={() => router.push('/admin/setup-events')}
                  size="sm"
                  className="mt-3 bg-red-600 hover:bg-red-700"
                >
                  Go to Setup
                </Button>
              </div>
            </div>
          )}

          {/* Back Button & Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.back()}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Events Management</h1>
                <p className="text-muted-foreground text-sm mt-1">Create, manage, and track department events</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Event
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-50/50">
              <p className="text-sm text-muted-foreground mb-1">Total Events</p>
              <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-50/50">
              <p className="text-sm text-muted-foreground mb-1">Proposed</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.proposed}</p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-50/50">
              <p className="text-sm text-muted-foreground mb-1">Approved</p>
              <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-50/50">
              <p className="text-sm text-muted-foreground mb-1">Completed</p>
              <p className="text-3xl font-bold text-purple-600">{stats.completed}</p>
            </Card>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {['all', 'proposed', 'pending_approval', 'approved', 'rejected', 'completed'].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status.replace('_', ' ')}
              </Button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {isLoading ? (
              <Card className="p-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Loading events...</p>
              </Card>
            ) : filteredEvents.length === 0 ? (
              <Card className="p-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-foreground font-semibold">No events found</p>
                <p className="text-muted-foreground text-sm">Create your first event to get started</p>
              </Card>
            ) : (
              filteredEvents.map((event) => (
                <Card 
                  key={event.id}
                  className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{event.event_name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(event.status)}`}>
                          {getStatusIcon(event.status)}
                          {event.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{event.brief_description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{new Date(event.event_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="w-4 h-4 text-primary" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{event.expected_participants || 0} expected</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span>₹{event.budget || 0}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/hod-dashboard/events-management/${event.id}`);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
