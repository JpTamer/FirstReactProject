import { useState } from "react";
import CartItem from "../Components/CartItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


 //Cart component displays the user's shopping cart.
 
function Cart({ cart, onAdd, onRemove, onDecrement, onCheckout }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    delivery_address: user?.address || '',
    phone: user?.phone || '',
    notes: ''
  });

  // Calculate the total price of all items in the cart by summing up (price * quantity) for each item
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckoutClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowCheckoutForm(true);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const result = await onCheckout(deliveryInfo);
    if (result.success) {
      navigate('/order-progress', { state: { orderId: result.orderId } });
    }
  };

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
          
          {!showCheckoutForm ? (
            <button
              className="mt-8 block w-full bg-[#D4AF37] hover:bg-yellow-500 text-[#0F1E13] py-3 font-bold text-lg rounded-xl transition"
              onClick={handleCheckoutClick}
            >
              Proceed to Checkout
            </button>
          ) : (
            <form onSubmit={handleSubmitOrder} className="mt-8 bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#D4AF37] mb-4">Delivery Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                  <textarea
                    required
                    value={deliveryInfo.delivery_address}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, delivery_address: e.target.value})}
                    className="w-full px-4 py-2 bg-white/20 border border-[#D4AF37] rounded-lg text-white"
                    rows="3"
                    placeholder="Enter your delivery address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={deliveryInfo.phone}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                    className="w-full px-4 py-2 bg-white/20 border border-[#D4AF37] rounded-lg text-white"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Special Instructions</label>
                  <textarea
                    value={deliveryInfo.notes}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, notes: e.target.value})}
                    className="w-full px-4 py-2 bg-white/20 border border-[#D4AF37] rounded-lg text-white"
                    rows="2"
                    placeholder="Any special requests?"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCheckoutForm(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#D4AF37] hover:bg-yellow-500 text-[#0F1E13] py-3 font-bold rounded-xl transition"
                >
                  Place Order
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </section>
  );
}

export default Cart;
