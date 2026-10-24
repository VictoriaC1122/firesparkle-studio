// 下載作品清單中每款作品在 App Store（台灣）的官方截圖。
// 執行（需要能連到 itunes.apple.com 與 mzstatic.com 的網路）：node scripts/fetch-screenshots.mjs --force（--force 重新下載既有檔案，確保與 App Store 目前順序一致）
// 輸出：public/assets/screenshots/<slug>/iphone-NN.jpg（賴瑞另有 ipad-NN.jpg）、
//       data/screenshot-manifest.json（來源網址、尺寸、版本、取得日期）、data/apple-lookup-<日期>.json（原始查詢結果）。
// 之後執行 node scripts/apply-screenshot-manifest.mjs 更新 data/site-media.json，再 node scripts/build.mjs。
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const force = process.argv.includes('--force');
const SIZE = '1400x1400bb.jpg'; // mzstatic 會把原圖等比縮放到 1400×1400 的框內
const IPAD_ALSO = new Set(['larry-cocktail']); // 橫式遊戲另外保留 iPad 畫面
const today = new Date().toISOString().slice(0, 10);
const catalog = JSON.parse(await readFile(resolve(root, 'data/apple-catalog.json'), 'utf8'));

const exists = async (p) => access(p).then(() => true, () => false);
const fetchJSON = async (url) => { const r = await fetch(url, { headers: { 'user-agent': 'firesparkle-studio-website/1.0' } }); if (!r.ok) throw new Error(`${r.status} ${url}`); return r.json(); };
const fetchBytes = async (url) => { const r = await fetch(url, { headers: { 'user-agent': 'firesparkle-studio-website/1.0' } }); if (!r.ok) throw new Error(`${r.status} ${url}`); return Buffer.from(await r.arrayBuffer()); };
const resized = (url) => url.replace(/\/[^/]+$/, `/${SIZE}`);

// 讀取 JPEG／PNG 的像素尺寸
function dimensions(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error('Unknown image format');
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  throw new Error('No JPEG frame header');
}

const manifest = { retrievedOn: today, storefront: 'tw', size: SIZE, apps: {} };
const lookups = { retrievedAt: new Date().toISOString(), results: {} };
let downloaded = 0, skipped = 0;
for (const app of catalog.apps) {
  const data = await fetchJSON(`https://itunes.apple.com/lookup?id=${app.trackId}&country=tw`);
  const result = (data.results || []).find((r) => r.wrapperType === 'software');
  if (!result) { console.warn(`!! no lookup result: ${app.slug} (${app.trackId})`); continue; }
  lookups.results[app.slug] = result;
  const dir = resolve(root, 'public/assets/screenshots', app.slug);
  await mkdir(dir, { recursive: true });
  const entry = { trackId: app.trackId, name: result.trackName, version: result.version, source: `https://apps.apple.com/tw/app/id${app.trackId}`, iphone: [], ipad: [] };
  const sets = [['iphone', result.screenshotUrls || []]];
  if (IPAD_ALSO.has(app.slug)) sets.push(['ipad', result.ipadScreenshotUrls || []]);
  for (const [kind, urls] of sets) {
    for (const [n, url] of urls.entries()) {
      const file = `${kind}-${String(n + 1).padStart(2, '0')}.jpg`;
      const path = resolve(dir, file);
      const source = resized(url);
      let buf;
      if (!force && await exists(path)) { buf = await readFile(path); skipped++; }
      else { buf = await fetchBytes(source); await writeFile(path, buf); downloaded++; }
      entry[kind].push({ file: `/assets/screenshots/${app.slug}/${file}`, source, original: url, ...dimensions(buf), bytes: buf.length });
    }
  }
  manifest.apps[app.slug] = entry;
  console.log(`${app.slug}: iPhone ${entry.iphone.length}${entry.ipad.length ? `, iPad ${entry.ipad.length}` : ''} (v${result.version})`);
}
await writeFile(resolve(root, 'data/screenshot-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
await writeFile(resolve(root, `data/apple-lookup-${today}.json`), JSON.stringify(lookups, null, 2) + '\n');
console.log(`Done: ${downloaded} downloaded, ${skipped} already present. Manifest: data/screenshot-manifest.json`);
