'use client';

import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const departmentData = [
  { name: 'Engineering', performance: 92, target: 90 },
  { name: 'Science', performance: 88, target: 85 },
  { name: 'Commerce', performance: 85, target: 80 },
  { name: 'Liberal Arts', performance: 90, target: 88 },
  { name: 'Law', performance: 86, target: 82 },
  { name: 'Medicine', performance: 94, target: 92 },
];

const attendanceData = [
  { month: 'Jan', attendance: 92, target: 85 },
  { month: 'Feb', attendance: 91, target: 85 },
  { month: 'Mar', attendance: 89, target: 85 },
  { month: 'Apr', attendance: 90, target: 85 },
  { month: 'May', attendance: 88, target: 85 },
  { month: 'Jun', attendance: 87, target: 85 },
];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Department Performance */}
      <Card className="p-8 bg-gradient-to-br from-card to-card/95 border border-border/50 shadow-md hover:shadow-lg transition-all">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            <h3 className="text-lg font-semibold text-foreground">Department-wise Performance</h3>
          </div>
          <p className="text-sm text-muted-foreground">Academic excellence metrics by department</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem'
              }}
            />
            <Legend />
            <Bar dataKey="performance" fill="#1f3a5f" radius={[8, 8, 0, 0]} />
            <Bar dataKey="target" fill="#0ea5e9" opacity={0.5} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Attendance Trends */}
      <Card className="p-8 bg-gradient-to-br from-card to-card/95 border border-border/50 shadow-md hover:shadow-lg transition-all">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1 h-6 bg-accent rounded-full"></span>
            <h3 className="text-lg font-semibold text-foreground">Attendance Trends</h3>
          </div>
          <p className="text-sm text-muted-foreground">Monthly attendance analysis across all students</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="attendance" 
              stroke="#1f3a5f" 
              strokeWidth={2}
              dot={{ fill: '#1f3a5f', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#0ea5e9" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#0ea5e9', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
