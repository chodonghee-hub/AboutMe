const SECTIONS = [
  { id: 'heros',        label: 'Hero' },
  { id: 'projects',     label: 'Projects' },
  { id: 'tech-stack',   label: 'Tech Stack' },
  { id: 'algorithm',    label: 'Algorithm' },
  { id: 'experience',   label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
];

const NAV_HEIGHT = 44;

function getActiveIndex() {
  const scrollY = window.scrollY + NAV_HEIGHT + 60;
  let active = 0;
  SECTIONS.forEach((s, i) => {
    const el = document.getElementById(s.id);
    if (el && el.offsetTop <= scrollY) active = i;
  });
  return active;
}

function syncNavHighlight(activeIndex) {
  document.querySelectorAll('.nav ul li a').forEach((a) => {
    const href = a.getAttribute('href')?.replace('#', '');
    a.classList.toggle('nav-active', href === SECTIONS[activeIndex].id);
  });
}

function syncDots(activeIndex) {
  document.querySelectorAll('.scroll-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === activeIndex);
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.offsetTop - NAV_HEIGHT;
  window.scrollTo({ top, behavior: 'smooth' });
}

function buildDotNav() {
  const nav = document.createElement('nav');
  nav.className = 'scroll-dot-nav';
  nav.setAttribute('aria-label', '섹션 네비게이터');

  SECTIONS.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.className = 'scroll-dot';
    btn.setAttribute('aria-label', s.label);
    btn.setAttribute('title', s.label);
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => scrollToSection(s.id));
    nav.appendChild(btn);
  });

  document.body.appendChild(nav);
}

function initSmoothNavLinks() {
  document.querySelectorAll('.nav a[href^="#"], .nav-logo-icon').forEach((el) => {
    el.addEventListener('click', (e) => {
      const href = el.closest('a')?.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      scrollToSection(href.replace('#', ''));
    });
  });
}

export function initScrollNav() {
  buildDotNav();
  initSmoothNavLinks();

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const idx = getActiveIndex();
      syncNavHighlight(idx);
      syncDots(idx);
      ticking = false;
    });
  }, { passive: true });

  // Initial sync
  const idx = getActiveIndex();
  syncNavHighlight(idx);
  syncDots(idx);
}
