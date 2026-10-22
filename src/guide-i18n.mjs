import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { guideCopy } from './guides.mjs';

const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
export async function prepareGuideMessages(root, messageId) {
  const read = async path => JSON.parse(await readFile(resolve(root, path), 'utf8'));
  const games = await read('data/guides/games.json');
  const apps = await read('data/guides/apps.json');
  const ui = Object.values(guideCopy).flatMap(copy => [
    { en: copy.en, zh: copy.zh }, { en: copy.introEn, zh: copy.introZh },
  ]);
  const steps = [...Object.values(games), ...Object.values(apps)].flatMap(entry => entry.steps);
  const rows = [...ui, ...steps];
  const source = rows.map(row => ({ id:messageId(escape(row.en)), en:escape(row.en), zh:escape(row.zh) }));
  const uiTranslations = await read('data/guides/ui-translations.json');
  const validateKeys = (catalog, rows, code) => {
    const keys = new Set(rows.map(row => row.en));
    if (!catalog || Object.keys(catalog).length !== keys.size || Object.keys(catalog).some(key => !keys.has(key))) throw new Error(`${code}: guide translations must match the guide source`);
    for (const value of Object.values(catalog)) if (typeof value !== 'string' || !value.trim() || /[<>]/.test(value)) throw new Error(`${code}: guide translations must be nonempty plain text`);
  };
  return {
    source,
    async dictionary(code) {
      const translations = await read(`data/guides/translations/${code}.json`);
      validateKeys(translations, steps, code);
      validateKeys(uiTranslations[code], ui, code);
      const all = { ...uiTranslations[code], ...translations };
      return Object.fromEntries(rows.map(row => [messageId(escape(row.en)), escape(all[row.en])]));
    },
  };
}
