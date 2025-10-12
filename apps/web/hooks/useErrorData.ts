'use client';

import { useState, useEffect, useCallback } from 'react';
import { clientApi } from '../lib/api';
import { ErrorGroup, ErrorEvent, Stats } from '../lib/types';

export function useErrorData(pollingInterval = 5000) {
  const [errorGroups, setErrorGroups] = useState<ErrorGroup[]>([]);
  const [recentEvents, setRecentEvents] = useState<ErrorEvent[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [groups, events, statsData] = await Promise.all([
        clientApi.getErrorGroups(),
        clientApi.getRecentEvents(),
        clientApi.getStats(),
      ]);

      setErrorGroups(groups);
      setRecentEvents(events);
      setStats(statsData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, pollingInterval);
    return () => clearInterval(interval);
  }, [fetchData, pollingInterval]);

  return {
    errorGroups,
    recentEvents,
    stats,
    loading,
    error,
    refresh: fetchData,
  };
}
