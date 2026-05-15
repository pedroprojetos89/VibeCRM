import React, { useState } from 'react';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { mockOrders } from '../lib/mock-data';
import { formatCurrency } from '../lib/utils';
import Avatar from '../components/ui/Avatar';
import { Search } from 'lucide-react';

export default function Sales() {
  const [search, setSearch] = useState('');

  const filteredOrders = mockOrders.filter(o => 
    o.customer?.name.toLowerCase().includes(search.toLowerCase()) ||
    o.product_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8 p-8"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Vendas</h1>
          <p className="text-slate-400 mt-1">Histórico completo de transações e comissões.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Buscar vendas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium"
          />
        </div>
      </header>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                <th className="px-6 py-2">Data/Hora</th>
                <th className="px-6 py-2">Cliente</th>
                <th className="px-6 py-2">Produto</th>
                <th className="px-6 py-2">Valor Líquido</th>
                <th className="px-6 py-2">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="bg-white group transition-all duration-200">
                  <td className="px-6 py-4 first:rounded-l-2xl border-y border-l border-slate-100 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.02]">
                    <span className="text-sm text-slate-600 font-medium">
                      {format(new Date(order.ordered_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-y border-slate-100 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.02]">
                    <div className="flex items-center gap-3">
                      <Avatar name={order.customer?.name || 'Cliente'} />
                      <div>
                        <p className="text-sm font-bold text-slate-900">{order.customer?.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{order.customer?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-y border-slate-100 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.02]">
                    <span className="text-sm text-slate-600 font-medium block max-w-[200px] truncate">
                      {order.product_name}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-y border-slate-100 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.02]">
                    <span className="text-sm font-bold text-emerald-600">{formatCurrency(order.net_value || order.value * 0.9)}</span>
                  </td>
                  <td className="px-6 py-4 last:rounded-r-2xl border-y border-r border-slate-100 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.02]">
                    {order.recovered ? (
                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 uppercase tracking-widest">Recuperada</span>
                    ) : (
                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 uppercase tracking-widest">Direta</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
