export interface ErrorGroup {
  fingerprint: string;
  message: string;
  stack: string | null;
  count: number;
  appName: string;
  environment: string;
  firstSeen: string;
  lastSeen: string;
}

export interface ErrorEvent {
  id: string;
  fingerprint: string;
  message: string;
  stack: string | null;
  level: 'error' | 'warning' | 'info';
  metadata: {
    appName?: string;
    environment?: string;
    userAgent?: string;
    url?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customData?: Record<string, any>;
  };
  createdAt: string;
}

export interface Stats {
  totalErrors: number;
  totalGroups: number;
  last24Hours: number;
}

export type ViewMode = 'groups' | 'recent';
