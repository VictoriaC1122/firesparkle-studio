// 官網、遊戲介紹及支援頁共用的 Steam 預告與試玩碼聯絡入口。
// 商店目前仍標示即將推出；收藏與發售後購買都連到同一個官方商店頁。
export const steamDemoHref = site => `mailto:${site.email}?subject=${encodeURIComponent(site.steam.demoSubject)}&body=${encodeURIComponent(site.steam.demoBody)}`;

export function renderSteamRelease({ site, app, L, T, esc, arrow, id = 'steam' }) {
  const store = esc(site.steam.storeUrl);
  const demo = esc(steamDemoHref(site));
  return `<section id="${id}" class="steam-release glass reveal" aria-labelledby="${id}-title">
    <div class="steam-release-copy">
      <p class="eyebrow">${T('Coming soon on Steam')}</p>
      <h2 id="${id}-title">${L(esc(app.short), esc(app.en))}</h2>
      <p class="steam-platforms" dir="ltr">${esc(site.steam.platforms.join(' / '))}</p>
      <p>${T('Wishlist now, then buy from this Steam page when the game is released.')}</p>
      <div class="steam-release-actions">
        <a class="button" data-steam-action="wishlist" href="${store}">${T('Add to wishlist')} ${arrow('↗')}</a>
        <a class="button-glass" data-steam-action="buy" href="${store}">${T('Steam store / buy')} ${arrow('↗')}</a>
      </div>
      <p class="steam-release-note">${T('Release timing follows the Steam store page.')}</p>
    </div>
    <aside class="steam-demo">
      <h3>${T('Request a demo key')}</h3>
      <p>${T('Want to try the game? Email the studio to request a demo key.')}</p>
      <a class="button-glass" data-steam-action="demo" href="${demo}">${T('Request a demo key')} ${arrow('↗')}</a>
      <a class="email-link" href="${demo}">${esc(site.email)}</a>
    </aside>
  </section>`;
}
