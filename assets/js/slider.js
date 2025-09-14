function initializeSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length === 0) return;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    showSlide(prev);
  }

  function startSlideshow() {
    if (slides.length > 1) {
      slideInterval = setInterval(nextSlide, 5500);
    }
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  // Arrow navigation
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      stopSlideshow();
      startSlideshow();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      stopSlideshow();
      startSlideshow();
    });
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(index);
      stopSlideshow();
      startSlideshow();
    });
  });

  // Initialize and start
  showSlide(0);
  startSlideshow();

  // Pause on hover
  const slider = document.querySelector('.slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopSlideshow);
    slider.addEventListener('mouseleave', startSlideshow);
  }
}