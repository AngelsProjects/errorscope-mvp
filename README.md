# ErrorScope MVP - Application Monitoring

A full-stack error monitoring solution built with Next.js 14, React, NestJS, TypeScript, and PostgreSQL.

## 🏗️ Architecture

### Monorepo Structure

```
errorscope-mvp/
├── apps/
│ ├── demo/ # Demo app to test errorscope
│ ├── backend/ # NestJS API (REST + PostgreSQL)
│ └── web/ # Next.js 14 App Router + React dashboard
├── packages/
│ ├── eslint-config/ # Eslint config for all workspace
│ ├── sdk/ # TypeScript SDK for error capturing
│ ├── typescript-config/ # TS config for all workspace
│ └── ui/ # React UI components
```

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Backend**: NestJS, TypeORM, PostgreSQL, Redis
- **SDK**: TypeScript (universal: browser + Node.js)
- **Infrastructure**: Docker, Docker Compose

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm 8+
- Docker & Docker Compose

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repo>
   cd errorscope-mvp
   pnpm install
   ```

2. **Start infrastructure (PostgreSQL + Redis)**
 ```bash
   pnpm db:up
   ```

3. **Start all services in parallel**
   ```bash
   pnpm dev
   ```

   This starts:
   - Backend API: http://localhost:3001
   - Web Dashboard: http://localhost:3000
   - SDK: Watch mode

### Individual Services

```bash
# Start only backend
pnpm backend:dev

# Start only frontend
pnpm dashboard:dev

# Build SDK
pnpm sdk:dev
```

## 📦 Using the SDK

### Installation
```bash
npm install @errorscope/sdk
```

### Basic Usage
```typescript
import { init, captureException } from '@errorscope/sdk';

// Initialize
init({
  apiKey: 'your-api-key',
  environment: 'production',
  appName: 'my-app',
});

// Capture errors
try {
  throw new Error('Something went wrong!');
} catch (error) {
  captureException(error, { userId: '123' });
}
```

## 🧪 Testing

Send a test error from the dashboard:
1. Open http://localhost:3000
2. Click "🧪 Send Test Error" button
3. Error appears in the dashboard within 5 seconds

## 📊 Features

### MVP Features
- ✅ Real-time error ingestion
- ✅ Error grouping by fingerprint
- ✅ Dashboard with error groups & events
- ✅ Auto-polling (5s intervals)
- ✅ Error detail view
- ✅ Stats aggregation

### Architecture Highlights
- **Server Components**: Stats, initial data loading (cached)
- **Client Components**: Interactive UI, real-time updates
- **React Hooks**: Custom `useErrorData` hook for polling
- **API Routes**: Test error generation
- **TypeScript**: End-to-end type safety

## 🏭 Production Considerations

### Current Limitations (MVP)
- No authentication
- Single-table storage (won't scale past 1M errors)
- Polling instead of WebSocket
- No source map support

### Next Steps
1. Add user authentication (NextAuth.js)
2. Implement time-series database (ClickHouse)
3. Add WebSocket for real-time updates
4. Source map integration
5. Advanced filtering & search
6. Email/Slack alerts
7. Performance monitoring (APM)

## 📝 Environment Variables

### Backend (`apps/backend/.env`)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=errorscope
DB_PASSWORD=dev_password
DB_NAME=errorscope
```

### Frontend (`apps/web/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/errors
```

## 🛠️ Development

### Database Management
```bash
# Start databases
pnpm db:up

# Stop databases
pnpm db:down

# Reset database (warning: deletes all data)
docker-compose down -v && pnpm db:up
```

### Build for Production
```bash
pnpm build
```

## 📄 License

MIT
