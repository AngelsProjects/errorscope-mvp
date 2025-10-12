import { formatDistanceToNow } from 'date-fns';
import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function getLevelColor(level: 'error' | 'warning' | 'info'): string {
  const colors = {
    error: '#e53e3e',
    warning: '#dd6b20',
    info: '#3182ce',
  };
  return colors[level] || '#718096';
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}
