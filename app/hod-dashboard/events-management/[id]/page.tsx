'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Upload, Download, FileText, CheckCircle2, AlertCircle, Calendar, Users, DollarSign, MapPin } from 'lucide-react';

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'details' | 'approvals' | 'documents' | 'attendance'>('details');
  const [approvals, setApprovals] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && user) {
      setIsReady(true);
      fetchEventDetails();
    }
  }, [user, loading]);

  const fetchEventDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/events?eventId=${eventId}`);
      const result = await response.json();
      
      if (result.success && result.data.length > 0) {
        const eventData = result.data[0];
        setEvent(eventData);

        // Fetch approvals
        const approvalsResponse = await fetch(`/api/events/approvals?eventId=${eventId}`);
        const approvalsResult = await approvalsResponse.json();
        if (approvalsResult.success) {
          setApprovals(approvalsResult.data);
        }

        // Fetch documents
        const docsResponse = await fetch(`/api/events/documents?eventId=${eventId}`);
        const docsResult = await docsResponse.json();
        if (docsResult.success) {
          setDocuments(docsResult.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch event details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'proposed': return 'bg-yellow-100 text-yellow-800';
      case 'pending_approval': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading || !isReady || isLoading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1">
          <Header />
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">Loading event details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1">
          <Header />
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">Event not found</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Header />
        
        <div className="p-8 max-w-7xl mx-auto">
          {/* Back Button & Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.back()}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-foreground">{event.event_name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(event.status)}`}>
                  {event.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mt-1">Registration: {event.registration_number}</p>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-semibold">{new Date(event.event_date).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Venue</p>
                  <p className="font-semibold text-sm">{event.venue}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Expected</p>
                  <p className="font-semibold">{event.expected_participants || 0}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Budget</p>
                  <p className="font-semibold">₹{event.budget || 0}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-border mb-8">
            {['details', 'approvals', 'documents', 'attendance'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 font-semibold transition-colors capitalize ${
                  activeTab === tab
                    ? 'text-primary border-b-2 border-primary -mb-[2px]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'details' && (
            <Card className="p-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-foreground">Event Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Event Type</p>
                      <p className="font-semibold">{event.event_type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Event Category</p>
                      <p className="font-semibold">{event.event_category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Mode</p>
                      <p className="font-semibold">{event.event_mode}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Organized By</p>
                      <p className="font-semibold">{event.organised_by}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-foreground">Description</h3>
                  <p className="text-sm leading-relaxed text-foreground">{event.brief_description}</p>
                  {event.event_outcome && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-2 text-foreground">Outcome</h4>
                      <p className="text-sm leading-relaxed text-foreground">{event.event_outcome}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'approvals' && (
            <div className="space-y-4">
              {approvals.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No approvals required</p>
                </Card>
              ) : (
                approvals.map((approval, index) => (
                  <Card key={approval.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                            {approval.approval_level}
                          </span>
                          <h4 className="font-semibold">{approval.approval_level_name}</h4>
                        </div>
                        {approval.approver_id && (
                          <p className="text-sm text-muted-foreground">Approver: {approval.approver_id}</p>
                        )}
                        {approval.comments && (
                          <p className="text-sm mt-2 text-foreground italic">"{approval.comments}"</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">Status</p>
                        <span className={`px-3 py-1 rounded text-xs font-semibold capitalize ${
                          approval.status === 'approved' ? 'bg-green-100 text-green-800' :
                          approval.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          approval.status === 'sent_back' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {approval.status}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Event Documents</h3>
                <Button size="sm" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Document
                </Button>
              </div>
              {documents.length === 0 ? (
                <Card className="p-8 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                  <p className="text-muted-foreground">No documents uploaded</p>
                </Card>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <Card key={doc.id} className="p-4 flex items-center justify-between hover:bg-secondary/50 transition">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-semibold text-sm">{doc.file_name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{doc.document_type.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'attendance' && (
            <Card className="p-8 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-muted-foreground">Attendance tracking coming soon</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
