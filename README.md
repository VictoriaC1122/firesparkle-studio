# 花火工作室 FireSparkle.Studio 官網

正式網址：https://firesparkle.com （網域設定完成前：https://victoriac1122.github.io/firesparkle-studio/）

以玻璃火焰標誌為主視覺的獨立 App 工作室官網。全站中英雙語，字型自託管（霞鶩文楷 TC、Fraunces）。

## 內容

- 首頁：主視覺、12 款 App（分類篩選＋搜尋）、工作室介紹、聯絡
- 每款 App 的介紹頁 `/app/<slug>/` 與隱私頁 `/app/<slug>/privacy/`
- 隱私中心 `/privacy/`、支援與常見問題 `/support/`、網站隱私說明 `/website-privacy/`、404、sitemap

## 修改

- `src/content.mjs`：網址、信箱、App 排序、分類、英文名稱與英文簡介
- `scripts/build.mjs`：所有頁面的版型與中英文案
- `public/style.css`、`public/site.js`：外觀、語言切換、篩選與搜尋
- `data/apple-catalog.json`：App Store 資料（中文名稱、簡介、圖示、系統需求）
- `data/privacy-sources/`：各 App 隱私政策正文

改完執行 `node scripts/build.mjs`，本機預覽 `npm run preview` → http://127.0.0.1:4173

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

霞鶩文楷 TC 與 Fraunces 皆為 SIL Open Font License，授權檔在 `public/fonts/*/LICENSE.txt`。
