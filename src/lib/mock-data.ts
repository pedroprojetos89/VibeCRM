import { subDays, startOfDay, format, isSameDay } from 'date-fns';
import { 
  Customer, 
  AbandonedCart, 
  Order, 
  MessageTemplate, 
  ActivityLogEntry,
  ChartDataPoint,
  StatusCount
} from '../types';

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// 1. Customers
export const mockCustomers: Customer[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `cust-${i}`,
  name: [
    'João Silva', 'Maria Oliveira', 'Pedro Santos', 'Ana Costa', 'Lucas Pereira',
    'Julia Rodrigues', 'Gabriel Almeida', 'Beatriz Carvalho', 'Mateus Ferreira', 'Carla Souza',
    'Bruno Gomes', 'Camila Santos', 'Felipe Lima', 'Larissa Duarte', 'Thiago Rocha',
    'Fernanda Castro', 'Diego Neves', 'Priscila Mendes', 'Vitor Barbosa', 'Isabela Viana'
  ][i],
  phone: `55119${Math.floor(10000000 + Math.random() * 90000000)}`,
  email: `cliente${i}@exemplo.com.br`,
  created_at: subDays(new Date(), Math.floor(Math.random() * 60)).toISOString(),
}));

// 2. Message Templates
export const mockTemplates: MessageTemplate[] = [
  {
    id: 'tmpl-1',
    type: 'abandoned_cart',
    label: 'Carrinho abandonado',
    body: 'Olá, {nome}! 👋 Notamos que você deixou itens no seu carrinho. Seu pedido de {produto} no valor de R$ {valor} ainda está reservado por tempo limitado. Finalize agora: {link} 🛒',
    available_variables: ['{nome}', '{produto}', '{valor}', '{link}'],
    updated_at: new Date().toISOString(),
  },
  {
    id: 'tmpl-2',
    type: 'welcome',
    label: 'Boas-vindas',
    body: 'Olá, {nome}! Seja bem-vindo(a)! 🎉 Ficamos felizes em ter você aqui. Explore nosso catálogo: {link}',
    available_variables: ['{nome}', '{link}'],
    updated_at: new Date().toISOString(),
  },
  {
    id: 'tmpl-3',
    type: 'followup',
    label: 'Follow-up',
    body: 'Oi, {nome}! 😊 Passando para ver se você teve alguma dúvida sobre {produto}. Estou aqui para ajudar! Seu carrinho ainda está salvo: {link}',
    available_variables: ['{nome}', '{produto}', '{link}'],
    updated_at: new Date().toISOString(),
  },
  {
    id: 'tmpl-4',
    type: 'promotion',
    label: 'Promoção',
    body: '🔥 {nome}, oferta especial para você! Seu carrinho com {produto} agora com {desconto}% de desconto. Válido só por 24h! Aproveite: {link} ⏰',
    available_variables: ['{nome}', '{produto}', '{valor}', '{desconto}', '{link}'],
    updated_at: new Date().toISOString(),
  }
];

// 3. Abandoned Carts
const products = [
  'Curso Reels Pro', 'E-book Dieta Low Carb', 'Mentoria de Vendas XP', 
  'Pack de Templates Canva', 'Imersão Tráfego Pago'
];

export const mockAbandonedCarts: AbandonedCart[] = Array.from({ length: 30 }).map((_, i) => {
  const customer = mockCustomers[Math.floor(Math.random() * mockCustomers.length)];
  const abandonedDaysAgo = Math.random() * 30;
  const status: any[] = ['hot', 'warm', 'cold', 'contacted', 'recovered', 'lost'];
  const currentStatus = i < 5 ? 'hot' : i < 10 ? 'warm' : i < 15 ? 'contacted' : i < 20 ? 'recovered' : 'cold';
  
  return {
    id: `cart-${i}`,
    customer_id: customer.id,
    customer: customer,
    product_name: products[Math.floor(Math.random() * products.length)],
    value: 97 + Math.floor(Math.random() * 900),
    cart_url: 'https://pay.hotmart.com/checkout?c=RECOVER',
    status: currentStatus as any,
    abandoned_at: subDays(new Date(), abandonedDaysAgo).toISOString(),
    contact_attempts: Math.floor(Math.random() * 3),
    created_at: subDays(new Date(), abandonedDaysAgo).toISOString(),
  };
});

// 4. Orders
export const mockOrders: Order[] = Array.from({ length: 15 }).map((_, i) => {
  const customer = mockCustomers[Math.floor(Math.random() * mockCustomers.length)];
  const isRecovered = i < 3;
  const abandonedCart = isRecovered ? mockAbandonedCarts.find(c => c.status === 'recovered') : undefined;

  return {
    id: `order-${i}`,
    customer_id: customer.id,
    product_name: products[Math.floor(Math.random() * products.length)],
    value: 97 + Math.floor(Math.random() * 900),
    recovered: isRecovered,
    abandoned_cart_id: abandonedCart?.id,
    ordered_at: subDays(new Date(), Math.random() * 30).toISOString(),
  };
});

// 5. Activity Log
export const mockActivityLog: ActivityLogEntry[] = Array.from({ length: 10 }).map((_, i) => {
  const types: any[] = ['cart_abandoned', 'message_sent', 'cart_recovered', 'followup_scheduled', 'order_placed'];
  const type = types[Math.floor(Math.random() * types.length)];
  const customer = mockCustomers[Math.floor(Math.random() * mockCustomers.length)];
  
  return {
    id: `act-${i}`,
    type,
    customer_id: customer.id,
    customer_name: customer.name,
    description: type === 'cart_abandoned' ? `Abandonou o carrinho de ${products[0]}` :
                 type === 'message_sent' ? `Mensagem de recuperação enviada para ${customer.name}` :
                 type === 'cart_recovered' ? `Recuperou venda de ${products[1]}` :
                 'Atividade registrada no sistema',
    value: type.includes('order') || type.includes('cart') ? 197 : undefined,
    created_at: subDays(new Date(), i * 0.1).toISOString(),
  };
});

// Helper for Dashboard Charts
export const getSalesChartData = (days: number): ChartDataPoint[] => {
  return Array.from({ length: days }).map((_, i) => {
    const date = subDays(new Date(), days - 1 - i);
    const daySales = mockOrders
      .filter(o => isSameDay(new Date(o.ordered_at), date))
      .reduce((acc, curr) => acc + curr.value, 0);
    
    const dayAbandoned = mockAbandonedCarts
      .filter(c => isSameDay(new Date(c.abandoned_at), date) && c.status !== 'recovered')
      .reduce((acc, curr) => acc + curr.value, 0);

    return {
      date: format(date, 'dd/MM'),
      sales: daySales,
      abandoned: dayAbandoned,
    };
  });
};

export const getStatusBreakdown = (): StatusCount[] => {
  const counts = {
    hot: 0,
    warm: 0,
    cold: 0,
    contacted: 0,
    recovered: 0,
    lost: 0
  };

  mockAbandonedCarts.forEach(c => {
    counts[c.status]++;
  });

  return [
    { status: 'hot', count: counts.hot, label: 'Quente', color: '#c0392b' },
    { status: 'warm', count: counts.warm, label: 'Morno', color: '#b87a0d' },
    { status: 'cold', count: counts.cold, label: 'Frio', color: '#1a6fb5' },
    { status: 'contacted', count: counts.contacted, label: 'Contatado', color: '#2d8a5e' },
    { status: 'recovered', count: counts.recovered, label: 'Recuperado', color: '#2d8a5e' },
  ];
};
