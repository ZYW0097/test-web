fetch('/api/bookings')
    .then(response => response.json())
    .then(bookings => {
        const bookingsList = document.getElementById('bookingsList');
        bookingsList.innerHTML = ''; // 清空當前列表
        
        if (bookings.length === 0) {
            bookingsList.innerHTML = '<p>目前沒有任何訂位。</p>';
            return;
        }
        
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>姓名</th><th>電話</th><th>訂位時間</th><th>大人數</th><th>小孩數</th><th>兒童椅數量</th>';
        table.appendChild(headerRow);

        bookings.forEach(booking => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${booking.name}</td>
                             <td>${booking.phone}</td>
                             <td>${booking.time}</td>
                             <td>${booking.adults}</td>
                             <td>${booking.children}</td>
                             <td>${booking.childChairs}</td>`;
            table.appendChild(row);
        });

        bookingsList.appendChild(table);
    })
    .catch(error => {
        console.error('Error fetching bookings:', error);
    });
