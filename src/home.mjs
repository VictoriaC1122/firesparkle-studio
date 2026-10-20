// 首頁：App 與遊戲工作室。Steam 資訊僅呈現已確認的準備狀態。
export function renderHome({ apps, media, L, T, messageId, esc, appURL, catL, mailto, email, arrow, brandAsset }) {
  const bySlug = Object.fromEntries(apps.map(a => [a.slug, a]));
  const utilities = apps.filter(a => !a.genres.includes('遊戲'));
  const groups = ['全部', ...new Set(apps.map(a => a.category))];
  const image = (slug, n = 0) => media[slug].images[n];
  const game = (slug, index, tone, zhType, enType, zhDesc, enDesc, shot = 0) => {
    const a = bySlug[slug];
    return `<article class="game-card ${tone} reveal">
      <a class="game-image" href="${appURL(a)}" aria-label="${esc(a.short)}" data-i18n-label="${messageId(esc(a.en))}"><img src="${image(slug, shot)}" alt="${esc(a.short)} App Store 遊戲畫面" data-i18n-alt="${messageId(esc(a.en))}" data-i18n-alt-suffix="${messageId('Game screenshot')}" width="${slug === 'larry-cocktail' ? 900 : 675}" height="${slug === 'larry-cocktail' ? 675 : 900}" loading="lazy"><span class="image-note">${L('遊戲畫面', 'Game screenshot')}</span></a>
      <div class="game-info"><div class="work-meta"><span>${index} / ${L(zhType, enType)}</span><span>iOS · App Store</span></div>
      <h3><a href="${appURL(a)}">${L(esc(a.short), esc(a.en))}</a></h3><p>${L(zhDesc, enDesc)}</p>
      <div class="work-actions"><a class="text-link" href="${appURL(a)}">${L('遊戲介紹', 'Game details')} ${arrow()}</a><a class="store-link" href="${a.storeUrl}">App Store ${arrow('↗')}</a></div></div>
    </article>`;
  };
  const list = apps.map((a,i) => `<article class="app-card reveal" data-category="${a.category}" data-search="${esc([a.nameZhHant,a.short,a.en,a.shortDescription,a.enDesc,a.category].join(' ').toLowerCase())}">
    <span class="card-no" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><img class="card-icon" src="${a.iconPath}" alt="" loading="lazy" width="64" height="64"><div class="card-content"><p class="card-category">${catL(a.category)}</p><h3><a class="card-main-link" href="${appURL(a)}">${L(esc(a.short),esc(a.en))}</a></h3><p class="card-desc">${L(esc(a.shortDescription),esc(a.enDesc))}</p></div><span class="card-arrow" aria-hidden="true">${arrow('↗')}</span></article>`).join('');
  return `
<section class="dawn-hero" aria-labelledby="hero-title">
 <img class="dawn-art" src="/assets/brand/asagiri-hanabi.svg" alt="" width="1600" height="900" aria-hidden="true">
 <div class="wrap dawn-grid">
  <div class="dawn-copy"><p class="eyebrow">${T('Independent app & game studio')}</p>
   <h1 id="hero-title">${L('花火工作室<br><em>App 與遊戲開發</em>', 'App &amp; game<br><em>development.</em>')}</h1>
   <p class="dawn-lead">${L('我們開發 iOS App，也製作文字戀愛與養成遊戲。<br>目前正在準備將遊戲上架 Steam。', 'We develop iOS apps, romance games and pet simulations. We are currently preparing for release on Steam.')}</p>
   <div class="dawn-actions"><a class="button" href="#games">${L('查看遊戲', 'View games')} ${arrow('↗')}</a><a class="text-link" href="#apps">${L('作品列表', 'View our work')} ${arrow()}</a></div>
   <a class="steam-teaser" href="#steam"><span class="status-dot" aria-hidden="true"></span><span><b>Steam</b><small>${L('遊戲上架準備中', 'Release preparation in progress')}</small></span>${arrow()}</a>
  </div>
  <div class="dawn-work">
   <p class="dawn-work-index"><span>${L('作品選輯', 'Selected work')}</span><i aria-hidden="true"></i><span>iOS / GAMES</span></p>
   <a class="dawn-feature" href="${appURL(bySlug['larry-cocktail'])}"><div class="dawn-feature-image"><img src="${image('larry-cocktail',1)}" alt="賴瑞的調酒研究室：酒吧場景與遊戲選單" data-i18n-alt="${messageId('Larry’s Cocktail Lab')}" data-i18n-alt-suffix="${messageId('Game screenshot')}" width="900" height="675" fetchpriority="high"></div><span class="dawn-caption"><span><small>01 / iOS GAME</small>${L('賴瑞的調酒研究室', "Larry’s Cocktail Lab")}</span>${arrow('↗')}</span></a>
   <div class="dawn-cast">
    <a class="dawn-character character-larry" href="${appURL(bySlug['larry-cocktail'])}"><span class="character-art"><img src="/assets/characters/larry-smiling.gif" alt="" width="530" height="650"></span><span class="character-label"><small>iOS GAME</small>${L('賴瑞的調酒研究室', 'Larry’s Cocktail Lab')}<span class="character-arrow" aria-hidden="true">${arrow('↗')}</span></span></a>
    <a class="dawn-character character-pig" href="${appURL(bySlug['perfect-pig'])}"><span class="character-art"><img class="pig-idle" src="/assets/characters/perfect-pig-idle.png" alt="" width="360" height="331"><img class="pig-cheer" src="/assets/characters/perfect-pig-celebrating.png" alt="" width="412" height="354"></span><span class="character-label"><small>iOS GAME</small>${L('完美養豬', 'Perfect Pig')}<span class="character-arrow" aria-hidden="true">${arrow('↗')}</span></span></a>
   </div>
  </div>
 </div>
 <div class="wrap dawn-foot"><span class="dawn-signature">FireSparkle<span>.</span>Studio</span><span class="dawn-count"><span class="dawn-total"><strong>${apps.length}</strong> ${T('Works')}</span><span class="dawn-breakdown">${utilities.length} APPS <i>/</i> ${apps.length - utilities.length} GAMES</span></span><a href="#apps">${L('作品列表', 'View our work')} ${arrow('↓')}</a></div>
</section>

<section id="games" class="games-section" aria-labelledby="games-title"><div class="wrap">
 <div class="section-heading"><div><p class="eyebrow"><span class="section-no">01</span> ${T('Games')}</p><h2 id="games-title">${L('已推出的遊戲', 'Released games')}</h2></div><div class="section-intro"><p>${L('在酒吧裡透過對話推進故事，或照顧一隻小豬。<br>介紹頁有遊戲畫面、玩法說明與下載連結。', 'Choose how a conversation unfolds in a bar, or spend seven days raising a piglet. Each game page has screenshots, a description and a download link.')}</p><span class="platform-note">${L('以下作品已於 App Store 上架', 'Available now on the App Store')}</span></div></div>
 <div class="game-grid">${game('larry-cocktail','01','game-amber','互動敘事 · 戀愛文字','Interactive fiction · Romance','以酒吧為背景的文字戀愛遊戲。對話選項會影響故事走向，可用存檔回到不同分支。','A romance game set in a bar. Dialogue choices lead to different story branches, which you can revisit using saved games.',1)}${game('perfect-pig','02','game-rose','養成 · 模擬','Life sim · Raising','照顧小豬七天，安排餵食、散步與聊天，收集個性卡牌與故事結局。','Raise a piglet over seven days. Feed, walk and chat with it to collect personality cards and story endings.')}</div>
 <div id="steam" class="steam-section reveal" aria-labelledby="steam-title"><div class="steam-word" aria-hidden="true">Steam<span>${T('Release status')}</span></div><div class="steam-copy"><span class="status-label"><span class="status-dot" aria-hidden="true"></span>${L('上架準備中', 'Preparing for Steam')}</span><h2 id="steam-title">${L('Steam 上架進度', 'Steam release status')}</h2><p>${L('我們正在準備 Steam 上架。<br>作品資訊與商店連結確認後，會在這裡更新。', 'We are preparing a Steam release. Game details and the store link will be added here once confirmed.')}</p><a class="text-link" href="${mailto('FireSparkle.Studio｜遊戲與合作 Games & collaboration')}">${L('遊戲合作與媒體聯繫', 'Games, press & collaboration')} ${arrow('↗')}</a></div></div>
</div></section>

<section id="apps" class="apps-section" aria-labelledby="apps-title"><div class="wrap">
 <div class="section-heading catalog-heading"><div class="catalog-title"><p class="eyebrow"><span class="section-no">02</span> ${T('Works')}</p><h2 id="apps-title">${T('All works')}</h2><p class="section-intro">${T('Apps for daily life and learning, alongside romance games and pet simulations.')}</p></div><p class="app-count" aria-live="polite" aria-atomic="true">${L('共 <b data-count>{count}</b> 款作品','Works: <b data-count>{count}</b>',{count:apps.length})}</p></div>
 <div class="collection-tools"><div class="filter-bar" role="group" aria-label="作品分類" data-i18n-label="${messageId('Category')}" hidden>${groups.map((g,i)=>`<button type="button" data-filter="${g}" aria-pressed="${i===0}">${catL(g)}</button>`).join('')}</div><div class="search" hidden><label class="visually-hidden" for="app-search">${T('Search works')}</label><svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg><input id="app-search" type="search" placeholder="搜尋名稱或功能" data-i18n-placeholder="${messageId('Search works or features')}" data-i18n-label="${messageId('Search works')}" aria-label="搜尋作品" autocomplete="off"><button class="search-clear" type="button" data-clear-search hidden><span class="visually-hidden">${L('清除搜尋', 'Clear search')}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg></button></div></div>
 <div class="app-grid">${list}</div><div class="no-results" hidden><p>${T('No works found. Try another search or clear the filters.')}</p><button class="button button-quiet" type="button" data-reset>${T('Show all works')}</button></div>
</div></section>

<section id="studio" class="about-section" aria-labelledby="studio-title"><div class="wrap about-grid"><div class="about-identity"><p class="eyebrow"><span class="section-no">03</span> ${T('Studio')}</p><img src="${brandAsset('/assets/brand/firesparkle-mark-720.webp')}" alt="FireSparkle.Studio" width="720" height="720" loading="lazy"><p>FireSparkle<span>.</span>Studio</p><small>${L('獨立 App 與遊戲開發','Independent app and game development')}</small></div><div class="about-copy"><h2 id="studio-title">${L('關於花火工作室', 'About FireSparkle')}</h2><p>${L('花火工作室是一間獨立開發工作室，目前的作品以 iOS App 和遊戲為主。App 包括生活記錄、工作整理與學習工具；遊戲則有文字戀愛與養成類型。','FireSparkle.Studio is an independent developer of iOS apps and games. Our apps cover personal journals, work planning and learning. Our games include romance stories and pet simulations.')}</p><div class="studio-principles"><div><span>01 / APP</span><h3>${L('App 開發','App development')}</h3><p>${L('筆記、時間管理、居家設計等工具。','Notebooks, planners and home design tools.')}</p></div><div><span>02 / GAME</span><h3>${L('遊戲開發','Game development')}</h3><p>${L('以對話選擇、角色互動與養成為主要玩法。','Games based on dialogue choices, character interactions and pet care.')}</p></div></div></div></div></section>

<section id="contact" class="contact-section"><div class="wrap"><p class="eyebrow">${T('Contact')}</p><div class="contact-layout"><h2>${L('聯絡我們','Contact us')}</h2><div><p>${L('合作或媒體採訪請來信。<br>使用問題與錯誤回報，也可以寄到這個信箱。','Email us about collaborations or press enquiries.<br>You can also use this address for product questions and bug reports.')}</p><a class="contact-email" href="${mailto()}">${email} ${arrow('↗')}</a><a class="text-link" href="/support/">${L('使用支援','Product support')} ${arrow()}</a></div></div></div></section>`;
}
