/* 1. Typewriter Effect for Designation */
const typewriterElement = document.getElementById('typewriter');
const words = ['CSE Student', 'Web Enthusiast', 'Problem Solver', 'Tech Learner'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 60 : 120;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 400;
  }

  setTimeout(typeEffect, typeSpeed);
}
document.addEventListener('DOMContentLoaded', typeEffect);

/* 2. Dark / Light Mode Toggle */
const themeToggleBtn = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggleBtn.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    themeToggleBtn.textContent = '🌙';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeToggleBtn.textContent = '☀️';
  }
});

/* 3. Dynamic Copyright Year */
document.getElementById('currentYear').textContent = new Date().getFullYear();

/* 4. Live Date & Time (updates every second) — now shown in the footer */
const liveDateTimeEl = document.getElementById('liveDateTime');

function updateLiveDateTime() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  liveDateTimeEl.textContent = `${dateStr} · ${timeStr}`;
}
updateLiveDateTime();
setInterval(updateLiveDateTime, 1000);

/* 5. Scroll Reveal Animation */
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 80) {
      element.classList.add('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

/* 6. ScrollSpy (Active Navigation Link Highlight) */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navlinks a');

window.addEventListener('scroll', () => {
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

/* 7. Projects Category Filter */
const filterBtns = document.querySelectorAll('.filter-btn');
const projCards = document.querySelectorAll('.project-card[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* 8. Scroll To Top Button Logic */
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/* 9. Contact Form Validation + Submit Animation */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function setFieldError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);
  const group = input.closest('.form-group');

  if (message) {
    group.classList.remove('invalid');
    void group.offsetWidth; // restart shake animation
    group.classList.add('invalid');
    errorEl.textContent = message;
    return false;
  } else {
    group.classList.remove('invalid');
    errorEl.textContent = '';
    return true;
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateContactForm() {
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  const nameOk = setFieldError('cf-name', 'cf-name-error', name.length < 2 ? 'Please enter your name.' : '');
  const emailOk = setFieldError('cf-email', 'cf-email-error', !isValidEmail(email) ? 'Please enter a valid email.' : '');
  const messageOk = setFieldError('cf-message', 'cf-message-error', message.length < 10 ? 'Message should be at least 10 characters.' : '');

  return nameOk && emailOk && messageOk;
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    formStatus.classList.remove('show', 'success', 'error');

    if (!validateContactForm()) {
      formStatus.textContent = 'Please fix the highlighted fields.';
      formStatus.classList.add('show', 'error');
      return;
    }

    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    submitBtn.classList.add('sending');
    submitBtn.disabled = true;
    const originalLabel = btnText.textContent;
    btnText.textContent = 'Sending...';

    // Simulated send — replace with a real endpoint (e.g. fetch to your backend or Formspree)
    setTimeout(() => {
      submitBtn.classList.remove('sending');
      submitBtn.disabled = false;
      btnText.textContent = originalLabel;

      formStatus.textContent = 'Thanks! Your message has been sent.';
      formStatus.classList.add('show', 'success');

      contactForm.reset();
    }, 1200);
  });

  // Clear a field's error as soon as the user starts fixing it
  ['cf-name', 'cf-email', 'cf-message'].forEach(id => {
    document.getElementById(id).addEventListener('input', (e) => {
      e.target.closest('.form-group').classList.remove('invalid');
    });
  });
}

/* 11. Mouse Smoke Trail Effect */
const smokeCanvas = document.getElementById('smokeCanvas');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (smokeCanvas && !prefersReducedMotion) {
  const ctx = smokeCanvas.getContext('2d');
  let smokeParticles = [];
  let lastSpawn = 0;

  function resizeSmokeCanvas() {
    smokeCanvas.width = window.innerWidth;
    smokeCanvas.height = window.innerHeight;
  }
  resizeSmokeCanvas();
  window.addEventListener('resize', resizeSmokeCanvas);

  function spawnSmoke(x, y) {
    for (let i = 0; i < 2; i++) {
      smokeParticles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        radius: 8 + Math.random() * 10,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.5,
        life: 1,
        decay: 0.012 + Math.random() * 0.012
      });
    }
    // Keep the particle pool from growing unbounded
    if (smokeParticles.length > 160) {
      smokeParticles.splice(0, smokeParticles.length - 160);
    }
  }

  window.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - lastSpawn > 16) {
      spawnSmoke(e.clientX, e.clientY);
      lastSpawn = now;
    }
  });

  function drawSmoke() {
    ctx.clearRect(0, 0, smokeCanvas.width, smokeCanvas.height);

    smokeParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.radius += 0.35;
      p.life -= p.decay;

      if (p.life > 0) {
        const alpha = p.life * 0.28;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(200, 195, 185, ${alpha})`);
        gradient.addColorStop(1, 'rgba(200, 195, 185, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    smokeParticles = smokeParticles.filter(p => p.life > 0);
    requestAnimationFrame(drawSmoke);
  }
  drawSmoke();
}

/* 12. Skill Progress Bars — animate fill when scrolled into view */
const skillBarFills = document.querySelectorAll('.skill-bar-fill');

const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fillEl = entry.target;
      const level = fillEl.getAttribute('data-level') || '0';
      fillEl.style.setProperty('--fill-level', `${level}%`);
      fillEl.classList.add('filled');
      skillBarObserver.unobserve(fillEl);
    }
  });
}, { threshold: 0.4 });

skillBarFills.forEach(fill => skillBarObserver.observe(fill));

/* 10. Mobile Hamburger Menu Toggle */
const menuToggleBtn = document.getElementById('menuToggle');
const navLinksList = document.getElementById('navLinks');

menuToggleBtn.addEventListener('click', () => {
  const isOpen = navLinksList.classList.toggle('open');
  menuToggleBtn.classList.toggle('open');
  menuToggleBtn.setAttribute('aria-expanded', isOpen);
});

// Close the mobile menu when a nav link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksList.classList.remove('open');
    menuToggleBtn.classList.remove('open');
    menuToggleBtn.setAttribute('aria-expanded', 'false');
  });
});