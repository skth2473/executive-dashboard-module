'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Chandigarh University - UILAH Cluster</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 border border-border/50 shadow-xl bg-card/95 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="p-4 bg-red-50/80 border border-red-200/50 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@cuims.edu.in"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Sign In
                </div>
              )}
            </Button>

            {/* Demo Credentials */}
            <div className="space-y-3">
              <div className="p-4 bg-blue-50/50 border border-blue-200/50 rounded-lg">
                <p className="text-xs font-semibold text-blue-900 mb-2">Senior ED Account:</p>
                <p className="text-xs text-blue-800">Email: <code className="bg-white px-2 py-1 rounded">santosh.kumar@uilah.edu.in</code></p>
                <p className="text-xs text-blue-800">Password: <code className="bg-white px-2 py-1 rounded">demo123</code></p>
                <p className="text-xs text-blue-700 mt-2">(Can view all departments)</p>
              </div>
              <div className="p-4 bg-purple-50/50 border border-purple-200/50 rounded-lg">
                <p className="text-xs font-semibold text-purple-900 mb-2">HOD Account Example:</p>
                <p className="text-xs text-purple-800">Email: <code className="bg-white px-2 py-1 rounded">hod.uilah@cuims.edu.in</code></p>
                <p className="text-xs text-purple-800">Password: <code className="bg-white px-2 py-1 rounded">demo123</code></p>
                <p className="text-xs text-purple-700 mt-2">(Can only view their own department)</p>
              </div>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">New user?</span>
            </div>
          </div>

          {/* Register Link */}
          <Link
            href="/register"
            className="w-full px-4 py-3 text-center border border-border rounded-lg text-foreground font-semibold hover:bg-secondary transition-all"
          >
            Create an Account
          </Link>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Protected by secure authentication • Chandigarh University
        </p>
      </div>
    </div>
  );
}
