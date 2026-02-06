# EduReach – Remote Classroom for Rural Colleges 🌱📚

EduReach is a **low-bandwidth, offline-capable remote learning web application** designed specifically for rural colleges. The platform focuses on accessibility, AI-assisted learning, and smooth performance on low-end devices with unstable internet connectivity.

## 🚀 Project Overview
Many rural institutions struggle with reliable internet access and advanced digital infrastructure. EduReach bridges this gap by providing:
* Audio-first live classes
* Offline learning support using PWA
* AI-powered doubt solving and voice features
* Simple, mobile-first user interface
The application ensures inclusive and uninterrupted learning for students and teachers in low-resource environments.

## 👥 User Roles
* **Admin**
* **Teacher**
* **Student**
Each role has dedicated features and access control.

## ✨ Key Features
### 🛠 Admin Portal
* Manage teachers and students
* Assign classes and subjects
* Monitor teacher performance
* View student progress and reports
* Manage recorded sessions and assessments

### 👨‍🏫 Teacher Portal
* Start low-bandwidth live classes (WebRTC)
* Audio-first streaming with screen sharing
* Upload compressed videos, PDFs, notes, and assignments
* Conduct quizzes (offline-enabled)
* Track student performance
* Send announcements and notifications

### 👩‍🎓 Student Portal
* Attend live classes with adaptive quality
* Audio-only fallback for poor networks
* Access recorded sessions
* Offline quizzes and notes using PWA
* Interactive simulations (Physics, Chemistry, Circuits)
* Progress dashboard

## 🤖 AI-Powered Modules
* **AI Chatbot**
  * PDF-based question answering
  * TF-IDF + cosine similarity
  * Works offline for preloaded content

* **Voice-to-Notes**
  * Converts teacher speech into text
  * Supports local languages

* **Notes Translation & TTS**
  * Translate study material into regional languages
  * Text-to-speech support

## 🧰 Tech Stack
### Frontend
* HTML5, CSS3, JavaScript (ES6)
* Progressive Web App (PWA)
* Service Workers & IndexedDB
* Chart.js for analytics

### Backend
* Python (Flask / FastAPI) or Node.js
* JWT-based authentication
* WebRTC (Jitsi SFU)

### Database & Storage
* MongoDB / Firebase Firestore / PostgreSQL
* IndexedDB for offline data
* AWS S3 / Firebase / Local storage

## 📡 Live Class Infrastructure
* WebRTC with SFU architecture
* Opus audio codec (audio-first)
* VP8 / VP9 video codec
* Automatic bandwidth adaptation
* Auto-reconnect during network drops

## 📱 Offline & Accessibility Support
* Fully offline quizzes and notes
* Cached simulations and chatbot PDFs
* Works on devices with **1 GB RAM**
* Multi-language support:
  * English
  * Hindi
  * Kannada
  * Telugu

## 🔐 Security
* JWT authentication
* Encrypted live class communication (DTLS/SRTP)
* Secure webcam and microphone access
* Offline data isolation

## ⚡ Performance Goals
* App load time under **2 seconds**
* Live class latency below **300 ms**
* Storage usage under **100 MB**
* Optimized for low-speed networks

## 🚀 Deployment
* AWS / DigitalOcean / Firebase Hosting
* Dedicated Jitsi server
* HTTPS with SSL
* Optional CI/CD pipeline

## 📌 Project Status
🚧 **Currently under development**
This project is being built as an academic and real-world impact-oriented solution.

## 🤝 Contributions
Contributions, suggestions, and feedback are welcome!
Feel free to fork the repository and raise a pull request.

## 📄 License
This project is for **educational and academic purposes**.
