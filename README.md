# 花火工作室 FireSparkle.Studio 官網

正式網址：https://firesparkle.com

GitHub Pages 已設定自訂網域並強制 HTTPS；HTTP 與 `www.firesparkle.com` 會轉到正式網址。

以 App 與遊戲作品為主軸的獨立工作室官網。2026-10-23 全站改版：白底搭配品牌玻璃火焰的極光漸層與玻璃卡片，支援深色模式；首頁為工作室入口（主視覺、作品星軌、已推出的遊戲、全部作品、工作室介紹、Instagram／Threads 與聯絡），15 款作品各自擁有獨立頁面，包含 App Store 官方截圖與逐步使用方式。Latin 字型自託管 Plus Jakarta Sans（可變字重），中文與其他書寫系統使用各裝置的系統字型；提供 50 個語言選項。

## 內容

- 首頁 `/`：主視覺（品牌標誌＋作品圖示星軌）、作品數量、已推出的遊戲（賴瑞的調酒研究室、完美養豬）、Steam 上架準備狀態、15 款作品（分類篩選與搜尋，卡片連到各作品頁）、關於工作室、追蹤我們（Instagram、Threads、Email）
- 作品頁 `/app/<slug>/`：介紹、系統需求與分級、App Store 全部官方截圖（可橫向捲動、點選放大）、`#howto` 使用方式（App 三步驟、遊戲四步驟，每步搭配對應畫面）、下載與支援、其他作品；隱私頁 `/app/<slug>/privacy/` 維持原網址
- 指南總覽 `/guides/apps/`、`/guides/games/`：各作品的畫面、簡介與步驟，連到作品頁
- 隱私中心 `/privacy/`、支援與常見問題 `/support/`、網站隱私說明 `/website-privacy/`、404、sitemap
- 社群：Instagram 與 Threads 皆為 `@firesparkle.studio`，出現在頁首、首頁、支援頁與頁尾；網址設定在 `src/content.mjs` 的 `site.social`
- 2026-10-21 新增「圖解半導體」、「哩程管家：信用卡換機票試算」及「我決定自己的未來-大學選系指南」；資料、圖示及截圖經 Apple 官方頁核對

## 修改

- `src/content.mjs`：網址、信箱、社群帳號、成立年份、作品排序、分類、英文名稱與英文簡介
- `src/home.mjs`、`public/home.css`：首頁版型與中英文案
- `scripts/build.mjs`：共用頁首／頁尾、作品頁（介紹、畫面、使用方式）、隱私頁、支援與政策頁的版型及中英文案
- `src/showcase.mjs`：截圖共用呈現（手機外框、橫向截圖列、步驟配圖）；只顯示完整原圖，不裁切或重繪
- `src/guides.mjs`、`public/guides.css`：指南總覽
- `public/style.css`：設計代幣（色彩、字型、圓角、陰影，含深色模式）、頁首頁尾、按鈕、卡片、內頁
- `public/i18n.css`：語言選單、各書寫系統字型與 RTL 調整；`public/i18n.js` 語言切換
- `public/gallery.css`、`public/gallery.js`：截圖放大檢視（原生 dialog，支援方向鍵、Escape 與焦點還原）
- `public/site.js`：作品篩選與搜尋、導覽目前位置
- `data/guides/{games,apps}.json`：各作品的步驟（中英）、核對來源，以及 `screenshots`（每個步驟對應的截圖索引，從 0 起算，對應 `data/site-media.json` 的 `images` 順序）；`ui-translations.json` 與 `translations/<locale>.json` 保存其餘 48 種語言
- `data/site-media.json`：各作品的官方截圖清單、來源網址、尺寸、裝置、版本與取得日期
- `data/screenshot-manifest.json`：`scripts/fetch-screenshots.mjs` 的下載紀錄
- `data/i18n/source.json`、`data/i18n/<locale>.json`：繁中／英文來源文字及 48 組翻譯；`data/i18n/additions-<日期>.json` 記錄每次新增的文字與翻譯，由 `scripts/apply-i18n-additions.mjs` 併入
- `data/apple-catalog.json`：App Store 資料（中文名稱、簡介、圖示、系統需求）
- `data/privacy-sources/`：各 App 隱私政策正文
- `scripts/og-image.html`、`scripts/render-og.py`：分享預覽圖（1200×630）的版型與輸出

改完執行 `node scripts/build.mjs`，本機預覽 `npm run preview` → http://127.0.0.1:4173

### 更新 App Store 截圖

1. `node scripts/fetch-screenshots.mjs --force`（需要能連到 itunes.apple.com 與 mzstatic.com；也可雙擊 `scripts/fetch-screenshots.command`）：查詢 15 款作品的 App Store 資料並下載 iPhone 截圖到 `public/assets/screenshots/<slug>/`，賴瑞另存 iPad 橫式畫面；輸出 `data/screenshot-manifest.json` 與 `data/apple-lookup-<日期>.json`
2. `node scripts/apply-screenshot-manifest.mjs`：依下載紀錄更新 `data/site-media.json`
3. 檢查 `data/guides/*.json` 的 `screenshots` 索引是否仍對應正確畫面，再 `node scripts/build.mjs`

### 發布

雙擊 `scripts/publish.command`（或手動執行其中的指令）：清除舊字型、`node scripts/build.mjs`、`git add -A`、以 `scripts/publish-commit-message.txt` 提交並推送到 `main`；GitHub Actions 隨後自動部署。

## 語言

50 個選項包含繁體／簡體中文、英、日、韓、西班牙、法、德、葡萄牙、義大利、俄、阿拉伯、印地、孟加拉、烏爾都、印尼、馬來、越南、泰、菲律賓、土耳其、波斯、烏克蘭、波蘭、荷蘭、羅馬尼亞、捷克、希臘、匈牙利、瑞典、丹麥、芬蘭、挪威、希伯來、泰米爾、泰盧固、馬拉地、古吉拉特、旁遮普、史瓦希里、南非、保加利亞、克羅埃西亞、塞爾維亞、斯洛伐克、斯洛維尼亞、立陶宛、拉脫維亞、愛沙尼亞及加泰隆尼亞語。葡萄牙文文案採巴西常用用語；挪威文採 Bokmål。

清單兼顧常用語言與 App／遊戲市場，不宣稱是全球人口前 50 名的精確排名。選擇參考 [Ethnologue 的使用人口統計口徑](https://shop.ethnologue.com/products/2026-ethnologue-200)及 [Steam 官方語言調查](https://store.steampowered.com/hwsurvey/hw/)。

首頁、作品頁、指南、支援、導覽、搜尋、圖片檢視及政策說明介面使用本機翻譯檔。各 App 的隱私政策正文保留已發布的繁中原文；網站隱私說明保留既有繁中及英文版本，並在各語言介面明確標示可閱讀的版本。網站語言選項不代表 App 或遊戲本身支援相同語言。

訪客可用語言原名、英文名或中文名搜尋。優先順序為網址 `?lang=ja`、已儲存的 `fs-lang` 偏好、瀏覽器語言，最後英文。切換會更新站內連結及網址，方便分享；阿拉伯、波斯、希伯來及烏爾都語使用 RTL。翻譯由本站提供，選擇時只下載一個含內容雜湊的 JSON，不連外部翻譯服務；載入失敗保留原頁面並顯示重試提示。未啟用 JavaScript 時顯示繁中內容。

新增或調整文字時，同步更新來源、所有翻譯與模板。來源 ID 為英文 HTML 的 SHA-256 前 12 碼；各語言檔使用 `{ "文字ID": "翻譯" }`，更動來源順序不影響對應，修改英文會要求同步更新各語言。翻譯中保留原有 HTML 標籤、網址及聯絡信箱。作品總數使用 `{count}` 參數，由資料筆數帶入，不必為新增作品重翻計數文字。新增文字的做法：把英文、繁中與 48 種翻譯寫進 `data/i18n/additions-<日期>.json`，執行 `node scripts/apply-i18n-additions.mjs data/i18n/additions-<日期>.json`。指南另外提供 51 項文字（4 項介面與 47 個步驟），與基本文字合併成每個語言 254 項。`npm run build` 會檢查來源 ID、完整性與 HTML 結構，缺少任何語言即停止。開發中可暫用 `PREVIEW_PARTIAL_LOCALES=1 npm run build` 預覽已完成的語言；正式部署不可設定此變數。

## 文案

先寫作品用途、玩法與目前狀態，使用自然、簡短的中英文。標題與按鈕直接說明內容或操作；首頁標語「將微小的靈感火花，化為精彩的創意／Small sparks, big ideas.」沿用工作室社群簡介，其他文案避免沒有具體根據的品質或服務承諾。Steam 的作品名稱、商店連結和日期需確認後再發布。

網站簡介可在 `src/content.mjs` 覆寫 `shortDescription`；`data/apple-catalog.json` 保留商店來源資料。隱私政策正文不隨行銷文案調整。分享預覽圖 `public/assets/brand/og-image.png` 由 `scripts/og-image.html` 產生，頁面標題與描述提供文字。

## 視覺

`public/style.css` 以 CSS 變數定義色彩與字型：白底 `#f8f8fc`、深靛墨色文字，品牌漸層（粉、珊瑚、紫、天空藍）只用於標語、數字、裝飾光暈與社群圖示；深色模式透過 `prefers-color-scheme` 切換同一組變數。卡片使用半透明玻璃背景與細邊框，截圖放在深色手機外框內，橫式畫面改用寬外框。首頁主視覺以品牌標誌為中心，周圍環繞前十款作品圖示並緩慢漂浮，`prefers-reduced-motion` 時停止所有動畫。原始圖檔不裁切或重繪；角色圖來源與雜湊記錄於 `data/character-assets.json`。

品牌商標使用 2026-10-21 提供的透明 PNG，原檔保存在 `data/brand/firesparkle-logo-original.png`。頁首、頁尾、工作室介紹、404、分享圖片與瀏覽器圖示共用此圖的等比縮小版本。品牌圖片與樣式網址帶內容雜湊，避免訪客快取舊版。

## 部署

推上 `main` 後，GitHub Actions（`.github/workflows/pages.yml`）會自動 build 並發佈 `public/`。
建置時會使用 GitHub Pages 提供的 `BASE_PATH` 與完整 `SITE_URL`，讓站內路徑、canonical、分享圖片、sitemap 與 robots.txt 對應實際上線網址。設定自訂網域後重新執行部署，即會使用新網域。

本機測試 GitHub 專案頁的建置：

```sh
BASE_PATH=/firesparkle-studio SITE_URL=https://victoriac1122.github.io/firesparkle-studio npm run build
```

一般本機預覽或自訂網域建置使用 `npm run build`，路徑回到根目錄，`SITE_URL` 預設採用 `src/content.mjs` 的正式網址。
自訂網域在 repo Settings → Pages → Custom domain 設定為 `firesparkle.com`；使用 Actions 部署時不需要 CNAME 檔。

DNS（在網域商設定）：

| 類型 | 主機 | 值 |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | victoriac1122.github.io |

## 字型授權

Plus Jakarta Sans（SIL Open Font License 1.1）自託管於 `public/fonts/plus-jakarta-sans/`，含 Latin、Latin Extended 與越南文子集，授權全文在同資料夾的 `LICENSE.txt`。中文、日文、韓文及其他書寫系統使用各裝置的系統字型，不向第三方字型服務發出請求。
