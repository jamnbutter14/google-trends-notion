const { chromium } = require('playwright');

(async () => {
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
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // 1. Tự động bấm nút "Remain on Classic Explore" nếu màn hình yêu cầu xuất hiện
  try {
    const classicBtn = page.locator('button:has-text("Remain on Classic Explore"), a:has-text("Remain on Classic Explore")').first();
    if (await classicBtn.isVisible({ timeout: 5000 })) {
      console.log('Clicking "Remain on Classic Explore"...');
      await classicBtn.click();
    }
  } catch (e) {
    console.log('No "Classic Explore" popup detected.');
  }

  // 2. Đồng ý Cookie banner nếu có
  try {
    const cookieBtn = page.locator('button:has-text("Reject all"), button:has-text("Accept all"), button:has-text("Got it")').first();
    if (await cookieBtn.isVisible({ timeout: 3000 })) {
      await cookieBtn.click();
    }
  } catch (e) {}

  // 3. Đợi cho biểu đồ và dữ liệu tải xong
  console.log('Waiting for trends charts to load...');
  await page.waitForTimeout(10000);

  // 4. Chụp màn hình
  await page.screenshot({ path: 'latest_trends.png', fullPage: false });
  console.log('Screenshot saved successfully!');

  await browser.close();
})();
