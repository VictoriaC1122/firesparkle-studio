import { renderShot, mediaFor, stepImageIndex } from './showcase.mjs';
// 指南總覽頁：每款作品的畫面、簡介與步驟；完整的使用方式在各作品頁 /app/<slug>/#howto。
// 文案來源記錄於 data/guides/。guideCopy 的英文為 ui-translations.json 的對應鍵，修改時需同步更新 48 種語言。
export const guideCopy = {
  games: { zh: '遊戲玩法', en: 'Game guides', introZh: '從第一個選擇，到回看故事與養成紀錄，認識兩款遊戲的基本玩法。', introEn: 'Learn the basics of our two games, from your first choices to revisiting your progress.' },
  apps: { zh: 'App 使用指南', en: 'App guides', introZh: '選一款 App，從三個步驟開始使用。', introEn: 'Choose an app and follow three steps to get started.' },
};
export const guideURL = (a, isGame) => `/guides/${isGame ? 'games' : 'apps'}/#${a.slug}`;

export function renderGuide({ kind, apps, entries, media, L, T, messageId, esc, appURL, arrow, catL }) {
  const copy = guideCopy[kind];
  const isGame = kind === 'games';
  const list = apps.filter(a => a.genres.includes('遊戲') === isGame);
  if (isGame) list.sort((a, b) => Number(a.slug === 'perfect-pig') - Number(b.slug === 'perfect-pig'));
  if (Object.keys(entries).length !== list.length || list.some(a => !entries[a.slug]?.steps?.length)) throw new Error(`Incomplete ${kind} guide coverage`);
  const index = list.map(a => `<li><a href="#${a.slug}"><img class="app-icon" src="${a.iconPath}" alt="" width="32" height="32" loading="lazy"><span>${L(esc(a.short), esc(a.en))}</span></a></li>`).join('');
  const articles = list.map((a, i) => {
    const steps = entries[a.slug].steps;
    if (steps.length !== (isGame ? 4 : 3)) throw new Error(`Unexpected guide step count: ${a.slug}`);
    const total = mediaFor(media, a.slug).images.length;
    const stepList = steps.map((step, n) => `<li class="guide-step"><span class="guide-step-no" aria-hidden="true">${String(n + 1).padStart(2, '0')}</span>${renderShot({ app: a, media, index: stepImageIndex(entries[a.slug], n, total), esc, messageId, className: 'guide-step-shot' })}<p>${L(esc(step.zh), esc(step.en))}</p></li>`).join('');
    return `<article class="guide-entry glass" id="${a.slug}" aria-labelledby="title-${a.slug}">
      <header class="guide-entry-heading"><img class="app-icon" src="${a.iconPath}" alt="" width="64" height="64" loading="lazy"><div><p class="eyebrow plain">${String(i + 1).padStart(2, '0')} / ${catL(a.category)} <span aria-hidden="true">·</span> <span class="keep" dir="ltr">iOS</span></p><h2 id="title-${a.slug}">${L(esc(a.short), esc(a.en))}</h2><p class="guide-purpose">${L(esc(a.shortDescription), esc(a.enDesc))}</p></div></header>
      <ol class="guide-steps" data-gallery>${stepList}</ol>
      <div class="guide-actions"><a class="button" href="${appURL(a)}">${T(isGame ? 'Game details' : 'App details')} ${arrow()}</a><a class="button-glass" href="${a.storeUrl}">App Store ${arrow('↗')}</a></div>
    </article>`;
  }).join('');
  return `<div class="wrap guide-wrap"><nav class="breadcrumb" aria-label="首頁" data-i18n-label="${messageId('Home')}"><a href="/">${T('Home')}</a><span class="sep" aria-hidden="true">/</span><span aria-current="page">${L(copy.zh, copy.en)}</span></nav><header class="guide-heading"><div><p class="eyebrow">${String(list.length).padStart(2, '0')} ${isGame ? 'GAMES' : 'APPS'}</p><h1>${L(copy.zh, copy.en)}</h1><p class="lead">${L(copy.introZh, copy.introEn)}</p></div><div class="guide-switch" role="tablist"><a href="/guides/games/"${isGame ? ' aria-current="page"' : ''}>${L(guideCopy.games.zh, guideCopy.games.en)}</a><a href="/guides/apps/"${!isGame ? ' aria-current="page"' : ''}>${L(guideCopy.apps.zh, guideCopy.apps.en)}</a></div></header><nav class="guide-index" aria-label="${esc(copy.zh)}" data-i18n-label="${messageId(copy.en)}"><ol>${index}</ol></nav><div class="guide-articles">${articles}<div class="guide-help"><a class="text-link" href="/support/">${T('Support & FAQ')} ${arrow()}</a></div></div></div>`;
}
