'use client'

import React, { useEffect, useState } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

interface KPICardProps {
  title: string
  value: number
  target: number
  change: number
  isPositive: boolean
  icon: LucideIcon
}

export function KPICard({ title, value, target, change, isPositive, icon: Icon }: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let animationFrame: number
    const startTime = Date.now()
    const duration = 1500

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      setDisplayValue(Math.floor(value * progress))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value])

  const percentage = (displayValue / target) * 100

  return (
    <div className="group relative bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 hover:border-primary/20 p-6 transition-all duration-300 overflow-hidden">
      {/* Glassmorphism effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{displayValue.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">/ {target.toLocaleString()}</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4 h-2 bg-background rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        {/* Change indicator */}
        <div className="flex items-center gap-1 text-sm">
          {isPositive ? (
            <>
              <ArrowUp className="w-4 h-4 text-accent" />
              <span className="text-accent font-medium">{change}%</span>
            </>
          ) : (
            <>
              <ArrowDown className="w-4 h-4 text-destructive" />
              <span className="text-destructive font-medium">{change}%</span>
            </>
          )}
          <span className="text-muted-foreground">vs last month</span>
        </div>
      </div>
    </div>
  )
}
