// Authentication Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("Auth script loaded");

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

  // Close modal when X is clicked
  if (closeModal) {
    closeModal.addEventListener("click", function () {
      closeAuthModal();
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === authModal) {
      closeAuthModal();
    }
  });

  // Tab functionality
  tabLinks.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab");

      // Remove active class from all tabs and contents
      tabLinks.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Add active class to current tab and content
      this.classList.add("active");
      document.getElementById(tabName).classList.add("active");
    });
  });

  // Login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      // Simple validation
      if (!email || !password) {
        showError(loginForm, "Please fill in all fields");
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

      // Validation
      if (!name || !email || !password || !confirmPassword) {
        showError(registerForm, "Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        showError(registerForm, "Passwords do not match");
        return;
      }

      if (password.length < 6) {
        showError(registerForm, "Password must be at least 6 characters");
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
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }
  }

  // Function to close auth modal
  function closeAuthModal() {
    if (authModal) {
      authModal.style.display = "none";
      document.body.style.overflow = "auto"; // Enable scrolling

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
    // Remove any existing success messages
    const existingSuccess = document.getElementById("global-success-message");
    if (existingSuccess) {
      existingSuccess.remove();
    }

    // Create and display new success message
    const successElement = document.createElement("div");
    successElement.id = "global-success-message";
    successElement.className = "success-message global-message";
    successElement.textContent = message;
    successElement.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            padding: 15px 20px;
            background-color: #23d160;
            color: white;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 300px;
        `;

    document.body.appendChild(successElement);

    // Remove success after specified duration
    setTimeout(() => {
      if (successElement.parentNode) {
        successElement.remove();
      }
    }, duration);
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

      const response = await fetch("api/auth/register.php", {
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
        showError(registerForm, data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      showError(
        registerForm,
        error.message || "An error occurred. Please try again."
      );
    }
  }

  // API call to login user
  async function loginUser(email, password) {
    try {
      console.log("Logging in user:", { email });

      const response = await fetch("api/auth/login.php", {
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
        showError(loginForm, data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      showError(
        loginForm,
        error.message || "An error occurred. Please try again."
      );
    }
  }

  function updateAuthUI(isLoggedIn, userData) {
    if (isLoggedIn && userData) {
      // Use the updateUserMenu function from user-menu.js
      if (typeof updateUserMenu === "function") {
        updateUserMenu(userData);
      }
    } else {
      if (typeof updateUserMenu === "function") {
        updateUserMenu(null);
      }
    }
  }

  // Logout user
  async function logoutUser() {
    try {
      console.log("Logging out user...");

      const response = await fetch("api/auth/logout.php", {
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
        showSuccess("Logged out successfully");

        // Reload page after a short delay to ensure complete logout
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.error("Logout failed:", data.message);
        showError("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      showError("An error occurred during logout. Please try again.");
    }
  }

  // Check if user is already logged in on page load
  checkAuthStatus();

  async function checkAuthStatus() {
    try {
      const response = await fetch("api/auth/check.php");
      const data = await safeJsonParse(response);

      if (data.loggedIn) {
        updateAuthUI(true, data.user);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    }
  }
});
