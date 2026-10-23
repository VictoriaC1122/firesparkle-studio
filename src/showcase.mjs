// 官方 App Store 截圖的共用呈現：手機外框、可橫向捲動的截圖列與步驟配圖。
// 只顯示完整原圖，不裁切、不重繪介面。

export const isLandscape = size => size.width > size.height;

function imageTag({ app, src, size, esc, messageId, eager = false }) {
  if (!size?.width || !size?.height) throw new Error(`Screenshot dimensions required: ${src}`);
  return `<img src="${src}" alt="${esc(app.short)} 作品畫面" data-i18n-alt="${messageId(esc(app.en))}" data-i18n-alt-suffix="${messageId('Screenshots')}" width="${size.width}" height="${size.height}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}

export function mediaFor(media, slug) {
  const item = media[slug];
  if (!item?.images?.length) throw new Error(`Screenshots required: ${slug}`);
  if (!item.imageDimensions || item.imageDimensions.length !== item.images.length) throw new Error(`Screenshot dimensions must match images: ${slug}`);
  return item;
}

// 單張截圖：手機外框；interactive 時可點開放大（gallery.js），無 JavaScript 時直接開啟原圖。
export function renderShot({ app, media, index = 0, esc, messageId, interactive = true, eager = false, className = '' }) {
  const item = mediaFor(media, app.slug);
  const src = item.images[index];
  const size = item.imageDimensions[index];
  if (!src) throw new Error(`Screenshot index ${index} missing: ${app.slug}`);
  const landscape = isLandscape(size);
  const phone = `<span class="phone${landscape ? ' wide' : ''}">${imageTag({ app, src, size, esc, messageId, eager })}</span>`;
  const classes = `shot${landscape ? ' landscape' : ''}${className ? ` ${className}` : ''}`;
  return interactive
    ? `<a class="${classes}" href="${src}" data-full-image aria-label="放大畫面" data-i18n-label="${messageId('Enlarge screenshot')}">${phone}<span class="screen-enlarge" aria-hidden="true">↗</span></a>`
    : `<span class="${classes}">${phone}</span>`;
}

// 只要外框與圖片（用於首頁與作品頁主視覺）。
export function renderPhone({ app, media, index = 0, esc, messageId, eager = false, className = '' }) {
  const item = mediaFor(media, app.slug);
  const src = item.images[index];
  const size = item.imageDimensions[index];
  if (!src) throw new Error(`Screenshot index ${index} missing: ${app.slug}`);
  return `<span class="phone${isLandscape(size) ? ' wide' : ''}${className ? ` ${className}` : ''}">${imageTag({ app, src, size, esc, messageId, eager })}</span>`;
}

// 橫向捲動的完整截圖列。
export function renderShots({ app, media, esc, messageId, limit = Infinity, interactive = true }) {
  const item = mediaFor(media, app.slug);
  const shots = item.images.slice(0, limit).map((_, i) => renderShot({ app, media, index: i, esc, messageId, interactive })).join('');
  return `<div class="shots"${interactive ? ' data-gallery' : ''}>${shots}</div>`;
}

// 每個步驟對應的截圖索引；未指定時依序輪流使用。
export function stepImageIndex(entry, stepIndex, total) {
  const chosen = entry.screenshots?.[stepIndex];
  if (Number.isInteger(chosen) && chosen >= 0 && chosen < total) return chosen;
  return total ? stepIndex % total : 0;
}
