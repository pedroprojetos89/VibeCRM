import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ShoppingCart, MessageSquare, CheckCircle2, Clock, Package } from 'lucide-react';
import { ActivityLogEntry } from '../../types';
import { cn } from '../../lib/utils';

interface RecentActivityProps {
  activities: ActivityLogEntry[];
}

const iconMap = {
  cart_abandoned: { icon: ShoppingCart, color: 'text-rose-500', bg: 'bg-rose-50' },
  message_sent: { icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-50' },
  cart_recovered: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  followup_scheduled: { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
  order_placed: { icon: Package, color: 'text-emerald-500', bg: 'bg-emerald-50' },
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm h-full">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Atividades Recentes</h4>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const config = iconMap[activity.type] || iconMap.followup_scheduled;
          const bulletColor = config.color.replace('text-', 'bg-');
          
          return (
            <div key={activity.id} className="flex items-center gap-3">
              <div className={cn("w-2 h-2 rounded-full shrink-0", bulletColor)} />
              
              <p className="flex-1 text-xs text-slate-600 truncate">
                {activity.description.split(activity.customer_name || '').map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i === 0 && activity.customer_name && (
                      <span className="font-bold text-slate-900">{activity.customer_name}</span>
                    )}
                  </React.Fragment>
                ))}
              </p>
              
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true, locale: ptBR })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
