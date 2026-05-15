import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatPhone = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');
  // Remove country code if it starts with 55
  const withoutCountry = cleaned.startsWith('55') ? cleaned.substring(2) : cleaned;
  
  if (withoutCountry.length === 11) {
    return `(${withoutCountry.substring(0, 2)}) ${withoutCountry.substring(2, 7)}-${withoutCountry.substring(7)}`;
  } else if (withoutCountry.length === 10) {
    return `(${withoutCountry.substring(0, 2)}) ${withoutCountry.substring(2, 6)}-${withoutCountry.substring(6)}`;
  }
  return withoutCountry;
};
