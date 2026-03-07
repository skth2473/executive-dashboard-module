'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Loader } from 'lucide-react';

export default function SetupEventsPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSetupDatabase = async () => {
    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch('/api/admin/init-events-db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Events database setup successful!');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to setup database');
      }
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'An error occurred during setup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg border border-border max-w-md w-full p-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Events Database Setup</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Initialize the events management system database tables.
        </p>

        {status === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-900">Success!</p>
              <p className="text-xs text-green-800 mt-1">{message}</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-900">Error</p>
              <p className="text-xs text-red-800 mt-1">{message}</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Button
            onClick={handleSetupDatabase}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white"
            size="lg"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Setting up...
              </>
            ) : (
              'Setup Events Database'
            )}
          </Button>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs font-semibold text-blue-900 mb-2">What this does:</p>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>✓ Creates 7 database tables</li>
              <li>✓ Sets up relationships and constraints</li>
              <li>✓ Enables Row Level Security</li>
              <li>✓ Creates performance indexes</li>
            </ul>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            After setup, you can use the events management system at /hod-dashboard/events-management
          </p>
        </div>
      </div>
    </div>
  );
}
