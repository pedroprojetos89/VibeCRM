import { MessageTemplate } from '../types';

export function interpolateTemplate(body: string, variables: Record<string, string>): string {
  let result = body;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replaceAll(key, value);
  }
  return result;
}

export function buildWhatsAppUrl(phone: string, templateBody: string, variables: Record<string, string>): string {
  const message = interpolateTemplate(templateBody, variables);
  const encodedMessage = encodeURIComponent(message);
  const cleanedPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
}
