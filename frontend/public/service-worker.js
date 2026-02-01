// EduReach Service Worker
// Handles offline caching and background sync

const CACHE_NAME = 'edureach-v1.0.0';
const OFFLINE_URL = '/index.html';

// Files to cache on install
const STATIC_CACHE_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/styles/main.css',
  '/src/config/constants.js',
  '/src/utils/indexedDB.js',
  '/src/utils/auth.js',
  '/src/utils/networkDetector.js',
  '/src/utils/i18n.js',
  '/assets/images/logo.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_CACHE_FILES).catch(err => {
          console.warn('[Service Worker] Some files failed to cache:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[Service Worker] Serving from cache:', request.url);
          return cachedResponse;
        }

        // Clone the request
        const fetchRequest = request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the new response
            caches.open(CACHE_NAME)
              .then((cache) => {
                // Only cache same-origin requests
                if (request.url.startsWith(self.location.origin)) {
                  cache.put(request, responseToCache);
                }
              });

            return response;
          })
          .catch((error) => {
            console.error('[Service Worker] Fetch failed:', error);
            
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            
            // Return error for other requests
            return new Response('Network error', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Background Sync - for offline quiz submissions, etc.
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);
  
  if (event.tag === 'sync-quiz-submissions') {
    event.waitUntil(syncQuizSubmissions());
  } else if (event.tag === 'sync-attendance') {
    event.waitUntil(syncAttendance());
  }
});

// Sync functions
async function syncQuizSubmissions() {
  try {
    // TODO: Implement quiz submission sync logic
    console.log('[Service Worker] Syncing quiz submissions...');
    // Get pending submissions from IndexedDB
    // POST to server
    // Remove from IndexedDB on success
  } catch (error) {
    console.error('[Service Worker] Sync failed:', error);
    throw error; // Retry on failure
  }
}

async function syncAttendance() {
  try {
    console.log('[Service Worker] Syncing attendance...');
    // TODO: Implement attendance sync logic
  } catch (error) {
    console.error('[Service Worker] Attendance sync failed:', error);
    throw error;
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'EduReach Notification';
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: data
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

// Message from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
