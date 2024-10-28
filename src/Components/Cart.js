import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import PayPalButton from './PayPalButton'; // Integrate PayPal button
import { Link } from 'react-router-dom';
import '../App.css';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const navigate = useNavigate(); 

  const handleBitcoinCheckout = () => {
    navigate('/bitcoin-payment');
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <h2>{item.name}</h2>
              <p>${item.price}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <Link to="/checkout" className="checkout-link">Checkout with paypal</Link>
          <PayPalButton price={total} /> {/* Use the PayPalButton component */}
       
          <button onClick={handleBitcoinCheckout} className="checkout-link bitcoin-button">
            Pay with Bitcoin
          </button>
       
        </div>
      )}
    </div>
  );
};

export default Cart;
