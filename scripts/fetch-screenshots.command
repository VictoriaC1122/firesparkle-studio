#!/bin/bash
# 雙擊執行：在這台 Mac 上下載 15 款作品的 App Store 官方截圖（需要網路）。
# 產出 public/assets/screenshots/<slug>/ 與 data/screenshot-manifest.json。
cd "$(dirname "$0")/.." || exit 1
for d in /opt/homebrew/bin /usr/local/bin "$HOME"/.nvm/versions/node/*/bin "$HOME/.volta/bin" "$HOME/.local/share/fnm/aliases/default/bin"; do [ -d "$d" ] && PATH="$d:$PATH"; done
export PATH
echo "FireSparkle.Studio — 下載 App Store 截圖"
echo "資料夾：$(pwd)"
if ! command -v node >/dev/null 2>&1; then echo "找不到 node，請先安裝 Node.js 22 以上。"; exit 1; fi
echo "node $(node -v)"
node scripts/fetch-screenshots.mjs --force || { echo; echo "下載失敗（見上方訊息）。"; exit 1; }
echo
echo "完成。可以關閉這個視窗。"
