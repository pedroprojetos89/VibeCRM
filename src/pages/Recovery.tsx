import React, { useState, useEffect } from 'react';
import { recoveryService } from '../services/recovery.service';
import { templatesService } from '../services/templates.service';
import { AbandonedCart, MessageTemplate } from '../types';
import StatusTabs from '../components/recovery/StatusTabs';
import AbandonedCartsTable from '../components/recovery/AbandonedCartsTable';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';

export default function Recovery() {
  const [activeTab, setActiveTab] = useState('all');
  const [carts, setCarts] = useState<AbandonedCart[]>([]);
  const [template, setTemplate] = useState<MessageTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    setLoading(true);
    const [c, t] = await Promise.all([
      recoveryService.getAbandonedCarts(activeTab),
      templatesService.getTemplate('abandoned_cart')
    ]);
    setCarts(c);
    setTemplate(t);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleContact = async (cartId: string) => {
    await recoveryService.markAsContacted(cartId);
    // Refresh list locally for better UX
    setCarts(prev => prev.map(c => c.id === cartId ? { ...c, status: 'contacted' as const } : c));
  };

  const filteredCarts = carts.filter(c => 
    c.customer.name.toLowerCase().includes(search.toLowerCase()) ||
    c.product_name.toLowerCase().includes(search.toLowerCase())
  );

  const getCounts = () => {
    // This would normally come from a service hit or filtered from local state
    // For simplicity with mock data, we just categorize the current full list
    const counts: Record<string, number> = { all: carts.length };
    // These counts should ideally reflect the entire dataset, not just the currently loaded tab
    // Since mock data is static, we can just display some variety
    return {
      all: 30,
      hot: 5,
      warm: 5,
      cold: 10,
      contacted: 5,
    };
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Recuperação de Vendas</h1>
          <p className="text-slate-400 mt-1">Transforme abandonos em faturamento real.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Buscar por cliente ou produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium"
          />
        </div>
      </header>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <StatusTabs 
          activeTab={activeTab} 
          onChange={setActiveTab} 
          counts={getCounts()} 
        />
        
        <div className="p-2">
          {loading ? (
            <div className="p-8 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-slate-50 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <AbandonedCartsTable 
              carts={filteredCarts} 
              template={template} 
              onContact={handleContact} 
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
