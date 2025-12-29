import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function OrderProgress() {
  const { user } = useAuth();
  const steps = ["pending", "confirmed", "preparing", "ready", "out_for_delivery", "delivered"];
  const stepLabels = ["Placed", "Confirmed", "Preparing", "Ready", "On the way", "Delivered"];

  const location = useLocation();
  const orderId = location.state?.orderId;

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
      
      const interval = setInterval(() => {
        if (orderData?.status !== 'delivered') {
          fetchOrderDetails();
        }
      }, 10000);
      
      return () => clearInterval(interval);
    } else {
      setError('No order ID provided');
      setLoading(false);
    }
  }, [orderId, orderData?.status]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/${orderId}?user_id=${user?.id}`);
      setOrderData(response.data);
      setLoading(false);
      
      if (response.data.status === 'delivered') {
        return;
      }
    } catch (err) {
      setError('Failed to load order details');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#0F1E13] text-[#F5F5F5] flex items-center justify-center">
        <div className="text-[#D4AF37] text-xl">Loading order details...</div>
      </section>
    );
  }

  if (error || !orderData) {
    return (
      <section className="min-h-screen bg-[#0F1E13] text-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error || 'Order not found'}</p>
          <Link to="/menu" className="text-[#D4AF37] hover:underline">Back to Menu</Link>
        </div>
      </section>
    );
  }

  const currentStepIndex = steps.indexOf(orderData.status);



  return (
    <section className="min-h-screen bg-[#0F1E13] text-[#F5F5F5] flex items-center justify-center px-8 py-20">
      <div className="w-full max-w-4xl bg-[#15271E] p-10 rounded-2xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-[#D4AF37]">Order in Progress</h2>
        <p className="text-sm text-[#CFCFCF] mt-2">
          Order #{orderData.id} - Placed on {new Date(orderData.created_at).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
          })} at {new Date(orderData.created_at).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit'
          })}
        </p>

        <div className="mt-8 flex justify-between overflow-x-auto gap-4 md:gap-0">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex flex-col items-center min-w-[60px] md:min-w-0">
              <div
                className={`w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-full font-bold ${
                  i <= currentStepIndex ? "bg-[#D4AF37] text-[#0F1E13]" : "bg-[#244233]"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`mt-2 text-xs ${
                  i <= currentStepIndex ? "text-[#F5F5F5]" : "text-[#9FB3A9]"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-[#1A2B21] p-6 rounded-lg border border-[#244233] text-left">
          <h3 className="text-lg font-semibold text-[#D4AF37] mb-3">
            Order #{orderData.id} - Your Bill
          </h3>
          <p className="text-sm text-[#CFCFCF] mb-3">Status: <span className="text-[#D4AF37] font-semibold">{orderData.status}</span></p>
          {orderData.delivery_address && (
            <p className="text-sm text-[#CFCFCF] mb-3">Delivery to: {orderData.delivery_address}</p>
          )}
          {!orderData.items || orderData.items.length === 0 ? (
            <p className="text-sm text-[#CFCFCF]">No items in your order.</p>
          ) : (
            <>
              {orderData.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm mb-2"
                >
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {/* Divider line */}
              <hr className="my-2 border-[#244233]" />

              <div className="flex justify-between font-bold text-[#D4AF37] mt-1">
                <span>Total</span>
                <span>${parseFloat(orderData.total_amount).toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        {/* Message shown only when the order is delivered */}
        {orderData.status === 'delivered' && (
          <div className="mt-5 bg-[#12341F] border border-[#2E5C3D] rounded-lg p-3 text-[#CFF3D1]">
            Order delivered!
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/"
            className="bg-[#D4AF37] text-[#0F1E13] font-bold px-5 py-2 rounded-lg hover:bg-yellow-500"
          >
            Back to Home
          </Link>
          {/* Show "Rate Us" button only after the order is delivered */}
          {orderData.status === 'delivered' && (
            <Link
              to="/reviews"
              className="bg-[#1F7A4C] text-white font-bold px-5 py-2 rounded-lg hover:bg-[#24935C]"
            >
              Rate Us
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
