'use client';

import styles from './StatsCards.module.css';
import { useErrorData } from '../hooks/useErrorData';

export function StatsCards() {
  const { stats, loading } = useErrorData();
  console.log('stats:', stats);
  console.log('loading:', loading);
  return (
    <div className={styles.stats}>
      <div className={styles.statCard}>
        <div className={styles.statValue}>
          {!loading && stats ? stats.totalErrors.toLocaleString() : '-'}
        </div>
        <div className={styles.statLabel}>Total Errors</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statValue}>
          {!loading && stats ? stats.totalGroups.toLocaleString() : '-'}
        </div>
        <div className={styles.statLabel}>Error Groups</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statValue}>
          {!loading && stats ? stats.last24Hours.toLocaleString() : '-'}
        </div>
        <div className={styles.statLabel}>Last 24 Hours</div>
      </div>
    </div>
  );
}
