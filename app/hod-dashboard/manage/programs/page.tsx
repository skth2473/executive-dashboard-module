'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Edit2, Trash2, Save } from 'lucide-react';

interface Program {
  id: string;
  name: string;
  level: string;
  duration: string;
  seats: number;
}

export default function ProgramsManagementPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([
    {
      id: '1',
      name: 'B.A (Hons)',
      level: 'Undergraduate',
      duration: '4 Years',
      seats: 800,
    },
    {
      id: '2',
      name: 'M.A',
      level: 'Postgraduate',
      duration: '2 Years',
      seats: 200,
    },
    {
      id: '3',
      name: 'Ph.D',
      level: 'Research',
      duration: '3-5 Years',
      seats: 50,
    },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Program | null>(null);

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

  const handleEdit = (p: Program) => {
    setEditingId(p.id);
    setEditData({ ...p });
  };

  const handleSave = (id: string) => {
    if (editData && editData.id === id) {
      setPrograms(programs.map(p => p.id === id ? editData : p));
      setEditingId(null);
      setEditData(null);
    }
  };

  const handleDelete = (id: string) => {
    setPrograms(programs.filter(p => p.id !== id));
  };

  const handleAddProgram = () => {
    const newProgram: Program = {
      id: Date.now().toString(),
      name: 'New Program',
      level: 'Undergraduate',
      duration: '4 Years',
      seats: 100,
    };
    setPrograms([...programs, newProgram]);
    handleEdit(newProgram);
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
                <h2 className="text-3xl font-bold text-foreground">Manage Degree Programs</h2>
                <p className="text-muted-foreground mt-1">{user?.department}</p>
              </div>
              <Button
                onClick={handleAddProgram}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Program
              </Button>
            </div>

            {/* Programs List */}
            <div className="space-y-4">
              {programs.map((p) => (
                <Card key={p.id} className="p-6 border border-border/50">
                  {editingId === p.id && editData ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Program Name</label>
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Level</label>
                          <select
                            value={editData.level}
                            onChange={(e) => setEditData({ ...editData, level: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                          >
                            <option>Undergraduate</option>
                            <option>Postgraduate</option>
                            <option>Research</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Duration</label>
                          <input
                            type="text"
                            value={editData.duration}
                            onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Total Seats</label>
                          <input
                            type="number"
                            value={editData.seats}
                            onChange={(e) => setEditData({ ...editData, seats: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleSave(p.id)}
                          className="gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
                        <p className="text-sm text-muted-foreground">Level: {p.level}</p>
                        <p className="text-sm text-muted-foreground">Duration: {p.duration}</p>
                        <p className="text-sm text-primary font-semibold mt-2">Seats: {p.seats}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(p)}
                          className="gap-2"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(p.id)}
                          className="gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
