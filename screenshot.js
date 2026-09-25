const { chromium } = require('playwright');

(async () => {
  // Khởi tạo trình duyệt với cờ ẩn danh chống bị phát hiện là bot
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-web-security'
    ]
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1400, height: 900 },
    locale: 'en-US',
    timezoneId: 'America/New_York'
  });

  const page = await context.newPage();

  // URL Google Trends của bạn
  const targetUrl = 'https://trends.google.com/explore?date=now%207-d&geo=Worldwide&q=%2Fg%2F11yjly_225%2C%2Fg%2F11xt4k_q7r%2C%2Fg%2F11xt4srq2w%2C%2Fg%2F11xvlz7chy%2C%2Fg%2F11xt00ktl_';

  console.log('Mở trang Google Trends...');
  
  try {
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Đợi 4 giây cho màn hình thông báo xuất hiện
    await page.waitForTimeout(4000);

    // Bấm nút "Remain on Classic Explore"
    const classicBtn = page.locator('button, a').filter({ hasText: 'Remain on Classic Explore' });
    if (await classicBtn.isVisible({ timeout: 5000 })) {
      console.log('Đang bấm nút Remain on Classic Explore...');
      await classicBtn.click();
      await page.waitForTimeout(3000);
    }
  } catch (e) {
    console.log('Không thấy màn hình chuyển hướng, tiếp tục tải trang...');
  }

  // Tắt banner cookie nếu có
  try {
    const cookieBtn = page.locator('button').filter({ hasText: /Got it|Accept all|I agree/i });
    if (await cookieBtn.isVisible({ timeout: 3000 })) {
      await cookieBtn.click();
    }
  } catch (e) {}

  // Đợi biểu đồ vẽ hoàn tất
  console.log('Đang chờ biểu đồ tải dữ liệu...');
  await page.waitForTimeout(10000);

  // Chụp ảnh màn hình
  await page.screenshot({ path: 'latest_trends.png', fullPage: false });
  console.log('Đã lưu ảnh latest_trends.png thành công!');

  await browser.close();
})();
