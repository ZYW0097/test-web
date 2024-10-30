document.getElementById('children').addEventListener('input', function () {
    const childChairContainer = document.getElementById('childChairContainer');
    const childChairsInput = document.getElementById('childChairs');

    // 根據兒童數量顯示或隱藏兒童椅數量欄位
    if (this.value > 0) {
        childChairContainer.style.display = 'block'; // 顯示兒童椅數量欄位
    } else {
        childChairContainer.style.display = 'none'; // 隱藏兒童椅數量欄位
        childChairsInput.value = 0; // 將兒童椅數量設置為 0
    }
});

// 提交訂位表單的功能
document.getElementById('bookinxgForm').addEventListener('submit', function (e) {
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
    .then(response => {
        if (!response.ok) {
            throw new Error('網絡回應不正常');
        }
        return response.json(); // 解析 JSON 響應
    })
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

// 查看訂位按鈕的功能
function viewBookings() {
    window.location.href = '/view'; // 導航到 view.html
}
