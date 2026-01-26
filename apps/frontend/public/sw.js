self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // just pass through for now
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'UPLOAD_IMAGES') {
    uploadImagesFromIndexedDB();
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'upload-images') {
    event.waitUntil(uploadImagesFromIndexedDB());
  }
});

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('offline-db', 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('uploads')) {
        db.createObjectStore('uploads', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function uploadImagesFromIndexedDB() {
  const db = await openDB();
  const tx = db.transaction('uploads', 'readwrite');
  const store = tx.objectStore('uploads');

  const images = await new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  for (const image of images) {
    try {
      await uploadSingleImage(image);
      await new Promise((resolve, reject) => {
        const deleteRequest = store.delete(image.id);
        deleteRequest.onsuccess = () => resolve();
        deleteRequest.onerror = () => reject(deleteRequest.error);
      });
      console.log('Uploaded & removed:', image.id);
    } catch (err) {
      console.error('Upload failed, will retry:', err);
    }
  }

  await new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function uploadSingleImage(image) {
  const formData = new FormData();
  console.log('Uploading image:', image.file.name);
  formData.append('id', image.id);
  formData.append('file', image.file, image.file.name || 'image.jpg');

  const res = await fetch(
    'http://localhost:3000/api/lead-intake-funnel/upload',
    {
      method: 'POST',
      body: formData,
      // credentials: 'include', // if cookies needed
    },
  );

  if (!res.ok) {
    throw new Error('Upload failed');
  }
}
