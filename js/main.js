/* ============================================================
   ORCHESTRE D'HARMONIE DE BEINHEIM — main.js
   ============================================================ */

/* ─── 1. NAVIGATION ─────────────────────────────────────────── */
const nav     = document.getElementById('nav');
const burger  = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

// Scroll → add .scrolled class
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Burger toggle
burger?.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a, #mobileMenu a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

/* ─── 2. SCROLL ANIMATIONS ───────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up, .timeline-item').forEach(el => observer.observe(el));

/* ─── 3. LIGHTBOX ────────────────────────────────────────────── */
const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lbImg');
const lbClose    = document.getElementById('lbClose');
const lbPrev     = document.getElementById('lbPrev');
const lbNext     = document.getElementById('lbNext');
let   lbImages   = [];
let   lbIndex    = 0;

function openLightbox(src, arr, idx) {
  if (!lightbox) return;
  lbImages = arr;
  lbIndex  = idx;
  lbImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox?.classList.remove('open');
  document.body.style.overflow = '';
}

function lbNavigate(dir) {
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = lbImages[lbIndex];
    lbImg.style.opacity = '1';
  }, 150);
}

lbClose?.addEventListener('click', closeLightbox);
lbPrev?.addEventListener('click',  () => lbNavigate(-1));
lbNext?.addEventListener('click',  () => lbNavigate(1));
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (!lightbox?.classList.contains('open')) return;
  if (e.key === 'Escape')    closeLightbox();
  if (e.key === 'ArrowLeft') lbNavigate(-1);
  if (e.key === 'ArrowRight')lbNavigate(1);
});

// Attach gallery items
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryImgs  = Array.from(galleryItems).map(item => item.querySelector('img')?.src);

galleryItems.forEach((item, idx) => {
  item.addEventListener('click', () => {
    openLightbox(galleryImgs[idx], galleryImgs, idx);
  });
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');
  item.setAttribute('aria-label', 'Agrandir la photo');
  item.addEventListener('keydown', e => { if (e.key === 'Enter') item.click(); });
});

/* ─── 4. COUNTER ANIMATION ───────────────────────────────────── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const tick = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    if (current < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll('[data-target]');
if (counters.length) {
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));
}

/* ─── 5. TABS (concerts page) ────────────────────────────────── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab)?.classList.add('active');
  });
});

/* ─── 6. CONTACT FORM ────────────────────────────────────────── */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyklaglp'
 
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', async e => {
  e.preventDefault();
  let valid = true;
 
  // Validation
  contactForm.querySelectorAll('[required]').forEach(field => {
    const group = field.closest('.form-group');
    const empty = !field.value.trim();
    const emailInvalid = field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
    if (empty || emailInvalid) {
      group.classList.add('has-error');
      valid = false;
    } else {
      group.classList.remove('has-error');
    }
  });
 
  if (!valid) return;
 
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Envoi en cours…';
  btn.disabled = true;
 
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(contactForm)
    });
 
    if (response.ok) {
      contactForm.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    } else {
      const data = await response.json();
      const msg = data?.errors?.map(e => e.message).join(', ') || 'Erreur lors de l\'envoi.';
      alert('Erreur : ' + msg);
      btn.textContent = originalText;
      btn.disabled = false;
    }
  } catch (err) {
    alert('Impossible d\'envoyer le message. Vérifiez votre connexion et réessayez.');
    btn.textContent = originalText;
    btn.disabled = false;
  }
});
 
// Remove error on input
contactForm?.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('input', () => el.closest('.form-group')?.classList.remove('has-error'));
});

/* ─── 7. GALLERY FILTER ──────────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
        item.style.opacity = '1';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

/* ─── 8. STAGGER CHILDREN FADE ───────────────────────────────── */
document.querySelectorAll('.stagger-children > *').forEach((child, i) => {
  child.style.animationDelay = `${i * 0.1}s`;
  child.classList.add('fade-up');
  observer.observe(child);
});

// ─── THEME TOGGLE ──────────────────────────────────────────────
(function () {
  const STORAGE_KEY = 'ohb-theme';
  const root        = document.documentElement;

  const MOON_PATH = '<path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>';
  const SUN_PATH  = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z"/>';

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    const btn   = document.getElementById('themeToggle');
    const icon  = document.getElementById('themeIcon');
    const label = document.getElementById('themeLabel');
    if (!btn) return;
    if (theme === 'light') {
      icon.innerHTML    = MOON_PATH;
      label.textContent = 'Sombre';
    } else {
      icon.innerHTML    = SUN_PATH;
      label.textContent = 'Clair';
    }
  }

  const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  applyTheme(saved);

  function attachToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next    = current === 'light' ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachToggle);
  } else {
    attachToggle();
  }
})();

/* ─── COMPTE À REBOURS ──────────────────────────────────────── */
(function () {
  const cible = new Date('2026-06-06T19:00:00');
  function tick() {
    const diff = cible - new Date();
    if (diff <= 0) {
      document.querySelector('[id^="cd-"]')?.closest('div[style]')?.remove();
      return;
    }
    const j = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-jours').textContent    = j;
    document.getElementById('cd-heures').textContent   = h;
    document.getElementById('cd-minutes').textContent  = m;
    document.getElementById('cd-secondes').textContent = s;
  }
  tick();
  setInterval(tick, 1000);
})();


/* ─── BOUTON RETOUR EN HAUT ──────────────────────────────────── */
(function () {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Retour en haut');
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();