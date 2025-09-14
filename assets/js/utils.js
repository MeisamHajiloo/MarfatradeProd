// Shared utility functions
window.AppUtils = {
  // Notification functions
  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `global-message ${type}-message`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = "slideOut 0.4s ease-out forwards";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 400);
    }, 3000);
  },

  showSuccess(message, duration = 3000) {
    this.showNotification(message, "success");
  },

  showError(message, duration = 5000) {
    this.showNotification(message, "error");
  },

  // JSON parsing utility
  safeJsonParse(response) {
    try {
      return typeof response === 'string' ? JSON.parse(response) : response;
    } catch (e) {
      console.error('JSON parse error:', e);
      return null;
    }
  },

  // Auth status check
  async checkAuthStatus() {
    try {
      const response = await fetch('api/auth/check.php');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Auth check error:', error);
      return { success: false, logged_in: false };
    }
  },

  // Logout function
  async logoutUser() {
    try {
      const response = await fetch('api/auth/logout.php', { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        this.showSuccess('Logged out successfully');
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } else {
        this.showError(data.message || 'Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      this.showError('Server connection error');
    }
  }
};