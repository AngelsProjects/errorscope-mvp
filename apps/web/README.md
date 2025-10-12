# @errorscope/web

Next.js 14 dashboard for ErrorScope error monitoring.

## Features

- 📊 Real-time error dashboard
- 🔍 Error grouping and detail views
- 📈 Statistics overview
- 🎨 Modern UI with CSS Modules
- ⚡ Server & Client Components
- 🔄 Auto-refresh (5s polling)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/errors
```

## Architecture

### Server Components
- `/app/page.tsx` - Dashboard page
- `/app/errors/[fingerprint]/page.tsx` - Error detail page
- `StatsCards` - Statistics display

### Client Components
- `DashboardClient` - Interactive dashboard
- `ErrorGroupList` - Error groups list
- `ErrorEventList` - Recent events list
- `Tabs` - Tab navigation
- UI components (`Button`, `Card`, `Badge`)

### Custom Hooks
- `useErrorData` - Polling hook for real-time updates

## Performance

- Server-side rendering for initial load
- Cached API responses (5-10s)
- Client-side polling for updates
- Optimized bundle size

## License

MIT
