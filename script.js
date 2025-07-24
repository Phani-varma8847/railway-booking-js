const seatMap = document.getElementById('seatMap');
const selectedCount = document.getElementById('selectedCount');
const totalPrice = document.getElementById('totalPrice');
const trainSelect = document.getElementById('train');
const bookNow = document.getElementById('bookNow');
const result = document.getElementById('result');

let pricePerSeat = 1200;
let selectedSeats = [];

function createSeats() {
  seatMap.innerHTML = '';
  selectedSeats = [];

  for (let i = 1; i <= 36; i++) {
    const seat = document.createElement('div');
    seat.classList.add('seat');
    seat.textContent = i;

    seat.addEventListener('click', () => {
      if (seat.classList.contains('booked')) return;

      seat.classList.toggle('selected');

      const seatNumber = i;
      if (seat.classList.contains('selected')) {
        selectedSeats.push(seatNumber);
      } else {
        selectedSeats = selectedSeats.filter(s => s !== seatNumber);
      }

      updateSummary();
    });

    seatMap.appendChild(seat);
  }

  updateSummary();
}

function updateSummary() {
  selectedCount.textContent = selectedSeats.length;
  totalPrice.textContent = selectedSeats.length * pricePerSeat;
}

trainSelect.addEventListener('change', () => {
  const [trainName, price] = trainSelect.value.split('|');
  pricePerSeat = +price;
  createSeats();
});

bookNow.addEventListener('click', () => {
  if (selectedSeats.length === 0) {
    result.textContent = '❌ Please select at least one seat.';
    return;
  }

  const seats = selectedSeats.join(', ');
  result.textContent = `✅ Booking Confirmed! Seats: ${seats}, Total: ₹${selectedSeats.length * pricePerSeat}`;

  const allSeats = document.querySelectorAll('.seat');
  allSeats.forEach(seat => {
    if (seat.classList.contains('selected')) {
      seat.classList.remove('selected');
      seat.classList.add('booked');
    }
  });

  selectedSeats = [];
  updateSummary();
});

// Initial seat load
createSeats();
