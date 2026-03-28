/* =============================================
   JULIEN LEDOUBLE — PORTFOLIO
   main.js
   ============================================= */

/* ── CURSOR ── */
const cur  = document.getElementById('cur');
const cur2 = document.getElementById('cur2');
let mx = 0, my = 0;

const darkSections = document.querySelectorAll('.hero-right, .about-left, .contact');

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';

  let onDark = false;
  darkSections.forEach(sec => {
    const r = sec.getBoundingClientRect();
    if (mx >= r.left && mx <= r.right && my >= r.top && my <= r.bottom) onDark = true;
  });
  document.body.classList.toggle('on-dark', onDark);
});

let tx = 0, ty = 0;
(function loop() {
  tx += (mx - tx) * .13;
  ty += (my - ty) * .13;
  cur2.style.left = tx + 'px';
  cur2.style.top  = ty + 'px';
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a, button, .project-item').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

/* ── NAV SCROLL ── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
});

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── SKILLS ANIMATION ── */
const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(fill => {
        const pct = fill.dataset.pct;
        setTimeout(() => { fill.style.width = pct + '%'; }, 250);
      });
      skillsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

const skillsBlock = document.getElementById('skillsBlock');
if (skillsBlock) skillsObserver.observe(skillsBlock);

/* ── PROJECT HOVER (keeps ::before working) ── */
document.querySelectorAll('.project-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.margin  = '0 -3rem';
    item.style.padding = '4rem 3rem';
    item.style.background = 'var(--chalk2)';
  });
  item.addEventListener('mouseleave', () => {
    item.style.margin  = '';
    item.style.padding = '';
    item.style.background = '';
  });
});

/* ── CAROUSELS ── */
document.querySelectorAll('.proj-carousel').forEach(carousel => {
  const track  = carousel.querySelector('.proj-carousel-track');
  const imgs   = track ? track.querySelectorAll('img') : [];
  const dots   = carousel.querySelectorAll('.c-dot');
  const prev   = carousel.querySelector('.proj-car-prev');
  const next   = carousel.querySelector('.proj-car-next');
  let idx = 0;

  if (!track || imgs.length <= 1) {
    if (prev) prev.style.display = 'none';
    if (next) next.style.display = 'none';
    return;
  }

  const go = (n) => {
    idx = (n + imgs.length) % imgs.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('c-active', i === idx));
  };

  if (prev) prev.addEventListener('click', (e) => { e.stopPropagation(); go(idx - 1); });
  if (next) next.addEventListener('click', (e) => { e.stopPropagation(); go(idx + 1); });
  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
});
