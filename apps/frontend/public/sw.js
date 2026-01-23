self.addEventListener('install', event => {
  console.log('Service Worker installing')
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  console.log('Service Worker activated')
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  // just pass through for now
})

self.addEventListener('message', event => {
  if (event.data === 'UPLOAD_NOW') {
    uploadPendingImages()
  }
})