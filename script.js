document.getElementById('payNowButton').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const vehicleNo = document.getElementById('vehicleNo').value;
    const phoneNo = document.getElementById('phoneNo').value;
  
    // Email and phone validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email.");
      return;
    }
  
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneNo)) {
      alert("Please enter a valid phone number.");
      return;
    }
  
    // Payment handling logic
    if (!window.Razorpay) {
      console.error('Razorpay SDK not loaded');
      return;
    }
  
    const amount = 5000; // Example amount in paise (50 INR)
    const options = {
      key: 'rzp_test_ICNyKo0ISCn8vQ', // Use the correct key here
      amount: amount,
      currency: 'INR',
      name: 'ParkPuram',
      description: 'Test Transaction',
      handler: function (response) {
        console.log('Payment successful:', response);
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful',
          text: 'Your payment was successful!',
          confirmButtonText: 'OK',
        });
      },
      prefill: {
        name: 'John Doe',
        email: email,
        contact: phoneNo,
      },
      theme: {
        color: '#F37254',
      },
    };
  
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  });