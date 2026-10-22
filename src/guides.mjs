// Evidence-reviewed introductions; full source records live in data/guides/.
export const guideCopy = {
  games: { zh: '遊戲玩法', en: 'Game guides', introZh: '從第一個選擇，到回看故事與養成紀錄，認識兩款遊戲的基本玩法。', introEn: 'Learn the basics of our two games, from your first choices to revisiting your progress.' },
  apps: { zh: 'App 使用指南', en: 'App guides', introZh: '選一款 App，從三個步驟開始使用。', introEn: 'Choose an app and follow three steps to get started.' },
};
export const guideURL = (a, isGame) => `/guides/${isGame ? 'games' : 'apps'}/#${a.slug}`;

export function renderGuide({ kind, apps, entries, media, L, T, messageId, esc, appURL, arrow }) {
  const copy = guideCopy[kind];
  const isGame = kind === 'games';
  const list = apps.filter(a => a.genres.includes('遊戲') === isGame);
  if (isGame) list.sort((a, b) => Number(a.slug === 'perfect-pig') - Number(b.slug === 'perfect-pig'));
  if (Object.keys(entries).length !== list.length || list.some(a => !entries[a.slug]?.steps?.length)) throw new Error(`Incomplete ${kind} guide coverage`);
  const index = list.map((a, i) => `<li><a href="#${a.slug}"><span class="guide-index-no" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><span>${L(esc(a.short), esc(a.en))}</span></a></li>`).join('');
  const articles = list.map((a, i) => {
    const steps = entries[a.slug].steps;
    if (steps.length !== (isGame ? 4 : 3)) throw new Error(`Unexpected guide step count: ${a.slug}`);
    const screenshots = isGame ? (a.slug === 'perfect-pig' ? media[a.slug].images.slice(0, 2) : [media[a.slug].images[1]]) : [];
    const photos = screenshots.length ? `<div class="guide-screens ${a.slug === 'perfect-pig' ? 'guide-screens-phone' : ''}" data-gallery>${screenshots.map(src => `<a href="${src}" data-full-image aria-label="放大畫面" data-i18n-label="${messageId('Enlarge screenshot')}"><img src="${src}" alt="${esc(a.short)} 遊戲畫面" data-i18n-alt="${messageId(esc(a.en))}" data-i18n-alt-suffix="${messageId('Game screenshot')}" loading="lazy" width="${a.slug === 'perfect-pig' ? 415 : 900}" height="${a.slug === 'perfect-pig' ? 900 : 675}"></a>`).join('')}</div>` : '';
    const instructions = `<ol class="guide-steps">${steps.map(step => `<li>${L(esc(step.zh), esc(step.en))}</li>`).join('')}</ol>`;
    return `<article class="guide-entry" id="${a.slug}" aria-labelledby="title-${a.slug}"><header class="guide-entry-heading"><img src="${a.iconPath}" alt="" width="60" height="60" loading="lazy"><div><p class="eyebrow">${String(i + 1).padStart(2, '0')} / ${isGame ? 'iOS GAME' : 'iOS APP'}</p><h2 id="title-${a.slug}">${L(esc(a.short), esc(a.en))}</h2></div></header><p class="guide-purpose">${L(esc(a.shortDescription), esc(a.enDesc))}</p>${isGame ? `<div class="guide-gameplay">${instructions}${photos}</div>` : instructions}<div class="guide-actions"><a class="text-link" href="${appURL(a)}">${L(esc(a.short), esc(a.en))} ${arrow('↗')}</a><a class="text-link" href="${a.storeUrl}">App Store ${arrow('↗')}</a></div></article>`;
  }).join('');
  return `<div class="wrap guide-wrap"><nav class="breadcrumb" aria-label="首頁" data-i18n-label="${messageId('Home')}"><a href="/">${T('Home')}</a><span class="sep" aria-hidden="true">/</span><span aria-current="page">${L(copy.zh, copy.en)}</span></nav><header class="guide-heading"><p class="eyebrow">FireSparkle.Studio / ${String(list.length).padStart(2, '0')} ${isGame ? 'GAMES' : 'APPS'}</p><h1>${L(copy.zh, copy.en)}</h1><p class="lead">${L(copy.introZh, copy.introEn)}</p><div class="guide-switch"><a href="/guides/games/"${isGame ? ' aria-current="page"' : ''}>${L(guideCopy.games.zh, guideCopy.games.en)}</a><a href="/guides/apps/"${!isGame ? ' aria-current="page"' : ''}>${L(guideCopy.apps.zh, guideCopy.apps.en)}</a></div></header><div class="guide-layout"><aside class="guide-index"><nav aria-label="${esc(copy.zh)}" data-i18n-label="${messageId(copy.en)}"><ol>${index}</ol></nav></aside><div class="guide-articles">${articles}<div class="guide-help"><a class="text-link" href="/support/">${T('Support & FAQ')} ${arrow()}</a></div></div></div></div>`;
}
