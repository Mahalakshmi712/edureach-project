# EduReach - Remote Classroom for Rural Colleges

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-development-yellow.svg)

## 📚 Overview

EduReach is a low-bandwidth, offline-capable remote learning platform designed specifically for rural colleges. It provides AI-assisted learning, voice support, and interactive features while ensuring accessibility on low-end devices with unstable internet connections.

## ✨ Key Features

### 👨‍💼 Admin Portal
- User management (Teachers & Students)
- Class and subject management
- Performance analytics and reports
- Content moderation

### 👨‍🏫 Teacher Portal
- Live classes with WebRTC (Jitsi)
- Content upload (videos, PDFs, notes)
- Quiz creation and management
- Student progress tracking
- Real-time announcements

### 👨‍🎓 Student Portal
- Low-bandwidth live classes
- Offline learning capabilities
- Interactive simulations (Physics, Chemistry, Circuits)
- AI chatbot for doubt resolution
- Voice-to-notes conversion
- Multi-language translation
- Video-proctored examinations

## 🛠️ Tech Stack

### Frontend
- **Core**: HTML5, CSS3, JavaScript (ES6)
- **Architecture**: Progressive Web App (PWA)
- **Storage**: IndexedDB
- **Caching**: Service Workers
- **Visualization**: Chart.js
- **WebRTC**: Jitsi Meet API

### Backend
- **Framework**: Python Flask/FastAPI
- **Authentication**: JWT
- **Media Storage**: AWS S3 / Firebase / Local
- **Live Streaming**: Jitsi Videobridge + Jicofo

### AI Modules
- **Chatbot**: TF-IDF + Cosine Similarity
- **Speech-to-Text**: Faster-Whisper
- **Translation**: Deep-Translator
- **Text-to-Speech**: gTTS
- **Proctoring**: OpenCV.js

### Database
- **Primary**: MongoDB / PostgreSQL / Firebase Firestore
- **Offline**: IndexedDB

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+
- MongoDB/PostgreSQL
- Docker (for Jitsi server)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/edureach.git
cd edureach
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

3. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

4. **Jitsi Server Setup**
```bash
cd jitsi-server
docker-compose up -d
```

## 📖 Documentation

- [API Documentation](docs/API_DOCUMENTATION.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [User Manual](docs/USER_MANUAL.md)
- [Testing Report](docs/TESTING_REPORT.md)

## 🌍 Supported Languages

- English
- Hindi
- Kannada
- Telugu

## 📱 Device Requirements

- **Minimum RAM**: 1 GB
- **Storage**: ~100 MB
- **Network**: Works on 2G/3G/4G (adaptive quality)
- **Browser**: Chrome 80+, Firefox 75+, Safari 13+

## 🔒 Security Features

- JWT-based authentication
- Encrypted live communications (DTLS/SRTP)
- Secure webcam/microphone permissions
- Local data encryption

## 📊 Performance Targets

- App load time: < 2 seconds (4G)
- Live class latency: < 300ms
- Storage usage: < 100 MB
- Smooth operation on 1GB RAM devices

## 🤝 Contributing

Contributions are welcome! Please read CONTRIBUTING.md for details.

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

**Made with ❤️ for Rural Education**
