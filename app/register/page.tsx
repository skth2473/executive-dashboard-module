'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, AlertCircle } from 'lucide-react';

const INSTITUTES = [
  'UITTR',
  'UID',
  'UILAH',
  'UIA',
  'UIFVA',
  'UIMS',
  'UITHM',
];

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    institute: 'UILAH',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(formData.email, formData.password, formData.name, formData.institute);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-xl shadow-lg mb-4">
            <span className="text-2xl font-bold text-white">LAH</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground">Chandigarh University - UILAH Cluster</p>
        </div>

        {/* Register Card */}
        <Card className="p-8 border border-border/50 shadow-xl bg-card/95 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Alert */}
            {error && (
              <div className="p-4 bg-red-50/80 border border-red-200/50 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Prof. Dr. John Doe"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@cuims.edu.in"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>

            {/* Institute Select */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Institute
              </label>
              <select
                name="institute"
                value={formData.institute}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
              >
                {INSTITUTES.map(inst => (
                  <option key={inst} value={inst}>{inst}</option>
                ))}
              </select>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            href="/login"
            className="w-full px-4 py-3 text-center border border-border rounded-lg text-foreground font-semibold hover:bg-secondary transition-all"
          >
            Sign In
          </Link>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By creating an account, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
