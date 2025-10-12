import { ErrorGroup, ErrorEvent, Stats } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/errors';

// Server-side fetching with caching
export async function getErrorGroups(limit = 50): Promise<ErrorGroup[]> {
  const res = await fetch(`${API_BASE}/groups?limit=${limit}`, {
    next: { revalidate: 5 }, // Cache for 5 seconds
  });

  if (!res.ok) {
    throw new Error('Failed to fetch error groups');
  }

  return res.json();
}

export async function getErrorGroup(
  fingerprint: string
): Promise<ErrorGroup & { events: ErrorEvent[] }> {
  const res = await fetch(`${API_BASE}/groups/${fingerprint}`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch error group');
  }

  return res.json();
}

export async function getRecentEvents(limit = 100): Promise<ErrorEvent[]> {
  const res = await fetch(`${API_BASE}/recent?limit=${limit}`, {
    next: { revalidate: 5 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch recent events');
  }

  return res.json();
}

export async function getStats(): Promise<Stats> {
  const res = await fetch(`${API_BASE}/stats`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch stats');
  }

  return res.json();
}

// Client-side API calls (no caching)
export const clientApi = {
  async getErrorGroups(limit = 50): Promise<ErrorGroup[]> {
    const res = await fetch(`${API_BASE}/groups?limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  },

  async getRecentEvents(limit = 100): Promise<ErrorEvent[]> {
    const res = await fetch(`${API_BASE}/recent?limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  },

  async getStats(): Promise<Stats> {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  },
};
