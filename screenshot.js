const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1200, height: 700 }
  });

  const page = await context.newPage();

  // URL Widget nhúng trực tiếp biểu đồ Google Trends
  const embedUrl = 'https://trends.google.com/trends/embed/explore/TIMESERIES?req=%7B%22comparisonItem%22%3A%5B%7B%22geo%22%3A%7B%7D%2C%22complexKeywordsRestriction%22%3A%7B%22keyword%22%3A%5B%7B%22type%22%3A%22ENTITY%22%2C%22value%22%3A%22%2Fg%2F11yjly_225%22%7D%5D%7D%7D%2C%7B%22geo%22%3A%7B%7D%2C%22complexKeywordsRestriction%22%3A%7B%22keyword%22%3A%5B%7B%22type%22%3A%22ENTITY%22%2C%22value%22%3A%22%2Fg%2F11xt4k_q7r%22%7D%5D%7D%7D%2C%7B%22geo%22%3A%7B%7D%2C%22complexKeywordsRestriction%22%3A%7B%22keyword%22%3A%5B%7B%22type%22%3A%22ENTITY%22%2C%22value%22%3A%22%2Fg%2F11xt4srq2w%22%7D%5D%7D%7D%2C%7B%22geo%22%3A%7B%7D%2C%22complexKeywordsRestriction%22%3A%7B%22keyword%22%3A%5B%7B%22type%22%3A%22ENTITY%22%2C%22value%22%3A%22%2Fg%2F11xvlz7chy%22%7D%5D%7D%7D%2C%7B%22geo%22%3A%7B%7D%2C%22complexKeywordsRestriction%22%3A%7B%22keyword%22%3A%5B%7B%22type%22%3A%22ENTITY%22%2C%22value%22%3A%22%2Fg%2F11xt00ktl_%22%7D%5D%7D%7D%5D%2C%22category%22%3A0%2C%22property%22%3A%22%22%7D&tz=-420&eq=date%3Dnow%25207-d%26geo%3DWorldwide%26q%3D%252Fg%252F11yjly_225%2C%252Fg%252F11xt4k_q7r%2C%252Fg%252F11xt4srq2w%2C%252Fg%252F11xvlz7chy%2C%252Fg%252F11xt00ktl_';

  console.log('Tải Widget Google Trends...');
  
  try {
    await page.goto(embedUrl, { waitUntil: 'networkidle', timeout: 60000 });
    
    // Đợi biểu đồ vẽ xong
    await page.waitForTimeout(5000);

    // Chụp màn hình
    await page.screenshot({ path: 'latest_trends.png' });
    console.log('Chụp ảnh thành công!');
  } catch (err) {
    console.error('Lỗi khi chụp ảnh:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
