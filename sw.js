// Service Worker for CareerBoost PWA
const CACHE_NAME = 'careerboost-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('Service Worker: Install event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: All files cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Cache failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activate event');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return response;
        }

        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response as it can only be consumed once
          const responseToCache = response.clone();

          // Add to cache for future use
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(error => {
          console.error('Service Worker: Fetch failed', error);
          
          // Return offline page for navigation requests
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
          
          // Return a generic offline response for other requests
          return new Response('Offline - Content not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'background-sync-resume') {
    event.waitUntil(syncResumeData());
  }
  
  if (event.tag === 'background-sync-job-application') {
    event.waitUntil(syncJobApplications());
  }
});

// Push notification handling
self.addEventListener('push', event => {
  console.log('Service Worker: Push received', event);
  
  const options = {
    body: event.data ? event.data.text() : 'New career opportunity available!',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f393.png',
    badge: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f393.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Jobs',
        icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4bc.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/274c.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('CareerBoost', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification click received', event);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/#jobs')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling from main thread
self.addEventListener('message', event => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_RESUME_DATA') {
    cacheResumeData(event.data.payload);
  }
});

// Helper functions
async function syncResumeData() {
  try {
    const resumeData = await getStoredResumeData();
    if (resumeData) {
      // In a real app, sync with server
      console.log('Service Worker: Syncing resume data', resumeData);
      // await fetch('/api/sync-resume', { method: 'POST', body: JSON.stringify(resumeData) });
    }
  } catch (error) {
    console.error('Service Worker: Resume sync failed', error);
  }
}

async function syncJobApplications() {
  try {
    const applications = await getStoredJobApplications();
    if (applications && applications.length > 0) {
      // In a real app, sync with server
      console.log('Service Worker: Syncing job applications', applications);
      // await fetch('/api/sync-applications', { method: 'POST', body: JSON.stringify(applications) });
    }
  } catch (error) {
    console.error('Service Worker: Job applications sync failed', error);
  }
}

async function getStoredResumeData() {
  return new Promise((resolve) => {
    // Access IndexedDB or localStorage through clients
    self.clients.matchAll().then(clients => {
      if (clients.length > 0) {
        clients[0].postMessage({ type: 'GET_RESUME_DATA' });
      }
      resolve(null);
    });
  });
}

async function getStoredJobApplications() {
  return new Promise((resolve) => {
    // Access IndexedDB or localStorage through clients
    self.clients.matchAll().then(clients => {
      if (clients.length > 0) {
        clients[0].postMessage({ type: 'GET_JOB_APPLICATIONS' });
      }
      resolve([]);
    });
  });
}

async function cacheResumeData(data) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
    await cache.put('/cached-resume-data', response);
    console.log('Service Worker: Resume data cached');
  } catch (error) {
    console.error('Service Worker: Failed to cache resume data', error);
  }
}

// Periodic background sync (if supported)
self.addEventListener('periodicsync', event => {
  console.log('Service Worker: Periodic sync', event.tag);
  
  if (event.tag === 'job-updates') {
    event.waitUntil(fetchJobUpdates());
  }
});

async function fetchJobUpdates() {
  try {
    // In a real app, fetch latest job postings
    console.log('Service Worker: Fetching job updates');
    // const response = await fetch('/api/jobs/latest');
    // const jobs = await response.json();
    
    // Show notification if new jobs are available
    // if (jobs.length > 0) {
    //   self.registration.showNotification('New Jobs Available!', {
    //     body: `${jobs.length} new job opportunities match your profile`,
    //     icon: '/icon-192.png',
    //     tag: 'job-updates'
    //   });
    // }
  } catch (error) {
    console.error('Service Worker: Failed to fetch job updates', error);
  }
}

// Handle app shortcuts
self.addEventListener('notificationclick', event => {
  if (event.action === 'resume-builder') {
    event.waitUntil(clients.openWindow('/#resume'));
  } else if (event.action === 'job-search') {
    event.waitUntil(clients.openWindow('/#jobs'));
  } else if (event.action === 'career-guide') {
    event.waitUntil(clients.openWindow('/#career'));
  } else if (event.action === 'interview-prep') {
    event.waitUntil(clients.openWindow('/#interview'));
  }
});

// Error handling
self.addEventListener('error', event => {
  console.error('Service Worker: Error', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('Service Worker: Unhandled promise rejection', event.reason);
});

console.log('Service Worker: Loaded successfully');