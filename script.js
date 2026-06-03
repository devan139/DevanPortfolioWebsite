// ============================================
// LCD-STYLE PORTFOLIO — INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Nav Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      navToggle.textContent = mainNav.classList.contains('open') ? '[ close ]' : '[ menu ]';
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      if (navToggle) navToggle.textContent = '[ menu ]';
    });
  });

  // --- Scroll fade-in animations ---
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('.section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Hover sound effect (subtle click) ---
  // Using CSS transitions only — no audio needed for lo-fi feel

  // --- Random rotation on stamp elements ---
  document.querySelectorAll('.stamp').forEach(el => {
    const rot = (Math.random() - 0.5) * 8;
    el.style.transform = `rotate(${rot}deg)`;
  });

  // --- Console Easter Egg ---
  console.log(
    '%c★ DEVANARAYANAN MP ★\n%cBuilt with love & monospace fonts.',
    'font-size: 20px; font-family: monospace; font-weight: bold;',
    'font-size: 12px; font-family: monospace; color: #888;'
  );
});
