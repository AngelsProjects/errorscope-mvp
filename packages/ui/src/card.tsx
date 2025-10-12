import { ReactNode } from 'react';
import { cn } from './lib/utils';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className, onClick, hoverable = false }: CardProps) {
  return (
    <div
      className={cn(
        styles.card,
        hoverable && styles.hoverable,
        onClick && styles.clickable,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
