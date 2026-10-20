# 花火工作室 FireSparkle.Studio 官網

正式網址：https://firesparkle.com

GitHub Pages 已設定自訂網域並強制 HTTPS；HTTP 與 `www.firesparkle.com` 會轉到正式網址。

以 App 與遊戲作品為主軸的獨立工作室官網，搭配官方作品畫面與玻璃火焰品牌標誌。朝霧花火配色以霧白、青灰、晨曦粉與暖金呈現；全站中英雙語，字型自託管（Noto Serif TC 宋體、Cormorant Garamond 英文襯線）。

## 內容

- 首頁：工作室主視覺、遊戲精選、Steam 上架準備、10 款 App（分類篩選＋搜尋）、工作室介紹、聯絡
- 遊戲精選包含已於 App Store 上架的「賴瑞的調酒研究室」與「完美養豬」；Steam 區塊只呈現上架準備狀態，尚未指定作品、商店連結或發售日期
- 12 款作品各自保留介紹頁 `/app/<slug>/` 與隱私頁 `/app/<slug>/privacy/`；有官方截圖的作品頁另提供畫面展示
- 隱私中心 `/privacy/`、支援與常見問題 `/support/`、網站隱私說明 `/website-privacy/`、404、sitemap

## 修改

- `src/content.mjs`：網址、信箱、作品排序、分類、英文名稱與英文簡介
- `src/home.mjs`：首頁版型與中英文案，包含遊戲精選、Steam 進度、App 作品、工作室與聯絡區塊
- `scripts/build.mjs`：共用頁首／頁尾、作品與政策等內頁的版型及中英文案；載入首頁模組並產生全站頁面
- `public/style.css`、`public/site.js`：響應式外觀、語言切換、目前區塊導覽、分類與搜尋；清除搜尋時保留分類
- `public/gallery.css`、`public/gallery.js`：作品截圖的原生 dialog 放大檢視，支援方向鍵、Escape 與焦點還原；未啟用 JavaScript 時仍可直接開啟圖片
- `data/apple-catalog.json`：App Store 資料（中文名稱、簡介、圖示、系統需求）
- `data/site-media.json`：官方 App Store 截圖的作品對應、來源網址、取得日期與本機圖片路徑
- `public/assets/screenshots/`：依作品 slug 分資料夾存放的官方截圖，供首頁與作品頁使用
- `data/privacy-sources/`：各 App 隱私政策正文

改完執行 `node scripts/build.mjs`，本機預覽 `npm run preview` → http://127.0.0.1:4173

## 文案

先寫作品用途、玩法與目前狀態，使用自然、簡短的中英文。標題與按鈕直接說明內容或操作，避免重複靈感、火花、旅程等比喻，以及沒有具體根據的品質或服務承諾。Steam 的作品名稱、商店連結和日期需確認後再發布。

網站簡介可在 `src/content.mjs` 覆寫 `shortDescription`；`data/apple-catalog.json` 保留商店來源資料。隱私政策正文不隨行銷文案調整。分享預覽使用品牌標誌 `icon-512.png`，由頁面標題與描述提供文字。

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
