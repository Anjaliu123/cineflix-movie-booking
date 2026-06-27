// Get movie name from URL
const urlParams = new URLSearchParams(window.location.search);
const movieName = urlParams.get('movie');
if(movieName) {
  document.getElementById('movie-name').innerText = movieName;
}

const seats = document.querySelectorAll('.seat:not(.booked)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const payBtn = document.getElementById('pay-btn');
const ticketPrice = 200; 

let selectedSeats = [];

function updateSelectedCount() {
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  payBtn.innerText = `Proceed to Pay ₹${selectedSeatsCount * ticketPrice}`;
  payBtn.disabled = selectedSeatsCount === 0;
}

// Seat click event
seats.forEach(seat => {
  seat.addEventListener('click', () => {
    seat.classList.toggle('selected');
    
    const seatNumber = seat.dataset.seat;
    
    if(seat.classList.contains('selected')) {
      selectedSeats.push(seatNumber);
    } else {
      selectedSeats = selectedSeats.filter(s => s !== seatNumber);
    }
    
    updateSelectedCount();
  });
});

// Razorpay Payment Integration
// payBtn.addEventListener('click', () => {
//   const options = {
//     key: "rzp_test_1DP5mmOlF5G5ag", // Ithu test key aanu. Free aanu, card details venamenkil '4111 1111 1111 1111' use cheyyam
//     amount: selectedSeats.length * ticketPrice * 100, // Amount paisa il aanu. 600*100 = 60000 paisa
//     currency: "INR",
//     name: "Cineflix",
//     description: `Booking for ${movieName}`,
//     image: "https://cdn-icons-png.flaticon.com/512/2503/2503508.png", // Logo

  

//     handler: function (response){
//       alert(`Payment Successful! ✅\nPayment ID: ${response.razorpay_payment_id}\nSeats: ${selectedSeats.join(', ')}\nMovie: ${movieName}\nEnjoy the movie Molu! 🍿`);
//       // Payment kazhinjal seats clear aakkaan
//       seats.forEach(seat => seat.classList.remove('selected'));
//       selectedSeats = [];
//       updateSelectedCount();
//     },
//     prefill: {
//       name: "Movie Lover",
//       email: "user@cineflix.com",
//       contact: "9999999999"
//     },
//     theme: {
//       color: "#ff4444"
//     }
//   };
  
//   const rzp = new Razorpay(options);
//   rzp.open();
// });
// Simple Payment Demo - Guaranteed Working
payBtn.addEventListener('click', () => {
  if (selectedSeats.length === 0) {
    alert('Please select at least one seat!');
    return;
  }
  
  const seatList = selectedSeats.join(', ');
  const totalAmount = selectedSeats.length * ticketPrice;
  
  const confirmPay = confirm(`🎟️ Confirm Booking?\n\nMovie: ${movieName}\nSeats: ${seatList}\nTotal: ₹${totalAmount}\n\nClick OK to Pay`);
  
  if (confirmPay) {
    alert(`✅ Payment Successful!\n\nPayment ID: TXN${Date.now()}\nMovie: ${movieName}\nSeats: ${seatList}\nAmount Paid: ₹${totalAmount}\n\nThank you for booking with Cineflix! 🍿`);
    
    // Reset after payment
    seats.forEach(seat => seat.classList.remove('selected'));
    selectedSeats = [];
    updateSelectedCount();
  }
});