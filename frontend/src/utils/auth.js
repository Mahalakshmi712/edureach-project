// Authentication Utility
// Handles user authentication and token management

const Auth = {
  // Check if user is logged in
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    
    // Check if token is expired
    const payload = this.decodeToken(token);
    if (!payload) return false;
    
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  },
  
  // Get stored JWT token
  getToken() {
    return localStorage.getItem(CONFIG.SESSION.TOKEN_KEY);
  },
  
  // Store JWT token
  setToken(token) {
    localStorage.setItem(CONFIG.SESSION.TOKEN_KEY, token);
  },
  
  // Get current user data
  getUser() {
    const userStr = localStorage.getItem(CONFIG.SESSION.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },
  
  // Store user data
  setUser(user) {
    localStorage.setItem(CONFIG.SESSION.USER_KEY, JSON.stringify(user));
  },
  
  // Decode JWT token
  decodeToken(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Token decode error:', error);
      return null;
    }
  },
  
  // Login user
  async login(credentials) {
    try {
      const response = await fetch(`${CONFIG.API.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        this.setToken(data.token);
        this.setUser(data.user);
        return { success: true, user: data.user };
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    }
  },
  
  // Logout user
  logout() {
    localStorage.removeItem(CONFIG.SESSION.TOKEN_KEY);
    localStorage.removeItem(CONFIG.SESSION.USER_KEY);
    window.location.href = '/index.html';
  },
  
  // Make authenticated API request
  async authenticatedFetch(url, options = {}) {
    const token = this.getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    };
    
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    // If unauthorized, logout
    if (response.status === 401) {
      this.logout();
      throw new Error('Session expired. Please login again.');
    }
    
    return response;
  },
  
  // Redirect to appropriate dashboard based on role
  redirectToDashboard(role) {
    const dashboards = {
      admin: '/admin-dashboard.html',
      teacher: '/teacher-dashboard.html',
      student: '/student-dashboard.html'
    };
    
    window.location.href = dashboards[role] || '/index.html';
  },
  
  // Check role access
  hasRole(requiredRole) {
    const user = this.getUser();
    return user && user.role === requiredRole;
  }
};
