const navigationBars = document.querySelectorAll('.topbar');

navigationBars.forEach((navigation) => {
  const toggle = navigation.querySelector('.menu-toggle');
  const menu = navigation.querySelector('ul');

  if (!toggle || !menu) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  menu.querySelectorAll('a').forEach((link) => {
    const linkPage = link.getAttribute('href').split('#')[0] || 'index.html';
    if (linkPage === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  const closeMenu = () => {
    navigation.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  };

  toggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
});

document.querySelectorAll('[data-copy-email]').forEach((button) => {
  button.addEventListener('click', async () => {
    const email = button.dataset.copyEmail;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const fallback = document.createElement('textarea');
      fallback.value = email;
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand('copy');
      fallback.remove();
    }

    button.textContent = 'Copied';
    window.setTimeout(() => { button.textContent = 'Copy email'; }, 1600);
  });
});