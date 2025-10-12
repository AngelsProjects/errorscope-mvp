import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from './lib/utils';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(styles.button, styles[variant], styles[size], className)} {...props}>
      {children}
    </button>
  );
}
