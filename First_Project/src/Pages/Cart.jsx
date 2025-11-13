import React from "react";
import CartItem from "../Components/CartItem";
import { useNavigate } from "react-router-dom";


 //Cart component displays the user's shopping cart.
 
function Cart({ cart, onAdd, onRemove, onDecrement, onCheckout }) {
  // Calculate the total price of all items in the cart by summing up (price * quantity) for each item
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  return (
    <section className="bg-[#0F1E13] min-h-screen px-4 py-10 text-[#F5F5F5]">
      <h2 className="text-3xl font-bold text-[#D4AF37] mb-4 text-center">Your Cart</h2>
      
      {/*show message if cart is empty, else display cart items */}
      {cart.length === 0 ? (
        <div className="text-center text-[#CFCFCF] text-xl py-12">
          Your cart is empty. Go add something delicious!
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onAdd={onAdd}
              onDecrement={onDecrement}
              onRemove={onRemove}
            />
          ))}
          
          {/* Display the total price section with styling */}
          <div className="flex justify-between items-center border-t border-[#D4AF37] pt-5 mt-5">
            <span className="text-lg font-semibold text-[#D4AF37]">Total:</span>
            <span className="text-2xl font-bold">${total.toFixed(2)}</span>
          </div>
          
          {/* Checkout button triggers the onCheckout handler when clicked */}
          <button
            className="mt-8 block w-full bg-[#D4AF37] hover:bg-yellow-500 text-[#0F1E13] py-3 font-bold text-lg rounded-xl transition"
            onClick={() => {
              const snapshot = { items: cart, total };
              onCheckout();
              navigate('/order-progress', { state: snapshot });
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </section>
  );
}

export default Cart;
