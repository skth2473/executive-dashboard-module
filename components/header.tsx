'use client';

import { Bell, User, ChevronDown, Settings } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="h-20 bg-gradient-to-r from-card to-card border-b border-border/50 flex items-center justify-between px-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Engineering Cluster Dashboard
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Chandigarh University Engineering Division</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2.5 hover:bg-secondary rounded-lg transition-all duration-300 group">
          <Bell className="w-5 h-5 text-foreground group-hover:text-primary" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 hover:bg-secondary transition-all duration-300 px-3 py-2 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                <span className="text-sm font-bold text-primary-foreground">SA</span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-foreground">Prof. Sachin Ahuja</p>
                <p className="text-xs text-muted-foreground">Executive Director</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 shadow-lg border border-border/50">
            <div className="px-4 py-3 border-b border-border/50">
              <p className="font-semibold text-foreground">Prof. Sachin Ahuja</p>
              <p className="text-xs text-muted-foreground">Executive Director, Engineering Cluster</p>
            </div>
            <DropdownMenuItem className="cursor-pointer hover:bg-secondary">
              <User className="w-4 h-4 mr-2" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-secondary">
              <Settings className="w-4 h-4 mr-2" />
              <span>Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive hover:bg-red-50">
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
