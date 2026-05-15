import React from 'react';
import { MessageCircle } from 'lucide-react';
import { AbandonedCart, MessageTemplate } from '../../types';
import { buildWhatsAppUrl } from '../../lib/whatsapp';
import { cn } from '../../lib/utils';

interface WhatsAppButtonProps {
  cart: AbandonedCart;
  template: MessageTemplate;
  onContact: () => void;
}

export default function WhatsAppButton({ cart, template, onContact }: WhatsAppButtonProps) {
  const handleContact = () => {
    const variables = {
      '{nome}': cart.customer.name.split(' ')[0],
      '{produto}': cart.product_name,
      '{valor}': cart.value.toFixed(2),
      '{link}': cart.cart_url || 'https://sualoja.com/carrinho',
    };

    const url = buildWhatsAppUrl(cart.customer.phone, template.body, variables);
    window.open(url, '_blank');
    onContact();
  };

  return (
    <button
      onClick={handleContact}
      className={cn(
        "flex items-center gap-2 px-4 py-2 bg-[#25d366] text-white rounded-xl font-bold text-sm",
        "hover:bg-[#1ebe57] transition-all shadow-sm hover:shadow-md active:scale-95 shrink-0"
      )}
    >
      <MessageCircle className="w-4 h-4 fill-current" />
      <span>Recuperar</span>
    </button>
  );
}
