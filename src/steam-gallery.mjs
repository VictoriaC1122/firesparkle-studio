const GAME_LOCALES = ['zh-Hant', 'en', 'ja', 'ko', 'zh-Hans', 'th', 'de', 'es'];
const FRAME_ID = /^[A-Za-z0-9][A-Za-z0-9_-]*$/;
const CAPTURE_PATH = /^\/assets\/steam\/captures\/(?:[A-Za-z0-9][A-Za-z0-9._-]*\/)*[A-Za-z0-9][A-Za-z0-9._-]*\.(?:png|jpe?g|webp)$/i;

const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const text = value => typeof value === 'string' && value.trim().length > 0;

// Fail the build if one language is incomplete or points outside the captured assets.
export function validateSteamGallery(gallery) {
  const fail = message => { throw new Error(`Steam gallery: ${message}`); };
  if (!object(gallery)) fail('expected a gallery object');
  if (gallery.defaultLocale !== 'en') fail('defaultLocale must be en');
  if (!text(gallery.gameVersion)) fail('gameVersion is required');
  if (!object(gallery.locales) || Object.keys(gallery.locales).length !== GAME_LOCALES.length ||
      GAME_LOCALES.some(code => !Object.hasOwn(gallery.locales, code))) {
    fail('locales must contain exactly zh-Hant, en, ja, ko, zh-Hans, th, de and es');
  }

  let expectedIds;
  const locales = {};
  for (const code of GAME_LOCALES) {
    const locale = gallery.locales[code];
    if (!object(locale) || !text(locale.title)) fail(`${code}: native game title is required`);
    if (!Array.isArray(locale.frames) || !locale.frames.length) fail(`${code}: frames cannot be empty`);
    const ids = new Set();
    const frames = locale.frames.map((frame, index) => {
      if (!object(frame) || !text(frame.id) || !FRAME_ID.test(frame.id)) fail(`${code}: invalid frame id at ${index}`);
      if (ids.has(frame.id)) fail(`${code}: duplicate frame id ${frame.id}`);
      ids.add(frame.id);
      if (!text(frame.src) || !CAPTURE_PATH.test(frame.src)) fail(`${code}/${frame.id}: expected a local /assets/steam/captures/ image path`);
      if (frame.width !== 1920 || frame.height !== 1080) fail(`${code}/${frame.id}: expected the complete 1920 x 1080 capture`);
      if (!text(frame.label)) fail(`${code}/${frame.id}: native UI label is required`);
      return { id: frame.id, src: frame.src, width: frame.width, height: frame.height, label: frame.label };
    });
    const orderedIds = frames.map(frame => frame.id);
    if (expectedIds && (orderedIds.length !== expectedIds.length || orderedIds.some((id, index) => id !== expectedIds[index]))) {
      fail(`${code}: frame IDs and their order must match every other language`);
    }
    expectedIds = orderedIds;
    locales[code] = { title: locale.title, frames };
  }
  return { defaultLocale: 'en', locales, gameVersion: gallery.gameVersion };
}

// Captions and image alternatives deliberately use the game's own UI strings.
// T is accepted with the other render helpers but must not translate those strings.
export function renderSteamGallery({ gallery, T, esc, messageId }) {
  const config = validateSteamGallery(gallery);
  const initial = config.locales['zh-Hant'];
  const enlargeId = esc(messageId('Enlarge screenshot'));
  const figures = initial.frames.map(frame => {
    const captionId = `steam-frame-${frame.id}-caption`;
    return `<figure class="steam-scene" data-steam-frame="${esc(frame.id)}">
      <a class="steam-scene-link" href="${esc(frame.src)}" data-full-image aria-label="放大畫面" data-i18n-label="${enlargeId}" aria-describedby="${captionId}"><img src="${esc(frame.src)}" alt="${esc(frame.label)}" width="${frame.width}" height="${frame.height}" loading="lazy" decoding="async" style="width:100%;height:auto;aspect-ratio:16 / 9;object-fit:contain"></a>
      <figcaption class="steam-scene-caption" id="${captionId}">${esc(frame.label)}</figcaption>
    </figure>`;
  }).join('');
  const json = JSON.stringify(config).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  return `<div class="steam-scenes-grid" data-gallery data-steam-gallery data-game-locale="zh-Hant" lang="zh-Hant" dir="ltr" aria-label="${esc(initial.title)}">${figures}</div>
<script id="steam-gallery-config" type="application/json">${json}</script>`;
}
