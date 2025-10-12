import { ReactNode } from 'react';
import { cn } from './lib/utils';
import styles from './Badge.module.css';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'error' | 'warning' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return <span className={cn(styles.badge, styles[variant], className)}>{children}</span>;
}
