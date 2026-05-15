import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  delta?: string | number;
  isPositive?: boolean;
  className?: string;
}

export default function MetricCard({ label, value, icon: Icon, delta, isPositive, className }: MetricCardProps) {
  const iconColors = isPositive === undefined 
    ? "bg-indigo-50 text-indigo-600"
    : isPositive 
      ? "bg-emerald-50 text-emerald-600" 
      : "bg-red-50 text-red-600";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow", className)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", iconColors)}>
          <Icon className="w-5 h-5" />
        </div>
        {delta !== undefined && (
          <span className={cn(
            "text-xs font-bold",
            isPositive ? "text-emerald-500" : "text-rose-500"
          )}>
            {typeof delta === 'number' && (isPositive ? '+' : '')}
            {delta}{typeof delta === 'number' ? '%' : ''}
          </span>
        )}
      </div>
      
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-slate-900 leading-none">{value}</h3>
    </motion.div>
  );
}
