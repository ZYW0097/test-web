document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault(); // 防止表單的默認提交行為

  const formData = new FormData(this); // 獲取表單數據
  const data = Object.fromEntries(formData); // 將表單數據轉換為對象

  // 驗證小孩椅數量
  if (data.children > 0 && data.childChairs <= 0) {
      alert('如果填寫了兒童椅數量，小孩人數必須大於 0！');
      return;
  }

  // 驗證兒童椅數量不大於小孩數量
  if (data.childChairs > data.children) {
      alert('兒童椅數量不能大於小孩人數！');
      return;
  }

  // 發送 POST 請求到 /book
  fetch('/book', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' // 設定請求內容類型為 JSON
      },
      body: JSON.stringify(data) // 將數據轉換為 JSON 字符串
  })
  .then(response => response.json()) // 解析 JSON 響應
  .then(data => {
      console.log('成功:', data);
      document.getElementById('message').innerText = '訂位成功！'; // 顯示提示訊息
      this.reset(); // 重置表單
  })
  .catch((error) => {
      console.error('錯誤:', error);
      document.getElementById('message').innerText = '訂位失敗，請再試一次！'; // 顯示錯誤提示訊息
  });
});
