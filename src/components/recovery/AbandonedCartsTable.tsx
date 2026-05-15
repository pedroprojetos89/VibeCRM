import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AbandonedCart, MessageTemplate } from '../../types';
import { formatCurrency, formatPhone } from '../../lib/utils';
import Avatar from '../ui/Avatar';
import StatusTag from '../ui/StatusTag';
import WhatsAppButton from './WhatsAppButton';

interface AbandonedCartsTableProps {
  carts: AbandonedCart[];
  template: MessageTemplate | null;
  onContact: (cartId: string) => void;
}

export default function AbandonedCartsTable({ carts, template, onContact }: AbandonedCartsTableProps) {
  if (carts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <span className="text-3xl">🏜️</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800">Nenhum rastro encontrado</h3>
        <p className="text-sm text-slate-500 max-w-xs mt-1">
          Não há carrinhos abandonados nesta categoria no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">
            <th className="px-6 py-2">Cliente</th>
            <th className="px-6 py-2">Produto</th>
            <th className="px-6 py-2">Valor</th>
            <th className="px-6 py-2">Abandono</th>
            <th className="px-6 py-2">Status</th>
            <th className="px-6 py-2">Ação</th>
          </tr>
        </thead>
        <tbody>
          {carts.map((cart) => (
            <tr key={cart.id} className="bg-white group transition-all duration-200">
              <td className="px-6 py-4 first:rounded-l-2xl border-y border-l border-slate-100 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.02]">
                <div className="flex items-center gap-3">
                  <Avatar name={cart.customer.name} />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{cart.customer.name}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{formatPhone(cart.customer.phone)}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 border-y border-slate-100 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.02]">
                <span className="text-sm text-slate-600 font-medium block max-w-[200px] truncate">
                  {cart.product_name}
                </span>
              </td>
              <td className="px-6 py-4 border-y border-slate-100 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.02]">
                <span className="text-sm font-bold text-slate-900">{formatCurrency(cart.value)}</span>
              </td>
              <td className="px-6 py-4 border-y border-slate-100 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.02]">
                <span className="text-xs text-slate-500 font-medium">
                  {formatDistanceToNow(new Date(cart.abandoned_at), { addSuffix: true, locale: ptBR })}
                </span>
              </td>
              <td className="px-6 py-4 border-y border-slate-100 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.02]">
                <StatusTag status={cart.status} />
              </td>
              <td className="px-6 py-4 last:rounded-r-2xl border-y border-r border-slate-100 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.02]">
                {template && (
                  <WhatsAppButton 
                    cart={cart} 
                    template={template} 
                    onContact={() => onContact(cart.id)} 
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
