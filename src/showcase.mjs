const tones = {
  'future-major-guide': 'sky', milebutler: 'sky', 'semiconductors-illustrated': 'sage',
  'dream-journal': 'rose', 'coffee-chat': 'sage', 'design-it': 'sand',
  'perfect-pig': 'rose', 'time-manager': 'lilac', vitamins: 'sage',
  'easy-draw': 'rose', 'compound-calculator': 'sand', 'stock-simulator': 'sage',
  'crypto-dictionary': 'lilac', 'pr-diary': 'rose', 'larry-cocktail': 'sand',
};

export const showcaseTone = slug => tones[slug] || 'sand';

// Display the complete official artwork; never crop or recreate an app's UI.
export function renderScreens({ app, media, esc, messageId, interactive = true }) {
  const item = media[app.slug];
  if (!item?.images?.length || item.images.length < 2) throw new Error(`Two screenshots required: ${app.slug}`);
  const images = item.images.slice(0, 2).map((src, i) => {
    const size = item.imageDimensions?.[i];
    if (!size?.width || !size?.height) throw new Error(`Screenshot dimensions required: ${src}`);
    const img = `<img src="${src}" alt="${esc(app.short)} 作品畫面" data-i18n-alt="${messageId(esc(app.en))}" data-i18n-alt-suffix="${messageId('Screenshots')}" width="${size.width}" height="${size.height}" loading="lazy" decoding="async">`;
    return interactive
      ? `<a class="screen-image" href="${src}" data-full-image aria-label="放大畫面" data-i18n-label="${messageId('Enlarge screenshot')}">${img}<span class="screen-enlarge" aria-hidden="true">↗</span></a>`
      : `<span class="screen-image">${img}</span>`;
  }).join('');
  const landscape = item.imageDimensions[0].width > item.imageDimensions[0].height;
  return `<div class="screen-stage tone-${showcaseTone(app.slug)}${landscape ? ' screen-stage-wide' : ''}"${interactive ? ' data-gallery' : ''}><div class="screen-pair">${images}</div></div>`;
}
