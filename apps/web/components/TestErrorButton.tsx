'use client';

import { useState } from 'react';
import { Button } from '@errorscope/ui/Button';

export function TestErrorButton() {
  const [loading, setLoading] = useState(false);

  const sendTestError = async () => {
    setLoading(true);
    try {
      await fetch('/api/test-error', { method: 'POST' });
      alert('Test error sent! Check the dashboard in a few seconds.');
    } catch {
      alert('Failed to send test error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={sendTestError} disabled={loading} variant="secondary">
      {loading ? 'Sending...' : '🧪 Send Test Error'}
    </Button>
  );
}
