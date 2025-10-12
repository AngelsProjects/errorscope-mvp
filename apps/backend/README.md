# @errorscope/backend

NestJS-based backend API for ErrorScope error monitoring.

## Setup

```bash
# Install dependencies
pnpm install

# Start PostgreSQL & Redis
docker-compose up -d postgres redis

# Run migrations (auto with TypeORM sync in dev)
pnpm dev

# Production
pnpm build
pnpm start
```

## Environment Variables

Create `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=errorscope
DB_PASSWORD=dev_password
DB_NAME=errorscope

REDIS_HOST=localhost
REDIS_PORT=6379

NODE_ENV=development
PORT=3001
```

## API Endpoints

### POST `/api/errors`
Ingest error events.

**Request:**
```json
{
  "events": [
    {
      "message": "Cannot read property 'x' of undefined",
      "stack": "Error: ...",
      "timestamp": 1704067200000,
      "level": "error",
      "metadata": {
        "appName": "my-app",
        "environment": "production",
        "userAgent": "Mozilla/5.0...",
        "url": "https://myapp.com/checkout"
      }
    }
  ]
}
```

**Response:**
```json
{ "success": true }
```

### GET `/api/errors/groups?limit=50`
Get error groups.

### GET `/api/errors/groups/:fingerprint`
Get specific error group with events.

### GET `/api/errors/recent?limit=100`
Get recent error events.

### GET `/api/errors/stats`
Get statistics.

## Architecture

- **TypeORM**: Database ORM
- **PostgreSQL**: Primary database
- **Redis**: Caching & rate limiting (future)
- **Fingerprinting**: MD5 hash of message + first 3 stack frames

## License

MIT
