import { renderPhone } from './showcase.mjs';
// 首頁：工作室主視覺（品牌標誌與作品星軌）、已推出的遊戲、全部作品、工作室介紹、社群與聯絡。
// Steam 只呈現已確認的準備狀態。
export function renderHome({ site, apps, media, L, T, messageId, esc, appURL, catL, mailto, email, arrow, brandAsset, socialLink }) {
  const bySlug = Object.fromEntries(apps.map(a => [a.slug, a]));
  const utilities = apps.filter(a => !a.genres.includes('遊戲'));
  const games = apps.filter(a => a.genres.includes('遊戲'));
  const groups = ['全部', ...new Set(apps.map(a => a.category))];

  // 星軌：品牌標誌置中，周圍環繞作品圖示（依作品排序取前 6 款）。
  const orbitIcons = apps.slice(0, 6).map((a, i) => `<img class="orbit-icon${i % 2 ? ' far' : ''}" style="--a:${Math.round(i * 60 + 15)}deg;--d:${(i * .9).toFixed(1)}s" src="${a.iconPath}" alt="" width="128" height="128" loading="lazy">`).join('');

  const gameCard = (slug, tone, zhType, enType, zhDesc, enDesc, mediaMarkup, character) => {
    const a = bySlug[slug];
    return `<article class="game-card ${tone} glass reveal">
      <a class="game-media" href="${appURL(a)}" aria-label="${esc(a.short)}" data-i18n-label="${messageId(esc(a.en))}">${mediaMarkup}${character}</a>
      <div class="game-body"><span class="game-tag">${L(zhType, enType)}<span aria-hidden="true">·</span><span class="keep" dir="ltr">iOS</span></span>
      <h3><a href="${appURL(a)}">${L(esc(a.short), esc(a.en))}</a></h3><p>${L(zhDesc, enDesc)}</p>
      <div class="game-links"><a class="text-link" href="${appURL(a)}">${L('遊戲介紹', 'Game details')} ${arrow()}</a><a class="text-link" href="${appURL(a)}#howto">${T('How to use')} ${arrow()}</a><a class="store-link" href="${a.storeUrl}">App Store ${arrow('↗')}</a></div></div>
    </article>`;
  };

  const larry = bySlug['larry-cocktail'];
  const pig = bySlug['perfect-pig'];
  const larryMedia = renderPhone({ app: larry, media, index: 0, esc, messageId });
  // 完美養豬在首頁使用兩張素面的遊戲畫面（豬舍與聊天），而非前兩張宣傳合成圖，維持清雅的整體感。
  const pigShots = media[pig.slug].images.length > 4 ? [3, 4] : [0, 1];
  const pigMedia = pigShots.map(i => renderPhone({ app: pig, media, index: i, esc, messageId })).join('');

  const cards = apps.map((a, i) => `<article class="app-card glass reveal" style="animation-delay:${Math.min(i, 8) * 40}ms" data-category="${a.category}" data-search="${esc([a.nameZhHant, a.short, a.en, a.shortDescription, a.enDesc, a.category].join(' ').toLowerCase())}">
    <div class="card-top"><img class="app-icon card-icon" src="${a.iconPath}" alt="" loading="lazy" width="120" height="120"><div><p class="card-category">${catL(a.category)}</p><h3><a class="card-main-link" href="${appURL(a)}">${L(esc(a.short), esc(a.en))}</a></h3></div></div>
    <div class="card-content"><p class="card-desc">${L(esc(a.shortDescription), esc(a.enDesc))}</p></div>
    <div class="card-foot"><span class="text-link">${T('How to use')} ${arrow()}</span><a class="store-link" href="${a.storeUrl}">App Store ${arrow('↗')}</a></div></article>`).join('');

  return `
<section class="hero" aria-labelledby="hero-title">
 <div class="hero-aurora" aria-hidden="true"></div>
 <div class="wrap hero-grid">
  <div class="hero-copy reveal">
   <p class="eyebrow">${T('Independent app & game studio')} <span aria-hidden="true">·</span> <span class="keep" dir="ltr">Est. ${site.founded}</span></p>
   <h1 id="hero-title">${L('將微小的靈感火花，<br><em>化為精彩的創意</em>', 'Small sparks,<br><em>big ideas.</em>')}</h1>
   <p class="lead">${T('Founded in 2026, FireSparkle.Studio is an independent studio making iOS apps, indie games and practical tools.')}</p>
   <div class="hero-actions"><a class="button" href="#apps">${T('All works')} ${arrow()}</a><a class="button-glass" href="#games">${T('Games')} ${arrow()}</a></div>
   <div class="hero-social"><span>${T('Follow us')}</span>${socialLink('instagram')}${socialLink('threads')}</div>
  </div>
  <div class="hero-art reveal" aria-hidden="true">
   <div class="orbit"><img class="hero-logo" src="${brandAsset('/assets/brand/icon-512.png')}" alt="" width="512" height="512" fetchpriority="high">${orbitIcons}</div>
  </div>
 </div>
 <div class="wrap hero-stats reveal">
  <div class="glass"><strong>${apps.length}</strong><span>${T('Works')}</span></div>
  <div class="glass"><strong>${utilities.length}</strong><span>${T('Apps')}</span></div>
  <div class="glass"><strong>${games.length}</strong><span>${T('Games')}</span></div>
  <div class="glass"><strong dir="ltr">iOS</strong><span dir="ltr">App Store</span></div>
  <div class="glass"><span class="status-dot" aria-hidden="true"></span><strong dir="ltr">Steam</strong><span>${T('Preparing for Steam')}</span></div>
 </div>
</section>

<section id="games" class="games" aria-labelledby="games-title"><div class="wrap">
 <div class="section-head reveal"><div><p class="eyebrow">${T('Games')}</p><h2 id="games-title">${L('已推出的遊戲', 'Released games')}</h2></div><p>${L('在酒吧裡透過對話推進故事，或照顧一隻小豬。<br>介紹頁有遊戲畫面、玩法說明與下載連結。', 'Choose how a conversation unfolds in a bar, or spend seven days raising a piglet. Each game page has screenshots, a description and a download link.')}</p></div>
 <div class="game-grid">${gameCard('larry-cocktail', 'game-amber', '互動敘事 · 戀愛文字', 'Interactive fiction · Romance', '以酒吧為背景的文字戀愛遊戲。對話選項會影響故事走向，可用存檔回到不同分支。', 'A romance game set in a bar. Dialogue choices lead to different story branches, which you can revisit using saved games.', larryMedia, `<img class="game-character character-larry" src="/assets/characters/larry-smiling.gif" alt="" width="530" height="650" loading="lazy">`)}${gameCard('perfect-pig', 'game-rose', '養成 · 模擬', 'Life sim · Raising', '照顧小豬七天，安排餵食、散步與聊天，收集個性卡牌與故事結局。', 'Raise a piglet over seven days. Feed, walk and chat with it to collect personality cards and story endings.', pigMedia, `<img class="game-character character-pig" src="/assets/characters/perfect-pig-celebrating.png" alt="" width="412" height="354" loading="lazy">`)}</div>
 <div id="steam" class="steam-band glass reveal" aria-labelledby="steam-title"><div class="steam-word" dir="ltr">Steam</div><div class="steam-copy"><span class="status-label"><span class="status-dot" aria-hidden="true"></span>${L('上架準備中', 'Preparing for Steam')}</span><h2 id="steam-title">${L('Steam 上架進度', 'Steam release status')}</h2><p>${L('我們正在準備 Steam 上架。<br>作品資訊與商店連結確認後，會在這裡更新。', 'We are preparing a Steam release. Game details and the store link will be added here once confirmed.')}</p></div><a class="text-link" href="${mailto('FireSparkle.Studio｜遊戲與合作 Games & collaboration')}">${L('遊戲合作與媒體聯繫', 'Games, press & collaboration')} ${arrow('↗')}</a></div>
</div></section>

<section id="apps" class="apps" aria-labelledby="apps-title"><div class="wrap">
 <div class="section-head reveal"><div><p class="eyebrow">${T('Works')}</p><h2 id="apps-title">${T('All works')}</h2><p>${T('Apps for daily life and learning, alongside romance games and pet simulations.')} ${T('Every app and game has its own page with screenshots and step-by-step instructions.')}</p></div><p class="app-count" aria-live="polite" aria-atomic="true">${L('共 <b data-count>{count}</b> 款作品', 'Works: <b data-count>{count}</b>', { count: apps.length })}</p></div>
 <div class="collection-tools reveal"><div class="filter-bar" role="group" aria-label="作品分類" data-i18n-label="${messageId('Category')}" hidden>${groups.map((g, i) => `<button type="button" data-filter="${g}" aria-pressed="${i === 0}">${catL(g)}</button>`).join('')}</div><div class="search" hidden><label class="visually-hidden" for="app-search">${T('Search works')}</label><svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg><input id="app-search" type="search" placeholder="搜尋名稱或功能" data-i18n-placeholder="${messageId('Search works or features')}" data-i18n-label="${messageId('Search works')}" aria-label="搜尋作品" autocomplete="off"><button class="search-clear" type="button" data-clear-search hidden><span class="visually-hidden">${L('清除搜尋', 'Clear search')}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg></button></div></div>
 <div class="app-grid">${cards}</div><div class="no-results" hidden><p>${T('No works found. Try another search or clear the filters.')}</p><button class="button button-quiet" type="button" data-reset>${T('Show all works')}</button></div>
</div></section>

<section id="studio" class="studio" aria-labelledby="studio-title"><div class="wrap studio-grid">
 <div class="studio-identity glass reveal"><img src="${brandAsset('/assets/brand/firesparkle-mark-720.webp')}" alt="花火工作室 FireSparkle.Studio" width="720" height="720" loading="lazy"><p lang="zh-Hant">花火工作室</p><small><span class="studio-latin">FireSparkle<span>.</span>Studio</span> · ${T('Independent app and game development')}</small><div class="hero-social">${socialLink('instagram')}${socialLink('threads')}</div></div>
 <div class="studio-copy reveal"><p class="eyebrow">${T('Studio')}</p><h2 id="studio-title">${L('關於花火工作室', 'About FireSparkle')}</h2><p>${L('花火工作室是一間獨立開發工作室，目前的作品以 iOS App 和遊戲為主。App 包括生活記錄、工作整理與學習工具；遊戲則有文字戀愛與養成類型。', 'FireSparkle.Studio is an independent developer of iOS apps and games. Our apps cover personal journals, work planning and learning. Our games include romance stories and pet simulations.')}</p><div class="studio-principles"><div class="glass"><span>01 / APP</span><h3>${L('App 開發', 'App development')}</h3><p>${L('筆記、時間管理、居家設計等工具。', 'Notebooks, planners and home design tools.')}</p></div><div class="glass"><span>02 / GAME</span><h3>${L('遊戲開發', 'Game development')}</h3><p>${L('以對話選擇、角色互動與養成為主要玩法。', 'Games based on dialogue choices, character interactions and pet care.')}</p></div></div></div>
</div></section>

<section id="contact" class="contact" aria-labelledby="contact-title"><div class="wrap">
 <div class="section-head reveal"><div><p class="eyebrow">${T('Contact')}</p><h2 id="contact-title">${T('Follow us')}</h2></div><p>${T('Latest updates and behind-the-scenes posts on Instagram and Threads.')}</p></div>
 <div class="follow-grid">
  <a class="follow-card glass reveal" href="${site.social.instagram}" rel="me noopener"><span class="social-at" aria-hidden="true">@</span><strong>Instagram</strong><span class="handle">@${site.social.handle}</span><p>${T('Follow us')}</p>${arrow('↗')}</a>
  <a class="follow-card glass reveal" href="${site.social.threads}" rel="me noopener"><span class="social-at" aria-hidden="true">@</span><strong>Threads</strong><span class="handle">@${site.social.handle}</span><p>${T('Follow us')}</p>${arrow('↗')}</a>
  <a class="follow-card email-card glass reveal" href="${mailto()}"><span class="social-at" aria-hidden="true">✉</span><strong>${T('Email')}</strong><span class="handle">${email}</span><p>${L('合作或媒體採訪請來信。<br>使用問題與錯誤回報，也可以寄到這個信箱。', 'Email us about collaborations or press enquiries.<br>You can also use this address for product questions and bug reports.')}</p>${arrow('↗')}</a>
 </div>
</div></section>`;
}
