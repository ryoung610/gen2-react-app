import React, { useContext } from 'react'; // Import useContext
import './Sunglasses.css'; // Import your styling
import blackSunglasses from '../images/black-sunglasses.jpeg';
import orangeSunglasses from '../images/orange-sunglasses.jpeg';
import { CartContext } from './CartContext'; // Import CartContext

const sunglassesData = [
  { id: 1, name: 'Black Sunglasses', price: 49.99, image: blackSunglasses },
  { id: 2, name: 'Orange Sunglasses', price: 29.99, image: orangeSunglasses },
];

const Sunglasses = () => {
  const { addToCart } = useContext(CartContext); // Use CartContext

  return (
    <div className="storefront">
      <h1 className="headline">Cool Summer Vibes with Tech Style</h1>
      <div className="sunglasses-container">
        {sunglassesData.map((sunglasses) => (
          <div key={sunglasses.id} className="sunglasses-item">
            <img src={sunglasses.image} alt={sunglasses.name} className="sunglasses-image" />
            <h2>{sunglasses.name}</h2>
            <p>${sunglasses.price}</p>
            <button className="buy-now-btn" onClick={() => addToCart(sunglasses)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sunglasses;
