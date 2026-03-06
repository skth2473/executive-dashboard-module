'use client';

import { LayoutDashboard, Building2, TrendingUp, Microscope, Calendar, Trophy, Users, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/', active: pathname === '/' },
    { icon: Building2, label: 'Cluster Overview', href: '/cluster-overview' },
    { icon: TrendingUp, label: 'Academic Performance', href: '/academic-performance' },
    { icon: Microscope, label: 'Research Projects', href: '/research-projects' },
    { icon: Calendar, label: 'Events', href: '/events' },
    { icon: Trophy, label: 'Competitions', href: '/competitions' },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-gradient-to-b from-sidebar to-sidebar/95 border-r border-sidebar-border/50 flex flex-col`}>
      <div className="flex h-20 items-center justify-between px-4 border-b border-sidebar-border/50 bg-gradient-to-r from-primary/10 to-transparent">
        {isOpen && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">LAH</span>
            </div>
            <div>
              <span className="font-bold text-sm text-sidebar-foreground block">Executive</span>
              <span className="text-xs text-sidebar-foreground/70">Dashboard</span>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 py-6 px-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                isActive
                  ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-primary'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
              {isOpen && <span className="text-sm font-semibold">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border/50 p-2 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-primary transition-all duration-300 group">
          <Settings className="w-5 h-5 flex-shrink-0 group-hover:rotate-90 transition-transform duration-300" />
          {isOpen && <span className="text-sm font-medium">Settings</span>}
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-red-50/50 hover:text-red-600 transition-all duration-300 group">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}
