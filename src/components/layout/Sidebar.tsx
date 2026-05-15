import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Settings, Zap, Receipt, Users, Package, BadgeCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, route: '/' },
  { label: 'Vendas', icon: Receipt, route: '/sales' },
  { label: 'Recuperação', icon: ShoppingCart, route: '/recovery' },
  { label: 'Clientes', icon: Users, route: '/customers' },
  { label: 'Produtos', icon: Package, route: '/products' },
  { label: 'Vendedores', icon: BadgeCheck, route: '/sellers' },
  { label: 'Configurações', icon: Settings, route: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-[220px] bg-zinc-950 text-white flex flex-col h-screen fixed left-0 top-0 z-50 shadow-2xl">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
          <Zap className="w-5 h-5 fill-current" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight text-white">
          VibeCRM
        </span>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.route}
            to={item.route}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium",
                isActive 
                  ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )
            }
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6">
        <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Mock Active</span>
            <span className="text-[9px] text-emerald-500/60 font-medium">Supabase offline</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
