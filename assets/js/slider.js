const slides = document.getElementById('slides');
const dots = document.querySelectorAll('.slider-dot');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
let currentSlide = 0;
const slideCount = document.querySelectorAll('.slide').length;
let slideInterval;

function goToSlide(index) {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;
    slides.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    resetInterval();
}
function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Touch swipe
let touchStartX = 0, touchEndX = 0;
slides.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
},{passive:true});
slides.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
},{passive:true});

function handleSwipe() {
    const difference = touchStartX - touchEndX;
    if (difference > 50) nextSlide();
    else if (difference < -50) prevSlide();
}

// Autoplay
resetInterval();

// Pause on hover
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
slider.addEventListener('mouseleave', resetInterval);
