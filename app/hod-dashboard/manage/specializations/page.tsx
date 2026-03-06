'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';

interface Specialization {
  id: string;
  name: string;
  duration: string;
  level: string;
}

export default function SpecializationsManagementPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [specializations, setSpecializations] = useState<Specialization[]>([
    { id: '1', name: 'English', duration: '4 Years', level: 'Undergraduate' },
    { id: '2', name: 'Hindi', duration: '4 Years', level: 'Undergraduate' },
    { id: '3', name: 'History', duration: '4 Years', level: 'Undergraduate' },
    { id: '4', name: 'Political Science', duration: '4 Years', level: 'Undergraduate' },
    { id: '5', name: 'Psychology', duration: '4 Years', level: 'Undergraduate' },
    { id: '6', name: 'Sociology', duration: '4 Years', level: 'Undergraduate' },
  ]);
  const [newSpec, setNewSpec] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
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

  const handleAddSpecialization = () => {
    if (newSpec.trim()) {
      const newSpecialization: Specialization = {
        id: Date.now().toString(),
        name: newSpec,
        duration: '4 Years',
        level: 'Undergraduate',
      };
      setSpecializations([...specializations, newSpecialization]);
      setNewSpec('');
      setShowAddForm(false);
    }
  };

  const handleDelete = (id: string) => {
    setSpecializations(specializations.filter(s => s.id !== id));
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.back()}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                </div>
                <h2 className="text-3xl font-bold text-foreground">Manage Specializations</h2>
                <p className="text-muted-foreground mt-1">{user?.department}</p>
              </div>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Specialization
              </Button>
            </div>

            {/* Add Form */}
            {showAddForm && (
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-50/50 border border-blue-200 mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Specialization Name</label>
                    <input
                      type="text"
                      value={newSpec}
                      onChange={(e) => setNewSpec(e.target.value)}
                      placeholder="e.g., English Literature, Linguistics"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setNewSpec('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddSpecialization}
                      className="gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Add Specialization
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Specializations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specializations.map((spec) => (
                <Card key={spec.id} className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{spec.name}</h3>
                      <p className="text-sm text-muted-foreground mt-2">Level: {spec.level}</p>
                      <p className="text-sm text-muted-foreground">Duration: {spec.duration}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(spec.id)}
                      className="gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
