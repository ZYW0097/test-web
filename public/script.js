document.getElementById('bookingForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const time = document.getElementById('time').value;
  const adults = document.getElementById('adults').value;
  const children = document.getElementById('children').value;
  const childChairs = document.getElementById('childChairs').value;

  const bookingData = {
      name,
      phone,
      time,
      adults,
      children,
      childChairs
  };

  fetch('/book', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
  })
  .then(response => response.json())
  .then(data => {
      alert(data.message);
      document.getElementById('bookingForm').reset();
  })
  .catch((error) => {
      console.error('Error:', error);
  });
});
