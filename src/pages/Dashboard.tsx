import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboard.service';
import { DashboardMetrics, ChartDataPoint, StatusCount, ActivityLogEntry, Period } from '../types';
import PeriodFilter from '../components/dashboard/PeriodFilter';
import MetricsRow from '../components/dashboard/MetricsRow';
import SalesChart from '../components/dashboard/SalesChart';
import StatusBreakdown from '../components/dashboard/StatusBreakdown';
import RecentActivity from '../components/dashboard/RecentActivity';
import { motion } from 'motion/react';

export default function Dashboard() {
  const [period, setPeriod] = useState<Period>('30d');
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [statusData, setStatusData] = useState<StatusCount[]>([]);
  const [activities, setActivities] = useState<ActivityLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const [m, c, s, a] = await Promise.all([
      dashboardService.getMetrics(period),
      dashboardService.getSalesChartData(period),
      dashboardService.getStatusBreakdown(),
      dashboardService.getRecentActivity()
    ]);
    setMetrics(m);
    setChartData(c);
    setStatusData(s);
    setActivities(a);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [period]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col flex-1"
    >
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Visão Geral</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500">Filtrar:</span>
          <PeriodFilter value={period} onChange={setPeriod} />
        </div>
      </header>

      <div className="p-8 space-y-8 max-w-[1400px]">
        <MetricsRow metrics={metrics} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SalesChart data={chartData} />
          </div>
          <div>
            <StatusBreakdown data={statusData} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <RecentActivity activities={activities} />
          </div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-brand-primary p-10 rounded-2xl text-white relative overflow-hidden group shadow-xl shadow-brand-primary/20"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl transition-all group-hover:bg-white/20" />
            <h2 className="text-3xl font-display font-bold mb-4 relative z-10 leading-tight">Melhore sua taxa de conversão agora.</h2>
            <p className="text-white/80 font-medium mb-8 relative z-10">Use nossos templates otimizados para reconquistar seus clientes via WhatsApp.</p>
            <button className="bg-white text-zinc-950 px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 relative z-10">
              Ver Recuperação
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
