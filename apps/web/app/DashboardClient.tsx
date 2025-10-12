'use client';

import { useState } from 'react';
import { Tabs } from '@errorscope/ui/Tabs';
import { ErrorGroupList } from '../components/ErrorGroupList';
import { ErrorEventList } from '../components/ErrorEventList';
import { useErrorData } from '../hooks/useErrorData';
import { ViewMode } from '../lib/types';
import styles from './DashboardClient.module.css';

export function DashboardClient() {
  const [view, setView] = useState<ViewMode>('groups');
  const { errorGroups, recentEvents, loading, error } = useErrorData();

  if (loading) {
    return <div className={styles.loading}>Loading errors...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>⚠️ Failed to load data: {error}</p>
      </div>
    );
  }

  const tabs = [
    { id: 'groups', label: 'Error Groups', count: errorGroups.length },
    { id: 'recent', label: 'Recent Events', count: recentEvents.length },
  ];

  return (
    <div>
      <Tabs tabs={tabs} activeTab={view} onChange={(tabId) => setView(tabId as ViewMode)} />

      {view === 'groups' ? (
        <ErrorGroupList groups={errorGroups} />
      ) : (
        <ErrorEventList events={recentEvents} />
      )}
    </div>
  );
}
