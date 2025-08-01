// --- Reveal elements on scroll ---
window.addEventListener('scroll', () => {
  document.querySelectorAll('.reveal-on-scroll').forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      element.classList.add('visible');
    }
  });
});

// --- Button ripple effect on .button and .cta-button ---
document.querySelectorAll('.button, .cta-button').forEach(btn => {
  btn.addEventListener('click', function(e) {
    let circle = document.createElement('span');
    circle.className = 'ripple';
    // Calculate position relative to the button
    const rect = btn.getBoundingClientRect();
    circle.style.left = (e.clientX - rect.left) + 'px';
    circle.style.top = (e.clientY - rect.top) + 'px';
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 500);
  });
});

// --- Initial trigger for reveal on load (for elements in view) ---
document.querySelectorAll('.reveal-on-scroll').forEach(element => {
  const rect = element.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    element.classList.add('visible');
  }
});
