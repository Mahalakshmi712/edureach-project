// Internationalization (i18n) Utility
// Handles multi-language support

const i18n = {
  currentLang: 'en',
  
  translations: {
    en: {
      // Authentication
      'auth.login': 'Login',
      'auth.logout': 'Logout',
      'auth.username': 'Username',
      'auth.password': 'Password',
      'auth.forgot_password': 'Forgot Password?',
      'auth.welcome': 'Welcome to EduReach',
      'auth.subtitle': 'Remote Learning for Rural Education',
      
      // Roles
      'role.admin': 'Admin',
      'role.teacher': 'Teacher',
      'role.student': 'Student',
      'role.select': 'I am a:',
      
      // Common
      'common.loading': 'Loading...',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.submit': 'Submit',
      'common.back': 'Back',
      'common.next': 'Next',
      
      // Offline
      'offline.notification': 'You are offline. Some features may be limited.',
      'offline.sync': 'Syncing data...'
    },
    
    hi: {
      // Authentication
      'auth.login': 'लॉगिन करें',
      'auth.logout': 'लॉगआउट',
      'auth.username': 'उपयोगकर्ता नाम',
      'auth.password': 'पासवर्ड',
      'auth.forgot_password': 'पासवर्ड भूल गए?',
      'auth.welcome': 'EduReach में आपका स्वागत है',
      'auth.subtitle': 'ग्रामीण शिक्षा के लिए दूरस्थ शिक्षा',
      
      // Roles
      'role.admin': 'व्यवस्थापक',
      'role.teacher': 'शिक्षक',
      'role.student': 'छात्र',
      'role.select': 'मैं हूं:',
      
      // Common
      'common.loading': 'लोड हो रहा है...',
      'common.save': 'सहेजें',
      'common.cancel': 'रद्द करें',
      'common.delete': 'हटाएं',
      'common.edit': 'संपादित करें',
      'common.submit': 'जमा करें',
      'common.back': 'वापस',
      'common.next': 'अगला',
      
      // Offline
      'offline.notification': 'आप ऑफ़लाइन हैं। कुछ सुविधाएं सीमित हो सकती हैं।',
      'offline.sync': 'डेटा सिंक हो रहा है...'
    },
    
    kn: {
      // Authentication
      'auth.login': 'ಲಾಗಿನ್',
      'auth.logout': 'ಲಾಗ್ಔಟ್',
      'auth.username': 'ಬಳಕೆದಾರ ಹೆಸರು',
      'auth.password': 'ಪಾಸ್ವರ್ಡ್',
      'auth.forgot_password': 'ಪಾಸ್ವರ್ಡ್ ಮರೆತಿರಾ?',
      'auth.welcome': 'EduReach ಗೆ ಸ್ವಾಗತ',
      'auth.subtitle': 'ಗ್ರಾಮೀಣ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ದೂರಸ್ಥ ಕಲಿಕೆ',
      
      // Roles
      'role.admin': 'ನಿರ್ವಾಹಕ',
      'role.teacher': 'ಶಿಕ್ಷಕ',
      'role.student': 'ವಿದ್ಯಾರ್ಥಿ',
      'role.select': 'ನಾನು:',
      
      // Common
      'common.loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      'common.save': 'ಉಳಿಸಿ',
      'common.cancel': 'ರದ್ದುಮಾಡಿ',
      'common.delete': 'ಅಳಿಸಿ',
      'common.edit': 'ಸಂಪಾದಿಸಿ',
      'common.submit': 'ಸಲ್ಲಿಸಿ',
      'common.back': 'ಹಿಂದೆ',
      'common.next': 'ಮುಂದೆ'
    },
    
    te: {
      // Authentication
      'auth.login': 'లాగిన్',
      'auth.logout': 'లాగౌట్',
      'auth.username': 'వినియోగదారు పేరు',
      'auth.password': 'పాస్వర్డ్',
      'auth.forgot_password': 'పాస్వర్డ్ మరచిపోయారా?',
      'auth.welcome': 'EduReach కి స్వాగతం',
      'auth.subtitle': 'గ్రామీణ విద్యా కోసం రిమోట్ లెర్నింగ్',
      
      // Roles
      'role.admin': 'నిర్వాహకుడు',
      'role.teacher': 'ఉపాధ్యాయుడు',
      'role.student': 'విద్యార్థి',
      'role.select': 'నేను:',
      
      // Common
      'common.loading': 'లోడ్ అవుతోంది...',
      'common.save': 'సేవ్ చేయండి',
      'common.cancel': 'రద్దు చేయండి',
      'common.delete': 'తొలగించు',
      'common.edit': 'సవరించు',
      'common.submit': 'సమర్పించు',
      'common.back': 'వెనక్కి',
      'common.next': 'తదుపరి'
    }
  },
  
  init() {
    // Get saved language or use browser language
    const savedLang = localStorage.getItem('edureach_language');
    const browserLang = navigator.language.split('-')[0];
    
    this.currentLang = savedLang || (this.translations[browserLang] ? browserLang : 'en');
    this.applyLanguage();
    
    // Listen for language changes
    const langSelector = document.getElementById('language');
    if (langSelector) {
      langSelector.value = this.currentLang;
      langSelector.addEventListener('change', (e) => {
        this.setLanguage(e.target.value);
      });
    }
  },
  
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('edureach_language', lang);
      this.applyLanguage();
    }
  },
  
  translate(key) {
    return this.translations[this.currentLang][key] || key;
  },
  
  applyLanguage() {
    // Apply translations to elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.translate(key);
      
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    });
  }
};
