'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Edit2, Trash2, Save } from 'lucide-react';

interface Faculty {
  id: string;
  name: string;
  designation: string;
  expertise: string;
  email: string;
}

export default function FacultyManagementPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [faculty, setFaculty] = useState<Faculty[]>([
    {
      id: '1',
      name: 'Prof. Dr. Santosh Kumar',
      designation: 'Senior ED & HOD',
      expertise: 'Liberal Arts Education',
      email: 'santosh.kumar@uilah.edu.in',
    },
    {
      id: '2',
      name: 'Prof. Harpreet Singh',
      designation: 'Administrative Officer',
      expertise: 'Interdisciplinary Studies',
      email: 'harpreet@uilah.edu.in',
    },
    {
      id: '3',
      name: 'Dr. Neha Sharma',
      designation: 'Associate Professor',
      expertise: 'Humanities Research',
      email: 'neha@uilah.edu.in',
    },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Faculty | null>(null);

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

  const handleEdit = (f: Faculty) => {
    setEditingId(f.id);
    setEditData({ ...f });
  };

  const handleSave = (id: string) => {
    if (editData && editData.id === id) {
      setFaculty(faculty.map(f => f.id === id ? editData : f));
      setEditingId(null);
      setEditData(null);
    }
  };

  const handleDelete = (id: string) => {
    setFaculty(faculty.filter(f => f.id !== id));
  };

  const handleAddFaculty = () => {
    const newFaculty: Faculty = {
      id: Date.now().toString(),
      name: 'New Faculty Member',
      designation: 'Assistant Professor',
      expertise: 'Subject Area',
      email: 'email@uilah.edu.in',
    };
    setFaculty([...faculty, newFaculty]);
    handleEdit(newFaculty);
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
                <h2 className="text-3xl font-bold text-foreground">Manage Faculty & Staff</h2>
                <p className="text-muted-foreground mt-1">{user?.department}</p>
              </div>
              <Button
                onClick={handleAddFaculty}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Faculty Member
              </Button>
            </div>

            {/* Faculty List */}
            <div className="space-y-4">
              {faculty.map((f) => (
                <Card key={f.id} className="p-6 border border-border/50">
                  {editingId === f.id && editData ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Name</label>
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Email</label>
                          <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Designation</label>
                          <input
                            type="text"
                            value={editData.designation}
                            onChange={(e) => setEditData({ ...editData, designation: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Expertise/Subject</label>
                          <input
                            type="text"
                            value={editData.expertise}
                            onChange={(e) => setEditData({ ...editData, expertise: e.target.value })}
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
                          onClick={() => handleSave(f.id)}
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
                        <h3 className="text-lg font-semibold text-foreground">{f.name}</h3>
                        <p className="text-sm text-muted-foreground">{f.designation}</p>
                        <p className="text-sm text-muted-foreground mt-1">Expertise: {f.expertise}</p>
                        <p className="text-sm text-muted-foreground">Email: {f.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(f)}
                          className="gap-2"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(f.id)}
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
