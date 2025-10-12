import styles from './LoadingSkeleton.module.css';

interface LoadingSkeletonProps {
  count?: number;
  height?: string;
}

export function LoadingSkeleton({
  count = 1,
  height = '100px',
}: LoadingSkeletonProps) {
  return (
    <div className={styles.container}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeleton} style={{ height }} />
      ))}
    </div>
  );
}
