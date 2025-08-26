const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    navLinks.style.right = navLinks.classList.contains('active') ? '0' : '-100%';
    navLinks.style.left = 'auto';

    const menuItems = document.querySelectorAll('.nav-links li');
    if (navLinks.classList.contains('active')) {
        menuItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    } else {
        menuItems.forEach(item => { item.style.transitionDelay = '0s'; });
    }
}

hamburger.addEventListener('click', toggleMenu);

// Swipe detection for mobile
let touchStartX = 0, touchEndX = 0;
const swipeThreshold = 50;
const edgeThreshold = 50;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
},{passive:true});

document.addEventListener('touchmove', e => {
    const screenWidth = window.innerWidth;
    const currentX = e.changedTouches[0].screenX;
    const distance = touchStartX - currentX;

    if ((touchStartX > screenWidth - edgeThreshold && !navLinks.classList.contains('active')) ||
        (navLinks.classList.contains('active'))) {
        if (Math.abs(distance) > 10) e.preventDefault();

        if (navLinks.classList.contains('active') && distance < 0) {
            const newRight = Math.min(-distance, 100);
            navLinks.style.right = `${-newRight}%`;
        } else if (!navLinks.classList.contains('active') && distance > 0) {
            const newRight = Math.min(-100 + distance, 0);
            navLinks.style.right = `${newRight}%`;
        }
    }
},{passive:false});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
},{passive:true});

function handleSwipe() {
    const screenWidth = window.innerWidth;
    const difference = touchStartX - touchEndX;
    if (touchStartX > screenWidth - edgeThreshold &&
        !navLinks.classList.contains('active') && difference > swipeThreshold) {
        hamburger.classList.add('active');
        navLinks.classList.add('active');
        navLinks.style.right = '0';
    } else if (navLinks.classList.contains('active') && difference < -swipeThreshold) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navLinks.style.right = '-100%';
    } else {
        navLinks.style.right = navLinks.classList.contains('active') ? '0' : '-100%';
    }
}

// Close when clicking outside
document.addEventListener('click', e => {
    if (navLinks.classList.contains('active') &&
        !e.target.closest('.nav-links') && !e.target.closest('.hamburger')) {
        toggleMenu();
    }
});
