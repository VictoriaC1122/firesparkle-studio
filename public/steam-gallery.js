// Match website languages to the eight native game captures; all others use English.
(() => {
  const container = document.querySelector('[data-steam-gallery]');
  const configNode = document.getElementById('steam-gallery-config');
  if (!container || !configNode) return;

  const codes = ['zh-Hant', 'en', 'ja', 'ko', 'zh-Hans', 'th', 'de', 'es'];
  const capturePath = /^\/assets\/steam\/captures\/(?:[A-Za-z0-9][A-Za-z0-9._-]*\/)*[A-Za-z0-9][A-Za-z0-9._-]*\.(?:png|jpe?g|webp)$/i;
  let config;
  let base = '';
  try {
    config = JSON.parse(configNode.textContent);
    if (config.defaultLocale !== 'en' || typeof config.gameVersion !== 'string' || !config.gameVersion.trim() ||
        !config.locales || Object.keys(config.locales).length !== codes.length) throw new Error('Invalid game locales');
    let ids;
    for (const code of codes) {
      const locale = config.locales[code];
      if (!locale || typeof locale.title !== 'string' || !locale.title.trim() || !Array.isArray(locale.frames) || !locale.frames.length) {
        throw new Error(`Incomplete game locale: ${code}`);
      }
      const nextIds = [];
      for (const frame of locale.frames) {
        if (!frame || typeof frame.id !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(frame.id) ||
            typeof frame.src !== 'string' || !capturePath.test(frame.src) ||
            frame.width !== 1920 || frame.height !== 1080 || typeof frame.label !== 'string' || !frame.label.trim()) {
          throw new Error(`Invalid game frame: ${code}`);
        }
        nextIds.push(frame.id);
      }
      if (new Set(nextIds).size !== nextIds.length ||
          (ids && (ids.length !== nextIds.length || ids.some((id, index) => id !== nextIds[index])))) {
        throw new Error('Game frame IDs must match in every language');
      }
      ids = nextIds;
    }
    const siteConfig = document.getElementById('i18n-config');
    const configuredBase = siteConfig ? JSON.parse(siteConfig.textContent).base || '' : '';
    base = configuredBase === '/' ? '' : configuredBase.replace(/\/+$/, '');
    if (!/^(?:\/[A-Za-z0-9_-]+)*$/.test(base)) throw new Error('Invalid site base path');
  } catch (error) {
    console.error('Steam screenshot gallery could not be initialised.', error);
    return;
  }

  const figures = [...container.querySelectorAll('[data-steam-frame]')];
  const initialFrames = config.locales['zh-Hant'].frames;
  if (figures.length !== initialFrames.length || figures.some((figure, index) =>
    figure.dataset.steamFrame !== initialFrames[index].id || !figure.querySelector('a[data-full-image] img') ||
    !figure.querySelector('figcaption'))) return;

  function update(locale) {
    const code = codes.includes(locale) ? locale : config.defaultLocale;
    const data = config.locales[code];
    for (let index = 0; index < figures.length; index++) {
      const figure = figures[index];
      const frame = data.frames[index];
      const link = figure.querySelector('a[data-full-image]');
      const img = link.querySelector('img');
      const path = base + frame.src;
      // Keep the anchors intact for gallery.js delegation and keyboard focus.
      if (link.getAttribute('href') !== path) link.setAttribute('href', path);
      if (img.getAttribute('src') !== path) img.setAttribute('src', path);
      img.alt = frame.label;
      img.width = frame.width;
      img.height = frame.height;
      figure.querySelector('figcaption').textContent = frame.label;
    }
    container.lang = code;
    container.dir = 'ltr';
    container.dataset.gameLocale = code;
    container.setAttribute('aria-label', data.title);
  }

  document.addEventListener('site:languagechange', event => {
    update(event.detail?.locale || document.documentElement.lang);
  });
  update(document.documentElement.lang || 'zh-Hant');
})();
