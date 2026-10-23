// 依 data/screenshot-manifest.json（由 scripts/fetch-screenshots.mjs 產生）更新 data/site-media.json：
// 每款作品的截圖清單、來源網址、尺寸、裝置與取得日期。橫式遊戲若 iPhone 截圖為直式而 iPad 截圖為橫式，改用 iPad 畫面。
// 執行：node scripts/apply-screenshot-manifest.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(resolve(root, 'data/screenshot-manifest.json'), 'utf8'));
const mediaPath = resolve(root, 'data/site-media.json');
const media = JSON.parse(await readFile(mediaPath, 'utf8'));
const landscape = s => s.width > s.height;

for (const [slug, entry] of Object.entries(manifest.apps)) {
  let shots = entry.iphone, device = 'iPhone';
  if (entry.ipad?.length && entry.iphone.every(s => !landscape(s)) && entry.ipad.some(landscape)) { shots = entry.ipad.filter(landscape); device = 'iPad'; }
  if (!shots.length) throw new Error(`No screenshots for ${slug}`);
  media[slug] = {
    images: shots.map(s => s.file),
    source: entry.source,
    imageSources: shots.map(s => s.source),
    appName: entry.name,
    version: entry.version,
    retrievedOn: manifest.retrievedOn,
    device,
    imageDimensions: shots.map(({ width, height }) => ({ width, height })),
  };
  console.log(`${slug}: ${shots.length} × ${device} (${shots[0].width}×${shots[0].height})`);
}
await writeFile(mediaPath, JSON.stringify(media, null, 2) + '\n');
console.log('Updated data/site-media.json');
