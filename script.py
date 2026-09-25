import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

chrome_options = Options()
chrome_options.add_argument("--headless=new")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1400,900")
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

url = "https://trends.google.com/explore?date=now%207-d&geo=Worldwide&q=%2Fg%2F11yjly_225%2C%2Fg%2F11xt4k_q7r%2C%2Fg%2F11xt4srq2w%2C%2Fg%2F11xvlz7chy%2C%2Fg%2F11xt00ktl_"

print("Navigating to Google Trends...")
driver.get(url)

# Wait 3 seconds for initial page and popups to mount
time.sleep(3)

# 1. Click "Remain on Classic Explore" button if present
try:
    buttons = driver.find_elements(By.XPATH, "//*[contains(text(), 'Remain on Classic Explore')]")
    if buttons:
        print("Clicking 'Remain on Classic Explore'...")
        buttons[0].click()
        time.sleep(2)
except Exception as e:
    print("No 'Remain on Classic Explore' popup found:", e)

# 2. Click Cookie "Got it" or "Accept" banner if present
try:
    cookie_btns = driver.find_elements(By.XPATH, "//*[contains(text(), 'Got it') or contains(text(), 'Accept all')]")
    if cookie_btns:
        cookie_btns[0].click()
        time.sleep(1)
except Exception as e:
    pass

# Wait 10 seconds for charts and widgets to render completely
print("Waiting for chart to load...")
time.sleep(10)

print("Saving screenshot...")
driver.save_screenshot("latest_trends.png")

driver.quit()
print("Done!")
