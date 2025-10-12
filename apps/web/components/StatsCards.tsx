import { getStats } from '../lib/api';
import styles from './StatsCards.module.css';

export async function StatsCards() {
  const stats = await getStats();

  return (
    <div className={styles.stats}>
      <div className={styles.statCard}>
        <div className={styles.statValue}>{stats.totalErrors.toLocaleString()}</div>
        <div className={styles.statLabel}>Total Errors</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statValue}>{stats.totalGroups.toLocaleString()}</div>
        <div className={styles.statLabel}>Error Groups</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statValue}>{stats.last24Hours.toLocaleString()}</div>
        <div className={styles.statLabel}>Last 24 Hours</div>
      </div>
    </div>
  );
}
