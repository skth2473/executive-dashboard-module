'use client'

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Bell, Lock, Users, Eye } from 'lucide-react'

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [escalationAlerts, setEscalationAlerts] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(false)
  const [dataVisualization, setDataVisualization] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your dashboard preferences and access control</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg bg-primary text-primary-foreground flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-background hover:bg-background/80 text-foreground flex items-center gap-2 transition-colors">
                <Lock className="w-4 h-4" />
                Privacy & Security
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-background hover:bg-background/80 text-foreground flex items-center gap-2 transition-colors">
                <Users className="w-4 h-4" />
                User Management
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-background hover:bg-background/80 text-foreground flex items-center gap-2 transition-colors">
                <Eye className="w-4 h-4" />
                Display Preferences
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notifications Section */}
            <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notification Preferences
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/30">
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/30">
                  <div>
                    <p className="font-medium text-foreground">Escalation Alerts</p>
                    <p className="text-sm text-muted-foreground">Immediate notifications for critical issues</p>
                  </div>
                  <Switch checked={escalationAlerts} onCheckedChange={setEscalationAlerts} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/30">
                  <div>
                    <p className="font-medium text-foreground">Weekly Performance Reports</p>
                    <p className="text-sm text-muted-foreground">Get weekly summaries every Monday</p>
                  </div>
                  <Switch checked={weeklyReports} onCheckedChange={setWeeklyReports} />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/30">
                <h3 className="font-semibold text-foreground mb-3">Email Delivery Time</h3>
                <select className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>9:00 AM (UTC)</option>
                  <option>12:00 PM (UTC)</option>
                  <option>3:00 PM (UTC)</option>
                  <option>6:00 PM (UTC)</option>
                  <option>9:00 PM (UTC)</option>
                </select>
              </div>
            </div>

            {/* Display Preferences Section */}
            <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Eye className="w-5 h-5 text-secondary" />
                Display Preferences
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/30">
                  <div>
                    <p className="font-medium text-foreground">Enable Data Visualization</p>
                    <p className="text-sm text-muted-foreground">Show charts and graphs on dashboard</p>
                  </div>
                  <Switch checked={dataVisualization} onCheckedChange={setDataVisualization} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/30">
                  <div>
                    <p className="font-medium text-foreground">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Use dark theme (currently enabled)</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} disabled />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/30">
                <h3 className="font-semibold text-foreground mb-3">Items Per Page</h3>
                <select className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>10 items</option>
                  <option>25 items</option>
                  <option>50 items</option>
                  <option>100 items</option>
                </select>
              </div>
            </div>

            {/* Access Control Section */}
            <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-destructive" />
                Privacy & Security
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">Enabled</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">Session Timeout</p>
                      <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                    </div>
                  </div>
                  <select className="w-full mt-2 px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>Never</option>
                  </select>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <p className="font-medium text-foreground mb-3">Data Export</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Download Personal Data
                  </Button>
                </div>
              </div>
            </div>

            {/* Save Changes */}
            <div className="flex gap-4">
              <Button className="flex-1">Save Changes</Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
