class Counter {
  constructor() {
    this.counterSection = document.getElementById("counter-section");
    this.counterItems = document.querySelectorAll(".counter-item");
    this.counters = document.querySelectorAll(".counter-number");
    this.hasCounted = false;
    this.rayEffects = [];

    this.init();
  }

  init() {
    // Add scroll event
    window.addEventListener("scroll", () => {
      this.checkScroll();
    });

    // Create and add Ray effects to items
    this.createRayEffects();

    // Check position on page load
    setTimeout(() => {
      this.checkScroll();
    }, 500);
  }

  createRayEffects() {
    // Remove previous effects if they exist
    document
      .querySelectorAll(".counter-ray-effect")
      .forEach((el) => el.remove());

    // Create new effects
    this.counterItems.forEach((item) => {
      const rayEffect = document.createElement("div");
      rayEffect.className = "counter-ray-effect";
      item.appendChild(rayEffect);
      this.rayEffects.push(rayEffect);
    });
  }

  checkScroll() {
    if (this.hasCounted) return;

    const sectionPos = this.counterSection.getBoundingClientRect();
    const isVisible =
      sectionPos.top < window.innerHeight - 100 && sectionPos.bottom >= 0;

    if (isVisible) {
      this.startCounting();
      this.hasCounted = true;
    }
  }

  startCounting() {
    this.counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60 frames per second

      let current = 0;

      const timer = setInterval(() => {
        current += step;

        if (current >= target) {
          clearInterval(timer);
          current = target;
        }

        // Format numbers for better readability
        counter.textContent = this.formatNumber(Math.floor(current));
      }, 16);

      // Add animation class
      counter.parentElement.classList.add("animated");
    });
  }

  formatNumber(num) {
    // Add thousand separators
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

// Initialize counter when page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  new Counter();

  // Reset effects on hover
  const counterItems = document.querySelectorAll(".counter-item");

  counterItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const rayEffect = this.querySelector(".counter-ray-effect");
      if (rayEffect) {
        // Reset animation
        rayEffect.style.animation = "none";
        rayEffect.offsetHeight; // trigger reflow
        rayEffect.style.animation = null;

        // Reset transform
        const beforeEl =
          rayEffect.querySelector(":before") ||
          window.getComputedStyle(rayEffect, ":before");
        rayEffect.style.transform = "none";
      }
    });

    item.addEventListener("mouseleave", function () {
      const rayEffect = this.querySelector(".counter-ray-effect");
      if (rayEffect) {
        // Clear transform for next hover
        setTimeout(() => {
          rayEffect.style.transform = "none";
        }, 600); // after animation completes
      }
    });
  });
});
