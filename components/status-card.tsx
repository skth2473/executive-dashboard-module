'use client';

import React from "react"
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string | number;
  status: 'green' | 'yellow' | 'red';
  trend?: number;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function StatusCard({ title, value, status, trend, icon, onClick }: StatusCardProps) {
  const statusColors = {
    green: 'bg-green-50 border-l-4 border-l-green-500',
    yellow: 'bg-yellow-50 border-l-4 border-l-yellow-500',
    red: 'bg-red-50 border-l-4 border-l-red-500',
  };

  const statusIndicatorColors = {
    green: 'w-2 h-2 bg-green-500',
    yellow: 'w-2 h-2 bg-yellow-500',
    red: 'w-2 h-2 bg-red-500',
  };

  return (
    <Card 
      onClick={onClick}
      className={`p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 ${statusColors[status]} ${onClick ? 'cursor-pointer hover:-translate-y-1 hover:scale-105' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm text-muted-foreground font-semibold tracking-wide uppercase">{title}</p>
            <div className={`${statusIndicatorColors[status]} rounded-full animate-pulse`}></div>
          </div>
          <p className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3">{value}</p>
          {trend !== undefined && (
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg w-fit ${
              trend > 0 ? 'bg-green-100/60' : 'bg-red-100/60'
            }`}>
              {trend > 0 ? (
                <TrendingUp className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-red-600" />
              )}
              <span className={`text-xs font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            </div>
          )}
        </div>
        <div className={`text-primary/20 transition-all duration-300 group ${onClick ? 'group-hover:text-primary/40' : ''}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
