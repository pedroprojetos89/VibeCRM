import React from 'react';
import { CartStatus } from '../../types';
import { cn } from '../../lib/utils';

interface StatusTabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
  counts: Record<string, number>;
}

const tabs = [
  { key: 'all', label: 'Todos', emoji: '📋' },
  { key: 'hot', label: 'Quente', emoji: '🔴' },
  { key: 'warm', label: 'Morno', emoji: '🟡' },
  { key: 'cold', label: 'Frio', emoji: '🔵' },
  { key: 'contacted', label: 'Contatados', emoji: '✅' },
];

export default function StatusTabs({ activeTab, onChange, counts }: StatusTabsProps) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto pb-px">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={cn(
              "flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 relative whitespace-nowrap",
              isActive 
                ? "text-brand-primary" 
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            )}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
            <span className={cn(
              "px-2 py-0.5 rounded-full text-[10px] font-bold",
              isActive ? "bg-brand-primary/10 text-brand-primary" : "bg-slate-100 text-slate-500"
            )}>
              {counts[tab.key] || 0}
            </span>
            
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
