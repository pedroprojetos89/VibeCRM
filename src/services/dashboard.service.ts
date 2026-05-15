import { 
  mockAbandonedCarts, 
  mockOrders, 
  mockActivityLog, 
  getSalesChartData,
  getStatusBreakdown 
} from '../lib/mock-data';
import { DashboardMetrics, Period } from '../types';
import { subDays, isAfter } from 'date-fns';

const USE_MOCK = true; // Hardcoded for now as per user request

export const dashboardService = {
  getMetrics: async (period: Period): Promise<DashboardMetrics> => {
    // Simulated DB call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const days = period === 'today' ? 1 : period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const cutoff = subDays(new Date(), days);
    
    const periodOrders = mockOrders.filter(o => isAfter(new Date(o.ordered_at), cutoff));
    const periodCarts = mockAbandonedCarts.filter(c => isAfter(new Date(c.abandoned_at), cutoff));
    
    const totalSales = periodOrders.reduce((acc, curr) => acc + curr.value, 0);
    const abandonedCarts = periodCarts.filter(c => c.status !== 'recovered').length;
    const abandonedValue = periodCarts.filter(c => c.status !== 'recovered').reduce((acc, curr) => acc + curr.value, 0);
    
    const recoveredCarts = periodCarts.filter(c => c.status === 'recovered').length;
    const recoveredValue = periodCarts.filter(c => c.status === 'recovered').reduce((acc, curr) => acc + curr.value, 0);
    
    const totalAbandonedTotal = periodCarts.length || 1;
    const recoveryRate = (recoveredCarts / totalAbandonedTotal) * 100;

    return {
      totalSales,
      totalSalesDelta: 12.5, // Mocked delta
      abandonedCarts,
      abandonedValue,
      recoveredCarts,
      recoveredValue,
      recoveryRate,
      recoveryRateDelta: 2.1, // Mocked delta
    };
  },

  getSalesChartData: async (period: Period) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const days = period === 'today' ? 1 : period === '7d' ? 7 : period === '30d' ? 30 : 90;
    return getSalesChartData(days);
  },

  getStatusBreakdown: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return getStatusBreakdown();
  },

  getRecentActivity: async (limit: number = 6) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockActivityLog.slice(0, limit);
  }
};
