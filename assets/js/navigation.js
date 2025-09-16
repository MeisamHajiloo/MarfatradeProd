if (!window.navigationLoaded) {
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

function toggleMenu() {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");

  const menuItems = document.querySelectorAll(".nav-links li");
  if (navLinks.classList.contains("active")) {
    menuItems.forEach((item, index) => {
      // Skip animation for user info item
      if (!item.classList.contains("mobile-user-info-item")) {
        item.style.transitionDelay = `${index * 0.1}s`;
      }
    });
  } else {
    menuItems.forEach((item) => {
      item.style.transitionDelay = "0s";
    });
  }
}

hamburger.addEventListener("click", toggleMenu);

// Swipe detection for mobile
let touchStartX = 0,
  touchEndX = 0,
  touchTarget = null;
const swipeThreshold = 50;
const edgeThreshold = 20;

document.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchTarget = e.target;
  },
  { passive: true }
);

document.addEventListener(
  "touchmove",
  (e) => {
    const screenWidth = window.innerWidth;
    const currentX = e.changedTouches[0].screenX;
    const distance = touchStartX - currentX;

    if (
      (touchStartX >= screenWidth - edgeThreshold &&
        !navLinks.classList.contains("active")) ||
      navLinks.classList.contains("active")
    ) {
      if (Math.abs(distance) > 10) e.preventDefault();


    }
  },
  { passive: false }
);

document.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  { passive: true }
);

function handleSwipe() {
  const screenWidth = window.innerWidth;
  const difference = touchStartX - touchEndX;
  
  // Check if touch started on a scrollable element
  const isScrollableElement = touchTarget && (
    touchTarget.closest('.progress-container') ||
    touchTarget.closest('[style*="overflow-x: auto"]') ||
    touchTarget.closest('[style*="overflow: auto"]')
  );

  if (window.innerWidth <= 768 && !isScrollableElement) {
    if (
      touchStartX >= screenWidth - edgeThreshold &&
      !navLinks.classList.contains("active") &&
      difference > swipeThreshold
    ) {
      hamburger.classList.add("active");
      navLinks.classList.add("active");
    } else if (
      navLinks.classList.contains("active") &&
      difference < -swipeThreshold
    ) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    }
  }
}

// Close when clicking outside or on nav links
document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("active") &&
    !e.target.closest(".nav-links") &&
    !e.target.closest(".hamburger")
  ) {
    toggleMenu();
  }
});

// Close menu when clicking on navigation links
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && navLinks.classList.contains("active")) {
    toggleMenu();
  }
});

// Close menu when clicking on mobile user submenu links
const mobileUserSubmenu = document.getElementById("mobile-user-submenu");
if (mobileUserSubmenu) {
  mobileUserSubmenu.addEventListener("click", (e) => {
    if (e.target.closest("a") && navLinks.classList.contains("active")) {
      toggleMenu();
    }
  });
}

// Desktop user menu dropdown
const userAvatar = document.getElementById("user-avatar");
const userDropdown = document.getElementById("user-dropdown");

if (userAvatar && userDropdown) {
  userAvatar.addEventListener("click", (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".desktop-user-menu")) {
      userDropdown.classList.remove("show");
    }
  });

  // Close dropdown when clicking on dropdown items
  userDropdown.addEventListener("click", (e) => {
    if (e.target.closest(".dropdown-item")) {
      userDropdown.classList.remove("show");
    }
  });
}

window.navigationLoaded = true;
}
