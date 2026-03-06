'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: number;
  onClick?: () => void;
  variant?: 'blue' | 'green' | 'orange' | 'purple' | 'pink';
}

const variantClasses = {
  blue: 'bg-gradient-to-br from-blue-50 to-blue-50/50 border-blue-200/50 hover:border-blue-300',
  green: 'bg-gradient-to-br from-green-50 to-green-50/50 border-green-200/50 hover:border-green-300',
  orange: 'bg-gradient-to-br from-orange-50 to-orange-50/50 border-orange-200/50 hover:border-orange-300',
  purple: 'bg-gradient-to-br from-purple-50 to-purple-50/50 border-purple-200/50 hover:border-purple-300',
  pink: 'bg-gradient-to-br from-pink-50 to-pink-50/50 border-pink-200/50 hover:border-pink-300',
};

export function MetricCard({ title, value, icon, trend, onClick, variant = 'blue' }: MetricCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`p-6 border cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 hover:-translate-y-1 ${variantClasses[variant]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <div className="text-muted-foreground/40 opacity-60">{icon}</div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{trend > 0 ? '+' : ''}{trend}% from last month</span>
          </div>
        )}
      </div>
    </Card>
  );
}
