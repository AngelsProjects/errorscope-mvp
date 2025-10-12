'use client';

import { ErrorEvent } from '../lib/types';
import { Card } from '@errorscope/ui/Card';
import { formatRelativeTime, getLevelColor, truncate } from '../lib/utils';
import styles from './ErrorEventList.module.css';

interface ErrorEventListProps {
  events: ErrorEvent[];
}

export function ErrorEventList({ events }: ErrorEventListProps) {
  if (events.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No recent events</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {events.map((event) => (
        <Card key={event.id} className={styles.eventCard}>
          <div
            className={styles.levelIndicator}
            style={{ backgroundColor: getLevelColor(event.level) }}
          />
          <div className={styles.content}>
            <div className={styles.message}>{event.message}</div>
            <div className={styles.meta}>
              <span>{event.metadata.appName || 'unknown'}</span>
              <span>•</span>
              <span>{event.metadata.environment || 'production'}</span>
              <span>•</span>
              <span>{formatRelativeTime(event.createdAt)}</span>
              {event.metadata.url && (
                <>
                  <span>•</span>
                  <span className={styles.url}>{truncate(event.metadata.url, 50)}</span>
                </>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
