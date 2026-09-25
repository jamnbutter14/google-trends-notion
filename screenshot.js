const { chromium } = require('playwright');

(async () => {
  // Launch browser with anti-detection flags
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1400, height: 900 },
    locale: 'en-US'
  });

  const page = await context.newPage();

  const targetUrl = 'https://trends.google.com/explore?date=now%207-d&geo=Worldwide&q=%2Fg%2F11yjly_225%2C%2Fg%2F11xt4k_q7r%2C%2Fg%2F11xt4srq2w%2C%2Fg%2F11xvlz7chy%2C%2Fg%2F11xt00ktl_';

  console.log('Navigating to Google Trends...');

  try {
    // Navigate with a generous timeout
    await page.goto(targetUrl, { waitUntil: 'commit', timeout: 90000 });

    // Handle cookie banner if present
    try {
      const btn = page.locator('button:has-text("Reject all"), button:has-text("Accept all"), button:has-text("I agree")').first();
      await btn.click({ timeout: 5000 });
    } catch (e) {
      // Banner not present or already accepted
    }

    // Wait 12 seconds for charts to render
    await page.waitForTimeout(12000);

    // Save screenshot
    await page.screenshot({ path: 'latest_trends.png', fullPage: false });
    console.log('Screenshot saved successfully!');
  } catch (err) {
    console.error('Error taking screenshot:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
