// Global showNotification function
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">
        ${type === "success" ? "✓" : type === "warning" ? "⚠" : "ℹ"}
      </div>
      <div class="notification-message">${message}</div>
    </div>
  `;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('notification-exit');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Authentication Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Get modal elements
  const authModal = document.getElementById("auth-modal");
  const authLink = document.getElementById("auth-link");
  const closeModal = document.querySelector(".close");
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  // Open modal when auth link is clicked
  if (authLink) {
    authLink.addEventListener("click", function (e) {
      e.preventDefault();
      openAuthModal();
    });
  }



  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === authModal) {
      closeAuthModal();
    }
  });

  // Switch between login and register forms
  const switchToRegister = document.getElementById("switch-to-register");
  const switchToLogin = document.getElementById("switch-to-login");

  if (switchToRegister) {
    switchToRegister.addEventListener("click", function (e) {
      e.preventDefault();
      showRegisterForm();
    });
  }

  if (switchToLogin) {
    switchToLogin.addEventListener("click", function (e) {
      e.preventDefault();
      showLoginForm();
    });
  }

  function showRegisterForm() {
    tabContents.forEach((c) => c.classList.remove("active"));
    document.getElementById("register").classList.add("active");
  }

  function showLoginForm() {
    tabContents.forEach((c) => c.classList.remove("active"));
    document.getElementById("login").classList.add("active");
  }

  // Login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      // Simple validation
      if (!email || !password) {
        AppUtils.showError("Please fill in all fields");
        return;
      }

      // Call login API
      loginUser(email, password);
    });
  }

  // Register form submission
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("register-name").value;
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;
      const confirmPassword = document.getElementById(
        "register-confirm-password"
      ).value;
      const termsAccepted = document.getElementById("terms-acceptance").checked;

      // Validation
      if (!name || !email || !password || !confirmPassword) {
        AppUtils.showError("Please fill in all fields");
        return;
      }

      if (!termsAccepted) {
        AppUtils.showError("Please accept the Terms of Service and Privacy Policy");
        return;
      }

      if (password !== confirmPassword) {
        AppUtils.showError("Passwords do not match");
        return;
      }

      if (password.length < 6) {
        AppUtils.showError("Password must be at least 6 characters");
        return;
      }

      // Call register API
      registerUser(name, email, password);
    });
  }

  // Function to open auth modal
  function openAuthModal() {
    if (authModal) {
      authModal.style.display = "block";
      document.body.style.overflow = "hidden";
      // Always show login form by default
      showLoginForm();
    }
  }

  // Function to close auth modal
  function closeAuthModal() {
    if (authModal) {
      authModal.style.display = "none";
      document.body.style.overflow = "auto";

      // Reset forms
      if (loginForm) loginForm.reset();
      if (registerForm) registerForm.reset();

      // Clear error messages
      const errorMessages = document.querySelectorAll(".error-message");
      errorMessages.forEach((msg) => msg.remove());
    }
  }

  // Function to show error message
  function showError(form, message) {
    // Remove any existing error messages
    const existingError = form.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Create and display new error message
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    errorElement.style.cssText =
      "color: #ff3860; margin-top: 10px; padding: 10px; background: #ffe6e6; border-radius: 4px;";
    form.appendChild(errorElement);

    // Remove error after 5 seconds
    setTimeout(() => {
      if (errorElement.parentNode) {
        errorElement.remove();
      }
    }, 5000);
  }

  // Function to show success message
  function showSuccess(message, duration = 5000) {
    AppUtils.showSuccess(message, duration);
  }

  // Function to parse JSON response safely
  function safeJsonParse(response) {
    return response.text().then((text) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error("JSON parse error:", e, "Response text:", text);
        throw new Error("Invalid JSON response from server");
      }
    });
  }

  // API call to register user
  async function registerUser(name, email, password) {
    try {
      console.log("Registering user:", { name, email });

      const response = await (window.requestManager || { fetch }).fetch("api/auth/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await safeJsonParse(response);
      console.log("Registration response:", data);

      if (data.success) {
        // Show success message
        showSuccess("Registration successful! You are now logged in.");

        // Update UI with user info
        updateAuthUI(true, data.user);

        // Close modal after a short delay
        setTimeout(() => {
          closeAuthModal();
        }, 1500);
      } else {
        AppUtils.showError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      AppUtils.showError(
        error.message || "An error occurred. Please try again."
      );
    }
  }

  // API call to login user
  async function loginUser(email, password) {
    try {
      console.log("Logging in user:", { email });

      const response = await (window.requestManager || { fetch }).fetch("api/auth/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await safeJsonParse(response);
      console.log("Login response:", data);

      if (data.success) {
        showSuccess("Login successful!");

        // Update UI with user info
        updateAuthUI(true, data.user);

        // Close modal after a short delay
        setTimeout(() => {
          closeAuthModal();
        }, 1500);
      } else {
        AppUtils.showError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      AppUtils.showError(
        error.message || "An error occurred. Please try again."
      );
    }
  }

  function updateAuthUI(isLoggedIn, userData) {
    // Update router auth state without calling updateAuthUI
    if (window.router) {
      window.router.isAuthenticated = isLoggedIn;
      window.router.userData = userData;
    }
    
    // Update UI elements directly
    const authLink = document.getElementById('auth-link');
    const desktopUserMenu = document.getElementById('desktop-user-menu');
    const mobileUserInfo = document.querySelector('.mobile-user-info-item');

    if (isLoggedIn && userData) {
      document.body.classList.add('user-logged-in');
      if (authLink) authLink.style.display = 'none';
      if (desktopUserMenu) desktopUserMenu.style.display = 'flex';
      if (mobileUserInfo) mobileUserInfo.style.display = 'block';
      
      if (typeof updateUserMenu === "function") {
        updateUserMenu(userData);
      }
    } else {
      document.body.classList.remove('user-logged-in');
      if (authLink) authLink.style.display = 'block';
      if (desktopUserMenu) desktopUserMenu.style.display = 'none';
      if (mobileUserInfo) mobileUserInfo.style.display = 'none';
      
      if (typeof updateUserMenu === "function") {
        updateUserMenu(null);
      }
    }
  }

  // Make updateAuthUI globally available for router
  window.updateAuthUI = updateAuthUI;

  // Logout user
  async function logoutUser() {
    try {
      console.log("Logging out user...");

      const response = await (window.requestManager || { fetch }).fetch("api/auth/logout.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await safeJsonParse(response);
      console.log("Logout response:", data);

      if (data.success) {
        // Update UI
        updateAuthUI(false);

        // Show success message
        AppUtils.showSuccess('Logged out successfully');

        // Navigate to home page after logout
        setTimeout(() => {
          if (window.router) {
            window.router.navigate('/');
          } else {
            window.location.reload();
          }
        }, 1000);
      } else {
        console.error("Logout failed:", data.message);
        showNotification("Logout failed. Please try again.", "warning");
      }
    } catch (error) {
      console.error("Logout error:", error);
      showNotification("An error occurred during logout. Please try again.", "warning");
    }
  }

  // Add logout button event listeners
  const logoutButton = document.getElementById('logout-button');
  const mobileLogoutButton = document.getElementById('mobile-nav-logout');
  
  if (logoutButton) {
    logoutButton.addEventListener('click', function(e) {
      e.preventDefault();
      logoutUser();
    });
  }
  
  if (mobileLogoutButton) {
    mobileLogoutButton.addEventListener('click', function(e) {
      e.preventDefault();
      logoutUser();
    });
  }

  // Auth status is checked by the router, no need to duplicate here
  // The router will call updateAuthUI when needed
});
