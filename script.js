/* ===========================
   LOOK MY WATCH — SCRIPT
=========================== */

/* ---------------------------
   DONNÉES PRODUITS
   → Ajoute tes liens Amazon dans `amazon`
   → Ajoute tes images dans `img` (ex: `${import.meta.env.BASE_URL}images/batman.jpg')
--------------------------- */
const watches = [
  {
    id: 'batman',
    name: 'BATMAN',
    type: 'GMT Master II',
    categories: 'gmt pop-culture',
    badge: 'Icône',
    desc: 'Cadran noir, lunette bi-couleur noir/bleu. L\'élégance sombre de Gotham au poignet.',
    colors: ['#0d0d0d', '#1a3a6b'],
    accent: '#1a3a6b',
    img: `${import.meta.env.BASE_URL}images/batman.png`,
    amazon: 'https://www.amazon.com/s?k=seiko+mod+batman',
  },
  {
    id: 'panda',
    name: 'PANDA',
    type: 'Daytona Chronographe',
    categories: 'daytona brands',
    badge: 'Bestseller',
    badgeNew: true,
    desc: 'Cadran blanc, sous-compteurs noirs. Le chronographe iconique dans sa version la plus pure.',
    colors: ['#f0f0f0', '#1a1a1a'],
    accent: '#e0e0e0',
    img: `${import.meta.env.BASE_URL}images/panda.png`,
    amazon: 'https://www.amazon.com/s?k=seiko+mod+panda+daytona',
  },
  {
    id: 'hulk',
    name: 'HULK',
    type: 'Submariner',
    categories: 'submariner pop-culture',
    badge: 'Exclusif',
    desc: 'Full green — lunette et cadran vert intense. La puissance à l\'état pur.',
    colors: ['#1a6b2a', '#155224'],
    accent: '#1a6b2a',
    img: `${import.meta.env.BASE_URL}images/hulk.png`,
    amazon: 'https://www.amazon.com/s?k=seiko+mod+hulk+submariner',
  },
  {
    id: 'pepsi',
    name: 'PEPSI',
    type: 'GMT Master — Jubilee',
    categories: 'gmt brands',
    desc: 'Lunette rouge/bleu iconique sur bracelet Jubilee. La référence absolue du GMT.',
    colors: ['#002fa7', '#c41e3a'],
    accent: '#c41e3a',
    img: `${import.meta.env.BASE_URL}images/pepsi.png`,
    amazon: 'https://www.amazon.com/s?k=seiko+mod+pepsi+gmt',
  },
  {
    id: 'wimbledon',
    name: 'WIMBLEDON',
    type: 'Datejust — Jubilee',
    categories: 'datejust brands',
    desc: 'Cadran ardoise sombre, chiffres romains verts. L\'élégance des courts du Grand Chelem.',
    colors: ['#2a2a2a', '#4caf50'],
    accent: '#4caf50',
    img: `${import.meta.env.BASE_URL}images/wimbledon.png`,
    amazon: 'https://www.amazon.com/s?k=seiko+mod+wimbledon+datejust',
  },
  {
    id: 'starbucks',
    name: 'STARBUCKS',
    type: 'Submariner',
    categories: 'submariner brands',
    desc: 'Lunette verte, cadran noir profond. La discrétion du plongeur avec l\'âme du café.',
    colors: ['#1a6b2a', '#0d0d0d'],
    accent: '#1a6b2a',
    img: `${import.meta.env.BASE_URL}images/starbucks.png`,
    amazon: 'https://www.amazon.com/s?k=seiko+mod+starbucks+submariner',
  },
  {
    id: 'cocacola',
    name: 'COCA-COLA',
    type: 'GMT Coke',
    categories: 'gmt brands',
    desc: 'Lunette noir/rouge, cadran sombre. L\'énergie rouge intemporelle au poignet.',
    colors: ['#0d0d0d', '#cc0000'],
    accent: '#cc0000',
    img: `${import.meta.env.BASE_URL}images/coca.png`,
    amazon: 'https://www.amazon.com/s?k=seiko+mod+coca+cola+gmt',
  },
  {
    id: 'sprite',
    name: 'SPRITE',
    type: 'GMT — Jubilee',
    categories: 'gmt brands',
    desc: 'Lunette noir/vert sur bracelet Jubilee. La fraîcheur cristalline en acier inoxydable.',
    colors: ['#0d0d0d', '#1a6b2a'],
    accent: '#1a6b2a',
    img: `${import.meta.env.BASE_URL}images/sprite.png`,
    amazon: 'https://www.amazon.com/s?k=seiko+mod+sprite+gmt',
  },
  {
    id: 'joker',
    name: 'JOKER',
    type: 'GMT',
    categories: 'gmt pop-culture',
    desc: 'Lunette noir/violet. Le chaos élégant du Prince du Crime au poignet.',
    colors: ['#0d0d0d', '#6a0dad'],
    accent: '#6a0dad',
    img: `${import.meta.env.BASE_URL}images/joker.png`,
    amazon: 'https://www.amazon.com/s?k=seiko+mod+joker+gmt',
  },
  {
    id: 'batgirl',
    name: 'BATGIRL',
    type: 'GMT — Jubilee',
    categories: 'gmt pop-culture',
    desc: 'Lunette noir/bleu sur Jubilee. La justice nocturne, en version féminine et acérée.',
    colors: ['#0d0d0d', '#1a3a6b'],
    accent: '#1a3a6b',
    img: `${import.meta.env.BASE_URL}images/batwoman.png`,
    amazon: 'https://www.amazon.com/s?k=seiko+mod+batgirl+gmt',
  },
  {
    id: 'rootbeer',
    name: 'ROOT BEER',
    type: 'GMT Master II — Bicolore',
    categories: 'gmt brands',
    desc: 'Bicolore or/acier, lunette noir/brun. La pièce la plus luxueuse de la collection.',
    colors: ['#c9a84c', '#8b4513', '#0d0d0d'],
    accent: '#c9a84c',
    img: `${import.meta.env.BASE_URL}images/h.png`,
    amazon: 'https://www.amazon.com/s?k=seiko+mod+root+beer+gmt',
  },
  {
    id: 'ghost',
    name: 'GHOST',
    type: 'Daytona Chronographe',
    categories: 'daytona pop-culture',
    desc: 'Cadran gris argenté, sous-compteurs noirs. L\'invisible qui marque les esprits.',
    colors: ['#b0b0b0', '#1a1a1a'],
    accent: '#999',
    img: `${import.meta.env.BASE_URL}images/ghost.png`,
    amazon: 'https://www.amazon.com/s?k=seiko+mod+ghost+daytona',
  },
];

/* ---------------------------
   GÉNÉRATION DES CARDS
--------------------------- */
function buildCard(w) {
  const colorDots = w.colors.map(c =>
    `<span class="color-dot" style="background:${c}"></span>`
  ).join('');

  const badge = w.badge
    ? `<div class="product-badge${w.badgeNew ? ' new' : ''}">${w.badge}</div>`
    : '';

  return `
    <article class="product-card" data-category="${w.categories}">
      <div class="product-image card-trigger"
           style="--accent:${w.accent}"
           data-id="${w.id}">
        <img
          src="${w.img}"
          alt="${w.name}"
          class="card-real-img"
          loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
        />
        <div class="card-fallback-watch" style="display:none">
          <div class="watch-preview">
            <div class="watch-bezel" style="background:${w.accent}"></div>
            <div class="watch-dial"></div>
            <span class="watch-label">${w.type.split(' ')[0].toUpperCase()}</span>
          </div>
        </div>
        ${badge}
        <div class="card-hover-hint">
          <span>Découvrir</span>
        </div>
      </div>
      <div class="product-info">
        <div class="product-meta">
          <span class="product-type">${w.type}</span>
          <div class="product-colors">${colorDots}</div>
        </div>
        <h3 class="product-name">${w.name}</h3>
        <p class="product-desc">${w.desc}</p>
        <div class="product-separator"></div>
        <div class="product-footer">
          <a href="${w.amazon}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Voir sur Amazon →
          </a>
        </div>
      </div>
    </article>`;
}

const grid = document.getElementById('productsGrid');
grid.innerHTML = watches.map(buildCard).join('');

/* ---------------------------
   FILTRES
--------------------------- */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.classList.toggle('hidden', f !== 'all' && !card.dataset.category.includes(f));
    });
  });
});

/* ---------------------------
   HEADER SCROLL
--------------------------- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ---------------------------
   MENU MOBILE
--------------------------- */
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

/* ---------------------------
   HORLOGE ANALOGIQUE
--------------------------- */
function updateClock() {
  const now = new Date();
  const s = now.getSeconds() + now.getMilliseconds() / 1000;
  const m = now.getMinutes() + s / 60;
  const h = (now.getHours() % 12) + m / 60;
  const sh = document.getElementById('secondHand');
  const mh = document.getElementById('minuteHand');
  const hh = document.getElementById('hourHand');
  if (sh) sh.style.transform = `rotate(${s * 6}deg)`;
  if (mh) mh.style.transform = `rotate(${m * 6}deg)`;
  if (hh) hh.style.transform = `rotate(${h * 30}deg)`;
}
setInterval(updateClock, 50);
updateClock();

/* ---------------------------
   SCROLL REVEAL
--------------------------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }, e.target.dataset.delay || 0);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.product-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  el.dataset.delay = (i % 3) * 80;
  revealObserver.observe(el);
});
document.querySelectorAll('.stat, .section-header').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  el.dataset.delay = 0;
  revealObserver.observe(el);
});

/* ---------------------------
   MODAL
--------------------------- */
const modal      = document.getElementById('watchModal');
const modalImg   = document.getElementById('modalImg');
const modalType  = document.getElementById('modalType');
const modalName  = document.getElementById('modalName');
const modalDesc  = document.getElementById('modalDesc');
const modalColors= document.getElementById('modalColors');
const modalBtn   = document.getElementById('modalBtn');
const modalClose = document.getElementById('modalClose');

function openModal(watchId) {
  const w = watches.find(x => x.id === watchId);
  if (!w) return;
  modalImg.src    = w.img;
  modalImg.alt    = w.name;
  modalType.textContent = w.type;
  modalName.textContent = w.name;
  modalDesc.textContent = w.desc;
  modalColors.innerHTML = w.colors.map(c =>
    `<span class="color-dot" style="background:${c}"></span>`
  ).join('');
  modalBtn.href = w.amazon;
  document.body.style.overflow = 'hidden';
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('is-open');
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('productsGrid').addEventListener('click', e => {
  const trigger = e.target.closest('.card-trigger');
  if (!trigger) return;
  openModal(trigger.dataset.id);
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
