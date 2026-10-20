import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { locales } from './locales.mjs';
export const messageId = en => createHash('sha256').update(en).digest('hex').slice(0,12);
export async function prepareI18n(root) {
  const source = JSON.parse(await readFile(resolve(root,'data/i18n/source.json'),'utf8'));
  const byId = new Map(source.map(row=>[row.id,row]));
  if(byId.size!==source.length||source.some(row=>typeof row.en!=='string'||typeof row.zh!=='string'||row.id!==messageId(row.en)))throw new Error('Source messages must have unique, matching IDs');
  const escape = value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const id = en => { const key=messageId(en); if(!byId.has(key))throw new Error(`Missing source message: ${en}`); return key; };
  const L = (zh,en,values={})=>{
    const hasCount=Object.hasOwn(values,'count');
    if(hasCount&&(!Number.isInteger(values.count)||values.count<0))throw new Error('Message count must be a nonnegative integer');
    return `<span data-i18n="${id(en)}"${hasCount?` data-i18n-count="${values.count}"`:''}>${hasCount?zh.replaceAll('{count}',String(values.count)):zh}</span>`;
  };
  const T = en=>L(byId.get(id(en)).zh,en);
  const dictionaries=[];
  for(const locale of locales){
    let messages;
    if(locale.code==='zh-Hant') messages=source.map(row=>row.zh);
    else if(locale.code==='en') messages=source.map(row=>row.en);
    else {
      try {
        const catalog=JSON.parse(await readFile(resolve(root,`data/i18n/${locale.code}.json`),'utf8'));
        if(!catalog||Array.isArray(catalog)||Object.keys(catalog).length!==source.length||Object.keys(catalog).some(key=>!byId.has(key)))throw new Error(`${locale.code}: translation IDs must match the source catalog`);
        messages=source.map(row=>catalog[row.id]);
      }
      catch(error){ if(process.env.PREVIEW_PARTIAL_LOCALES==='1' && error.code==='ENOENT') continue; throw error; }
    }
    if(!Array.isArray(messages)||messages.length!==source.length)throw new Error(`${locale.code}: expected ${source.length} messages`);
    for(const [i,value] of messages.entries()){
      if(typeof value!=='string'||!value.trim())throw new Error(`${locale.code}[${i}]: empty translation`);
      if(JSON.stringify(value.match(/\{count\}/g)||[])!==JSON.stringify(source[i].en.match(/\{count\}/g)||[]))throw new Error(`${locale.code}[${i}]: altered count placeholder`);
      // The only executable markup comes from the checked-in source catalog.
      const tags=value.match(/<[^>]+>/g)||[];
      const allowed=[...(source[i].en.match(/<[^>]+>/g)||[]),...(source[i].zh.match(/<[^>]+>/g)||[])];
      if(tags.some(tag=>!allowed.includes(tag)))throw new Error(`${locale.code}[${i}]: unexpected markup ${tags}`);
      if(JSON.stringify(tags)!==JSON.stringify((locale.code.startsWith('zh')?source[i].zh:source[i].en).match(/<[^>]+>/g)||[]))throw new Error(`${locale.code}[${i}]: altered HTML structure`);
    }
    const data=JSON.stringify({locale:locale.code,messages:Object.fromEntries(source.map((row,i)=>[row.id,messages[i]]))});
    const hash=createHash('sha256').update(data).digest('hex').slice(0,12);
    dictionaries.push({...locale,file:`${locale.code}.${hash}.json`,data});
  }
  if(process.env.PREVIEW_PARTIAL_LOCALES!=='1'&&dictionaries.length!==50)throw new Error('All 50 locales are required for publishing');
  const directory=resolve(root,'public/i18n');await mkdir(directory,{recursive:true});
  const keep=new Set(dictionaries.map(d=>d.file));
  for(const file of await readdir(directory))if(/^[a-zA-Z-]+\.[a-f0-9]{12}\.json$/.test(file)&&!keep.has(file))await unlink(resolve(directory,file));
  await Promise.all(dictionaries.map(d=>writeFile(resolve(directory,d.file),d.data+'\n')));
  const publicLocales=dictionaries.map(({data,...locale})=>locale);
  const script=await readFile(resolve(root,'public/i18n.js'),'utf8');
  const css=await readFile(resolve(root,'public/i18n.css'),'utf8');
  const version=createHash('sha256').update(script).update(css).update(JSON.stringify(publicLocales)).digest('hex').slice(0,12);
  const config={locales:publicLocales,keys:Object.fromEntries(source.map(row=>[row.en,row.id]))};
  const globe='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg>';
  const button=`<button class="lang-toggle" type="button" data-language-open aria-haspopup="dialog" aria-controls="language-dialog" aria-label="語言 / Language" hidden>${globe}<span data-current-language>繁中</span></button>`;
  const dialog=`<dialog id="language-dialog" class="language-dialog" aria-labelledby="language-title"><div class="language-dialog-head"><div><p class="eyebrow" dir="ltr">FireSparkle.Studio</p><h2 id="language-title">${T('Choose a language')}</h2></div><button type="button" data-language-close class="language-close" aria-label="關閉" data-i18n-label="${id('Close')}"><span aria-hidden="true">×</span></button></div><label class="language-search-label" for="language-search">${T('Search languages')}</label><input id="language-search" type="search" autocomplete="off" spellcheck="false" dir="auto" placeholder="搜尋語言" data-i18n-placeholder="${id('Search languages')}"><p class="language-load-status" role="status" aria-live="polite"></p><div class="language-options">${publicLocales.map(l=>`<button type="button" data-locale="${l.code}" aria-current="${l.code==='zh-Hant'}" data-language-search="${escape(`${l.code} ${l.native} ${l.name} ${l.zh}`)}"><span lang="${l.code}" dir="${l.dir}" class="language-native">${escape(l.native)}</span><small lang="en" dir="ltr">${escape(l.name)}</small><span class="language-check" aria-hidden="true">✓</span></button>`).join('')}</div><p data-no-languages hidden>${T('No matching languages. Try another name.')}</p><p class="language-help">${T('Your selection changes this website only. Check the App Store for the languages available in each app or game.')}</p></dialog>`;
  return {L,T,id,version,button,dialog,config,locales:publicLocales};
}
