import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyFormat(number: number) {
  const EURO = Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  });
  const currency = EURO.format(number);
  return currency;
}
