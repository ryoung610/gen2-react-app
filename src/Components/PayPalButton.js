import React, { useEffect } from 'react';

const PayPalButton = ({ price }) => {
  useEffect(() => {
    // Load PayPal's script dynamically
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=@BobyDigi&currency=USD";
    script.addEventListener('load', () => {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: price.toFixed(2), // The price passed from the parent component
              },
            }],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert('Transaction completed by ' + details.payer.name.given_name);
            // Optionally, handle post-purchase actions like updating the database or showing a confirmation
          });
        },
        onError: (err) => {
          console.error('PayPal Checkout Error:', err);
          alert('An error occurred during the payment process. Please try again.');
        },
      }).render('#paypal-button-container');
    });
    document.body.appendChild(script);
  }, [price]);

  return (
    <div>
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default PayPalButton;
