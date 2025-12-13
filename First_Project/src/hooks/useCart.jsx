import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// API base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function useCart() {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState("");
  const { user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to show a notification message for a specified duration (default 1500ms)
  const showNotification = (message, duration = 1500) => {
    setNotification(message);
    setTimeout(() => setNotification(""), duration);
  };

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item.id);
      
      if (existingItem) {
        // Item exists, increment quantity
        return prevCart.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // New item, add to cart
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    
    showNotification("Added to cart!");
  };

  // Function to increment the quantity of a cart item by its id
  const incrementCartItem = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrement the quantity of a cart item by its id
  const decrementCartItem = (id) => {
    setCart(prevCart => {
      const item = prevCart.find(i => i.id === id);
      if (item && item.quantity > 1) {
        return prevCart.map(i =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        // Remove if quantity would be 0
        return prevCart.filter(i => i.id !== id);
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    showNotification("Removed from cart!", 1200);
  };

  const handleCheckout = async (deliveryInfo) => {
    if (!user) {
      showNotification("Please login to checkout!", 2000);
      return { success: false };
    }

    if (cart.length === 0) {
      showNotification("Cart is empty!", 2000);
      return { success: false };
    }

    try {
      // First, sync cart to backend
      await axios.delete(`${API_URL}/cart/clear/all`, { data: { user_id: user.id } });
      
      for (const item of cart) {
        await axios.post(`${API_URL}/cart`, {
          menu_item_id: item.id,
          quantity: item.quantity,
          user_id: user.id
        });
      }

      // Then create order
      const response = await axios.post(`${API_URL}/orders`, {
        ...deliveryInfo,
        user_id: user.id
      });
      
      // Clear local cart
      setCart([]);
      localStorage.removeItem('cart');
      
      showNotification("Order placed successfully!", 2500);
      return { success: true, orderId: response.data.id };
    } catch (error) {
      console.error('Error during checkout:', error);
      showNotification("Checkout failed!", 2000);
      return { success: false };
    }
  };

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