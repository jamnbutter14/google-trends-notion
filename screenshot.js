const { chromium } = require('playwright');

(async () => {
  // Launch browser with a standard desktop User-Agent to bypass sign-in prompts
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 900 }
  });

  const page = await context.newPage();

  // Updated target URL with your specific comparison topics, 7-day timeframe, and Worldwide geo
  const targetUrl = 'https://trends.google.com/explore?date=now%207-d&geo=Worldwide&q=%2Fg%2F11yjly_225%2C%2Fg%2F11xt4k_q7r%2C%2Fg%2F11xt4srq2w%2C%2Fg%2F11xvlz7chy%2C%2Fg%2F11xt00ktl_';

  await page.goto(targetUrl, { waitUntil: 'networkidle' });

  // Wait 8 seconds for all comparison charts and widgets to finish loading
  await page.waitForTimeout(8000);

  // Save screenshot
  await page.screenshot({ path: 'latest_trends.png', fullPage: false });

  await browser.close();
})();
