import { mockAbandonedCarts, mockActivityLog } from '../lib/mock-data';
import { AbandonedCart, CartStatus } from '../types';

export const recoveryService = {
  getAbandonedCarts: async (status?: string): Promise<AbandonedCart[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    if (!status || status === 'all') return mockAbandonedCarts;
    return mockAbandonedCarts.filter(c => c.status === status);
  },

  markAsContacted: async (cartId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const cart = mockAbandonedCarts.find(c => c.id === cartId);
    if (cart && cart.status !== 'recovered' && cart.status !== 'lost') {
      cart.status = 'contacted';
      cart.last_contacted_at = new Date().toISOString();
      cart.contact_attempts += 1;
      
      // Log activity
      mockActivityLog.unshift({
        id: Math.random().toString(36).substring(2),
        type: 'message_sent',
        customer_id: cart.customer_id,
        customer_name: cart.customer.name,
        abandoned_cart_id: cart.id,
        description: `Mensagem de recuperação enviada para ${cart.customer.name}`,
        created_at: new Date().toISOString()
      });
    }
  },

  updateCartStatus: async (cartId: string, status: CartStatus): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const cart = mockAbandonedCarts.find(c => c.id === cartId);
    if (cart) {
      cart.status = status;
    }
  }
};
