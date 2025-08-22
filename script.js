// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('[data-nav]');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Contact form (client-side validation + WhatsApp fallback)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    // Simple validation
    if (!data.name || !data.email || !data.message) {
      statusEl.textContent = 'Please fill out all fields.';
      statusEl.style.color = '#b91c1c';
      return;
    }
    // For now: open WhatsApp prefilled message as a quick contact fallback
    const msg = `Hello Beacon of Hope,%0A%0AName: ${encodeURIComponent(data.name)}%0AEmail: ${encodeURIComponent(data.email)}%0A%0A${encodeURIComponent(data.message)}`;
    window.open(`https://wa.me/256704141950?text=${msg}`, '_blank');

    statusEl.textContent = 'Thanks! Opening WhatsApp so we can connect.';
    statusEl.style.color = '#065f46';
    form.reset();
  });
}

// Little polish
console.log('Beacon of Hope Foundation • Led by Frank');
