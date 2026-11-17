// 官網、遊戲介紹及支援頁共用的 Steam 發售與試玩碼聯絡入口。
// 遊戲已於 2026-11-17 正式發售；購買與願望清單皆使用官方商店頁。
export const steamDemoHref = site => `mailto:${site.email}?subject=${encodeURIComponent(site.steam.demoSubject)}&body=${encodeURIComponent(site.steam.demoBody)}`;

export function renderSteamRelease({ site, app, L, T, esc, arrow, id = 'steam' }) {
  const store = esc(site.steam.storeUrl);
  const demo = esc(steamDemoHref(site));
  return `<section id="${id}" class="steam-release glass reveal" aria-labelledby="${id}-title">
    <div class="steam-release-copy">
      <p class="eyebrow">${T('Available now on Steam')}</p>
      <h2 id="${id}-title">${L(esc(app.short), esc(app.en))}</h2>
      <p class="steam-platforms" dir="ltr">${esc(site.steam.platforms.join(' / '))}</p>
      <p>${T('Buy the game now on Steam for Windows, macOS and Linux.')}</p>
      <div class="steam-release-actions">
        <a class="button" data-steam-action="buy" href="${store}">${T('Buy on Steam')} ${arrow('↗')}</a>
        <a class="button-glass" data-steam-action="wishlist" href="${store}">${T('Add to wishlist')} ${arrow('↗')}</a>
      </div>
      <p class="steam-release-note">${T('See Steam for current pricing, system requirements and supported languages.')}</p>
    </div>
    <aside class="steam-demo">
      <h3>${T('Request a demo key')}</h3>
      <p>${T('For a demo key, email the studio.')}</p>
      <a class="button-glass" data-steam-action="demo" href="${demo}">${T('Request a demo key')} ${arrow('↗')}</a>
      <a class="email-link" href="${demo}">${esc(site.email)}</a>
    </aside>
  </section>`;
}
