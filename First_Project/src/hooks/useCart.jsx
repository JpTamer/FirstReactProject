import { useState } from "react";

export default function useCart() {
  // State to hold the array of cart items
  const [cart, setCart] = useState([]);
  // State to hold notification messages to display to the user
  const [notification, setNotification] = useState("");

  // Function to show a notification message for a specified duration (default 1500ms)
  const showNotification = (message, duration = 1500) => {
    setNotification(message);
    // Clear the notification after the duration expires
    setTimeout(() => setNotification(""), duration);
  };

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCart((prev) => {
      // Show notification when an item is added
      showNotification("Added to cart!");
      // Check if the item already exists in the cart
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        // If found, increment the quantity of the existing item
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // If not found, add the item with quantity set to 1
        return [...prev, { ...item, quantity: 1 }];
      } //we never modify the original array, we create a new one!!!!
    });
  };

  // Function to increment the quantity of a cart item by its id
  const incrementCartItem = (id) => {
    setCart((prev) => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  };

  // Function to decrement the quantity of a cart item by its id
   const decrementCartItem = (id) => {
    setCart((prev) => prev.flatMap(i => {
      if (i.id === id) {
        if (i.quantity > 1) return { ...i, quantity: i.quantity - 1 };
        else return []; 
      } else return i;
    }));
  };

  // Function to remove an item from the cart by its id
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    showNotification("Removed from cart!", 1200);
  };

  // Function to handle checkout process
  const handleCheckout = () => {
    setCart([]);
    showNotification("Thank you for your order!", 2500);
  };

  // Return all state and functions to be used by components
  return {
    cart,
    notification,
    addToCart,
    incrementCartItem,
    decrementCartItem,
    removeFromCart,
    handleCheckout,
  };
}