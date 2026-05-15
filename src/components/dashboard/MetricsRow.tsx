import React from 'react';
import { Receipt, ShoppingCart, RefreshCw, Percent } from 'lucide-react';
import { DashboardMetrics } from '../../types';
import { formatCurrency } from '../../lib/utils';
import MetricCard from '../ui/MetricCard';

interface MetricsRowProps {
  metrics: DashboardMetrics | null;
}

export default function MetricsRow({ metrics }: MetricsRowProps) {
  if (!metrics) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-32 bg-white rounded-2xl animate-pulse border border-slate-100" />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        label="Vendas totais"
        value={formatCurrency(metrics.totalSales)}
        icon={Receipt}
        delta={12.5}
        isPositive={true}
      />
      <MetricCard
        label="Carrinhos abandonados"
        value={metrics.abandonedCarts}
        icon={ShoppingCart}
        delta={formatCurrency(metrics.abandonedValue)}
        isPositive={false}
      />
      <MetricCard
        label="Recuperados"
        value={metrics.recoveredCarts}
        icon={RefreshCw}
        delta={formatCurrency(metrics.recoveredValue)}
        isPositive={true}
      />
      <MetricCard
        label="Taxa de recuperação"
        value={`${metrics.recoveryRate.toFixed(1)}%`}
        icon={Percent}
        delta={2.1}
        isPositive={true}
      />
    </div>
  );
}
