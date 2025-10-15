import { StatsCards } from '../components/StatsCards';
import { DashboardClient } from './DashboardClient';
import { TestErrorButton } from '../components/TestErrorButton';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>🔍 ErrorScope</h1>
          <p className={styles.subtitle}>Real-time Application Monitoring</p>
        </div>
        <TestErrorButton />
      </header>

      <StatsCards />

      <DashboardClient />
    </div>
  );
}
