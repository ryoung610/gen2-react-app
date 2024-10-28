import React, { useState, useEffect, useRef } from 'react';
import './Game.css';

const Game = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [activeSunglass, setActiveSunglass] = useState(null);
  
  // Ref to the game container
  const gameAreaRef = useRef(null);

  // Function to randomly show a Sunglasses icon with random position inside the game container
  const showRandomSunglass = () => {
    const gameArea = gameAreaRef.current;
    const randomId = Math.floor(Math.random() * 5); // 5 sunglasses

    // Get container dimensions
    const containerWidth = gameArea.offsetWidth;
    const containerHeight = gameArea.offsetHeight;

    // Calculate random positions within the container boundaries
    const randomTop = Math.random() * (containerHeight - 50); // Subtracting icon height to avoid overflow
    const randomLeft = Math.random() * (containerWidth - 50); // Subtracting icon width to avoid overflow

    setActiveSunglass({
      id: randomId,
      top: randomTop,
      left: randomLeft
    });

    // Hide the sunglasses after a set time
    setTimeout(() => {
      setActiveSunglass(null);
      if (gameActive) {
        setTimeout(showRandomSunglass, 1000); // Continue showing if the game is still active
      }
    }, 2000); // Adjusted to make it slower
  };

  // Function to handle clicking on a sunglass
  const handleSunglassClick = () => {
    if (gameActive) {
      setScore((prevScore) => prevScore + 1); // Increment score
      setActiveSunglass(null); // Immediately hide the clicked sunglass
      setTimeout(showRandomSunglass, 1000); // Show the next one after 1 second
    }
  };

  // Timer function
  useEffect(() => {
    if (gameActive) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setGameActive(false); // End game
            clearInterval(timer);
            alert('Game Over! Final Score: ' + score);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer); // Cleanup interval on game end
    }
  }, [gameActive, score]);

  // Start game function
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    showRandomSunglass(); // Start showing the Sunglasses icons
  };

  return (
    <div className="game-container" ref={gameAreaRef}> {/* Reference the game area */}
      <div className="game-area">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`sunglass-icon ${activeSunglass && activeSunglass.id === index ? 'active' : ''}`}
            onClick={handleSunglassClick}
            style={{
              display: activeSunglass && activeSunglass.id === index ? 'block' : 'none',
              top: `${activeSunglass ? activeSunglass.top : 0}px`,  // Position it within the container
              left: `${activeSunglass ? activeSunglass.left : 0}px`,
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
    </div>
  );
};

export default Game;
