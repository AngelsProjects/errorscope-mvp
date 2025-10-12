# @errorscope/sdk

Lightweight error monitoring SDK for JavaScript/TypeScript applications.

## Installation

```bash
npm install @errorscope/sdk
# or
yarn add @errorscope/sdk
# or
pnpm add @errorscope/sdk
```

## Quick Start

### Browser (React, Vue, etc.)

```typescript
import { init, captureException, captureMessage } from '@errorscope/sdk';

// Initialize once in your app entry point
init({
  apiKey: 'your-api-key',
  endpoint: 'https://your-errorscope-backend.com/api',
  appName: 'my-webapp',
  environment: 'production',
  enableAutoCapture: true,
  sampleRate: 1.0, // Capture 100% of errors
});

// Errors are automatically captured
// Or manually capture:
try {
  riskyOperation();
} catch (error) {
  captureException(error, { userId: user.id, action: 'checkout' });
}

// Capture custom messages
captureMessage('User completed onboarding', 'info', { userId: '123' });
```

### Node.js / Express

```typescript
import express from 'express';
import { init, captureException } from '@errorscope/sdk';

const app = express();

init({
  apiKey: 'your-api-key',
  appName: 'my-api',
  environment: process.env.NODE_ENV,
});

// Error handling middleware
app.use((err, req, res, next) => {
  captureException(err, {
    url: req.url,
    method: req.method,
    userId: req.user?.id,
  });
  res.status(500).json({ error: 'Internal Server Error' });
});
```

## API Reference

### `init(config: ErrorScopeConfig)`

Initialize the SDK. Call this once at app startup.

**Config Options:**
- `apiKey` (required): Your API key
- `endpoint` (optional): Backend URL (default: `http://localhost:3001/api`)
- `appName` (optional): Application name (default: `'unknown'`)
- `environment` (optional): Environment (default: `'production'`)
- `enableAutoCapture` (optional): Auto-capture uncaught errors (default: `true`)
- `sampleRate` (optional): Percentage of errors to capture (0.0 - 1.0, default: `1.0`)

### `captureException(error: Error, customData?: object)`

Manually capture an error.

### `captureMessage(message: string, level?: 'error' | 'warning' | 'info', customData?: object)`

Capture a custom message.

### `close()`

Flush remaining errors and close the SDK (useful for server shutdown).

## Features

- ✅ Auto-capture uncaught exceptions
- ✅ Auto-capture unhandled promise rejections
- ✅ Batching (sends max 1 request per 5 seconds)
- ✅ Automatic retry on network failure
- ✅ Stack trace parsing
- ✅ Browser & Node.js support
- ✅ Zero dependencies (except stacktrace-js)
- ✅ < 5KB gzipped

## License

MIT
