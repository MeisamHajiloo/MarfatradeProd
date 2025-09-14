// Counter animation functionality
function initializeCounter() {
  const counterNumbers = document.querySelectorAll('.counter-number');
  
  if (counterNumbers.length === 0) return;

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  // Intersection Observer for triggering animation when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counterItem = entry.target;
        const counterNumber = counterItem.querySelector('.counter-number');
        
        if (counterNumber && !counterItem.classList.contains('animated')) {
          counterItem.classList.add('animated');
          animateCounter(counterNumber);
          
          // Add ray effect
          const rayEffect = document.createElement('div');
          rayEffect.className = 'counter-ray-effect';
          counterItem.appendChild(rayEffect);
        }
      }
    });
  }, {
    threshold: 0.5
  });

  // Observe all counter items
  document.querySelectorAll('.counter-item').forEach(item => {
    observer.observe(item);
  });
}

// Auto-initialize if counter exists
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.counter-section')) {
    initializeCounter();
  }
});