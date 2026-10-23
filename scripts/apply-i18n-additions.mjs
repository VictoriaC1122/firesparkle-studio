// 把 data/i18n/additions-*.json 的新文字併入 source.json 與 48 個語言檔。
// 執行：node scripts/apply-i18n-additions.mjs data/i18n/additions-2026-10-23.json
// 已存在的文字 ID 會略過，因此可重複執行。
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { locales } from '../src/locales.mjs';
import { messageId } from '../src/i18n-build.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const file = process.argv[2];
if (!file) throw new Error('Usage: node scripts/apply-i18n-additions.mjs <additions.json>');
const additions = JSON.parse(await readFile(resolve(root, file), 'utf8')).messages;
const sourcePath = resolve(root, 'data/i18n/source.json');
const source = JSON.parse(await readFile(sourcePath, 'utf8'));
const known = new Set(source.map(row => row.id));
const others = locales.filter(l => !['zh-Hant', 'en'].includes(l.code)).map(l => l.code);

let added = 0;
for (const message of additions) {
  const id = messageId(message.en);
  const missing = others.filter(code => typeof message.t[code] !== 'string' || !message.t[code].trim());
  if (missing.length) throw new Error(`"${message.en}" lacks translations: ${missing.join(', ')}`);
  const tags = s => s.match(/<[^>]+>/g) || [];
  for (const code of others) {
    const expected = code.startsWith('zh') ? message.zh : message.en;
    if (JSON.stringify(tags(message.t[code])) !== JSON.stringify(tags(expected))) throw new Error(`${code}: markup differs for "${message.en}"`);
  }
  if (!known.has(id)) { source.push({ id, en: message.en, zh: message.zh }); known.add(id); added++; }
  for (const code of others) {
    const path = resolve(root, `data/i18n/${code}.json`);
    const catalog = JSON.parse(await readFile(path, 'utf8'));
    if (!(id in catalog)) { catalog[id] = message.t[code]; await writeFile(path, JSON.stringify(catalog, null, 2) + '\n'); }
  }
}
await writeFile(sourcePath, JSON.stringify(source, null, 2) + '\n');
console.log(`Added ${added} source messages; source catalog now has ${source.length} entries across ${others.length + 2} locales.`);
