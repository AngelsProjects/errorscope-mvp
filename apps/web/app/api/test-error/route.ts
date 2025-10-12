import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/errors';

    const testError = {
      events: [
        {
          message: 'Test error from ErrorScope dashboard',
          stack: `Error: Test error from ErrorScope dashboard
    at testFunction (app.js:10:15)
    at onClick (Button.tsx:25:5)
    at HTMLButtonElement.callCallback (react-dom.js:123:10)`,
          timestamp: Date.now(),
          level: 'error' as const,
          metadata: {
            appName: 'errorscope-dashboard',
            environment: 'development',
            userAgent: 'ErrorScope Test Client',
            url: 'http://localhost:3000/api/test-error',
            customData: {
              testId: Math.random().toString(36).substring(7),
            },
          },
        },
      ],
    };

    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'test-api-key',
      },
      body: JSON.stringify(testError),
    });

    if (!response.ok) {
      throw new Error('Failed to send test error');
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send test error' }, { status: 500 });
  }
}
