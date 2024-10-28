import React, { useState, useEffect } from 'react';
import './App.css';
import Sunglasses from './Components/Sunglasses';
import Cart from './Components/Cart';
import { CartProvider } from './Components/CartContext';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [activeSunglass, setActiveSunglass] = useState(null);

  // Function to randomly show a Sunglasses icon with random position
  const showRandomSunglass = () => {
    const randomId = Math.floor(Math.random() * 5); // 5 sunglasses
    setActiveSunglass(randomId);

    // Hide the sunglasses after 2 seconds
    setTimeout(() => {
      setActiveSunglass(null);
      if (gameActive) {
        setTimeout(showRandomSunglass, 1000); // Continue showing if the game is still active
      }
    }, 4000); // Adjusted to make it slower
  };

  // Function to handle clicking on a sunglass
  const handleSunglassClick = () => {
    if (gameActive) {
      setScore((prevScore) => prevScore + 1); // Functional update
      setActiveSunglass(null); // Hide the clicked sunglass
    }
  };

  // Timer function
  useEffect(() => {
    if (gameActive) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setGameActive(false);
            clearInterval(timer);
            alert('Game Over! Final Score: ' + score);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer); // Cleanup interval on game end
    }
  }, [gameActive, score]); // Added 'score' to dependency array

  // Start game function
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    showRandomSunglass(); // Start showing the Sunglasses icons
  };

  return (
    <CartProvider>
      <div className="App">
        <header className="App-header">
          {/* Game area replacing the logo */}
          <div className="game-area">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`sunglass-icon ${activeSunglass === index ? 'active' : ''}`}
                onClick={handleSunglassClick}
                style={{
                  display: activeSunglass === index ? 'block' : 'none',
                  top: `${Math.random() * 80}%`,
                  left: `${Math.random() * 80}%`,
                  position: 'absolute',
                }}
              >
                😎
              </div>
            ))}
          </div>
          <p id="game-score">Score: {score}</p>
          <p id="game-timer">Time: {timeLeft}s</p>
          <button id="start-game" onClick={startGame}>Start Game</button>
          
          <p>Welcome to the Sunglasses Store!</p>
          <div className="App-content">
            <Router>
              <nav>
                <Link to="/" className="store-link">Store</Link>
                <Link to="/cart" className="cart-link">Cart</Link>
              </nav>
              <Routes>
                <Route path="/" element={<Sunglasses />} />
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
