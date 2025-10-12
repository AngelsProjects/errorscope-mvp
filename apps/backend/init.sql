-- This runs automatically when postgres container starts
CREATE TABLE IF NOT EXISTS error_groups (
  fingerprint VARCHAR(32) PRIMARY KEY,
  message TEXT NOT NULL,
  stack TEXT,
  count INTEGER DEFAULT 0,
  app_name VARCHAR(255),
  environment VARCHAR(50),
  first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS error_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fingerprint VARCHAR(32) NOT NULL REFERENCES error_groups(fingerprint),
  message TEXT NOT NULL,
  stack TEXT,
  level VARCHAR(20) DEFAULT 'error',
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_error_events_fingerprint ON error_events(fingerprint);
CREATE INDEX idx_error_events_created_at ON error_events(created_at);
