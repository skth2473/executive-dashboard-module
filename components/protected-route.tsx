'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } else {
        setIsReady(true);
      }
    }
  }, [user, loading, router]);

  if (loading || !isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
