// 花火工作室 FireSparkle.Studio — 語言切換、作品篩選與搜尋、區塊淡入
document.documentElement.classList.add('js');
const root = document.documentElement;
const isEn = () => root.lang === 'en';

// ---------- 語言切換（偏好存在瀏覽器本機） ----------
function applyLang(lang) {
  root.lang = lang === 'en' ? 'en' : 'zh-Hant';
  for (const el of document.querySelectorAll('[data-placeholder-en]')) {
    if (!el.dataset.placeholderZh) el.dataset.placeholderZh = el.placeholder;
    el.placeholder = lang === 'en' ? el.dataset.placeholderEn : el.dataset.placeholderZh;
  }
}
applyLang(isEn() ? 'en' : 'zh');
for (const button of document.querySelectorAll('[data-lang-toggle]')) {
  button.addEventListener('click', () => {
    const next = isEn() ? 'zh' : 'en';
    applyLang(next);
    try { localStorage.setItem('fs-lang', next); } catch (e) { /* 私密瀏覽等情況下不儲存 */ }
  });
}

// ---------- 作品篩選與搜尋（首頁） ----------
const bar = document.querySelector('.filter-bar');
const searchBox = document.querySelector('.search');
const input = document.getElementById('app-search');
if (bar && input) {
  bar.hidden = false;
  searchBox.hidden = false;
  const cards = [...document.querySelectorAll('.app-card')];
  const counts = document.querySelectorAll('[data-count]');
  const empty = document.querySelector('.no-results');
  let category = '全部';
  const update = () => {
    const words = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const card of cards) {
      const inCategory = category === '全部' || card.dataset.category === category;
      const matches = words.every((w) => card.dataset.search.includes(w));
      card.hidden = !(inCategory && matches);
      if (!card.hidden) shown++;
    }
    counts.forEach((el) => { el.textContent = String(shown); });
    empty.hidden = shown > 0;
  };
  bar.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    category = button.dataset.filter;
    for (const item of bar.querySelectorAll('button')) item.setAttribute('aria-pressed', String(item === button));
    update();
  });
  input.addEventListener('input', update);
  document.querySelector('[data-reset]')?.addEventListener('click', () => {
    input.value = '';
    category = '全部';
    for (const item of bar.querySelectorAll('button')) item.setAttribute('aria-pressed', String(item.dataset.filter === '全部'));
    update();
    input.focus();
  });
}

// ---------- 區塊淡入（尊重「減少動態效果」） ----------
const targets = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
  targets.forEach((el) => io.observe(el));
  // 保險：觀察器沒觸發時（例如分頁在背景載入），幾秒後仍顯示內容
  setTimeout(() => targets.forEach((el) => el.classList.add('is-in')), 3500);
} else {
  targets.forEach((el) => el.classList.add('is-in'));
}
