document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 防止表單的默認提交行為

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const time = document.getElementById('time').value;

    fetch('/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone, time })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // 顯示成功訊息
        document.getElementById('bookingForm').reset(); // 重置表單
    })
    .catch(error => {
        console.error('Error:', error);
        alert('訂位失敗，請重試。');
    });
});
