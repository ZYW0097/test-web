async function loadBookings() {
    const response = await fetch('/bookings/today');
    const bookings = await response.json();
  
    const bookingList = document.getElementById('bookingList');
    bookingList.innerHTML = '';
    
    bookings.forEach(booking => {
      const div = document.createElement('div');
      div.textContent = `${booking.name} - ${booking.phone} - ${booking.time}`;
      bookingList.appendChild(div);
    });
  }
  
  window.onload = loadBookings;