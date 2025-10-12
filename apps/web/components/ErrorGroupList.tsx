'use client';

import { ErrorGroup } from '../lib/types';
import { Card } from '@errorscope/ui/Card';
import { Badge } from '@errorscope/ui/Badge';
import { formatRelativeTime } from '../lib/utils';
import { useRouter } from 'next/navigation';
import styles from './ErrorGroupList.module.css';

interface ErrorGroupListProps {
  groups: ErrorGroup[];
}

export function ErrorGroupList({ groups }: ErrorGroupListProps) {
  const router = useRouter();

  if (groups.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📭</div>
        <h3>No errors captured yet</h3>
        <p>Install the SDK to start monitoring your applications:</p>
        <code className={styles.code}>npm install @errorscope/sdk</code>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {groups.map((group) => (
        <Card
          key={group.fingerprint}
          hoverable
          onClick={() => router.push(`/errors/${group.fingerprint}`)}
        >
          <div className={styles.header}>
            <Badge variant="error">{group.count}x</Badge>
            <h3 className={styles.message}>{group.message}</h3>
          </div>
          <div className={styles.meta}>
            <span className={styles.metaItem}>📱 {group.appName || 'unknown'}</span>
            <span className={styles.metaItem}>🌍 {group.environment || 'production'}</span>
            <span className={styles.metaItem}>
              🕐 Last seen {formatRelativeTime(group.lastSeen)}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
