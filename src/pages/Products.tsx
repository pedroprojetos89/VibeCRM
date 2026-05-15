import React, { useState } from 'react';
import { motion } from 'motion/react';
import { mockProducts } from '../lib/mock-data';
import { formatCurrency } from '../lib/utils';
import { Search, ExternalLink, Package } from 'lucide-react';

export default function Products() {
  const [search, setSearch] = useState('');

  const filteredProducts = mockProducts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8 p-8"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Produtos</h1>
          <p className="text-slate-400 mt-1">Catálogo de produtos e links de checkout.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <motion.div 
            key={product.id}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-full"
          >
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{product.name}</h3>
            <span className="text-lg font-extrabold text-emerald-600 mb-4">{formatCurrency(product.price)}</span>
            <p className="text-sm text-slate-500 mb-6 flex-1">{product.description}</p>
            
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Links de Checkout</h4>
              {product.checkout_links.length > 0 ? (
                <div className="space-y-2">
                  {product.checkout_links.map((link, idx) => (
                     <a 
                       key={idx}
                       href={link}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-sm hover:bg-brand-primary/5 hover:text-brand-primary transition-all group border border-transparent hover:border-brand-primary/20"
                     >
                       <span className="truncate font-medium text-slate-600 group-hover:text-brand-primary">Link {idx + 1}</span>
                       <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-primary" />
                     </a>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Nenhum link configurado.</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
