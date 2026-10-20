# 花火工作室 FireSparkle.Studio 官網

正式網址：https://firesparkle.com

GitHub Pages 已設定自訂網域並強制 HTTPS；HTTP 與 `www.firesparkle.com` 會轉到正式網址。

以 App 與遊戲作品為主軸的獨立工作室官網，搭配官方作品畫面與玻璃火焰品牌標誌。首頁以淺米色、晨霧與暖金花火呈現，提供 50 個語言選項。中文字型自託管（Noto Serif TC 宋體），西文標題採 Cormorant Garamond；其他文字使用適合該書寫系統的裝置字型。

## 內容

- 首頁：工作室主視覺、遊戲精選、Steam 上架準備、15 款作品索引（13 款 App＋2 款遊戲，分類篩選與搜尋）、工作室介紹、聯絡
- 2026-10-21 新增「圖解半導體」、「哩程管家：信用卡換機票試算」及「我決定自己的未來-大學選系指南」，放在 作品列表前方；資料、圖示及截圖經 Apple 官方頁與工作室原作品集核對。
- 遊戲精選包含已於 App Store 上架的「賴瑞的調酒研究室」與「完美養豬」；Steam 區塊只呈現上架準備狀態，尚未指定作品、商店連結或發售日期
- 15 款作品各自保留介紹頁 `/app/<slug>/` 與隱私頁 `/app/<slug>/privacy/`；有官方截圖的作品頁另提供畫面展示
- 隱私中心 `/privacy/`、支援與常見問題 `/support/`、網站隱私說明 `/website-privacy/`、404、sitemap

## 修改

- `src/content.mjs`：網址、信箱、作品排序、分類、英文名稱與英文簡介
- `src/home.mjs`：首頁版型與中英文案，包含遊戲精選、Steam 進度、全部作品、工作室與聯絡區塊
- `scripts/build.mjs`：共用頁首／頁尾、作品與政策等內頁的版型及中英文案；載入首頁模組並產生全站頁面
- `public/style.css`、`public/site.js`：響應式外觀、目前區塊導覽、分類與搜尋；清除搜尋時保留分類
- `src/locales.mjs`、`src/i18n-build.mjs`：語言清單、文字 ID、翻譯驗證與語言資源產生器
- `data/i18n/source.json`、`data/i18n/<locale>.json`：196 項繁中／英文來源文字及 48 組翻譯，透過固定文字 ID 對應
- `public/i18n.js`、`public/i18n.css`：語言選單、按需載入、文字替換、文字方向與多語排版
- `public/gallery.css`、`public/gallery.js`：作品截圖的原生 dialog 放大檢視，支援方向鍵、Escape 與焦點還原；未啟用 JavaScript 時仍可直接開啟圖片
- `data/apple-catalog.json`：App Store 資料（中文名稱、簡介、圖示、系統需求）
- `data/site-media.json`：官方 App Store 截圖的作品對應、來源網址、取得日期與本機圖片路徑
- `public/assets/screenshots/`：依作品 slug 分資料夾存放的官方截圖，供首頁與作品頁使用
- `data/privacy-sources/`：各 App 隱私政策正文

改完執行 `node scripts/build.mjs`，本機預覽 `npm run preview` → http://127.0.0.1:4173

## 語言

50 個選項包含繁體／簡體中文、英、日、韓、西班牙、法、德、葡萄牙、義大利、俄、阿拉伯、印地、孟加拉、烏爾都、印尼、馬來、越南、泰、菲律賓、土耳其、波斯、烏克蘭、波蘭、荷蘭、羅馬尼亞、捷克、希臘、匈牙利、瑞典、丹麥、芬蘭、挪威、希伯來、泰米爾、泰盧固、馬拉地、古吉拉特、旁遮普、史瓦希里、南非、保加利亞、克羅埃西亞、塞爾維亞、斯洛伐克、斯洛維尼亞、立陶宛、拉脫維亞、愛沙尼亞及加泰隆尼亞語。葡萄牙文文案採巴西常用用語；挪威文採 Bokmål。

清單兼顧常用語言與 App／遊戲市場，不宣稱是全球人口前 50 名的精確排名。選擇參考 [Ethnologue 的使用人口統計口徑](https://shop.ethnologue.com/products/2026-ethnologue-200)及 [Steam 官方語言調查](https://store.steampowered.com/hwsurvey/hw/)。

首頁、作品介紹、支援、導覽、搜尋、圖片檢視及政策說明介面使用本機翻譯檔。各 App 的隱私政策正文保留已發布的繁中原文；網站隱私說明保留既有繁中及英文版本，並在各語言介面明確標示可閱讀的版本。網站語言選項不代表 App 或遊戲本身支援相同語言。

訪客可用語言原名、英文名或中文名搜尋。優先順序為網址 `?lang=ja`、已儲存的 `fs-lang` 偏好、瀏覽器語言，最後英文。切換會更新站內連結及網址，方便分享；阿拉伯、波斯、希伯來及烏爾都語使用 RTL。翻譯由本站提供，選擇時只下載一個含內容雜湊的 JSON，不連外部翻譯服務；載入失敗保留原頁面並顯示重試提示。未啟用 JavaScript 時顯示繁中內容。

新增或調整文字時，同步更新來源、所有翻譯與模板。來源 ID 為英文 HTML 的 SHA-256 前 12 碼；各語言檔使用 `{ "文字ID": "翻譯" }`，更動來源順序不影響對應，修改英文會要求同步更新各語言。翻譯中保留原有 HTML 標籤、網址及聯絡信箱。作品總數使用 `{count}` 參數，由資料筆數帶入，不必為新增作品重翻計數文字。`npm run build` 會檢查來源 ID、196 項完整性與 HTML 結構，缺少任何語言即停止。開發中可暫用 `PREVIEW_PARTIAL_LOCALES=1 npm run build` 預覽已完成的語言；正式部署不可設定此變數。

## 文案

先寫作品用途、玩法與目前狀態，使用自然、簡短的中英文。標題與按鈕直接說明內容或操作，避免重複靈感、火花、旅程等比喻，以及沒有具體根據的品質或服務承諾。Steam 的作品名稱、商店連結和日期需確認後再發布。

網站簡介可在 `src/content.mjs` 覆寫 `shortDescription`；`data/apple-catalog.json` 保留商店來源資料。隱私政策正文不隨行銷文案調整。分享預覽使用品牌標誌 `icon-512.png`，由頁面標題與描述提供文字。

## 首頁視覺

`public/home.css` 僅由首頁載入：淺米底、暖灰文字、香檳色細線，搭配本機 SVG `public/assets/brand/asagiri-hanabi.svg` 的花火與霧帶。主圖保持端正、完整呈現原始作品畫面；App 與 Steam 區使用同一套紙面色系。中文沿用 Noto Serif TC 宋體，正文與介面小字另保留足夠對比。裝飾不接收游標、不進入輔助技術閱讀順序，也沒有背景動畫。

作品索引以雙欄編號呈現，手機改為單欄；總數依資料自動計算，篩選或搜尋時顯示符合的數量。

品牌商標使用 2026-10-21 提供的透明 PNG，原檔保存在 `data/brand/firesparkle-logo-original.png`。頁首、頁尾、工作室介紹、404、分享圖片與瀏覽器圖示共用此圖的等比縮小版本，保留原始透明度。品牌圖片網址帶原檔雜湊，避免訪客快取舊商標。

首頁樣式和 SVG 共同產生獨立的版本參數，更新首頁時不會改動作品隱私頁。`src/home.mjs` 負責內容結構，`scripts/build.mjs` 負責載入與路徑。

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

目前使用的 Noto Serif TC 與 Cormorant Garamond 皆為 SIL Open Font License，授權與來源記錄在 `public/fonts/noto-serif-tc/` 及 `public/fonts/cormorant-garamond/`。中文採 Unicode 分片，只載入當頁需要的字型檔。
