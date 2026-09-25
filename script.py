import pandas as pd
import matplotlib.pyplot as plt
from pytrends.request import TrendReq

# Khởi tạo kết nối Google Trends
pytrends = TrendReq(hl='en-US', tz=360)

# Danh sách mã Topic IDs từ URL của bạn
topic_ids = [
    "/g/11yjly_225",
    "/g/11xt4k_q7r",
    "/g/11xt4srq2w",
    "/g/11xvlz7chy",
    "/g/11xt00ktl_"
]

print("Đang tải dữ liệu từ Google Trends...")

# Lấy dữ liệu 7 ngày gần nhất (now 7-d) trên toàn cầu (Worldwide)
pytrends.build_payload(topic_ids, timeframe='now 7-d', geo='')
df = pytrends.interest_over_time()

if 'isPartial' in df.columns:
    df = df.drop(columns=['isPartial'])

# Tiến hành vẽ biểu đồ
plt.figure(figsize=(12, 6), dpi=150)
for col in df.columns:
    plt.plot(df.index, df[col], label=col, linewidth=2)

plt.title("Google Trends - Interest Over Time (Past 7 Days)", fontsize=14, fontweight='bold', pad=15)
plt.xlabel("Date/Time", fontsize=10)
plt.ylabel("Search Interest", fontsize=10)
plt.grid(True, linestyle='--', alpha=0.5)
plt.legend(loc='upper right')
plt.tight_layout()

# Lưu thành ảnh
plt.savefig("latest_trends.png")
print("Đã tạo và lưu biểu đồ latest_trends.png thành công!")
