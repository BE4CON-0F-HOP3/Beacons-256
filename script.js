// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('[data-nav]');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Smooth scroll offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const headerOffset = 68; // approx header height
        const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        nav?.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Fade-in on scroll (Intersection Observer)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Simple impact counters
function animateCounter(el) {
  const target = Number(el.dataset.count || 0);
  let start = 0;
  const duration = 1400;
  const startTime = performance.now();
  function tick(now) {
    const p = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(start + p * (target - start));
    el.textContent = value.toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.querySelectorAll('.metric span').forEach(animateCounter);

// Contact form (opens WhatsApp with prefilled message)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !data.email || !data.message) {
      statusEl.textContent = 'Please fill out all fields.';
      statusEl.style.color = '#b91c1c';
      return;
    }
    const msg =
      `Hello Beacon of Hope,%0A%0A` +
      `Name: ${encodeURIComponent(data.name)}%0A` +
      `Email: ${encodeURIComponent(data.email)}%0A%0A` +
      `${encodeURIComponent(data.message)}`;
    window.open(`https://wa.me/256704141950?text=${msg}`, '_blank');
    statusEl.textContent = 'Thanks! Opening WhatsApp so we can connect.';
    statusEl.style.color = '#065f46';
    form.reset();
  });
}

console.log('Beacon of Hope Foundation • Led by Frank');
