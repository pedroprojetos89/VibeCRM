import React from 'react';
import { Period } from '../../types';
import { cn } from '../../lib/utils';

interface PeriodFilterProps {
  value: Period;
  onChange: (value: Period) => void;
}

const options: { label: string; value: Period }[] = [
  { label: 'Hoje', value: 'today' },
  { label: '7 Dias', value: '7d' },
  { label: '30 Dias', value: '30d' },
  { label: '90 Dias', value: '90d' },
];

export default function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  return (
    <div className="flex bg-slate-100 p-1 rounded-lg gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "px-3 py-1 text-xs font-bold transition-all duration-200 rounded-md",
            value === option.value 
              ? "bg-white shadow-sm text-slate-800" 
              : "text-slate-400 hover:text-slate-600"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
