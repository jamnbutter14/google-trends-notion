import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

chrome_options = Options()
chrome_options.add_argument("--headless=new")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1200,800")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

# Official Google Trends Embed URL for your exact query, 7-day duration, and Worldwide geo
embed_url = "https://trends.google.com/trends/embed/explore/TIMESERIES?req=%7B%22comparisonItem%22%3A%5B%7B%22geo%22%3A%7B%7D%2C%22complexKeywordsRestriction%22%3A%7B%22keyword%22%3A%5B%7B%22type%22%3A%22ENTITY%22%2C%22value%22%3A%22%2Fg%2F11yjly_225%22%7D%5D%7D%7D%2C%7B%22geo%22%3A%7B%7D%2C%22complexKeywordsRestriction%22%3A%7B%22keyword%22%3A%5B%7B%22type%22%3A%22ENTITY%22%2C%22value%22%3A%22%2Fg%2F11xt4k_q7r%22%7D%5D%7D%7D%2C%7B%22geo%22%3A%7B%7D%2C%22complexKeywordsRestriction%22%3A%7B%22keyword%22%3A%5B%7B%22type%22%3A%22ENTITY%22%2C%22value%22%3A%22%2Fg%2F11xt4srq2w%22%7D%5D%7D%7D%2C%7B%22geo%22%3A%7B%7D%2C%22complexKeywordsRestriction%22%3A%7B%22keyword%22%3A%5B%7B%22type%22%3A%22ENTITY%22%2C%22value%22%3A%22%2Fg%2F11xvlz7chy%22%7D%5D%7D%7D%2C%7B%22geo%22%3A%7B%7D%2C%22complexKeywordsRestriction%22%3A%7B%22keyword%22%3A%5B%7B%22type%22%3A%22ENTITY%22%2C%22value%22%3A%22%2Fg%2F11xt00ktl_%22%7D%5D%7D%7D%5D%2C%22category%22%3A0%2C%22property%22%3A%22%22%7D&tz=-420&eq=date%3Dnow%25207-d%26geo%3DWorldwide%26q%3D%252Fg%252F11yjly_225%2C%252Fg%252F11xt4k_q7r%2C%252Fg%252F11xt4srq2w%2C%252Fg%252F11xvlz7chy%2C%252Fg%252F11xt00ktl_"

print("Navigating to Trends Embed Widget...")
driver.get(embed_url)

# Wait 8 seconds for the SVG chart lines to draw
time.sleep(8)

print("Capturing chart...")
driver.save_screenshot("latest_trends.png")

driver.quit()
print("Done!")
