import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { StatusCount } from '../../types';

interface StatusBreakdownProps {
  data: StatusCount[];
}

export default function StatusBreakdown({ data }: StatusBreakdownProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm h-full">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Leads por Temperatura</h4>
      
      <div className="space-y-6">
        {data.map((item) => {
          const total = data.reduce((acc, curr) => acc + curr.count, 0);
          const percentage = (item.count / total) * 100;
          
          return (
            <div key={item.status}>
              <div className="flex justify-between text-xs mb-1.5 font-bold">
                <span className="text-slate-700 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.label}
                </span>
                <span className="text-slate-900">{item.count}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ 
                    backgroundColor: item.color,
                    width: `${percentage}%` 
                  }} 
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total de Leads</span>
          <span className="text-lg font-bold text-brand-primary">
            {data.reduce((acc, curr) => acc + curr.count, 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
