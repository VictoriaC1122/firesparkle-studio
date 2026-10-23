# 以無頭 Chromium 將 scripts/og-image.html 輸出為 public/assets/brand/og-image.png（1200×630）。
# 需先啟動本機預覽（npm run preview，http://127.0.0.1:4173），並安裝 playwright（pip install playwright && playwright install chromium）。
import asyncio, os, shutil, sys
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = os.environ.get('BASE', 'http://127.0.0.1:4173')

async def main():
    shutil.copy(os.path.join(ROOT, 'scripts/og-image.html'), os.path.join(ROOT, 'public/og-preview.html'))
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page(viewport={'width': 1200, 'height': 630}, device_scale_factor=1)
            await page.goto(BASE + '/og-preview.html', wait_until='networkidle')
            await page.wait_for_timeout(500)
            await page.screenshot(path=os.path.join(ROOT, 'public/assets/brand/og-image.png'), full_page=False)
            await browser.close()
    finally:
        os.remove(os.path.join(ROOT, 'public/og-preview.html'))
    print('wrote public/assets/brand/og-image.png')

asyncio.run(main())
