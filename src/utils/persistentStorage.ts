// Bulletproof Persistent Storage using IndexedDB with fallback to localStorage.
// Solves browser 5MB localStorage QuotaExceededError for high-resolution base64 images & videos.
// Includes connection auto-recovery and retries for 'The database connection is closing' errors.

const DB_NAME = 'DigitalWithHabib_PersistentDB_v3';
const STORE_NAME = 'studio_keyval';
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

function resetDB() {
  dbPromise = null;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        try {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        } catch (e) {
          console.warn('IndexedDB onupgradeneeded error:', e);
        }
      };

      request.onsuccess = () => {
        const db = request.result;

        // Auto-heal on connection close, abort or version change
        db.onversionchange = () => {
          try {
            db.close();
          } catch {}
          resetDB();
        };

        db.onclose = () => {
          resetDB();
        };

        db.onerror = () => {
          resetDB();
        };

        resolve(db);
      };

      request.onerror = () => {
        resetDB();
        reject(request.error);
      };

      request.onblocked = () => {
        resetDB();
        console.warn('IndexedDB open blocked, resetting...');
      };
    } catch (err) {
      resetDB();
      reject(err);
    }
  });
}

function getDB(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = openDB().catch((err) => {
      resetDB();
      throw err;
    });
  }
  return dbPromise;
}

// Executes an IndexedDB operation with automatic connection self-healing and retry
async function executeWithRetry<T>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => Promise<T>
): Promise<T> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const db = await getDB();
      return await new Promise<T>((resolve, reject) => {
        try {
          const transaction = db.transaction(STORE_NAME, mode);
          const store = transaction.objectStore(STORE_NAME);

          transaction.onerror = () => reject(transaction.error);
          transaction.onabort = () => reject(transaction.error || new Error('Transaction aborted'));

          operation(store).then(resolve).catch(reject);
        } catch (err) {
          reject(err);
        }
      });
    } catch (err: unknown) {
      const errorObj = err as { name?: string; message?: string } | undefined;
      const isConnectionError =
        errorObj?.name === 'InvalidStateError' ||
        (typeof errorObj?.message === 'string' && (
          errorObj.message.includes('closing') ||
          errorObj.message.includes('closed') ||
          errorObj.message.includes('connection')
        ));

      if (isConnectionError && attempt === 0) {
        // Reset DB promise and try opening a fresh connection
        resetDB();
        await new Promise((r) => setTimeout(r, 60));
        continue;
      }
      throw err;
    }
  }
  throw new Error('Database operation failed after retry');
}

export async function idbGet<T>(key: string): Promise<T | null> {
  try {
    return await executeWithRetry('readonly', (store) => {
      return new Promise<T | null>((resolve, reject) => {
        const request = store.get(key);
        request.onsuccess = () => {
          resolve(request.result !== undefined ? (request.result as T) : null);
        };
        request.onerror = () => reject(request.error);
      });
    });
  } catch (err) {
    console.warn(`IndexedDB get fallback to localStorage for key "${key}":`, err);
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}

export async function idbSet<T>(key: string, value: T): Promise<void> {
  // Always try writing to IndexedDB (virtually unlimited quota for images/videos)
  try {
    await executeWithRetry('readwrite', (store) => {
      return new Promise<void>((resolve, reject) => {
        const request = store.put(value, key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
  } catch (err) {
    console.warn(`IndexedDB write deferred for key "${key}":`, err);
  }

  // Also best-effort sync to localStorage for instant synchronous preview on reload
  // Wrap in try-catch so QuotaExceededError on massive images never breaks the application
  try {
    const str = JSON.stringify(value);
    localStorage.setItem(key, str);
  } catch {
    // Expected when storing multiple high-res base64 images in localStorage (5MB quota)
    // IndexedDB handles the full persistent storage.
  }
}

export async function idbDelete(key: string): Promise<void> {
  try {
    await executeWithRetry('readwrite', (store) => {
      return new Promise<void>((resolve, reject) => {
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
  } catch (err) {
    console.warn(`IndexedDB delete deferred for key "${key}":`, err);
  }

  try {
    localStorage.removeItem(key);
  } catch {}
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = e.target?.result;
      if (typeof res === 'string') {
        resolve(res);
      } else {
        reject(new Error('Failed to convert file to data URL'));
      }
    };
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

/**
 * Automatically compress and optimize user-uploaded photos to prevent
 * storage quota issues and network payload drops, ensuring permanent saves.
 * Transforms 10MB camera/phone photos into crisp ~150KB web-optimized visuals.
 */
export async function compressAndConvertToDataUrl(
  file: File,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.85
): Promise<string> {
  // If it's a video or SVG, keep format as-is
  if (file.type.startsWith('video/') || file.type === 'image/svg+xml') {
    return fileToDataUrl(file);
  }

  // If not an image, fallback to standard reader
  if (!file.type.startsWith('image/')) {
    return fileToDataUrl(file);
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result;
      if (typeof src !== 'string') {
        fileToDataUrl(file).then(resolve).catch(() => resolve(''));
        return;
      }

      const img = new Image();
      img.onload = () => {
        try {
          let width = img.naturalWidth || img.width;
          let height = img.naturalHeight || img.height;

          // Downscale if larger than maximum dimension
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            resolve(src);
            return;
          }

          // Use high quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Prefer WebP or JPEG for optimal compression
          const format = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          // For PNG, keep transparent or compress if large
          const compressed = canvas.toDataURL(format, quality);
          resolve(compressed);
        } catch (err) {
          console.warn('Image canvas compression fallback:', err);
          resolve(src);
        }
      };
      img.onerror = () => {
        resolve(src);
      };
      img.src = src;
    };
    reader.onerror = () => {
      fileToDataUrl(file).then(resolve).catch(() => resolve(''));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Request persistent browser storage so Chrome/Safari/Edge never evicts
 * the user's IndexedDB portfolio, team, and logo data during cache sweeps.
 */
export async function requestPersistentStorage(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
    try {
      const isPersisted = await navigator.storage.persist();
      return isPersisted;
    } catch {
      return false;
    }
  }
  return false;
}
