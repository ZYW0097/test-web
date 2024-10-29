document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/bookings')
      .then(response => response.json())
      .then(data => {
          const bookingsList = document.getElementById('bookings-list');
          bookingsList.innerHTML = ''; // 清空目前的內容
          if (data.length > 0) {
              data.forEach(booking => {
                  const li = document.createElement('li');
                  li.textContent = `姓名: ${booking.name}, 電話: ${booking.phone}, 時間: ${booking.time}`;
                  bookingsList.appendChild(li);
              });
          } else {
              bookingsList.innerHTML = '<li>目前沒有任何訂位。</li>';
          }
      })
      .catch(error => console.error('Error fetching bookings:', error));
});
