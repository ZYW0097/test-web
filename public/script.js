document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault(); // 防止表單的默認提交行為

  const formData = new FormData(this); // 獲取表單數據
  const data = Object.fromEntries(formData); // 將表單數據轉換為對象

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
      // 在這裡可以顯示成功消息或其他處理
      alert('訂位成功！');
  })
  .catch((error) => {
      console.error('錯誤:', error);
      // 在這裡可以顯示錯誤消息
      alert('訂位失敗，請再試一次！');
  });
});
