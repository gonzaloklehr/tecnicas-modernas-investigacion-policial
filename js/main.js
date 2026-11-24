const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
const navLinks = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];

function setMenuOpen(open) {
  if (!menuToggle || !nav) return;
  nav.classList.toggle('open', open);
  menuToggle.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  navLinks.forEach(link => link.addEventListener('click', () => setMenuOpen(false)));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
}

if ('IntersectionObserver' in window) {
  const sections = [...document.querySelectorAll('main section[id]')];
  const observer = new IntersectionObserver(entries => {
    const visibleSections = entries.filter(entry => entry.isIntersecting);
    if (!visibleSections.length) return;

    visibleSections.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    const activeId = visibleSections[0].target.id;
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('active', active);
      if (active) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });

  sections.forEach(section => observer.observe(section));
}
