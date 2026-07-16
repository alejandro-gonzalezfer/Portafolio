/* ==============================================================
   PORTAFOLIO — ALEJANDRO GONZÁLEZ
   JavaScript organizado por módulos:
   1. Selector de tema (claro/oscuro)
   2. Menú móvil
   3. Scrollspy (enlace activo del nav)
   4. Animaciones de aparición al hacer scroll
   5. Barras de habilidades + contador animado
   6. Efecto de escritura en el rol del hero
   7. Botón "bajar" del hero
   8. Sistema de modales (proyectos y blog)
   9. Formulario de contacto (Formspree)
   10. Año dinámico del footer
   ============================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. SELECTOR DE TEMA
     El tema inicial ya se aplica en un script inline dentro del
     <head> (para evitar parpadeos). Aquí solo manejamos el clic
     del botón y guardamos la preferencia del usuario.
  ============================================================ */
  const themeToggle = document.getElementById('themeToggle');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.setAttribute('aria-pressed', theme === 'light');
  }

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'light' ? 'dark' : 'light');
  });

  // Sincroniza aria-pressed con el tema aplicado al cargar
  themeToggle.setAttribute('aria-pressed', document.documentElement.getAttribute('data-theme') === 'light');


  /* ============================================================
     2. MENÚ MÓVIL
  ============================================================ */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });


  /* ============================================================
     3. SCROLLSPY — resalta el enlace del nav según la sección visible
  ============================================================ */
  const sections = document.querySelectorAll('main section[id], .hero[id]');
  const navItems = document.querySelectorAll('[data-nav]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active', isActive);
          if (isActive) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => navObserver.observe(section));


  /* ============================================================
     4. ANIMACIONES DE APARICIÓN AL HACER SCROLL
     Cualquier elemento con la clase .reveal-up se anima cuando
     entra en el viewport. El delay de cada uno se controla con
     la variable CSS --delay definida inline en el HTML.
  ============================================================ */
  const revealTargets = document.querySelectorAll('.reveal-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));


  /* ============================================================
     5. BARRAS DE HABILIDADES + CONTADOR ANIMADO
     Cuando una tarjeta de habilidad entra en vista: la barra se
     rellena con una transición CSS y el número sube de 0 al valor
     final con requestAnimationFrame (más fluido que setInterval).
  ============================================================ */
  function animateCounter(el, target, duration = 1200) {
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic: empieza rápido y desacelera al final
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const skillCards = document.querySelectorAll('.skill-card');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const card = entry.target;
      const fill = card.querySelector('[data-fill]');
      const counter = card.querySelector('[data-counter]');
      const value = Number(fill.dataset.value);

      fill.style.setProperty('--target-width', `${value}%`);
      fill.classList.add('is-filled');
      animateCounter(counter, value);

      skillObserver.unobserve(card);
    });
  }, { threshold: 0.4 });

  skillCards.forEach(card => skillObserver.observe(card));


  /* ============================================================
     6. EFECTO DE ESCRITURA EN EL ROL DEL HERO
  ============================================================ */
  const typedEl = document.getElementById('typedRole');
  const roles = [
    'Automatización Industrial',
    'Control de Procesos',
    'Sistemas SCADA',
    'Redes Industriales'
  ];

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      if (charIndex >= current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      charIndex--;
      if (charIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    typedEl.textContent = current.slice(0, charIndex);
    setTimeout(typeLoop, deleting ? 40 : 70);
  }

  // Arranca desde el texto ya presente en el HTML (evita "salto" inicial)
  setTimeout(() => {
    deleting = true;
    typeLoop();
  }, 2200);


  /* ============================================================
     7. BOTÓN "BAJAR" DEL HERO
  ============================================================ */
  const scrollHint = document.getElementById('scrollHint');
  scrollHint.addEventListener('click', () => {
    document.getElementById('sobre-mi').scrollIntoView({ behavior: 'smooth' });
  });


  /* ============================================================
     8. SISTEMA DE MODALES (proyectos y blog)
  ============================================================ */
  const modalTriggers = document.querySelectorAll('.js-modal-trigger');
  const modals = document.querySelectorAll('.modal');
  let lastFocusedElement = null;

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    lastFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    const closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) closeBtn.focus();

    if (location.hash !== `#${id}`) {
      history.pushState(null, '', `#${id}`);
    }
  }

  function closeModal(modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (location.hash === `#${modal.id}`) {
      history.pushState(null, '', location.pathname + location.search);
    }
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(trigger.dataset.modal);
    });
  });

  modals.forEach(modal => {
    modal.querySelectorAll('[data-modal-close]').forEach(el => {
      el.addEventListener('click', () => closeModal(modal));
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalEl = document.querySelector('.modal.is-open');
      if (openModalEl) closeModal(openModalEl);
    }
  });

  // Abre el modal correspondiente si se llega con un enlace directo (#modal-xxx)
  function checkHashForModal() {
    const id = location.hash.replace('#', '');
    const target = document.getElementById(id);
    if (target && target.classList.contains('modal') && !target.classList.contains('is-open')) {
      openModal(id);
    }
  }
  checkHashForModal();
  window.addEventListener('hashchange', checkHashForModal);


  /* ============================================================
     9. FORMULARIO DE CONTACTO (Formspree)
     Envío por AJAX para no recargar la página, con estados de
     carga, éxito y error.
  ============================================================ */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');
  const submitBtn = document.getElementById('contactSubmit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    status.textContent = '';
    status.classList.remove('contact__status--error');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.textContent = '¡Mensaje enviado! Te responderé lo antes posible.';
        form.reset();
      } else {
        const data = await response.json().catch(() => null);
        const msg = data && data.errors ? data.errors.map(err => err.message).join(', ') : null;
        status.textContent = msg || 'No se pudo enviar el mensaje. Intenta de nuevo o escríbeme directo al correo.';
        status.classList.add('contact__status--error');
      }
    } catch (err) {
      status.textContent = 'Error de conexión. Intenta de nuevo o escríbeme directo al correo.';
      status.classList.add('contact__status--error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensaje';
    }
  });


  /* ============================================================
     10. AÑO DINÁMICO DEL FOOTER
  ============================================================ */
  document.getElementById('year').textContent = new Date().getFullYear();

});
