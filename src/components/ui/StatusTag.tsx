import React from 'react';
import { CartStatus } from '../../types';
import { cn } from '../../lib/utils';

interface StatusTagProps {
  status: CartStatus;
  className?: string;
}

const statusConfig: Record<CartStatus, { label: string; bg: string; text: string; emoji: string }> = {
  hot: { label: 'Quente', bg: 'bg-rose-50', text: 'text-rose-600', emoji: '🔴' },
  warm: { label: 'Morno', bg: 'bg-amber-50', text: 'text-amber-600', emoji: '🟡' },
  cold: { label: 'Frio', bg: 'bg-blue-50', text: 'text-blue-600', emoji: '🔵' },
  contacted: { label: 'Contatado', bg: 'bg-emerald-50', text: 'text-emerald-600', emoji: '✅' },
  recovered: { label: 'Recuperado', bg: 'bg-emerald-50', text: 'text-emerald-600', emoji: '💰' },
  lost: { label: 'Perdido', bg: 'bg-slate-50', text: 'text-slate-500', emoji: '✖️' },
};

export default function StatusTag({ status, className }: StatusTagProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
      config.bg,
      config.text,
      className
    )}>
      <span>{config.emoji}</span>
      {config.label}
    </span>
  );
}
