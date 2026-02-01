// IndexedDB Utility for Offline Storage
// Provides a simple API for storing and retrieving data offline

class IndexedDBManager {
  constructor(dbName = CONFIG.STORAGE.DB_NAME, version = CONFIG.STORAGE.DB_VERSION) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
  }

  // Initialize database
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('IndexedDB initialized successfully');
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object stores if they don't exist
        const stores = CONFIG.STORAGE.STORES;
        
        if (!db.objectStoreNames.contains(stores.USERS)) {
          db.createObjectStore(stores.USERS, { keyPath: 'id', autoIncrement: true });
        }
        
        if (!db.objectStoreNames.contains(stores.COURSES)) {
          const courseStore = db.createObjectStore(stores.COURSES, { keyPath: 'id', autoIncrement: true });
          courseStore.createIndex('teacherId', 'teacherId', { unique: false });
        }
        
        if (!db.objectStoreNames.contains(stores.QUIZZES)) {
          const quizStore = db.createObjectStore(stores.QUIZZES, { keyPath: 'id', autoIncrement: true });
          quizStore.createIndex('courseId', 'courseId', { unique: false });
          quizStore.createIndex('isOffline', 'isOffline', { unique: false });
        }
        
        if (!db.objectStoreNames.contains(stores.SUBMISSIONS)) {
          const submissionStore = db.createObjectStore(stores.SUBMISSIONS, { keyPath: 'id', autoIncrement: true });
          submissionStore.createIndex('studentId', 'studentId', { unique: false });
          submissionStore.createIndex('quizId', 'quizId', { unique: false });
          submissionStore.createIndex('synced', 'synced', { unique: false });
        }
        
        if (!db.objectStoreNames.contains(stores.NOTES)) {
          const notesStore = db.createObjectStore(stores.NOTES, { keyPath: 'id', autoIncrement: true });
          notesStore.createIndex('courseId', 'courseId', { unique: false });
        }
        
        if (!db.objectStoreNames.contains(stores.VIDEOS)) {
          const videoStore = db.createObjectStore(stores.VIDEOS, { keyPath: 'id', autoIncrement: true });
          videoStore.createIndex('courseId', 'courseId', { unique: false });
        }
        
        if (!db.objectStoreNames.contains(stores.OFFLINE_QUEUE)) {
          const queueStore = db.createObjectStore(stores.OFFLINE_QUEUE, { keyPath: 'id', autoIncrement: true });
          queueStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
        
        console.log('Object stores created/updated');
      };
    });
  }

  // Generic method to add data to a store
  async add(storeName, data) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => {
        console.log(`Data added to ${storeName}:`, request.result);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error(`Error adding to ${storeName}:`, request.error);
        reject(request.error);
      };
    });
  }

  // Generic method to get data by ID
  async get(storeName, id) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  // Generic method to get all data from a store
  async getAll(storeName) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  // Generic method to update data
  async update(storeName, data) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => {
        console.log(`Data updated in ${storeName}`);
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  // Generic method to delete data
  async delete(storeName, id) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log(`Data deleted from ${storeName}`);
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  // Get data by index
  async getByIndex(storeName, indexName, value) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  // Clear all data from a store
  async clear(storeName) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => {
        console.log(`${storeName} cleared`);
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  // Get storage size estimate
  async getStorageEstimate() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return {
        usage: estimate.usage,
        quota: estimate.quota,
        percentUsed: ((estimate.usage / estimate.quota) * 100).toFixed(2)
      };
    }
    return null;
  }

  // Add to offline queue for later sync
  async addToOfflineQueue(action, data) {
    const queueItem = {
      action,
      data,
      timestamp: new Date().getTime(),
      synced: false
    };
    return await this.add(CONFIG.STORAGE.STORES.OFFLINE_QUEUE, queueItem);
  }

  // Get unsynced items from offline queue
  async getUnsyncedQueue() {
    return await this.getByIndex(CONFIG.STORAGE.STORES.OFFLINE_QUEUE, 'synced', false);
  }

  // Mark queue item as synced
  async markQueueItemSynced(id) {
    const item = await this.get(CONFIG.STORAGE.STORES.OFFLINE_QUEUE, id);
    if (item) {
      item.synced = true;
      item.syncedAt = new Date().getTime();
      return await this.update(CONFIG.STORAGE.STORES.OFFLINE_QUEUE, item);
    }
  }
}

// Create global instance
const dbManager = new IndexedDBManager();

// Auto-initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    dbManager.init().catch(err => console.error('Failed to init IndexedDB:', err));
  });
} else {
  dbManager.init().catch(err => console.error('Failed to init IndexedDB:', err));
}
