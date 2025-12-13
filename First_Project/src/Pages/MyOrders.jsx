import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
// API base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders?user_id=${user.id}`);
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-600",
      confirmed: "bg-blue-600",
      preparing: "bg-purple-600",
      ready: "bg-orange-600",
      out_for_delivery: "bg-indigo-600",
      delivered: "bg-green-600"
    };
    return colors[status] || "bg-gray-600";
  };

  const formatStatus = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1E13] flex items-center justify-center">
        <p className="text-[#F5F5F5] text-xl">Loading your orders...</p>
      </div>
    );
  }

  return (
    <section className="bg-[#0F1E13] min-h-screen px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-8 text-center">My Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center">
            <p className="text-[#F5F5F5] text-xl mb-6">You haven't placed any orders yet.</p>
            <Link
              to="/menu"
              className="bg-[#D4AF37] text-[#0F1E13] px-6 py-3 rounded-lg font-bold hover:bg-[#C5A028]"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white/10 border border-[#D4AF37] rounded-lg p-6 hover:bg-white/20 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#D4AF37]">
                      Order #{order.id}
                    </h3>
                    <p className="text-[#F5F5F5] text-sm">
                      {new Date(order.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                      })} at{" "}
                      {new Date(order.created_at).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <span
                    className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                  >
                    {formatStatus(order.status)}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-[#F5F5F5]">
                    <span className="font-semibold">Total:</span> ${parseFloat(order.total_amount).toFixed(2)}
                  </p>
                  <p className="text-[#F5F5F5]">
                    <span className="font-semibold">Delivery to:</span> {order.delivery_address}
                  </p>
                </div>

                <Link
                  to="/order-progress"
                  state={{ orderId: order.id }}
                  className="bg-[#D4AF37] text-[#0F1E13] px-4 py-2 rounded-lg font-bold hover:bg-[#C5A028] inline-block"
                >
                  View Progress
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
