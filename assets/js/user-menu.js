// User Menu Functionality
document.addEventListener("DOMContentLoaded", function () {
  const desktopUserMenu = document.getElementById("desktop-user-menu");
  const userAvatar = document.getElementById("user-avatar");
  const userDropdown = document.getElementById("user-dropdown");
  const logoutButton = document.getElementById("logout-button");
  const userDisplayName = document.getElementById("user-display-name");
  const userWalletAmount = document.getElementById("user-wallet-amount");
  const authLink = document.getElementById("auth-link");
  const mobileNavLogout = document.getElementById("mobile-nav-logout");
  const mobileUserToggle = document.getElementById("mobile-user-toggle");
  const mobileUserSubmenu = document.getElementById("mobile-user-submenu");
  const mobileUserArrow = document.querySelector(".mobile-user-arrow");

  // Toggle dropdown menu for desktop
  function toggleDropdown() {
    userDropdown.classList.toggle("active");

    // Close other open dropdowns if any
    document.querySelectorAll(".user-dropdown.active").forEach((dropdown) => {
      if (dropdown !== userDropdown) {
        dropdown.classList.remove("active");
      }
    });
  }

  // Close dropdown menu for desktop
  function closeDropdown() {
    userDropdown.classList.remove("active");
  }

  // Toggle mobile user submenu
  function toggleMobileSubmenu() {
    mobileUserSubmenu.style.display =
      mobileUserSubmenu.style.display === "none" ? "block" : "none";
    mobileUserArrow.classList.toggle("active");
  }

  // Event listeners for desktop
  if (userAvatar) {
    userAvatar.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleDropdown();
    });
  }

  // Event listener for mobile user toggle
  if (mobileUserToggle) {
    mobileUserToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMobileSubmenu();
    });
  }

  // Close dropdown when clicking outside (desktop)
  document.addEventListener("click", function (e) {
    if (
      userDropdown.classList.contains("active") &&
      !desktopUserMenu.contains(e.target)
    ) {
      closeDropdown();
    }
  });

  // Close dropdown on scroll (desktop)
  window.addEventListener("scroll", function () {
    if (userDropdown.classList.contains("active")) {
      closeDropdown();
    }
  });

  // Handle logout from desktop menu
  if (logoutButton) {
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      logoutUser();
    });
  }

  // Handle logout from mobile menu
  if (mobileNavLogout) {
    mobileNavLogout.addEventListener("click", function (e) {
      e.preventDefault();
      logoutUser();

      // Close mobile navigation
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("nav-links");
      if (hamburger && navLinks) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        navLinks.style.right = "-100%";
      }
    });
  }

  // Update user menu with user data
  function updateUserMenu(userData) {
    if (userData && userData.name) {
      // Update desktop menu
      userDisplayName.textContent = userData.name;
      desktopUserMenu.style.display = "flex";

      // Set default wallet amount
      userWalletAmount.textContent = "100.00";

      // Update avatar with user's first letter
      const firstLetter = userData.name.charAt(0).toUpperCase();
      userAvatar.innerHTML = firstLetter;
      userAvatar.classList.add("has-initials");

      // Hide auth link
      if (authLink) {
        authLink.style.display = "none";
      }

      // Update mobile nav user info
      updateMobileNavUserInfo(userData);
    } else {
      // Hide desktop menu for non-logged in users
      desktopUserMenu.style.display = "none";

      // Show auth link
      if (authLink) {
        authLink.style.display = "block";
      }

      // Update mobile nav user info
      updateMobileNavUserInfo(null);
    }
  }

  // Update mobile navigation user info
  function updateMobileNavUserInfo(userData) {
    const mobileUserInfoItem = document.querySelector(".mobile-user-info-item");
    const mobileUserName = document.getElementById("mobile-nav-user-name");
    const mobileUserWallet = document.getElementById(
      "mobile-nav-wallet-amount"
    );
    const mobileLogoutItem = document.querySelector(".mobile-logout-item");

    if (userData && userData.name) {
      // Show user info in mobile navigation
      if (mobileUserInfoItem) {
        mobileUserInfoItem.style.display = "block";
      }

      if (mobileUserName) {
        mobileUserName.textContent = userData.name;
      }

      if (mobileUserWallet) {
        mobileUserWallet.textContent = "100.00";
      }

      // Update mobile avatar with user's first letter
      const mobileAvatar = document.querySelector(".mobile-user-avatar");
      if (mobileAvatar) {
        const firstLetter = userData.name.charAt(0).toUpperCase();
        mobileAvatar.innerHTML = firstLetter;
        mobileAvatar.classList.add("has-initials");
      }

      // Hide auth link in mobile nav
      if (authLink) {
        authLink.style.display = "none";
      }
    } else {
      // Hide user info in mobile navigation
      if (mobileUserInfoItem) {
        mobileUserInfoItem.style.display = "none";
      }

      // Show auth link in mobile nav
      if (authLink) {
        authLink.style.display = "block";
      }

      // Close mobile submenu if open
      if (mobileUserSubmenu) {
        mobileUserSubmenu.style.display = "none";
      }
      if (mobileUserArrow) {
        mobileUserArrow.classList.remove("active");
      }
    }
  }

  // Logout user
  async function logoutUser() {
    try {
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
        updateUserMenu(null);

        // Show success message
        showSuccess("Logged out successfully");

        // Close dropdown
        closeDropdown();

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

  // Safe JSON parse function
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

  // Show success message function
  function showSuccess(message, duration = 3000) {
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

  // Show error message function
  function showError(message, duration = 5000) {
    // Remove any existing error messages
    const existingError = document.getElementById("global-error-message");
    if (existingError) {
      existingError.remove();
    }

    // Create and display new error message
    const errorElement = document.createElement("div");
    errorElement.id = "global-error-message";
    errorElement.className = "error-message global-message";
    errorElement.textContent = message;
    errorElement.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            padding: 15px 20px;
            background-color: #ff3860;
            color: white;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 300px;
        `;

    document.body.appendChild(errorElement);

    // Remove error after specified duration
    setTimeout(() => {
      if (errorElement.parentNode) {
        errorElement.remove();
      }
    }, duration);
  }

  // Check if user is logged in and update menu
  checkUserStatus();

  async function checkUserStatus() {
    try {
      const response = await fetch("api/auth/check.php");
      const data = await safeJsonParse(response);

      if (data.loggedIn) {
        updateUserMenu(data.user);
      } else {
        updateUserMenu(null);
      }
    } catch (error) {
      console.error("Error checking user status:", error);
      updateUserMenu(null);
    }
  }

  // Make functions available globally for auth.js
  window.updateUserMenu = updateUserMenu;
  window.checkUserStatus = checkUserStatus;
});
