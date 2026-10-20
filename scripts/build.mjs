// 花火工作室 FireSparkle.Studio 官網 — 靜態網站產生器
// 執行：node scripts/build.mjs
// 讀取 src/content.mjs、data/apple-catalog.json、data/privacy-sources/manifest.json，
// 產出 public/ 底下的首頁、各 App 介紹頁與隱私頁、隱私中心、支援頁、網站隱私說明、404、sitemap。
// 全站中英雙語：中文放在 .zh、英文放在 .en，由 <html lang> 切換顯示。
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { renderHome } from '../src/home.mjs';
import { site, order, categoryEn, genreEn, apps as appInfo } from '../src/content.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFile(resolve(root, path), 'utf8');
// 更新樣式時產生新資源網址，讓既有訪客直接取得新版。
const assetVersion = createHash('sha256').update(await read('public/style.css')).update(await read('public/fonts/fonts.css')).update(await read('public/site.js')).digest('hex').slice(0, 12);
const catalog = JSON.parse(await read('data/apple-catalog.json'));
const policies = JSON.parse(await read('data/privacy-sources/manifest.json')).apps;
const media = JSON.parse(await read('data/site-media.json'));
const { email } = site;
// 部署在子路徑時（GitHub 專案頁 /repo-name/）設定 BASE_PATH；自訂網域留空。
const base = (process.env.BASE_PATH || '').trim().replace(/\/+$/, '');
// SITE_URL 是含部署子路徑的完整網址；未設定時沿用正式網域。
const siteURL = (process.env.SITE_URL?.trim() || site.url).replace(/\/+$/, '');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// 雙語片段：L('中文', 'English')
const L = (zh, en) => `<span class="zh">${zh}</span><span class="en" lang="en">${en}</span>`;
const pad = (n) => String(n).padStart(2, '0');

// --------------------------------------------------------------------------
// 作品資料
// --------------------------------------------------------------------------
const apps = catalog.apps
  .filter((a) => appInfo[a.slug])
  .sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug))
  .map((a) => ({ ...a, ...appInfo[a.slug], policy: policies[String(a.trackId)] }));
const bySlug = Object.fromEntries(apps.map((a) => [a.slug, a]));
const appURL = (a) => `/app/${a.slug}/`;
const policyURL = (a) => `${appURL(a)}privacy/`;
const mailto = (subject = 'FireSparkle.Studio｜聯絡') => `mailto:${email}?subject=${encodeURIComponent(subject)}`;
const catL = (c) => L(c, categoryEn[c] || c);

// --------------------------------------------------------------------------
// 共用版型
// --------------------------------------------------------------------------
const langBoot = `<script>(function(){var l;try{l=localStorage.getItem('fs-lang')}catch(e){}if(!l){l=/^zh/i.test(navigator.language||'zh')?'zh':'en'}if(l==='en')document.documentElement.lang='en'})()</script>`;
const brand = (cls = '') => `<a class="brand ${cls}" href="/" aria-label="花火工作室 FireSparkle.Studio"><img class="brand-mark" src="/assets/brand/firesparkle-mark-112.png" alt="" width="40" height="38"><span class="brand-text"><span class="brand-latin">FireSparkle<i>.</i>Studio</span><span class="brand-cjk">花火工作室</span></span></a>`;
const header = `<a class="skip-link" href="#main">${L('跳到主要內容', 'Skip to content')}</a><header class="site-header"><div class="wrap header-inner">${brand()}<nav class="site-nav" aria-label="Main"><a href="/#games">${L('遊戲', 'Games')}</a><a href="/#apps">Apps</a><a href="/#steam">Steam</a><a href="/#studio">${L('工作室', 'Studio')}</a><a href="/support/">${L('支援', 'Support')}</a></nav><button class="lang-toggle" type="button" data-lang-toggle aria-label="切換語言 Switch language"><span class="zh">EN</span><span class="en">中文</span></button></div></header>`;
const footer = `<footer class="site-footer"><div class="wrap footer-grid"><div class="footer-brand">${brand()}<p class="footer-tagline">${L('獨立 App 與遊戲開發', 'Independent app and game development')}</p></div><nav class="footer-col" aria-label="Works"><p class="footer-title">Works</p><a href="/#games">${L('遊戲作品', 'Games')}</a><a href="/#apps">${L('App 作品', 'Apps')}</a><a href="/#steam">${L('Steam 上架準備', 'Preparing for Steam')}</a></nav><nav class="footer-col" aria-label="Information"><p class="footer-title">Information</p><a href="/support/">${L('支援與聯絡', 'Support & contact')}</a><a href="/privacy/">${L('作品隱私政策', 'Product privacy')}</a><a href="/website-privacy/">${L('網站隱私說明', 'Website privacy')}</a></nav><div class="footer-col"><p class="footer-title">Contact</p><a href="${mailto()}">${email}</a></div></div><div class="wrap footer-bottom"><span>© 2026 FireSparkle.Studio · 花火工作室</span><span>INDEPENDENT APP &amp; GAME STUDIO</span></div></footer>`;

function page({ path, title, description, content, bodyClass = '', extraHead = '' }) {
  const canonical = `${siteURL}${path}`;
  const html = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${langBoot}<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta name="theme-color" content="#f7f5ee"><meta property="og:type" content="website"><meta property="og:url" content="${canonical}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:site_name" content="花火工作室 FireSparkle.Studio"><meta property="og:image" content="${siteURL}/assets/brand/icon-512.png"><meta property="og:image:width" content="512"><meta property="og:image:height" content="512"><meta property="og:image:alt" content="花火工作室 FireSparkle.Studio"><meta name="twitter:card" content="summary"><link rel="icon" href="/favicon.png" type="image/png" sizes="64x64"><link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="preload" href="/fonts/cormorant-garamond/cormorant-garamond-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/fonts/fonts.css?v=${assetVersion}"><link rel="stylesheet" href="/style.css?v=${assetVersion}"><script src="/site.js?v=${assetVersion}" defer></script>${extraHead}</head><body class="${bodyClass}">${header}<main id="main">${content}</main>${footer}</body></html>`;
  // 站內絕對路徑（href="/..."、src="/..."）加上 BASE_PATH 前綴
  return base ? html.replace(/\b(href|src)="\/(?!\/)/g, `$1="${base}/`) : html;
}
async function save(path, content) {
  const file = resolve(root, 'public', path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content);
}
const breadcrumb = (label, parent = '') => `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">${L('首頁', 'Home')}</a><span class="sep" aria-hidden="true">/</span>${parent}<span aria-current="page">${label}</span></nav>`;
const crumbLink = (href, label) => `<a href="${href}">${label}</a><span class="sep" aria-hidden="true">/</span>`;
const arrow = (c = '→') => `<span class="arrow" aria-hidden="true">${c}</span>`;

// 首頁由獨立模組產生，既有作品與政策網址保持穩定。
const home = renderHome({ apps, media, L, esc, appURL, catL, mailto, email, arrow });

const orgLd = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: 'FireSparkle.Studio', alternateName: '花火工作室', url: siteURL, logo: `${siteURL}/assets/brand/icon-512.png`, email, slogan: site.tagline })}</script>`;
await save('index.html', page({ path: '/', title: '花火工作室 FireSparkle.Studio｜App 與遊戲工作室', description: `花火工作室 FireSparkle.Studio：獨立 App 與遊戲工作室。提供 iOS App、文字戀愛與養成遊戲的介紹、下載連結與使用支援，目前正在準備 Steam 上架。`, content: home, bodyClass: 'is-home', extraHead: orgLd }));

// --------------------------------------------------------------------------
// 作品頁、隱私頁
// --------------------------------------------------------------------------
const contactBox = (a) => `<aside class="contact-box reveal"><p class="eyebrow">Email</p><h2>${L('使用支援', 'Product support')}</h2><p>${L('來信時請告訴我們作品名稱、使用平台、裝置與系統版本，以及遇到的狀況。', 'When you write, tell us the app or game name, your platform, device and operating system version, and what happened.')}</p><a class="button" href="${mailto(a ? `${a.nameZhHant}｜使用支援 Support` : 'FireSparkle.Studio｜使用支援 Support')}">${L('寄信聯絡', 'Email us')} ${arrow('↗')}</a><a class="email-link" href="${mailto()}">${email}</a></aside>`;
const isWebsiteOnly = (a) => a.policy.policyStatus === 'website_only_privacy';
const appRows = (kind, list = apps) => list.map((a) => `<a class="resource-row" href="${kind === 'privacy' ? policyURL(a) : appURL(a)}"><img src="${a.iconPath}" alt="" width="52" height="52" loading="lazy"><span class="row-text"><strong>${L(esc(a.nameZhHant), esc(a.en))}</strong><small>${kind === 'privacy' ? (isWebsiteOnly(a) ? L('現有隱私資訊與聯絡方式', 'Existing privacy information') : L('App 隱私權政策', 'App privacy policy')) : catL(a.category)}</small></span>${arrow()}</a>`).join('');

const policyTitles = new Set(['我們收集的資訊', '資訊的使用', '第三方服務', '兒童隱私', '本政策的變更', '我們收集哪些資料', '行情資料與網路連線', '保存在裝置上的資料', 'Pro 訂閱與 Apple', '通知', '資料分享、廣告與追蹤', '寄信聯絡與瀏覽本網站', '你如何控制資料', '服務與投資聲明', '政策更新', '聯絡我們', '政策摘要', 'App 儲存哪些資料', '無追蹤或分析 SDK', 'Apple 服務與選用權限', '匯出、分享與系統備份', '你的控制權與資料保留', '客服信件與本網站', '政策更新與聯繫']);
const numericHeading = /^(?:\d{1,2}[.、．]\s*|第[一二三四五六七八九十]+[條節])/;
const oldEmails = /victoriache+ng1122@gmail\.com/g;

for (const [i, a] of apps.entries()) {
  const others = [1, 2, 3].map((k) => apps[(i + k) % apps.length]);
  const minOS = a.minimumOsVersion;
  const isGame = a.genres.includes('遊戲');
  const shots = media[a.slug]?.images || [];
  const gallery = shots.length ? `<section class="product-gallery"><p class="eyebrow">${L('作品畫面', 'Screenshots')} / APP STORE</p><div class="gallery-track">${shots.map((src) => `<figure><img src="${src}" alt="${esc(a.short)} 官方商店畫面" loading="lazy"></figure>`).join('')}</div></section>` : '';
  const spec = `<dl class="spec-list reveal"><div><dt>${L('類別', 'Category')}</dt><dd>${L(esc(a.genres.join(' · ')), esc(a.genres.map((g) => genreEn[g] || g).join(' · ')))}</dd></div><div><dt>${L('系統需求', 'Requires')}</dt><dd>${L(`iOS ${esc(minOS)} 或以上`, `iOS ${esc(minOS)} or later`)}</dd></div><div><dt>${L('年齡分級', 'Age rating')}</dt><dd>${esc(a.contentRating)}</dd></div><div><dt>${L('開發者', 'Developer')}</dt><dd>${esc(a.artistName)}</dd></div></dl>`;
  const content = `<div class="wrap">${breadcrumb(L(esc(a.short), esc(a.en)))}<section class="app-intro"><div class="app-hero-icon-wrap reveal"><div class="halo halo-a" aria-hidden="true"></div><img class="app-hero-icon" src="${a.iconPath}" alt="${esc(a.short)}" width="160" height="160"></div><div class="app-intro-copy reveal"><p class="eyebrow">${isGame ? 'GAME' : 'APP'} / iOS <span aria-hidden="true">·</span> ${catL(a.category)}</p><h1>${L(esc(a.nameZhHant), esc(a.en))}</h1><p class="lead">${L(esc(a.shortDescription), esc(a.enDesc))}</p><div class="actions"><a class="button" href="${a.storeUrl}">${L('在 App Store 查看', 'View on the App Store')} ${arrow('↗')}</a><a class="text-link" href="${policyURL(a)}">${isWebsiteOnly(a) ? L('隱私資訊', 'Privacy information') : L('隱私政策', 'Privacy policy')} ${arrow()}</a></div></div></section>${spec}${gallery}<section class="app-support"><div class="app-support-copy reveal"><p class="eyebrow">Downloads &amp; support</p><h2>${L('下載與支援', 'Downloads and support')}</h2><p>${L('功能、系統需求、價格及 App 內購買項目，請以 App Store 的最新說明為準。', 'See the App Store listing for current features, requirements, pricing and in-app purchases.')}</p><div class="info-links"><a class="text-link" href="${policyURL(a)}">${L('閱讀隱私資訊', 'Read privacy information')} ${arrow()}</a><a class="text-link" href="/support/">${L('支援與常見問題', 'Support & FAQ')} ${arrow()}</a></div></div>${contactBox(a)}</section></div><section class="more-apps"><div class="wrap"><div class="section-heading reveal"><div><p class="eyebrow">More from FireSparkle</p><h2>${L('其他作品', 'Other apps and games')}</h2></div><a class="text-link" href="/${isGame ? '#games' : '#apps'}">${isGame ? L('所有遊戲', 'All games') : L('所有 App', 'All apps')} ${arrow()}</a></div><div class="resource-list reveal">${appRows('app', others)}</div></div></section>`;
  await save(`app/${a.slug}/index.html`, page({ path: appURL(a), title: `${a.nameZhHant}｜花火工作室 FireSparkle.Studio`, description: a.shortDescription, content }));

  const p = a.policy;
  const original = await read(`data/privacy-sources/${p.policyTextFile}`);
  const text = original.replace(oldEmails, email);
  const blocks = text.split('\n').filter((x) => x.trim()).map((line) => (numericHeading.test(line) || policyTitles.has(line.trim()) ? `<h2>${esc(line)}</h2>` : `<p>${esc(line)}</p>`)).join('');
  const notice = isWebsiteOnly(a)
    ? `<div class="policy-note"><p class="zh"><strong>現有說明的適用範圍</strong><br>以下是原作品公開資訊頁的隱私說明，僅涵蓋該網頁，未完整說明 App 內的資料處理。若你需要了解 App 的資料、儲存或刪除方式，請寫信給我們。</p><p class="en" lang="en"><strong>Scope of this notice</strong><br>This is the privacy notice from the app’s original information page, published in Traditional Chinese. It covers that page only. For details about data in the app, email us at ${email}.</p></div>`
    : `<div class="policy-note"><p class="zh">以下沿用此 App 既有的隱私政策，聯絡信箱已更新為工作室信箱 ${email}。原文提及舊支援網站、GitHub Pages 或字型服務時，指的是原網站；本官網的資料處理請見<a href="/website-privacy/">網站隱私說明</a>。</p><p class="en" lang="en">The policy below is published in Traditional Chinese and is the app’s existing policy, with the contact address updated to ${email}. For questions in English, just email us. How this website handles data is described in our <a href="/website-privacy/">website privacy notice</a>.</p></div>`;
  const privacyContent = `<div class="wrap reading-wrap">${breadcrumb(L('隱私資訊', 'Privacy'), crumbLink(appURL(a), L(esc(a.short), esc(a.en))))}<header class="page-heading"><p class="eyebrow">Privacy</p><h1>${L(`${esc(a.short)}<br>${isWebsiteOnly(a) ? '隱私資訊' : '隱私權政策'}`, `${esc(a.en)}<br>Privacy Policy`)}</h1><p class="lead">${esc(p.policyUpdatedText || '依既有公開政策內容整理')}</p></header>${notice}<article class="policy-body" lang="zh-Hant">${blocks}</article><div class="policy-source"><p><a href="${esc(p.policySourceURL)}">${L('查看原政策頁面', 'View the original policy page')} ${arrow('↗')}</a></p><p>${L('隱私或資料問題：', 'Privacy questions: ')}<a href="${mailto(`${a.short}｜隱私問題 Privacy`)}">${email}</a></p><p class="small">${L(`彙整日期：${site.updatedZh}`, `Compiled on ${site.updatedEn}`)}</p></div></div>`;
  await save(`app/${a.slug}/privacy/index.html`, page({ path: policyURL(a), title: `${a.short}隱私資訊｜花火工作室 FireSparkle.Studio`, description: `${a.nameZhHant}的隱私政策與聯絡方式。`, content: privacyContent }));
}

// --------------------------------------------------------------------------
// 隱私中心、支援、網站隱私說明、404
// --------------------------------------------------------------------------
await save('privacy/index.html', page({ path: '/privacy/', title: 'App 隱私政策｜花火工作室 FireSparkle.Studio', description: '依 App 查閱花火工作室各款 App 的資料處理、權限、保存與刪除方式。', content: `<div class="wrap reading-wrap">${breadcrumb(L('App 隱私政策', 'App privacy'))}<header class="page-heading"><p class="eyebrow">Your Privacy</p><h1>${L('隱私資訊', 'Privacy information')}</h1><p class="lead">${L('依作品查閱現有隱私說明與聯絡方式。', 'Find the available privacy information and contact details for each app or game.')}</p></header><div class="resource-list reveal">${appRows('privacy')}</div><p class="section-note">${L('這個官網本身的資料處理，請參閱<a href="/website-privacy/">網站隱私說明</a>。', 'For this website itself, see the <a href="/website-privacy/">website privacy notice</a>.')}</p></div>` }));

const faq = [
  ['如何管理訂閱或申請退款？', 'How do I manage a subscription or ask for a refund?',
    '若 App 提供 Apple App 內購買或訂閱，可在 iPhone「設定 → 你的姓名 → 訂閱項目」管理。退款請透過 <a href="https://reportaproblem.apple.com/">Apple 回報問題</a>提出，是否符合退款條件由 Apple 審核。刪除 App 不會自動取消訂閱。',
    'In-app purchases and subscriptions are handled by Apple. Manage them in iPhone Settings → your name → Subscriptions. Refunds are requested through <a href="https://reportaproblem.apple.com/">Apple’s Report a Problem</a> and reviewed by Apple. Deleting an app does not cancel its subscription.'],
  ['在哪裡查看 App 的隱私政策？', 'Where can I read an app’s privacy policy?',
    '前往<a href="/privacy/">隱私中心</a>，選擇你使用的 App。不同 App 的資料、權限及刪除方式可能不同。',
    'Visit the <a href="/privacy/">privacy centre</a> and choose your app. Data, permissions and deletion differ from app to app.'],
  ['可以協助找回 App 裡的資料嗎？', 'Can you help me recover data in an app?',
    '請先來信說明 App 名稱與狀況。各 App 的儲存與備份功能不同，部分資料只保存在你的裝置上，開發者可能無法存取或還原；刪除或重裝前，請先確認該 App 的備份方式。',
    'Email us with the app name and what happened. Storage and backup differ by app, and some data lives only on your device, where we cannot access or restore it. Check the app’s backup options before deleting or reinstalling.'],
];
await save('support/index.html', page({ path: '/support/', title: '支援與聯絡｜花火工作室 FireSparkle.Studio', description: '取得花火工作室 App 與遊戲的使用支援、回報問題，或與工作室聯絡。', content: `<div class="wrap">${breadcrumb(L('支援與聯絡', 'Support'))}<header class="page-heading"><p class="eyebrow">Support &amp; Contact</p><h1>${L('問題回報與聯絡', 'Support and contact')}</h1><p class="lead">${L('App 或遊戲有使用問題，請寄信說明。<br>合作與媒體聯繫也使用同一個信箱。', 'Email us with questions or bug reports about our apps and games. Use the same address for collaboration and press enquiries.')}</p></header><section class="support-grid">${contactBox()}<div class="support-instructions reveal"><h2>${L('回報問題時請附上', 'What to include in a bug report')}</h2><ol><li>${L('你使用的 App 或遊戲名稱與版本。', 'The app or game name and version.')}</li><li>${L('使用的平台、裝置型號與系統版本。', 'Your platform, device model and operating system version.')}</li><li>${L('發生問題的步驟，以及預期看到的結果。', 'The steps that lead to the problem, and what you expected to see.')}</li><li>${L('如附截圖，請先遮住不必要的個人資訊。', 'If you attach screenshots, cover any personal details first.')}</li></ol><p>${L('不需要提供密碼、付款卡號或其他敏感內容。', 'We never need your passwords, card numbers or other sensitive details.')}</p></div></section><section class="faq reveal"><p class="eyebrow">Common questions</p><h2>${L('常見問題', 'Frequently asked questions')}</h2>${faq.map(([qz, qe, az, ae]) => `<details><summary>${L(qz, qe)}</summary><p class="zh">${az}</p><p class="en" lang="en">${ae}</p></details>`).join('')}</section></div>` }));

const wpZh = `<p>本說明適用於花火工作室 FireSparkle.Studio 官網（firesparkle.com）。各 App 的資料處理方式另見<a href="/privacy/">App 隱私政策</a>。App Store 開發者名稱為 Yung Wen Cheng。</p><h2>1. 瀏覽本網站</h2><p>本站提供作品介紹、下載連結、支援與隱私資訊，未設置會員帳號、付款表單、廣告、網站分析或追蹤像素，也不使用 Cookie。作品篩選與搜尋只在你的瀏覽器中運作，不會傳送內容。</p><p>你選擇的顯示語言會以 localStorage 儲存在你的瀏覽器本機，只用來在下次造訪時沿用語言，不會傳送給我們；清除瀏覽器網站資料即可移除。</p><p>本站由 GitHub Pages 託管。為傳送網頁、維持安全與排查錯誤，GitHub 可能處理 IP 位址、請求網址、瀏覽器資訊與存取紀錄，相關處理依 <a href="https://docs.github.com/zh/site-policy/privacy-policies/github-general-privacy-statement">GitHub 隱私聲明</a>辦理。本站字型（Noto Serif TC、Cormorant Garamond）放在本站伺服器上，不會向第三方字型服務發出請求。</p><h2>2. 電子郵件聯絡</h2><p>當你主動寄信至 ${email}，我們會收到寄件地址、姓名（如有提供）、信件內容及附件，用於回覆問題、提供支援與處理隱私請求。請只提供處理問題所需的資料。</p><p>工作室信箱使用 Gmail，郵件可能依服務安排在境外處理，相關處理適用 <a href="https://policies.google.com/privacy?hl=zh-TW">Google 隱私權政策</a>。我們於處理問題及必要的後續追蹤期間保留往來內容；目的完成且無法律或爭議處理上的保留必要後，會刪除不再需要的內容。我們不會將你的支援信件用於廣告行銷。</p><h2>3. 外部連結</h2><p>點選 App Store、原政策頁或其他外部服務後，該服務依其自身的隱私政策處理資料。本站不會將 App 內的個人紀錄附加到下載連結。</p><h2>4. 查詢、更正與刪除</h2><p>如希望查詢、更正或刪除透過支援信件提供的個人資料，請寄信至 <a href="${mailto('FireSparkle.Studio｜隱私與資料請求')}">${email}</a>。我們會依請求內容處理；如有依法需保留的部分，會說明原因。郵件服務的備份清除時程由該服務管理。</p><h2>5. 說明更新</h2><p>若網站功能或使用的服務改變，本頁將更新並標示更新日期。</p>`;
const wpEn = `<p>This notice covers the FireSparkle.Studio (花火工作室) website at firesparkle.com. Each app’s own data practices are described in its <a href="/privacy/">app privacy policy</a>. Our App Store developer name is Yung Wen Cheng.</p><h2>1. Browsing this website</h2><p>The site offers app information, download links, support and privacy information. It has no accounts, payment forms, ads, analytics or tracking pixels, and it does not use cookies. Filtering and searching apps happens entirely in your browser.</p><p>Your chosen display language is saved in your browser’s localStorage so the site can remember it next time. It is never sent to us, and clearing the site’s data in your browser removes it.</p><p>The site is hosted on GitHub Pages. To deliver pages, keep the service secure and fix errors, GitHub may process your IP address, requested URLs, browser details and access logs under the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub General Privacy Statement</a>. Our fonts (Noto Serif TC and Cormorant Garamond) are served from this website, so no requests go to third-party font services.</p><h2>2. Contacting us by email</h2><p>When you email ${email}, we receive your address, your name (if given), your message and any attachments, and use them to answer questions, provide support and handle privacy requests. Please share only what is needed.</p><p>The studio mailbox runs on Gmail, so messages may be processed in other countries under the <a href="https://policies.google.com/privacy?hl=en">Google Privacy Policy</a>. We keep correspondence while handling your request and any necessary follow-up, then delete what is no longer needed unless the law or a dispute requires us to keep it. We never use support emails for marketing.</p><h2>3. External links</h2><p>When you follow a link to the App Store, an original policy page or another service, that service handles data under its own policies. We never attach personal records from an app to download links.</p><h2>4. Access, correction and deletion</h2><p>To access, correct or delete personal information you sent us by email, write to <a href="${mailto('FireSparkle.Studio | Privacy request')}">${email}</a>. If anything must be kept by law, we will explain why. Backup deletion schedules are managed by the email provider.</p><h2>5. Updates</h2><p>If the site’s features or services change, we will update this page and its date.</p>`;
await save('website-privacy/index.html', page({ path: '/website-privacy/', title: '網站隱私說明｜花火工作室 FireSparkle.Studio', description: '花火工作室官網的連線資料、語言偏好、電子郵件聯絡及外部連結說明。', content: `<div class="wrap reading-wrap">${breadcrumb(L('網站隱私說明', 'Website privacy'))}<header class="page-heading"><p class="eyebrow">Website Privacy</p><h1>${L('網站隱私說明', 'Website privacy notice')}</h1><p class="lead">${L(`更新日期：${site.updatedZh}`, `Last updated ${site.updatedEn}`)}</p></header><article class="policy-body zh">${wpZh}</article><article class="policy-body en" lang="en">${wpEn}</article></div>` }));

await save('404.html', page({ path: '/404.html', title: '找不到頁面｜花火工作室 FireSparkle.Studio', description: '找不到指定頁面，請返回花火工作室首頁。', content: `<section class="wrap page-heading not-found"><img class="not-found-mark" src="/assets/brand/firesparkle-mark-720.webp" alt="" width="180" height="173"><p class="eyebrow">404 · Page not found</p><h1>${L('找不到這個頁面', 'Page not found')}</h1><p class="lead">${L('網址可能有誤，或頁面已經移動。請返回首頁查看作品。', 'The address may be incorrect, or the page may have moved. Return to the homepage to browse our apps and games.')}</p><a class="button" href="/">${L('返回首頁', 'Back to home')} ${arrow()}</a></section>` }));

const urls = ['/', '/privacy/', '/support/', '/website-privacy/', ...apps.flatMap((a) => [appURL(a), policyURL(a)])];
await save('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${siteURL}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
await save('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${siteURL}/sitemap.xml\n`);
console.log(`Built FireSparkle.Studio website: ${apps.length} apps, ${apps.length} privacy pages, 5 shared pages${base ? ` (base ${base})` : ''}.`);
