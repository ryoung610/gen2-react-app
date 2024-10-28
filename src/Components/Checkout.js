import React, { useEffect } from 'react';

const Checkout = ({ total }) => {
  useEffect(() => {
    const loadPaypalScript = () => {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=@BobyDigi`;
      script.async = true;
      script.onload = () => {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: total.toFixed(2) // Set this dynamically
                }
              }]
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
              alert("Transaction completed by " + details.payer.name.given_name);
              // Optionally clear cart and redirect here
            });
          }
        }).render('#paypal-button-container');
      };
      document.body.appendChild(script);
    };

    loadPaypalScript();
  }, [total]);

  return (
  <div>
    <h2>Checkout</h2>
    <div id="paypal-button-container"></div>
  </div>
  );
};

export default Checkout;
