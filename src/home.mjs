// 首頁：App 與遊戲工作室。Steam 資訊僅呈現已確認的準備狀態。
export function renderHome({ apps, media, L, esc, appURL, catL, mailto, email, arrow }) {
  const bySlug = Object.fromEntries(apps.map(a => [a.slug, a]));
  const utilities = apps.filter(a => !a.genres.includes('遊戲'));
  const groups = ['全部', ...new Set(utilities.map(a => a.category))];
  const image = (slug, n = 0) => media[slug].images[n];
  const appIcon = (slug, size = 64) => `<img src="${bySlug[slug].iconPath}" alt="" width="${size}" height="${size}" loading="lazy">`;
  const game = (slug, index, tone, zhType, enType, zhDesc, enDesc, shot = 0) => {
    const a = bySlug[slug];
    return `<article class="game-card ${tone} reveal">
      <a class="game-image" href="${appURL(a)}" aria-label="${esc(a.short)}"><img src="${image(slug, shot)}" alt="${esc(a.short)} App Store 遊戲畫面" width="${slug === 'larry-cocktail' ? 900 : 675}" height="${slug === 'larry-cocktail' ? 675 : 900}" loading="lazy"><span class="image-note">${L('官方遊戲畫面', 'Official game screenshot')}</span></a>
      <div class="game-info"><div class="work-meta"><span>${index} / ${L(zhType, enType)}</span><span>iOS · App Store</span></div>
      <h3><a href="${appURL(a)}">${L(esc(a.short), esc(a.en))}</a></h3><p>${L(zhDesc, enDesc)}</p>
      <div class="work-actions"><a class="text-link" href="${appURL(a)}">${L('認識這款遊戲', 'Explore the game')} ${arrow()}</a><a class="store-link" href="${a.storeUrl}">App Store ${arrow('↗')}</a></div></div>
    </article>`;
  };
  const featureApp = (slug, tone, zhLine, enLine) => {
    const a = bySlug[slug];
    return `<a class="app-feature ${tone} reveal" href="${appURL(a)}"><div class="feature-copy"><p class="eyebrow">${catL(a.category)}</p>${appIcon(slug, 52)}<h3>${L(esc(a.short), esc(a.en))}</h3><p>${L(zhLine, enLine)}</p><span class="text-link">${L('探索作品', 'Explore the app')} ${arrow()}</span></div><div class="feature-screen"><img src="${image(slug)}" alt="${esc(a.short)} 官方 App Store 介紹畫面" width="${slug === 'coffee-chat' ? 414 : 675}" height="900" loading="lazy"></div></a>`;
  };
  const list = utilities.map((a,i) => `<article class="app-card reveal" data-category="${a.category}" data-search="${esc([a.nameZhHant,a.short,a.en,a.shortDescription,a.enDesc,a.category].join(' ').toLowerCase())}">
    <img class="card-icon" src="${a.iconPath}" alt="" loading="lazy" width="64" height="64"><div class="card-content"><p class="card-category">${catL(a.category)}</p><h3><a class="card-main-link" href="${appURL(a)}">${L(esc(a.short),esc(a.en))}</a></h3><p class="card-desc">${L(esc(a.shortDescription),esc(a.enDesc))}</p></div><a class="card-arrow" href="${appURL(a)}" aria-label="${esc(a.short)} ${esc(a.en)}">${arrow('↗')}</a><span class="card-no" aria-hidden="true">${String(i+1).padStart(2,'0')}</span></article>`).join('');
  return `
<section class="studio-hero" aria-labelledby="hero-title">
 <div class="wrap hero-grid">
  <div class="hero-copy"><p class="eyebrow"><span class="tiny-star" aria-hidden="true">✦</span> INDEPENDENT APP &amp; GAME STUDIO</p>
   <h1 id="hero-title">${L('為日常做 App，<br>為想像<em>造世界。</em>', 'Apps for everyday.<br><em>Worlds for play.</em>')}</h1>
   <p class="hero-lead">${L('花火工作室，讓一閃而過的靈感成為作品。<br>製作實用的 App，也創作值得投入的遊戲體驗。', 'We turn passing sparks into things you can use and worlds you can play. Thoughtful apps. Games with a character of their own.')}</p>
   <div class="hero-actions"><a class="button" href="#games">${L('探索遊戲', 'Explore games')} ${arrow('↗')}</a><a class="text-link" href="#apps">${L('發現 App', 'Discover apps')} ${arrow()}</a></div>
   <a class="steam-teaser" href="#steam"><span class="status-dot" aria-hidden="true"></span><span><b>Next chapter · Steam</b><small>${L('Steam 上架準備進行中。', 'Preparing our next chapter on Steam.')}</small></span>${arrow()}</a>
  </div>
  <div class="hero-board" aria-label="花火工作室的 App 與遊戲作品">
   <div class="board-grid" aria-hidden="true"></div><span class="board-index" aria-hidden="true">SELECTED<br>CREATIONS / 01—${String(apps.length).padStart(2,'0')}</span>
   <a class="hero-game" href="${appURL(bySlug['larry-cocktail'])}"><div class="window-top"><span class="window-dot"></span><span>STORIES TO PLAY</span><span>↗</span></div><img src="${image('larry-cocktail',1)}" alt="賴瑞的調酒研究室：酒吧場景與遊戲選單" width="900" height="675" fetchpriority="high"><span class="hero-work-label">${L('賴瑞的調酒研究室', "Larry’s Cocktail Lab")} <small>iOS GAME</small></span></a>
   <a class="hero-app" href="${appURL(bySlug['coffee-chat'])}"><img src="${image('coffee-chat')}" alt="Coffee Chat 筆記官方介紹畫面" width="414" height="900"><span>APPS FOR LIFE</span></a>
   <a class="hero-pig" href="${appURL(bySlug['perfect-pig'])}">${appIcon('perfect-pig',72)}<span>${L('完美養豬', 'Perfect Pig')}<small>${L('養成遊戲', 'A little life to raise')}</small></span>${arrow('↗')}</a>
  </div>
 </div>
 <div class="wrap hero-foot"><span>花火工作室 / FireSparkle.Studio</span><span>APP DESIGN <i>✦</i> GAME DEVELOPMENT <i>✦</i> INDEPENDENT CREATION</span><a href="#games">${L('向下探索', 'Scroll to explore')} ↓</a></div>
</section>

<section id="games" class="games-section" aria-labelledby="games-title"><div class="wrap">
 <div class="section-heading"><div><p class="eyebrow"><span class="section-no">01</span> GAMES / ${L('遊戲作品','OUR GAMES')}</p><h2 id="games-title">${L('有些靈感，<br>可以<em>玩進去。</em>', 'Some ideas become<br><em>worlds to play in.</em>')}</h2></div><div class="section-intro"><p>${L('一間酒吧、一隻小豬、一次不同的選擇。<br>從互動敘事到養成體驗，探索我們的遊戲。', 'A bar, a piglet, a different choice. Discover our games, from branching stories to a little life to care for.')}</p><span class="platform-note">${L('以下作品已於 App Store 上架', 'Available now on the App Store')}</span></div></div>
 <div class="game-grid">${game('larry-cocktail','01','game-amber','互動敘事 · 戀愛文字','Interactive fiction · Romance','走進酒吧的燈光裡。透過對話與選擇，探索故事的不同走向。','Step into the warm light of a bar. Follow conversations and choices into branching storylines.',1)}${game('perfect-pig','02','game-rose','養成 · 模擬','Life sim · Raising','從餵食、散步到聊天，陪一隻小豬度過七天，收藏牠的個性與故事。','Feed, walk and chat with a piglet through seven days, and discover its personality and story.')}</div>
 <div id="steam" class="steam-section reveal" aria-labelledby="steam-title"><div class="steam-word" aria-hidden="true">Steam<span>THE NEXT CHAPTER</span></div><div class="steam-copy"><span class="status-label"><span class="status-dot" aria-hidden="true"></span>${L('上架準備中', 'Preparing for Steam')}</span><h2 id="steam-title">${L('下一段旅程，<br>走向 Steam。', 'A new platform.<br>A new chapter.')}</h2><p>${L('我們正著手準備 Steam 上架。<br>作品資訊與商店連結，將在確認後於這裡公開。', 'We’re preparing for Steam. Project details and store links will be shared here once confirmed.')}</p><a class="text-link" href="${mailto('FireSparkle.Studio｜遊戲與合作 Games & collaboration')}">${L('遊戲合作與媒體聯繫', 'Games, press & collaboration')} ${arrow('↗')}</a></div></div>
</div></section>

<section id="apps" class="apps-section" aria-labelledby="apps-title"><div class="wrap">
 <div class="section-heading"><div><p class="eyebrow"><span class="section-no">02</span> APPS / ${L('日常作品', 'EVERYDAY TOOLS')}</p><h2 id="apps-title">${L('把好點子，<br>放進<em>日常。</em>', 'Good ideas,<br><em>made for life.</em>')}</h2></div><p class="section-intro">${L('記錄、規劃、學習與創作。<br>細心做好每個小功能，陪你把日子過得更順手。', 'Tools for memories, plans, learning and creating. Small details, thoughtfully made for your everyday life.')}</p></div>
 <div class="app-features">${featureApp('coffee-chat','feature-sage','把每一次交流，整理成值得延續的連結。','Make every conversation a connection worth keeping.')}${featureApp('dream-journal','feature-night','留住醒來前的片刻，慢慢看懂自己的夢。','Keep the moments before waking. Find patterns in your dreams.')}</div>
 <div class="catalog-heading"><h3>${L('探索所有 App', 'Explore all apps')}</h3><p class="app-count" aria-live="polite">${L(`共 <b data-count>${utilities.length}</b> 款作品`,`<b data-count>${utilities.length}</b> apps`)}</p></div>
 <div class="collection-tools"><div class="filter-bar" role="group" aria-label="App categories" hidden>${groups.map((g,i)=>`<button type="button" data-filter="${g}" aria-pressed="${i===0}">${catL(g)}</button>`).join('')}</div><label class="search" hidden><span aria-hidden="true">⌕</span><input id="app-search" type="search" placeholder="找一款適合你的 App" data-placeholder-en="Find your next app" aria-label="搜尋 App Search apps" autocomplete="off"></label></div>
 <div class="app-grid">${list}</div><div class="no-results" hidden><p>${L('沒有符合的作品，換個關鍵字試試。','No matching apps. Try another word.')}</p><button class="button button-quiet" type="button" data-reset>${L('顯示所有 App','Show all apps')}</button></div>
</div></section>

<section id="studio" class="about-section" aria-labelledby="studio-title"><div class="wrap about-grid"><div class="about-identity"><p class="eyebrow"><span class="section-no">03</span> THE STUDIO</p><img src="/assets/brand/firesparkle-mark-720.webp" alt="花火工作室玻璃火焰標誌" width="720" height="692" loading="lazy"><p>FireSparkle<span>.</span>Studio</p><small>${L('讓靈感，有自己的樣子。','Every spark, its own character.')}</small></div><div class="about-copy"><h2 id="studio-title">${L('實用與想像，<br>都是我們的<em>創作。</em>', 'Utility and imagination.<br><em>Both are our craft.</em>')}</h2><p>${L('花火工作室是一間專注 App 與遊戲的獨立工作室。我們從日常的小需求與一閃而過的想像出發，把它們做成可以使用、可以遊玩，也能留下感受的作品。','FireSparkle.Studio is an independent app and game studio. We turn small needs and passing sparks of imagination into things to use, worlds to play, and experiences to remember.')}</p><div class="studio-principles"><div><span>01 / APP</span><h3>${L('讓生活更順手','Make everyday life flow')}</h3><p>${L('從真實需求出發，讓功能清楚、使用自然。','Real needs, clear features and thoughtful interactions.')}</p></div><div><span>02 / GAME</span><h3>${L('讓想像有回音','Give imagination a world')}</h3><p>${L('在故事、互動與選擇之間，留下屬於玩家的片刻。','Stories, interactions and choices that leave something with the player.')}</p></div></div></div></div></section>

<section id="contact" class="contact-section"><div class="wrap"><p class="eyebrow">LET’S MAKE THE NEXT SPARK</p><div class="contact-layout"><h2>${L('下一個靈感，<br>一起聊聊。','The next spark?<br><em>Let’s talk.</em>')}</h2><div><p>${L('合作提案、遊戲交流、媒體邀約，<br>或是想告訴我們你的使用體驗。','Collaborations, games, press enquiries,<br>or a thought about something we’ve made.')}</p><a class="contact-email" href="${mailto()}">${email} ${arrow('↗')}</a><a class="text-link" href="/support/">${L('需要作品使用支援？','Looking for product support?')} ${arrow()}</a></div></div></div></section>`;
}
