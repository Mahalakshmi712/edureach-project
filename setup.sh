#!/bin/bash

# EduReach Setup Script
# Automated setup for development environment

echo "=================================="
echo "  EduReach Setup Script"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo "Please install Node.js 16+ from https://nodejs.org"
    exit 1
else
    echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}✗ Python3 is not installed${NC}"
    echo "Please install Python 3.8+ from https://python.org"
    exit 1
else
    echo -e "${GREEN}✓ Python3 found: $(python3 --version)${NC}"
fi

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo -e "${YELLOW}⚠ MongoDB is not installed${NC}"
    echo "Please install MongoDB from https://www.mongodb.com/try/download/community"
    echo "Or run: sudo apt-get install mongodb (Ubuntu/Debian)"
else
    echo -e "${GREEN}✓ MongoDB found${NC}"
fi

echo ""
echo "Setting up Frontend..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${RED}✗ Frontend installation failed${NC}"
    exit 1
fi

echo ""
echo "Setting up Backend..."
cd ../backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${RED}✗ Backend installation failed${NC}"
    exit 1
fi

# Setup environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file${NC}"
    echo -e "${YELLOW}⚠ Please edit backend/.env with your configuration${NC}"
else
    echo -e "${YELLOW}⚠ .env file already exists${NC}"
fi

cd ..

echo ""
echo "=================================="
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your configuration"
echo "2. Start MongoDB: sudo systemctl start mongod"
echo "3. Start backend:"
echo "   cd backend && source venv/bin/activate && python run.py"
echo "4. Start frontend (new terminal):"
echo "   cd frontend && npm run dev"
echo "5. Open http://localhost:3000 in your browser"
echo ""
echo "For more info, see QUICKSTART.md"
echo ""
