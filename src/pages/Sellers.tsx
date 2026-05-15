import React, { useState } from 'react';
import { motion } from 'motion/react';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { mockSellers } from '../lib/mock-data';
import { formatPhone } from '../lib/utils';
import Avatar from '../components/ui/Avatar';
import { Search } from 'lucide-react';

export default function Sellers() {
  const [search, setSearch] = useState('');

  const filteredSellers = mockSellers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8 p-8"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Vendedores</h1>
          <p className="text-slate-400 mt-1">Gerencie a equipe de vendas e recuperação.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Buscar vendedores..."
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
                <th className="px-6 py-2">Vendedor</th>
                <th className="px-6 py-2">Telefone</th>
                <th className="px-6 py-2">Ativo Desde</th>
                <th className="px-6 py-2">Última Atividade</th>
              </tr>
            </thead>
            <tbody>
              {filteredSellers.map((seller) => (
                <tr key={seller.id} className="bg-white group transition-all duration-200">
                  <td className="px-6 py-4 first:rounded-l-2xl border-y border-l border-slate-100 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.02]">
                    <div className="flex items-center gap-3">
                      <Avatar name={seller.name} />
                      <div>
                        <p className="text-sm font-bold text-slate-900">{seller.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{seller.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-y border-slate-100 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.02]">
                    <span className="text-sm text-slate-600 font-medium">
                      {formatPhone(seller.phone)}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-y border-slate-100 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.02]">
                    <span className="text-sm text-slate-600 font-medium">
                      {format(new Date(seller.active_since), "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </td>
                  <td className="px-6 py-4 last:rounded-r-2xl border-y border-r border-slate-100 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.02]">
                    <span className="text-sm text-slate-600 font-medium">
                      {formatDistanceToNow(new Date(seller.last_activity), { addSuffix: true, locale: ptBR })}
                    </span>
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
