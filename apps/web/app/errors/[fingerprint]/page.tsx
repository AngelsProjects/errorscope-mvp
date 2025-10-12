import { getErrorGroup } from '../../../lib/api';
import { formatRelativeTime } from '../../../lib/utils';
import { Card } from '@errorscope/ui/Card';
import { Badge } from '@errorscope/ui/Badge';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{
    fingerprint: string;
  }>;
}

export default async function ErrorDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  try {
    const errorGroup = await getErrorGroup(resolvedParams.fingerprint);

    return (
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← Back to Dashboard
        </Link>

        <Card className={styles.header}>
          <div className={styles.headerTop}>
            <Badge variant="error">{errorGroup.count}x occurrences</Badge>
            <div className={styles.appInfo}>
              📱 {errorGroup.appName} • 🌍 {errorGroup.environment}
            </div>
          </div>
          <h1 className={styles.title}>{errorGroup.message}</h1>
        </Card>

        <div className={styles.grid}>
          <Card>
            <h2 className={styles.sectionTitle}>Stack Trace</h2>
            <pre className={styles.stackTrace}>
              {errorGroup.stack || 'No stack trace available'}
            </pre>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Timeline</h2>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <strong>First Seen:</strong>
                <span>{formatRelativeTime(errorGroup.firstSeen)}</span>
                <span className={styles.timelineDate}>
                  {new Date(errorGroup.firstSeen).toLocaleString()}
                </span>
              </div>
              <div className={styles.timelineItem}>
                <strong>Last Seen:</strong>
                <span>{formatRelativeTime(errorGroup.lastSeen)}</span>
                <span className={styles.timelineDate}>
                  {new Date(errorGroup.lastSeen).toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <h2 className={styles.sectionTitle}>
            Recent Occurrences ({errorGroup.events?.length || 0})
          </h2>
          <div className={styles.events}>
            {errorGroup.events?.slice(0, 20).map((event) => (
              <div key={event.id} className={styles.event}>
                <span className={styles.eventTime}>{formatRelativeTime(event.createdAt)}</span>
                <span className={styles.eventUrl}>{event.metadata.url || 'No URL'}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  } catch {
    notFound();
  }
}
