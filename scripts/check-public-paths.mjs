import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const files = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { cwd: root })
  .toString('utf8').split('\0').filter(Boolean);
const isText = /\.(?:json|jsonl|ya?ml|m?[jt]sx?|html?|css|md|txt|svg|xml|toml|sh|command|py|csv|tsv|map)$/i;
const homePath = /(?:\/(?:Users|home)\/[^/"'\s]+(?:\/|(?=["'\s]|$))|[a-z]:[\\/]+Users[\\/]+[^\\/"'\r\n]+(?:[\\/]|(?=["'\r\n]|$)))/i;
const exposed = new Set();
for (const file of files) {
  if (!isText.test(file) || file === 'scripts/check-public-paths.mjs') continue;
  let contents;
  try {
    contents = readFileSync(new URL(file.split('/').map(encodeURIComponent).join('/'), new URL('../', import.meta.url)), 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') continue;
    throw error;
  }
  if (homePath.test(contents)) exposed.add(file);
}
if (exposed.size) {
  console.error('Local account paths found in public files (paths themselves omitted):');
  for (const file of exposed) console.error(file);
  process.exitCode = 1;
} else {
  console.log('Public file path check passed.');
}
