const { chromium } = require('playwright');

(async () => {
  // Launch browser with a standard desktop User-Agent to bypass sign-in prompts
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 900 }
  });

  const page = await context.newPage();

  // Change keywords (q=...) or location (geo=...) here if needed
  const targetUrl = 'https://trends.google.com/trends/explore?date=now%201-d&geo=US&q=Artificial%20Intelligence';

  await page.goto(targetUrl, { waitUntil: 'networkidle' });

  // Wait 5 seconds for charts to finish rendering
  await page.waitForTimeout(5000);

  // Save screenshot
  await page.screenshot({ path: 'latest_trends.png', fullPage: false });

  await browser.close();
})();
