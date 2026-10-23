// 作品頁的詳細介紹與操作說明（data/guides/details/<slug>.json）
// 內容以繁體中文與英文撰寫：zh 區塊預設顯示，en 區塊 hidden；public/i18n.js 的 setPolicyVersion()
// 會依目前語言切換（zh 系語言顯示中文，其餘顯示英文），與網站隱私說明的 data-policy-version 機制相同。
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const sections = ['intro', 'features', 'stepDetails', 'more', 'tips'];

// 讀取並檢查每款作品的詳細內容：zh/en 必須存在，且各區塊數量一致、步驟說明數量需等於使用步驟數。
export async function loadDetails(root, slug, stepCount) {
  const detail = JSON.parse(await readFile(resolve(root, `data/guides/details/${slug}.json`), 'utf8'));
  for (const lang of ['zh', 'en']) {
    if (!detail[lang]) throw new Error(`Missing ${lang} details: ${slug}`);
    for (const key of sections) if (!Array.isArray(detail[lang][key]) || !detail[lang][key].length) throw new Error(`Missing ${lang}.${key} in details: ${slug}`);
    if (detail[lang].stepDetails.length !== stepCount) throw new Error(`${slug}: ${lang} stepDetails has ${detail[lang].stepDetails.length} items, expected ${stepCount}`);
  }
  for (const key of sections) if (detail.zh[key].length !== detail.en[key].length) throw new Error(`${slug}: zh/en ${key} counts differ`);
  return detail;
}

// 兩種語言版本的同一區塊：zh 可見、en 隱藏，由前端依語言切換。
const bilingual = (render, tag = 'div', cls = '') => `<${tag}${cls ? ` class="${cls}"` : ''} data-policy-version="zh-Hant" lang="zh-Hant" dir="ltr">${render('zh')}</${tag}><${tag}${cls ? ` class="${cls}"` : ''} data-policy-version="en" lang="en" dir="ltr" hidden>${render('en')}</${tag}>`;

// 介紹區：段落介紹 + 主要功能
export function renderAbout({ detail, isGame, T, esc }) {
  const intro = (lang) => detail[lang].intro.map((p) => `<p>${esc(p)}</p>`).join('');
  const features = (lang) => detail[lang].features.map(([t, d]) => `<li><strong>${esc(t)}</strong><span>${esc(d)}</span></li>`).join('');
  return `<section class="section app-about" id="about" aria-labelledby="about-title"><div class="section-head reveal"><div><p class="eyebrow">${isGame ? T('Game details') : T('App details')}</p><h2 id="about-title">${isGame ? T('About this game') : T('About this app')}</h2></div><p class="detail-note">${T('The full description and guide are available in Traditional Chinese and English.')}</p></div><div class="about-grid reveal">${bilingual(intro, 'div', 'about-copy')}<aside class="feature-list glass"><h3>${T('Key features')}</h3>${bilingual(features, 'ul')}</aside></div></section>`;
}

// 每個使用步驟下方的詳細說明
export function renderStepDetail({ detail, index, esc }) {
  return bilingual((lang) => esc(detail[lang].stepDetails[index]), 'p', 'step-detail');
}

// 使用方式區塊下方的「更多用法」與「小提醒」
export function renderMore({ detail, T, esc }) {
  const more = (lang) => detail[lang].more.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join('');
  const tips = (lang) => detail[lang].tips.map((t) => `<li>${esc(t)}</li>`).join('');
  return `<div class="howto-more reveal"><div class="more-list glass"><h3>${T('More ways to use it')}</h3>${bilingual(more, 'dl')}</div><aside class="tips-list glass"><h3>${T('Tips')}</h3>${bilingual(tips, 'ul')}</aside></div>`;
}
