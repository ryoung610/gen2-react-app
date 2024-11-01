import React, { useContext } from 'react';
import './App.css';
import Sunglasses from './Components/Sunglasses';
import Cart from './Components/Cart';
import Game from './Components/Game';
import { CartProvider, CartContext } from './Components/CartContext';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Checkout from './Components/Checkout';
import BitcoinPayment from './Components/BitcoinPayment';


function App() {
  // Access cartTotal after CartProvider wraps the app
  const { cartTotal } = useContext(CartContext);

  return (
    <CartProvider>
      <div className="App">
        <header className="App-header">
          {/* Render the Game component here */}
          <Game />

          <p>Welcome to the Sunglass Hut Store!</p>
          <div className="App-content">
            <Router>
              <nav>
                <Link to="/" className="store-link">Store</Link>
                <Link to="/cart" className="cart-link">Cart</Link>
              </nav>
              <Routes>
                <Route path="/" element={<Sunglasses />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout total={cartTotal} />} />
                <Route path="/bitcoin-payment" element={<BitcoinPayment />} />
              </Routes>
            </Router>
          </div>
        </header>
      </div>
    </CartProvider>
  );
}

export default App;
