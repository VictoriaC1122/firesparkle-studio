#!/bin/bash
# 雙擊執行：建置網站、提交並推送到 GitHub（推上 main 後 GitHub Actions 會自動部署到 firesparkle.com）。
cd "$(dirname "$0")/.." || exit 1
for d in /opt/homebrew/bin /usr/local/bin "$HOME"/.nvm/versions/node/*/bin "$HOME/.volta/bin" "$HOME/.local/share/fnm/aliases/default/bin"; do [ -d "$d" ] && PATH="$d:$PATH"; done
export PATH
set -e
echo "FireSparkle.Studio — 建置並發布"
echo "資料夾：$(pwd)"
command -v node >/dev/null 2>&1 || { echo "找不到 node，請先安裝 Node.js 22 以上。"; exit 1; }
echo "node $(node -v)"
# 清掉舊版本的字型與樣式檔（已改用 Plus Jakarta Sans 與系統字型）
find public/fonts -mindepth 1 -maxdepth 1 ! -name plus-jakarta-sans ! -name fonts.css -exec rm -rf {} +
rm -f public/showcase.css public/og-preview.html
node scripts/build.mjs
git add -A
echo "--- 變更摘要 ---"
git diff --cached --stat | tail -5
MSG="scripts/publish-commit-message.txt"
if [ -f "$MSG" ]; then git commit -q -F "$MSG"; else git commit -q -m "Update website"; fi
git push origin main
echo
echo "完成。GitHub Actions 部署通常需要 1–3 分鐘，之後 https://firesparkle.com 會更新。可以關閉這個視窗。"
