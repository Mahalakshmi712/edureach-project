# EduReach Deployment Guide

## Prerequisites

### System Requirements
- Ubuntu 20.04+ / Debian 10+ / CentOS 8+
- 4GB RAM minimum (8GB recommended)
- 50GB storage
- Domain name with SSL certificate

### Software Requirements
- Node.js 16+
- Python 3.8+
- MongoDB 5.0+ / PostgreSQL 13+
- Docker & Docker Compose
- Nginx

---

## Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/edureach.git
cd edureach
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

### 3. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Run server
python run.py
```

Backend will run on `http://localhost:5000`

### 4. Database Setup

**MongoDB:**
```bash
# Install MongoDB
sudo apt-get install mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Create database
mongo
> use edureach
```

**PostgreSQL (Alternative):**
```bash
# Install PostgreSQL
sudo apt-get install postgresql

# Create database
sudo -u postgres psql
postgres=# CREATE DATABASE edureach;
postgres=# CREATE USER edureach_user WITH PASSWORD 'your_password';
postgres=# GRANT ALL PRIVILEGES ON DATABASE edureach TO edureach_user;
```

### 5. Jitsi Server Setup
```bash
cd jitsi-server
docker-compose up -d
```

---

## Production Deployment

### Option 1: VPS Deployment (DigitalOcean/AWS/Vultr)

#### Step 1: Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python
sudo apt-get install python3 python3-pip python3-venv

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Nginx
sudo apt-get install nginx
```

#### Step 2: Clone and Setup Project
```bash
cd /var/www
sudo git clone https://github.com/yourusername/edureach.git
sudo chown -R $USER:$USER edureach
cd edureach
```

#### Step 3: Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn

# Setup environment
cp .env.example .env
nano .env  # Edit configuration
```

#### Step 4: Create Systemd Service
```bash
sudo nano /etc/systemd/system/edureach-backend.service
```

Add:
```ini
[Unit]
Description=EduReach Backend
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/edureach/backend
Environment="PATH=/var/www/edureach/backend/venv/bin"
ExecStart=/var/www/edureach/backend/venv/bin/gunicorn --workers 4 --bind 0.0.0.0:5000 app.main:app

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl start edureach-backend
sudo systemctl enable edureach-backend
```

#### Step 5: Frontend Build
```bash
cd /var/www/edureach/frontend
npm install
npm run build
```

#### Step 6: Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/edureach
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend
    location / {
        root /var/www/edureach/frontend/public;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/edureach /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 7: SSL Certificate (Let's Encrypt)
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Option 2: Docker Deployment

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:5.0
    volumes:
      - mongo-data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: your_password
    restart: always

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://admin:your_password@mongodb:27017/edureach
    depends_on:
      - mongodb
    restart: always

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    restart: always

  jitsi:
    build: ./jitsi-server
    ports:
      - "8443:8443"
    restart: always

volumes:
  mongo-data:
```

Deploy:
```bash
docker-compose up -d
```

---

## Jitsi Server Setup (Dedicated)

For production, host Jitsi on separate server:

```bash
# On Ubuntu 20.04 LTS
sudo apt update
sudo apt install -y gnupg2 nginx-full

# Add Jitsi repository
sudo curl -sL https://download.jitsi.org/jitsi-key.gpg.key | sudo apt-key add -
sudo sh -c "echo 'deb https://download.jitsi.org stable/' > /etc/apt/sources.list.d/jitsi-stable.list"
sudo apt update

# Install Jitsi
sudo apt install -y jitsi-meet

# Follow prompts to setup domain and SSL
```

Update backend `.env`:
```
JITSI_DOMAIN=meet.your-domain.com
```

---

## Monitoring & Logging

### Setup PM2 (Alternative to Systemd)
```bash
npm install -g pm2
cd /var/www/edureach/backend
pm2 start run.py --name edureach-backend --interpreter python3
pm2 save
pm2 startup
```

### Log Monitoring
```bash
# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Backend logs
journalctl -u edureach-backend -f

# PM2 logs
pm2 logs edureach-backend
```

---

## Backup Strategy

### Database Backup
```bash
# MongoDB
mongodump --out /backup/mongo-$(date +%Y%m%d)

# Automated daily backup
crontab -e
# Add: 0 2 * * * mongodump --out /backup/mongo-$(date +\%Y\%m\%d)
```

### File Backup
```bash
# Backup uploads folder
tar -czf /backup/uploads-$(date +%Y%m%d).tar.gz /var/www/edureach/backend/uploads
```

---

## Performance Optimization

1. **Enable Gzip in Nginx**
2. **Setup CDN for static assets**
3. **Enable Redis caching**
4. **Database indexing** (already configured)
5. **Load balancing** for high traffic

---

## Security Checklist

- [ ] Change all default passwords
- [ ] Setup firewall (UFW)
- [ ] Enable fail2ban
- [ ] Regular security updates
- [ ] SSL/TLS certificates
- [ ] Secure MongoDB/PostgreSQL
- [ ] Environment variables protection
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Input validation

---

## Troubleshooting

### Common Issues

**Backend not starting:**
```bash
sudo systemctl status edureach-backend
sudo journalctl -u edureach-backend -n 50
```

**Database connection failed:**
```bash
sudo systemctl status mongod
mongo  # Test connection
```

**Nginx errors:**
```bash
sudo nginx -t
sudo systemctl status nginx
```

---

## Support

For deployment issues, contact: devops@edureach.com
