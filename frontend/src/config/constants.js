// EduReach Configuration Constants

const CONFIG = {
  // API Configuration
  API: {
    BASE_URL: 'http://localhost:5000/api',
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3,
  },

  // Jitsi Configuration
  JITSI: {
    DOMAIN: 'meet.jit.si', // Replace with your own Jitsi server
    ROOM_PREFIX: 'edureach_',
    CONFIG: {
      startWithAudioMuted: false,
      startWithVideoMuted: true,
      enableWelcomePage: false,
      prejoinPageEnabled: false,
      disableDeepLinking: true,
    },
    INTERFACE_CONFIG: {
      TOOLBAR_BUTTONS: [
        'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'chat', 'raisehand',
        'videoquality', 'filmstrip', 'stats', 'shortcuts',
        'tileview', 'help'
      ],
      SHOW_JITSI_WATERMARK: false,
      SHOW_BRAND_WATERMARK: false,
      SHOW_WATERMARK_FOR_GUESTS: false,
    }
  },

  // Storage Configuration
  STORAGE: {
    DB_NAME: 'edureach_db',
    DB_VERSION: 1,
    MAX_CACHE_SIZE: 100 * 1024 * 1024, // 100 MB
    STORES: {
      USERS: 'users',
      COURSES: 'courses',
      QUIZZES: 'quizzes',
      SUBMISSIONS: 'submissions',
      NOTES: 'notes',
      VIDEOS: 'videos',
      OFFLINE_QUEUE: 'offline_queue'
    }
  },

  // Upload Configuration
  UPLOAD: {
    MAX_FILE_SIZE: 50 * 1024 * 1024, // 50 MB
    ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    CHUNK_SIZE: 1024 * 1024, // 1 MB chunks for upload
  },

  // Network Configuration
  NETWORK: {
    QUALITY_CHECK_INTERVAL: 5000, // 5 seconds
    BANDWIDTH_THRESHOLDS: {
      HIGH: 1000, // > 1 Mbps
      MEDIUM: 500, // 500 Kbps - 1 Mbps
      LOW: 100, // 100 Kbps - 500 Kbps
      VERY_LOW: 0 // < 100 Kbps
    }
  },

  // Video Quality Presets
  VIDEO_QUALITY: {
    HIGH: { width: 1280, height: 720, bitrate: 2500 },
    MEDIUM: { width: 854, height: 480, bitrate: 1000 },
    LOW: { width: 640, height: 360, bitrate: 500 },
    AUDIO_ONLY: { width: 0, height: 0, bitrate: 64 }
  },

  // Language Configuration
  LANGUAGES: {
    en: { name: 'English', code: 'en' },
    hi: { name: 'हिंदी', code: 'hi' },
    kn: { name: 'ಕನ್ನಡ', code: 'kn' },
    te: { name: 'తెలుగు', code: 'te' }
  },

  // AI Configuration
  AI: {
    CHATBOT: {
      MAX_TOKENS: 500,
      TEMPERATURE: 0.7,
      SIMILARITY_THRESHOLD: 0.3
    },
    VOICE: {
      LANGUAGE: 'en-IN',
      RATE: 1.0,
      PITCH: 1.0
    }
  },

  // Quiz Configuration
  QUIZ: {
    TIME_WARNING_THRESHOLD: 300, // 5 minutes
    AUTO_SAVE_INTERVAL: 30000, // 30 seconds
    MAX_ATTEMPTS: 3
  },

  // Proctoring Configuration
  PROCTORING: {
    FACE_DETECTION_INTERVAL: 5000, // 5 seconds
    WARNING_THRESHOLD: 3,
    SNAPSHOT_INTERVAL: 30000 // 30 seconds
  },

  // User Roles
  ROLES: {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    STUDENT: 'student'
  },

  // Session Configuration
  SESSION: {
    TOKEN_KEY: 'edureach_token',
    USER_KEY: 'edureach_user',
    EXPIRY_TIME: 24 * 60 * 60 * 1000 // 24 hours
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
