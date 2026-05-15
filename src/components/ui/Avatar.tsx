import React from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Avatar({ name, size = 'md', className }: AvatarProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const sizes = {
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-12 h-12 text-sm',
  };

  return (
    <div className={cn(
      "rounded-2xl bg-brand-primary/10 text-brand-primary font-bold flex items-center justify-center shrink-0 border border-brand-primary/20",
      sizes[size],
      className
    )}>
      {initials}
    </div>
  );
}
