class Counter {
  constructor() {
    this.counterSection = document.getElementById("counter-section");
    this.counterItems = document.querySelectorAll(".counter-item");
    this.counters = document.querySelectorAll(".counter-number");
    this.hasCounted = false;

    this.init();
  }

  init() {
    // افزودن رویداد اسکرول
    window.addEventListener("scroll", () => {
      this.checkScroll();
    });

    // بررسی موقعیت هنگام لود صفحه
    setTimeout(() => {
      this.checkScroll();
    }, 500);
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
});
