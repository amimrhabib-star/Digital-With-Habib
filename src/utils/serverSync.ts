// Server Synchronization utility for permanent multi-device & public persistence
// Ensures any edited text, uploaded photo, or video is saved directly to the server backend
// so that shared links, public visitors, and reloads always reflect the updated content.

let pendingPayload: Record<string, any> = {};
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let isSaving = false;

export async function fetchServerContent(): Promise<any | null> {
  try {
    const res = await fetch('/api/content', {
      method: 'GET',
      headers: { credentials: 'omit' },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.success && json.data) {
      return json.data;
    }
  } catch (err) {
    console.warn('Server content fetch deferred or offline:', err);
  }
  return null;
}

export function queueServerSync(patch: Record<string, any>) {
  pendingPayload = { ...pendingPayload, ...patch };

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    flushServerSync();
  }, 400);
}

export async function flushServerSync(): Promise<boolean> {
  if (Object.keys(pendingPayload).length === 0 || isSaving) {
    return false;
  }

  const payloadToSend = { ...pendingPayload };
  pendingPayload = {};
  isSaving = true;

  try {
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payloadToSend),
    });

    isSaving = false;
    if (res.ok) {
      return true;
    }
  } catch (err) {
    console.warn('Server sync deferred:', err);
    // Merge back in case of network glitch
    pendingPayload = { ...payloadToSend, ...pendingPayload };
    isSaving = false;
  }
  return false;
}

export async function resetServerContent(): Promise<boolean> {
  try {
    const res = await fetch('/api/content/reset', {
      method: 'POST',
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to reset server content:', err);
    return false;
  }
}
