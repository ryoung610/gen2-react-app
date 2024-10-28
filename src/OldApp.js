import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sunglasses from './Components/Sunglasses';
import Cart from './Components/Cart'; // Import Cart component
import { CartProvider } from './Components/CartContext'; // Import CartProvider
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <CartProvider> {/* Wrap the app in CartProvider */}
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to the Sunglasses Store!</p>
          <div className="App-content">
            <Router>
              <nav>
                <Link to="/">Store</Link>
                <Link to="/cart">Cart</Link>
              </nav>
              <Routes> {/* Replace Switch with Routes */}
                <Route path="/" element={<Sunglasses />} /> {/* Use element instead of component */}
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </Router>
          </div>
        </header>
      </div>
    </CartProvider>
  );
}

export default App;
