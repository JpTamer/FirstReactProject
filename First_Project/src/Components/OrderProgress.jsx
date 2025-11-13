import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function OrderProgress() {
  // Define the different steps of the order process
  const steps = ["Placed", "Preparing", "On the way", "Delivered"];

  // Get the current location object to access passed state data
  const location = useLocation();

  // Extract items and total price passed from the previous page, or use defaults
  const items = location.state?.items || [];
  const totalFromCart = location.state?.total || 0;

  // Keep track of the current step in the order process
  const [step, setStep] = useState(0);

  // Automatically move to the next step every 5 seconds until the last step
  useEffect(() => {
    // If we're already at the last step, do nothing
    if (step >= steps.length - 1) return;

    // Set a timer to move to the next step after 5 seconds
    const timer = setTimeout(() => setStep(step + 1), 5000);

    // Clear the timer if the step changes
    return () => clearTimeout(timer);
  }, [step, steps.length]);

  // Calculate the subtotal by adding up the price * quantity for each item
  const subtotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  // Use the total passed from the cart if available, otherwise use the subtotal
  const total = totalFromCart > 0 ? totalFromCart : subtotal;

  return (
    // Main container for the order progress screen with background and padding
    <section className="min-h-screen bg-[#0F1E13] text-[#F5F5F5] flex items-center justify-center px-8 py-20">
      <div className="w-full max-w-4xl bg-[#15271E] p-10 rounded-2xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-[#D4AF37]">Order in Progress</h2>
        <p className="text-sm text-[#CFCFCF] mt-2">
          Thank you! Your order is being prepared.
        </p>

        {/* Progress Steps - shows the order steps with highlighting for completed/current steps */}
        <div className="mt-8 flex justify-between">
          {steps.map((label, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Circle with step number, highlighted if completed or current */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                  i <= step ? "bg-[#D4AF37] text-[#0F1E13]" : "bg-[#244233]"
                }`}
              >
                {i + 1}
              </div>
              {/* Label under the circle, colored differently if completed/current */}
              <span
                className={`mt-1 text-xs ${
                  i <= step ? "text-[#F5F5F5]" : "text-[#9FB3A9]"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-[#1A2B21] p-6 rounded-lg border border-[#244233] text-left">
          <h3 className="text-lg font-semibold text-[#D4AF37] mb-3">
            Your Bill
          </h3>
          {/* If there are no items, show a message */}
          {items.length === 0 ? (
            <p className="text-sm text-[#CFCFCF]">No items in your order.</p>
          ) : (
            <>
              {/* List each item with name, quantity, and price */}
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm mb-2"
                >
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {/* Divider line */}
              <hr className="my-2 border-[#244233]" />
              {/* Show subtotal */}
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {/* Show total price in bold and highlighted color */}
              <div className="flex justify-between font-bold text-[#D4AF37] mt-1">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        {/* Message shown only when the order is delivered */}
        {step === steps.length - 1 && (
          <div className="mt-5 bg-[#12341F] border border-[#2E5C3D] rounded-lg p-3 text-[#CFF3D1]">
            Order delivered! 
          </div>
        )}

        {/* Buttons to navigate back home or to rate us after delivery */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          {/* Button to go back to the home page */}
          <Link
            to="/"
            className="bg-[#D4AF37] text-[#0F1E13] font-bold px-5 py-2 rounded-lg hover:bg-yellow-500"
          >
            Back to Home
          </Link>
          {/* Show "Rate Us" button only after the order is delivered */}
          {step === steps.length - 1 && (
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
