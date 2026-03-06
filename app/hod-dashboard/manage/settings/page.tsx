'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

export default function SettingsManagementPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [formData, setFormData] = useState({
    departmentName: 'UILAH - Liberal Arts & Humanities',
    institute: 'University Institute of Liberal Arts and Humanities',
    spocName: 'Prof. Dr. Santosh Kumar',
    spocEmail: 'santosh.kumar@uilah.edu.in',
    spocPhone: '+91-9876543210',
    spocDesignation: 'Senior ED, HOD',
    adminOfficer: 'Prof. Harpreet Singh',
    adminEmail: 'harpreet@uilah.edu.in',
    totalStudents: '2100',
    totalFaculty: '98',
    phdsScholars: '45',
    website: 'https://www.chandigarh.edu.in/uilah',
    affiliation: 'Chandigarh University',
  });
  const [saved, setSaved] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
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
              <h2 className="text-3xl font-bold text-foreground">Department Settings</h2>
              <p className="text-muted-foreground mt-1">Update department information and SPOC details</p>
            </div>

            {/* Success Message */}
            {saved && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6 flex gap-3">
                <div className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5">✓</div>
                <p className="text-sm text-green-800">Settings saved successfully!</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Department Information */}
              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">Department Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Department Name</label>
                    <input
                      type="text"
                      value={formData.departmentName}
                      onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Institute Name</label>
                    <input
                      type="text"
                      value={formData.institute}
                      onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Affiliation</label>
                    <input
                      type="text"
                      value={formData.affiliation}
                      onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                </div>
              </Card>

              {/* SPOC Information */}
              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">SPOC (Single Point of Contact)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">SPOC Name</label>
                    <input
                      type="text"
                      value={formData.spocName}
                      onChange={(e) => setFormData({ ...formData, spocName: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Designation</label>
                    <input
                      type="text"
                      value={formData.spocDesignation}
                      onChange={(e) => setFormData({ ...formData, spocDesignation: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.spocEmail}
                      onChange={(e) => setFormData({ ...formData, spocEmail: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.spocPhone}
                      onChange={(e) => setFormData({ ...formData, spocPhone: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                </div>
              </Card>

              {/* Administrative Officer */}
              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">Administrative Officer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Officer Name</label>
                    <input
                      type="text"
                      value={formData.adminOfficer}
                      onChange={(e) => setFormData({ ...formData, adminOfficer: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.adminEmail}
                      onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                </div>
              </Card>

              {/* Department Statistics */}
              <Card className="p-6 bg-gradient-to-br from-card to-card/95 border border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">Department Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Total Students</label>
                    <input
                      type="number"
                      value={formData.totalStudents}
                      onChange={(e) => setFormData({ ...formData, totalStudents: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Total Faculty</label>
                    <input
                      type="number"
                      value={formData.totalFaculty}
                      onChange={(e) => setFormData({ ...formData, totalFaculty: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">PhD Scholars</label>
                    <input
                      type="number"
                      value={formData.phdsScholars}
                      onChange={(e) => setFormData({ ...formData, phdsScholars: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                </div>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="gap-2 px-8"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
