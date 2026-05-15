/**
 * Core types for VibeCRM
 */

export type CartStatus = 'hot' | 'warm' | 'cold' | 'contacted' | 'recovered' | 'lost';
export type TemplateType = 'abandoned_cart' | 'welcome' | 'followup' | 'promotion';
export type Period = 'today' | '7d' | '30d' | '90d';
export type ActivityType = 'cart_abandoned' | 'message_sent' | 'cart_recovered' | 'followup_scheduled' | 'order_placed';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  created_at: string;
}

export interface AbandonedCart {
  id: string;
  customer_id: string;
  customer: Customer;
  product_name: string;
  product_description?: string;
  value: number;
  cart_url?: string;
  status: CartStatus;
  abandoned_at: string;
  last_contacted_at?: string;
  contact_attempts: number;
  notes?: string;
  created_at: string;
}

export interface Order {
  id: string;
  customer_id: string;
  product_name: string;
  value: number;
  recovered: boolean;
  abandoned_cart_id?: string;
  ordered_at: string;
}

export interface MessageTemplate {
  id: string;
  type: TemplateType;
  label: string;
  body: string;
  available_variables: string[];
  updated_at: string;
}

export interface ActivityLogEntry {
  id: string;
  type: ActivityType;
  customer_id?: string;
  customer_name?: string;
  abandoned_cart_id?: string;
  description: string;
  value?: number;
  created_at: string;
}

export interface DashboardMetrics {
  totalSales: number;
  totalSalesDelta: number;
  abandonedCarts: number;
  abandonedValue: number;
  recoveredCarts: number;
  recoveredValue: number;
  recoveryRate: number;
  recoveryRateDelta: number;
}

export interface ChartDataPoint {
  date: string;
  sales: number;
  abandoned: number;
}

export interface StatusCount {
  status: CartStatus;
  count: number;
  label: string;
  color: string;
}
