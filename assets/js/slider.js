(function () {
  const slides = document.getElementById("slides");
  const dots = document.querySelectorAll(".slider-dot");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");
  const allSlides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  const slideCount = allSlides.length;
  let slideInterval;

  // Add clones for infinite slider
  if (slideCount > 1) {
    const firstClone = allSlides[0].cloneNode(true);
    const lastClone = allSlides[slideCount - 1].cloneNode(true);

    firstClone.classList.add("clone");
    lastClone.classList.add("clone");

    slides.appendChild(firstClone);
    slides.insertBefore(lastClone, allSlides[0]);

    // Set initial position
    slides.style.transform = `translateX(-100%)`;
    currentSlide = 1;
  }

  function goToSlide(index, animate = true) {
    if (slideCount <= 1) return;

    if (animate) {
      slides.style.transition = "transform 0.8s ease-in-out";
    } else {
      slides.style.transition = "none";
    }

    slides.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;

    // Update dots
    let realIndex = index - 1;
    if (realIndex < 0) realIndex = slideCount - 1;
    if (realIndex >= slideCount) realIndex = 0;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === realIndex);
    });

    resetInterval();

    // Check for jumping to appropriate position (infinite slider)
    setTimeout(() => {
      if (index === 0) {
        slides.style.transition = "none";
        slides.style.transform = `translateX(-${slideCount * 100}%)`;
        currentSlide = slideCount;
      } else if (index === slideCount + 1) {
        slides.style.transition = "none";
        slides.style.transform = `translateX(-100%)`;
        currentSlide = 1;
      }
    }, 800);
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    if (slideCount > 1) {
      slideInterval = setInterval(nextSlide, 5000);
    }
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide);
  }

  if (dots.length > 0) {
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => goToSlide(i + 1));
    });
  }

  // Handle resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      slides.style.transition = "none";
      slides.style.transform = `translateX(-${currentSlide * 100}%)`;

      setTimeout(() => {
        slides.style.transition = "transform 0.8s ease-in-out";
      }, 50);
    }, 100);
  });

  // Initialize
  if (slideCount > 1) {
    resetInterval();
  }
})();
