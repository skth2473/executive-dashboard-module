'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function InitDB() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const initializeDatabase = async () => {
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/admin/setup-db', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Database initialized successfully! You can now delete this page.');
      } else {
        setError(`Error: ${data.error}`);
      }
    } catch (err) {
      setError(`Failed to initialize database: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Database Initialization</h1>
          
          <p className="text-muted-foreground mb-6">
            Click the button below to initialize all database tables for the LAH Dashboard.
          </p>

          <Button
            onClick={initializeDatabase}
            disabled={loading}
            size="lg"
            className="w-full mb-4"
          >
            {loading ? 'Initializing...' : 'Initialize Database'}
          </Button>

          {message && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">{message}</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
              <details className="mt-2">
                <summary className="text-xs text-red-600 cursor-pointer">Details</summary>
                <pre className="text-xs mt-2 overflow-auto max-h-40">{error}</pre>
              </details>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> This page is only for initial setup. After initialization is complete, this page can be deleted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
