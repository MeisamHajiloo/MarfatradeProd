(function() {
    const slides = document.getElementById('slides');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const allSlides = document.querySelectorAll('.slide');
    let currentSlide = 1; // شروع از اسلاید واقعی اول (نه کلون)
    let slideCount = document.querySelectorAll('.slide:not(.clone)').length;
    let slideInterval;
    let touchStartX = 0, touchEndX = 0;
    let isAnimating = false;

    // نمایش کلون‌ها برای اسلایدهای بیشتر از 1
    if (slideCount > 1) {
        document.querySelectorAll('.slide.clone').forEach(clone => {
            clone.style.display = 'block';
        });
        // تنظیم موقعیت اولیه
        slides.style.transform = `translateX(-100%)`;
    }

    function goToSlide(index, animate = true) {
        if (slideCount <= 1 || isAnimating) return;
        
        isAnimating = true;
        
        if (animate) {
            slides.style.transition = 'transform 0.8s ease-in-out';
        } else {
            slides.style.transition = 'none';
        }
        
        slides.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
        
        // به‌روزرسانی dots
        let realIndex = index - 1;
        if (realIndex < 0) realIndex = slideCount - 1;
        if (realIndex >= slideCount) realIndex = 0;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === realIndex);
        });
        
        resetInterval();
        
        // پس از اتمام انیمیشن، بررسی برای پرش به موقعیت مناسب
        setTimeout(() => {
            isAnimating = false;
            
            // اگر به کلون آخر رسیدیم، بدون انیمیشن به اسلاید واقعی اول برو
            if (index === slideCount + 1) {
                slides.style.transition = 'none';
                slides.style.transform = `translateX(-100%)`;
                currentSlide = 1;
            }
            // اگر به کلون اول رسیدیم، بدون انیمیشن به اسلاید واقعی آخر برو
            else if (index === 0) {
                slides.style.transition = 'none';
                slides.style.transform = `translateX(-${slideCount * 100}%)`;
                currentSlide = slideCount;
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

    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) nextSlide();
        else if (difference < -50) prevSlide();
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (dots.length > 0) {
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                goToSlide(i + 1); // +1 because we start from index 1 (first real slide)
            });
        });
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // Touch swipe
    if (slides) {
        slides.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
            clearInterval(slideInterval);
        }, {passive: true});

        slides.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
            resetInterval();
        }, {passive: true});
    }

    // Pause on hover
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', resetInterval);
    }

    // Initialize autoplay
    if (slideCount > 1) {
        resetInterval();
    }
})();