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
    // افزودن رویداد اسکرول
    window.addEventListener("scroll", () => {
      this.checkScroll();
    });

    // ایجاد و افزودن افکت‌های Ray به آیتم‌ها
    this.createRayEffects();

    // بررسی موقعیت هنگام لود صفحه
    setTimeout(() => {
      this.checkScroll();
    }, 500);
  }

  createRayEffects() {
    // حذف افکت‌های قبلی اگر وجود دارند
    document
      .querySelectorAll(".counter-ray-effect")
      .forEach((el) => el.remove());

    // ایجاد افکت‌های جدید
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
      const duration = 2000; // 2 ثانیه
      const step = target / (duration / 16); // 60 فریم در ثانیه

      let current = 0;

      const timer = setInterval(() => {
        current += step;

        if (current >= target) {
          clearInterval(timer);
          current = target;
        }

        // فرمت اعداد برای خوانایی بهتر
        counter.textContent = this.formatNumber(Math.floor(current));
      }, 16);

      // افزودن کلاس انیمیشن
      counter.parentElement.classList.add("animated");
    });
  }

  formatNumber(num) {
    // افزودن جداکننده هزارگان
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

// راه‌اندازی شمارنده هنگام لود کامل صفحه
document.addEventListener("DOMContentLoaded", () => {
  new Counter();

  // بازنشانی افکت‌ها هنگام hover
  const counterItems = document.querySelectorAll(".counter-item");

  counterItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const rayEffect = this.querySelector(".counter-ray-effect");
      if (rayEffect) {
        // بازنشانی انیمیشن
        rayEffect.style.animation = "none";
        rayEffect.offsetHeight; // trigger reflow
        rayEffect.style.animation = null;

        // بازنشانی transform
        const beforeEl =
          rayEffect.querySelector(":before") ||
          window.getComputedStyle(rayEffect, ":before");
        rayEffect.style.transform = "none";
      }
    });

    item.addEventListener("mouseleave", function () {
      const rayEffect = this.querySelector(".counter-ray-effect");
      if (rayEffect) {
        // پاک کردن transform برای آماده‌سازی برای hover بعدی
        setTimeout(() => {
          rayEffect.style.transform = "none";
        }, 600); // بعد از اتمام انیمیشن
      }
    });
  });
});
