/* ===========================
   LOOK MY WATCH — JS
=========================== */

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Analog clock
function updateClock() {
  const now = new Date();
  const s = now.getSeconds() + now.getMilliseconds() / 1000;
  const m = now.getMinutes() + s / 60;
  const h = (now.getHours() % 12) + m / 60;

  const secondHand = document.getElementById('secondHand');
  const minuteHand = document.getElementById('minuteHand');
  const hourHand = document.getElementById('hourHand');

  if (secondHand) secondHand.style.transform = `rotate(${s * 6}deg)`;
  if (minuteHand) minuteHand.style.transform = `rotate(${m * 6}deg)`;
  if (hourHand)   hourHand.style.transform   = `rotate(${h * 30}deg)`;
}
setInterval(updateClock, 50);
updateClock();

// Product filter
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    cards.forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        const cats = card.dataset.category || '';
        card.classList.toggle('hidden', !cats.includes(filter));
      }
    });
  });
});

// Amazon redirect buttons (placeholder — will be replaced with real ASINs)
const amazonLinks = {
  batman:    'https://www.amazon.com/s?k=seiko+mod+batman',
  panda:     'https://www.amazon.com/s?k=seiko+mod+panda+daytona',
  hulk:      'https://www.amazon.com/s?k=seiko+mod+hulk+submariner',
  pepsi:     'https://www.amazon.com/s?k=seiko+mod+pepsi+gmt',
  wimbledon: 'https://www.amazon.com/s?k=seiko+mod+wimbledon+datejust',
  starbucks: 'https://www.amazon.com/s?k=seiko+mod+starbucks+submariner',
  cocacola:  'https://www.amazon.com/s?k=seiko+mod+coca+cola+gmt',
  sprite:    'https://www.amazon.com/s?k=seiko+mod+sprite+gmt',
  joker:     'https://www.amazon.com/s?k=seiko+mod+joker+gmt',
  batgirl:   'https://www.amazon.com/s?k=seiko+mod+batgirl+gmt',
  rootbeer:  'https://www.amazon.com/s?k=seiko+mod+root+beer+gmt',
  ghost:     'https://www.amazon.com/s?k=seiko+mod+ghost+daytona',
};

document.querySelectorAll('[data-watch]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const watch = btn.dataset.watch;
    const url = amazonLinks[watch];
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  });
});

// Scroll reveal
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  }),
  { threshold: 0.1 }
);

document.querySelectorAll('.product-card, .stat, .section-header').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
