import React, { useState } from 'react';
//import bitcoin from '../images/bitcoinimage.jpeg';



const BitcoinPayment = () => {
  const [message, setMessage] = useState('');
  const bitcoinAddress = 'bc1qp8tt9fd8unwhr2p7354w6ul7d5xa9p8rgjg9nm'; // Replace with your actual Bitcoin address
  const email = 'bobbydigi2016@yahoo.com'; // Replace with your actual email

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your purchase! Message: ${message}`);
    // Optionally send the message and details to your backend
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pay with Bitcoin</h2>
      <p>Please send your Bitcoin payment to the address below:</p>
      <p><strong>Bitcoin Address:</strong> {bitcoinAddress}</p>
      {/* Optional QR Code Image */}
      <img
        src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=bitcoin:${bitcoinAddress}`}
        alt="QR Code"
        style={{ margin: '20px 0' }}
      />
      <p><strong>Email:</strong> {email}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Description of Purchase:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your purchase here..."
            style={{ display: 'block', width: '100%', padding: '10px', marginTop: '10px' }}
          />
        </label>
        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
          Confirm Payment & Description
        </button>
      </form>
    </div>
  );
};

export default BitcoinPayment;
