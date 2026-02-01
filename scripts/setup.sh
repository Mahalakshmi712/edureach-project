#!/bin/bash

# EduReach Setup Script
# This script sets up the development environment for EduReach

echo "========================================="
echo "   EduReach Setup Script"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if Node.js is installed
check_nodejs() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v)
        print_success "Node.js is installed: $NODE_VERSION"
        return 0
    else
        print_error "Node.js is not installed"
        print_info "Please install Node.js 16+ from https://nodejs.org/"
        return 1
    fi
}

# Check if Python is installed
check_python() {
    if command -v python3 &> /dev/null; then
        PYTHON_VERSION=$(python3 --version)
        print_success "Python is installed: $PYTHON_VERSION"
        return 0
    else
        print_error "Python 3 is not installed"
        print_info "Please install Python 3.9+ from https://python.org/"
        return 1
    fi
}

# Check if MongoDB is installed
check_mongodb() {
    if command -v mongod &> /dev/null; then
        MONGO_VERSION=$(mongod --version | head -n 1)
        print_success "MongoDB is installed"
        return 0
    else
        print_error "MongoDB is not installed"
        print_info "Please install MongoDB from https://www.mongodb.com/try/download/community"
        print_info "Or use Docker: docker run -d -p 27017:27017 mongo:6.0"
        return 1
    fi
}

# Setup frontend
setup_frontend() {
    print_info "Setting up frontend..."
    
    cd frontend
    
    if [ -f "package.json" ]; then
        npm install
        if [ $? -eq 0 ]; then
            print_success "Frontend dependencies installed"
        else
            print_error "Failed to install frontend dependencies"
            return 1
        fi
    else
        print_error "package.json not found in frontend directory"
        return 1
    fi
    
    cd ..
    return 0
}

# Setup backend
setup_backend() {
    print_info "Setting up backend..."
    
    cd backend
    
    # Create virtual environment
    if [ ! -d "venv" ]; then
        python3 -m venv venv
        print_success "Virtual environment created"
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install dependencies
    if [ -f "requirements.txt" ]; then
        pip install --upgrade pip
        pip install -r requirements.txt
        if [ $? -eq 0 ]; then
            print_success "Backend dependencies installed"
        else
            print_error "Failed to install backend dependencies"
            return 1
        fi
    else
        print_error "requirements.txt not found in backend directory"
        return 1
    fi
    
    # Create .env file if it doesn't exist
    if [ ! -f ".env" ]; then
        cp .env.example .env
        print_success "Created .env file from template"
        print_info "Please edit backend/.env with your configuration"
    fi
    
    # Create necessary directories
    mkdir -p uploads logs ai-models/chatbot ai-models/voice ai-models/pdfs
    print_success "Created necessary directories"
    
    deactivate
    cd ..
    return 0
}

# Create database
setup_database() {
    print_info "Setting up database..."
    
    # Check if MongoDB is running
    if pgrep -x "mongod" > /dev/null; then
        print_success "MongoDB is running"
    else
        print_info "Starting MongoDB..."
        # This command might vary based on OS
        # mongod --dbpath /data/db &
        print_info "Please start MongoDB manually"
    fi
}

# Main setup process
main() {
    echo "Step 1: Checking prerequisites..."
    echo ""
    
    check_nodejs
    NODE_OK=$?
    
    check_python
    PYTHON_OK=$?
    
    check_mongodb
    MONGO_OK=$?
    
    echo ""
    
    if [ $NODE_OK -ne 0 ] || [ $PYTHON_OK -ne 0 ]; then
        print_error "Please install missing prerequisites and run this script again"
        exit 1
    fi
    
    echo ""
    echo "Step 2: Setting up frontend..."
    echo ""
    setup_frontend
    
    echo ""
    echo "Step 3: Setting up backend..."
    echo ""
    setup_backend
    
    echo ""
    echo "Step 4: Setting up database..."
    echo ""
    setup_database
    
    echo ""
    echo "========================================="
    print_success "Setup completed successfully!"
    echo "========================================="
    echo ""
    print_info "Next steps:"
    echo "  1. Edit backend/.env with your configuration"
    echo "  2. Start MongoDB: mongod"
    echo "  3. Start backend: cd backend && source venv/bin/activate && python -m app.main"
    echo "  4. Start frontend: cd frontend && npm start"
    echo "  5. Open http://localhost:8080 in your browser"
    echo ""
    print_info "For Docker deployment:"
    echo "  docker-compose up -d"
    echo ""
}

# Run main function
main
