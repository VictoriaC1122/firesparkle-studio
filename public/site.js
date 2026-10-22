// 花火工作室 FireSparkle.Studio — 作品搜尋與目前位置
document.documentElement.classList.add('js');
// Keep anchored guide entries below the header when translated navigation wraps.
const offsetHeader = document.querySelector('.site-header');
if (offsetHeader) {
  const setHeaderOffset = () => document.documentElement.style.setProperty('--site-header-height', `${offsetHeader.offsetHeight}px`);
  setHeaderOffset();
  if ('ResizeObserver' in window) new ResizeObserver(setHeaderOffset).observe(offsetHeader);
  else window.addEventListener('resize', setHeaderOffset);
}
// ---------- 作品篩選與搜尋（首頁） ----------
const bar = document.querySelector('.filter-bar');
const searchBox = document.querySelector('.search');
const input = document.getElementById('app-search');
if (bar && input) {
  bar.hidden = false;
  if (searchBox) searchBox.hidden = false;
  const clearSearch = document.querySelector('[data-clear-search]');
  const cards = [...document.querySelectorAll('.app-card')];
  const empty = document.querySelector('.no-results');
  let category = '全部';
  const update = () => {
    const words = input.value.trim().normalize('NFKC').toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const card of cards) {
      const inCategory = category === '全部' || card.dataset.category === category;
      const localizedText = `${card.dataset.search} ${card.querySelector('.card-content').textContent}`.normalize('NFKC').toLowerCase();
      const matches = words.every((w) => localizedText.includes(w));
      card.hidden = !(inCategory && matches);
      if (!card.hidden) shown++;
    }
    document.querySelectorAll('[data-count]').forEach((el) => { el.textContent = String(shown); });
    empty.hidden = shown > 0;
    if (clearSearch) clearSearch.hidden = input.value.length === 0;
  };
  bar.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    category = button.dataset.filter;
    for (const item of bar.querySelectorAll('button')) item.setAttribute('aria-pressed', String(item === button));
    update();
  });
  input.addEventListener('input', update);
  input.addEventListener('search', update);
  clearSearch?.addEventListener('click', () => {
    input.value = '';
    update();
    input.focus();
  });
  document.querySelector('[data-reset]')?.addEventListener('click', () => {
    input.value = '';
    category = '全部';
    for (const item of bar.querySelectorAll('button')) item.setAttribute('aria-pressed', String(item.dataset.filter === '全部'));
    update();
    input.focus();
  });
  // 包含瀏覽器返回此頁時還原的搜尋值。
  window.addEventListener('pageshow', update);
  document.addEventListener('site:languagechange', update);
  update();
}

// ---------- 導覽目前位置（只更新標記，不控制捲動或焦點） ----------
const navLinks = [...document.querySelectorAll('.site-nav a')];
let currentNavGroup;
const markCurrent = (group) => {
  if (group === 'games') group = 'apps';
  if (group === currentNavGroup) return;
  currentNavGroup = group;
  for (const link of navLinks) {
    const url = new URL(link.href, window.location.href);
    const key = link.dataset.navKey || url.hash.slice(1) || (/\/support\/?$/.test(url.pathname) ? 'support' : '');
    if (group && key === group) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
};

if (navLinks.length && document.body.classList.contains('is-home')) {
  // Steam 是遊戲區塊內的子區塊，後檢查它以取得更精確的位置。
  const sections = ['games', 'steam', 'apps', 'studio']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const header = document.querySelector('.site-header');
  let queued = false;
  const updateNavigation = () => {
    queued = false;
    const headerBottom = header?.getBoundingClientRect().bottom || 0;
    const marker = headerBottom + Math.min(96, Math.max(0, (window.innerHeight - headerBottom) * 0.15));
    let current = '';
    for (const section of sections) {
      const bounds = section.getBoundingClientRect();
      if (bounds.top <= marker && bounds.bottom > marker) current = section.id;
    }
    markCurrent(current);
  };
  const scheduleNavigation = () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(updateNavigation);
  };
  window.addEventListener('scroll', scheduleNavigation, { passive: true });
  window.addEventListener('resize', scheduleNavigation);
  window.addEventListener('pageshow', scheduleNavigation);
  window.addEventListener('load', scheduleNavigation, { once: true });
  // 字型載入、語言切換及窄螢幕換行都可能改變區塊高度。
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(scheduleNavigation);
    sections.forEach((section) => observer.observe(section));
    if (header) observer.observe(header);
  }
  scheduleNavigation();
} else if (navLinks.length) {
  const pathname = window.location.pathname.replace(/\/index\.html$/, '/');
  const group = document.body.dataset.nav ||
    (/\/(?:support|privacy|website-privacy)\/?$/.test(pathname) ? 'support' : '');
  markCurrent(group);
}
