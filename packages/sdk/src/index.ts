import StackTrace from 'stacktrace-js';

export interface ErrorScopeConfig {
  apiKey: string;
  endpoint?: string;
  environment?: string;
  appName?: string;
  enableAutoCapture?: boolean;
  sampleRate?: number;
}

export interface ErrorEvent {
  message: string;
  stack?: string;
  timestamp: number;
  level: 'error' | 'warning' | 'info';
  metadata: {
    appName?: string;
    environment?: string;
    userAgent?: string;
    url?: string;
    customData?: Record<string, any>;
  };
}

class ErrorScopeClient {
  private config: Required<ErrorScopeConfig>;
  private queue: ErrorEvent[] = [];
  private flushTimer?: NodeJS.Timeout;
  private readonly BATCH_SIZE = 10;
  private readonly FLUSH_INTERVAL = 5000; // 5 seconds

  constructor(config: ErrorScopeConfig) {
    this.config = {
      endpoint: 'http://localhost:3001/api',
      environment: 'production',
      appName: 'unknown',
      enableAutoCapture: true,
      sampleRate: 1.0,
      ...config,
    };

    if (this.config.enableAutoCapture) {
      this.setupAutoCapture();
    }

    this.startFlushTimer();
  }

  private setupAutoCapture() {
    if (typeof window !== 'undefined') {
      // Browser environment
      window.addEventListener('error', (event) => {
        this.captureException(event.error || new Error(event.message));
      });

      window.addEventListener('unhandledrejection', (event) => {
        this.captureException(new Error(`Unhandled Promise Rejection: ${event.reason}`));
      });
    } else if (typeof process !== 'undefined') {
      // Node.js environment
      process.on('uncaughtException', (error) => {
        this.captureException(error);
      });

      process.on('unhandledRejection', (reason) => {
        this.captureException(new Error(`Unhandled Promise Rejection: ${reason}`));
      });
    }
  }

  async captureException(error: Error, customData?: Record<string, any>): Promise<void> {
    if (Math.random() > this.config.sampleRate) {
      return; // Sample rate filtering
    }

    try {
      const stackFrames = await StackTrace.fromError(error);
      const stack = stackFrames
        .map((sf) => `  at ${sf.functionName} (${sf.fileName}:${sf.lineNumber}:${sf.columnNumber})`)
        .join('\n');

      const errorEvent: ErrorEvent = {
        message: error.message,
        stack,
        timestamp: Date.now(),
        level: 'error',
        metadata: {
          appName: this.config.appName,
          environment: this.config.environment,
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
          url: typeof window !== 'undefined' ? window.location.href : undefined,
          customData,
        },
      };

      this.queue.push(errorEvent);

      if (this.queue.length >= this.BATCH_SIZE) {
        await this.flush();
      }
    } catch (err) {
      console.error('ErrorScope: Failed to capture exception', err);
    }
  }

  captureMessage(
    message: string,
    level: 'error' | 'warning' | 'info' = 'info',
    customData?: Record<string, any>
  ): void {
    const errorEvent: ErrorEvent = {
      message,
      timestamp: Date.now(),
      level,
      metadata: {
        appName: this.config.appName,
        environment: this.config.environment,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        customData,
      },
    };

    this.queue.push(errorEvent);
  }

  private async flush(): Promise<void> {
    if (this.queue.length === 0) return;

    const eventsToSend = [...this.queue];
    this.queue = [];

    try {
      const response = await fetch(`${this.config.endpoint}/errors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.config.apiKey,
        },
        body: JSON.stringify({ events: eventsToSend }),
      });

      if (!response.ok) {
        console.error('ErrorScope: Failed to send errors', response.status);
        // Re-queue on failure (with limit to prevent infinite growth)
        if (this.queue.length < 100) {
          this.queue.push(...eventsToSend);
        }
      }
    } catch (error) {
      console.error('ErrorScope: Network error', error);
      // Re-queue on network error
      if (this.queue.length < 100) {
        this.queue.push(...eventsToSend);
      }
    }
  }

  private startFlushTimer(): void {
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.FLUSH_INTERVAL);
  }

  async close(): Promise<void> {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    await this.flush();
  }
}

let globalClient: ErrorScopeClient | null = null;

export function init(config: ErrorScopeConfig): ErrorScopeClient {
  globalClient = new ErrorScopeClient(config);
  return globalClient;
}

export function captureException(error: Error, customData?: Record<string, any>): void {
  if (!globalClient) {
    console.warn('ErrorScope: SDK not initialized. Call init() first.');
    return;
  }
  globalClient.captureException(error, customData);
}

export function captureMessage(
  message: string,
  level?: 'error' | 'warning' | 'info',
  customData?: Record<string, any>
): void {
  if (!globalClient) {
    console.warn('ErrorScope: SDK not initialized. Call init() first.');
    return;
  }
  globalClient.captureMessage(message, level, customData);
}

export { ErrorScopeClient };
