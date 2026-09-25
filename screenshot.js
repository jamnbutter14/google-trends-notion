const { chromium } = require('playwright');

(async () => {
  // Launch headless browser with realistic desktop profile
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1400, height: 900 },
    locale: 'en-US',
    timezoneId: 'America/New_York'
  });

  const page = await context.newPage();

  const targetUrl = 'https://trends.google.com/explore?date=now%207-d&geo=Worldwide&q=%2Fg%2F11yjly_225%2C%2Fg%2F11xt4k_q7r%2C%2Fg%2F11xt4srq2w%2C%2Fg%2F11xvlz7chy%2C%2Fg%2F11xt00ktl_';

  console.log('Navigating to Google Trends...');
  
  // Use domcontentloaded instead of networkidle to prevent timeout hangs
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Handle Cookie / Consent banner if present (common on European runners)
  try {
    const acceptButton = page.locator('button:has-text("Reject all"), button:has-text("Accept all"), button:has-text("I agree")').first();
    if (await acceptButton.isVisible({ timeout: 5000 })) {
      console.log('Dismissing cookie banner...');
      await acceptButton.click();
    }
  } catch (e) {
    console.log('No consent banner detected.');
  }

  // Wait specifically for chart widgets to appear
  console.log('Waiting for chart elements...');
  await page.waitForTimeout(10000);

  // Take screenshot
  await page.screenshot({ path: 'latest_trends.png', fullPage: false });
  console.log('Screenshot saved successfully!');

  await browser.close();
})();
