import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();


  // Calculate total amount for all products in the cart

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.quantity * parseFloat(item.cost), 0).toFixed(2);
  };



  const handleContinueShopping = (e) => {
    if (e) {
      e.preventDefault(); // Prevent default behavior only if event exists
    }
    if (onContinueShopping) onContinueShopping(e); // Continue shopping
  };
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };
  
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      handleRemove(item);
    }
  };
  
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };
  

  const calculateTotalPlants = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  


  const calculateTotalCost = (item) => {
    return (item.quantity * parseFloat(item.cost)).toFixed(2);
  };

  
  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <h3 style={{ color: 'black' }}>Total Plants: {calculateTotalPlants()}</h3>

      <div>
          {cart.length > 0 ? (
  cart.map(item => (
    <div className="cart-item" key={item.name}>
      <img className="cart-item-image" src={item.image} alt={item.name} />
      <div className="cart-item-details">
        <div className="cart-item-name">{item.name}</div>
        <div className="cart-item-cost">Unit Cost: ${item.cost}</div>
        <div className="cart-item-quantity">
          <button
            className="cart-item-button cart-item-button-dec"
            onClick={() => handleDecrement(item)}
          >
            -
          </button>
          <span className="cart-item-quantity-value">{item.quantity}</span>
          <button
            className="cart-item-button cart-item-button-inc"
            onClick={() => handleIncrement(item)}
          >
            +
          </button>
        </div>
        <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
        <button
          className="cart-item-delete"
          onClick={() => handleRemove(item)}
        >
          Remove
        </button>
      </div>
    </div>
  ))
) : (
  <p>Your cart is empty. Please add some items!</p>
)}

    </div>
    <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)} // Pass the event object here
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
