import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
// API base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
// Component for displaying a star, filled or not based on rating
const Star = ({ filled }) => (
  <span className={filled ? "text-[#D4AF37]" : "text-[#3A5246]"}>★</span>
);

export default function Reviews() {
  const { user } = useAuth();
  
  // State to hold all reviews from database
  const [reviews, setReviews] = useState([]);
  // State for form inputs
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  // State for feedback messages after form submission
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all reviews when component mounts
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/reviews`);
      setReviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  // Handles form submission to add a new review
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user) {
      setMessage("⚠️ Please login to leave a review!");
      return;
    }

    // Check if required fields are filled
    if (!comment || rating === 0) {
      setMessage("⚠️ Please provide a rating and comment!");
      return;
    }

    try {
      // Submit review to backend
      await axios.post(`${API_URL}/reviews`, {
        user_id: user.id,
        menu_item_id: null,
        rating,
        comment
      });

      // Reset form fields
      setRating(0);
      setComment("");
      
      // Show success message
      setMessage("✅ Thanks for your review!");
      setTimeout(() => setMessage(""), 2000);

      // Refresh reviews list
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("⚠️ " + (error.response?.data?.error || "Error submitting review"));
    }
  };

  return (
    // Main section containing the reviews and review form
    <section className="bg-[#1E3B2F] py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section title */}
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-6">
          What Our Customers Say
        </h2>

        {/* Review submission form */}
        {user ? (
        <form
          onSubmit={handleSubmit}
          className="bg-[#0F1E13] p-6 rounded-lg mb-8 border border-[#244233] text-left"
        >
          {/* Form heading */}
          <h3 className="text-xl font-semibold text-[#D4AF37] mb-4">
            Leave a Review
          </h3>

          {/* Star rating selection */}
          <div className="flex gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRating(num)}
                className="text-xl"
              >
                <Star filled={rating >= num} />
              </button>
            ))}
          </div>

          {/* Textarea for user's comment */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your comment"
            className="w-full mb-3 rounded-md bg-[#1A2B21] border border-[#244233] text-[#F5F5F5] px-3 py-2"
            rows="3"
          />

          {/* Show message */}
          {message && <p className="text-sm text-green-400 mb-3">{message}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="bg-[#D4AF37] text-[#0F1E13] font-bold px-5 py-2 rounded-lg hover:bg-[#C5A028]"
          >
            Submit Review
          </button>
        </form>
        ) : (
          <div className="bg-[#0F1E13] p-6 rounded-lg mb-8 border border-[#244233] text-center">
            <p className="text-[#D4AF37]">Please login to leave a review</p>
          </div>
        )}

        {/* Display all reviews in a grid */}
        {loading ? (
          <p className="text-[#F5F5F5]">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-[#F5F5F5]">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-[#0F1E13] p-6 rounded-lg shadow-md text-left"
              >
                {/* Display star rating */}
                <div className="flex mb-3">
                  {[...Array(r.rating)].map((_, j) => (
                    <span key={j} className="text-[#D4AF37] text-lg">
                      ★
                    </span>
                  ))}
                </div>
                {/* Review comment */}
                <p className="text-[#F5F5F5] italic mb-3">"{r.comment}"</p>
                {/* Reviewer's name */}
                <h3 className="text-[#D4AF37] font-semibold">— {r.user_name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 
