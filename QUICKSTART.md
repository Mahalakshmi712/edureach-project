# EduReach - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js 16+ installed
- Python 3.8+ installed
- MongoDB installed and running

### Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/edureach.git
cd edureach

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Step 2: Configure Environment

```bash
# In backend folder
cp .env.example .env

# Edit .env with your settings (at minimum set SECRET_KEY and JWT_SECRET_KEY)
```

### Step 3: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python run.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 4: Access the Application

Open your browser and go to:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

---

## 📁 Project Structure Overview

```
edureach/
├── frontend/           # PWA Frontend
│   ├── public/        # Static files & PWA manifest
│   └── src/           # JavaScript source code
│       ├── components/    # UI components
│       ├── modules/       # Feature modules (AI, WebRTC, etc.)
│       ├── utils/         # Utilities (DB, network, auth)
│       └── styles/        # CSS files
│
├── backend/            # Python Flask Backend
│   └── app/
│       ├── api/           # API routes
│       ├── models/        # Database models
│       ├── services/      # Business logic
│       ├── ai/            # AI modules (chatbot, voice, translation)
│       └── config/        # Configuration
│
├── jitsi-server/      # WebRTC server configuration
└── docs/              # Documentation
```

---

## 🎯 Default Test Credentials

For development/testing:

**Admin:**
- Username: `admin@edureach.com`
- Password: `admin123`

**Teacher:**
- Username: `teacher@edureach.com`
- Password: `teacher123`

**Student:**
- Username: `student@edureach.com`
- Password: `student123`

⚠️ **Change these in production!**

---

## 📱 Key Features to Test

### 1. **PWA Installation**
- Open the app in Chrome/Edge
- Click the install icon in the address bar
- App can now work offline!

### 2. **Live Classes**
- Login as Teacher
- Start a live class
- Login as Student (different browser)
- Join the live class

### 3. **Offline Mode**
- Disconnect from internet
- Try taking a quiz
- Reconnect - data syncs automatically

### 4. **AI Features**
- Voice to Notes (requires microphone)
- PDF Question Answering
- Multi-language Translation

### 5. **Interactive Simulations**
- Physics simulations
- Chemistry visualizations
- Circuit design

---

## 🔧 Development Tips

### Frontend Development
```bash
# Run with live reload
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Backend Development
```bash
# Run in debug mode
export FLASK_ENV=development
python run.py

# Run tests
pytest

# Code formatting
black app/
```

### Database
```bash
# Access MongoDB shell
mongo
> use edureach
> show collections

# View users
> db.users.find().pretty()
```

---

## 🐛 Common Issues & Solutions

### Issue: Port already in use
```bash
# Find process using port 5000
lsof -i :5000
# Kill process
kill -9 <PID>
```

### Issue: MongoDB connection failed
```bash
# Check MongoDB status
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

### Issue: Service Worker not updating
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear site data in browser DevTools

### Issue: CORS errors
- Check backend `.env` CORS_ORIGINS setting
- Ensure frontend URL is included

---

## 📚 Next Steps

1. **Read Full Documentation:**
   - [API Documentation](docs/API_DOCUMENTATION.md)
   - [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
   - [User Manual](docs/USER_MANUAL.md)

2. **Customize the App:**
   - Update branding (logo, colors)
   - Configure Jitsi server
   - Setup AWS S3 for media storage
   - Add custom features

3. **Deploy to Production:**
   - Follow [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
   - Setup SSL certificates
   - Configure domain
   - Setup monitoring

---

## 💡 Development Workflow

1. Create a new branch for features
2. Make changes
3. Test thoroughly (especially offline mode!)
4. Run tests: `npm test` and `pytest`
5. Create pull request
6. Review and merge

---

## 🤝 Getting Help

- **Documentation:** Check `/docs` folder
- **Issues:** Create GitHub issue
- **Email:** support@edureach.com
- **Community:** Join our Slack channel

---

## 📝 Important Notes

- **Offline-First:** Always test features in offline mode
- **Low-Bandwidth:** Test on throttled network (Chrome DevTools)
- **Mobile:** Test on actual mobile devices, not just emulators
- **Performance:** Monitor app load time and responsiveness
- **Security:** Never commit `.env` files or secrets

---

Happy Coding! 🎓✨
