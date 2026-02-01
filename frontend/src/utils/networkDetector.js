// Network Quality Detector
// Detects network quality and adjusts app behavior accordingly

class NetworkDetector {
  constructor() {
    this.isOnline = navigator.onLine;
    this.quality = 'unknown';
    this.speed = 0;
    this.listeners = [];
  }

  // Initialize network monitoring
  init() {
    this.updateOnlineStatus();
    this.detectNetworkQuality();
    
    // Listen for online/offline events
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
    
    // Periodic quality check
    setInterval(() => {
      if (this.isOnline) {
        this.detectNetworkQuality();
      }
    }, CONFIG.NETWORK.QUALITY_CHECK_INTERVAL);

    console.log('Network detector initialized');
  }

  // Update online status
  updateOnlineStatus() {
    this.isOnline = navigator.onLine;
    this.notifyListeners();
  }

  // Handle online event
  handleOnline() {
    console.log('Network: Back online');
    this.isOnline = true;
    this.hideOfflineNotification();
    this.detectNetworkQuality();
    this.syncOfflineData();
    this.notifyListeners();
  }

  // Handle offline event
  handleOffline() {
    console.log('Network: Gone offline');
    this.isOnline = false;
    this.quality = 'offline';
    this.showOfflineNotification();
    this.notifyListeners();
  }

  // Detect network quality using download speed test
  async detectNetworkQuality() {
    if (!this.isOnline) {
      this.quality = 'offline';
      return;
    }

    try {
      // Use Network Information API if available
      if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (connection) {
          const downlink = connection.downlink; // Mbps
          this.speed = downlink;
          
          // Determine quality based on downlink
          if (downlink > 1) {
            this.quality = 'high';
          } else if (downlink > 0.5) {
            this.quality = 'medium';
          } else if (downlink > 0.1) {
            this.quality = 'low';
          } else {
            this.quality = 'very_low';
          }
          
          console.log(`Network quality: ${this.quality} (${downlink} Mbps)`);
          this.notifyListeners();
          return;
        }
      }

      // Fallback: Simple ping test
      await this.performPingTest();
      
    } catch (error) {
      console.error('Network quality detection failed:', error);
      this.quality = 'unknown';
    }
  }

  // Perform simple ping test
  async performPingTest() {
    const startTime = performance.now();
    const imageUrl = `${CONFIG.API.BASE_URL}/ping?t=${Date.now()}`;
    
    try {
      const response = await fetch(imageUrl, { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      
      const endTime = performance.now();
      const latency = endTime - startTime;
      
      // Estimate quality based on latency
      if (latency < 100) {
        this.quality = 'high';
      } else if (latency < 300) {
        this.quality = 'medium';
      } else if (latency < 1000) {
        this.quality = 'low';
      } else {
        this.quality = 'very_low';
      }
      
      console.log(`Network latency: ${latency.toFixed(0)}ms, Quality: ${this.quality}`);
      this.notifyListeners();
      
    } catch (error) {
      console.error('Ping test failed:', error);
      this.quality = 'poor';
    }
  }

  // Get recommended video quality based on network
  getRecommendedVideoQuality() {
    const qualityMap = {
      'high': CONFIG.VIDEO_QUALITY.HIGH,
      'medium': CONFIG.VIDEO_QUALITY.MEDIUM,
      'low': CONFIG.VIDEO_QUALITY.LOW,
      'very_low': CONFIG.VIDEO_QUALITY.AUDIO_ONLY,
      'offline': CONFIG.VIDEO_QUALITY.AUDIO_ONLY,
      'unknown': CONFIG.VIDEO_QUALITY.LOW
    };
    
    return qualityMap[this.quality] || CONFIG.VIDEO_QUALITY.LOW;
  }

  // Show offline notification
  showOfflineNotification() {
    const notification = document.getElementById('offline-notification');
    if (notification) {
      notification.style.display = 'block';
    }
  }

  // Hide offline notification
  hideOfflineNotification() {
    const notification = document.getElementById('offline-notification');
    if (notification) {
      notification.style.display = 'none';
    }
  }

  // Sync offline data when back online
  async syncOfflineData() {
    console.log('Syncing offline data...');
    
    try {
      // Get unsynced items from IndexedDB
      if (typeof dbManager !== 'undefined') {
        const unsyncedItems = await dbManager.getUnsyncedQueue();
        
        if (unsyncedItems && unsyncedItems.length > 0) {
          console.log(`Found ${unsyncedItems.length} items to sync`);
          
          for (const item of unsyncedItems) {
            try {
              // Attempt to sync each item
              await this.syncItem(item);
              await dbManager.markQueueItemSynced(item.id);
            } catch (error) {
              console.error('Failed to sync item:', item.id, error);
            }
          }
        }
      }
      
      // Trigger service worker sync
      if ('serviceWorker' in navigator && 'sync' in navigator.serviceWorker) {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register('sync-quiz-submissions');
        await registration.sync.register('sync-attendance');
      }
      
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }

  // Sync individual item
  async syncItem(item) {
    // TODO: Implement actual API calls based on item.action
    console.log('Syncing item:', item);
    
    const response = await fetch(`${CONFIG.API.BASE_URL}/${item.action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(CONFIG.SESSION.TOKEN_KEY)}`
      },
      body: JSON.stringify(item.data)
    });
    
    if (!response.ok) {
      throw new Error(`Sync failed: ${response.statusText}`);
    }
    
    return await response.json();
  }

  // Add listener for network changes
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  // Notify all listeners
  notifyListeners() {
    const status = {
      isOnline: this.isOnline,
      quality: this.quality,
      speed: this.speed
    };
    
    this.listeners.forEach(callback => {
      try {
        callback(status);
      } catch (error) {
        console.error('Listener error:', error);
      }
    });
  }

  // Get current network status
  getStatus() {
    return {
      isOnline: this.isOnline,
      quality: this.quality,
      speed: this.speed,
      recommendedVideoQuality: this.getRecommendedVideoQuality()
    };
  }
}

// Create global instance
const NetworkDetector = new NetworkDetector();
