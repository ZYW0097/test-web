document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/bookings')
      .then(response => response.json())
      .then(data => {
          const bookingsTableBody = document.querySelector('#bookingsTable tbody');
          bookingsTableBody.innerHTML = ''; // 清空表格

          data.forEach(booking => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${booking.name}</td>
                  <td>${booking.phone}</td>
                  <td>${new Date(booking.time).toLocaleString()}</td>
                  <td>${booking.adults}</td>
                  <td>${booking.children}</td>
                  <td>${booking.childChairs}</td>
              `;
              bookingsTableBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error('Error fetching bookings:', error);
      });
});
