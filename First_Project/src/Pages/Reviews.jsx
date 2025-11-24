import React, { useState } from "react";

// Predefined list of reviews to display initially
const predefinedReviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    comment:
      "Absolutely loved the experience at Amalfi Kferhata! The food was authentic and full of flavor — especially the Margherita pizza. The atmosphere was cozy and the staff were incredibly friendly.",
  },
  {
    id: 2,
    name: "Michael T.",
    rating: 4,
    comment:
      "Great restaurant in Kferhata! The pasta was delicious, and the service was quick and professional. Definitely coming back for more.",
  },
  {
    id: 3,
    name: "Rita K.",
    rating: 5,
    comment:
      "My favorite spot in North Lebanon! The food, ambiance, and service are all top-notch. Amalfi truly feels like a piece of Italy right here in Kferhata.",
  },
  {
    id: 4,
    name: "Anthony R.",
    rating: 5,
    comment:
      "The seafood pasta was incredible — fresh, rich, and perfectly cooked. Amalfi never disappoints with its quality and attention to detail!",
  },
  {
    id: 5,
    name: "Lina H.",
    rating: 4,
    comment:
      "Beautiful restaurant with a cozy atmosphere. The desserts were amazing — especially the tiramisu! Would definitely recommend to friends.",
  },
  {
    id: 6,
    name: "Karim D.",
    rating: 5,
    comment:
      "Amalfi is hands down the best Italian restaurant in the area. The service is excellent, and every dish feels crafted with love.",
  },
];

// Component for displaying a star, filled or not based on rating
const Star = ({ filled }) => (
  <span className={filled ? "text-[#D4AF37]" : "text-[#3A5246]"}>★</span>
);

export default function Reviews() {
  // State to hold user-submitted reviews
  const [reviews, setReviews] = useState([]);
  // State for form inputs
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  // State for feedback messages after form submission
  const [message, setMessage] = useState("");

  // Handles form submission to add a new review
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !comment || rating === 0) {
      setMessage("⚠️ Please fill all fields!");
      return;
    }

    // Create new review object and add it to the reviews list
    const newReview = { name, rating, comment };
    setReviews([newReview, ...reviews]);
    // Reset form fields
    setName("");
    setRating(0);
    setComment("");
    // Show success message briefly
    setMessage("✅ Thanks for your review!");
    setTimeout(() => setMessage(""), 2000);
  };

  // Combine user reviews with predefined reviews for display
  const allReviews = [...reviews, ...predefinedReviews];

  return (
    // Main section containing the reviews and review form
    <section className="bg-[#1E3B2F] py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section title */}
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-6">
          What Our Customers Say
        </h2>

        {/* Review submission form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0F1E13] p-6 rounded-lg mb-8 border border-[#244233] text-left"
        >
          {/* Form heading */}
          <h3 className="text-xl font-semibold text-[#D4AF37] mb-4">
            Leave a Review
          </h3>

          {/* Input for user's name */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full mb-3 rounded-md bg-[#1A2B21] border border-[#244233] text-[#F5F5F5] px-3 py-2"
          />

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
          />

          {/* “Show this green paragraph only when there’s a message to display.” */}
          {message && <p className="text-sm text-green-400 mb-3">{message}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="bg-[#D4AF37] text-[#0F1E13] font-bold px-5 py-2 rounded-lg"
          >
            Submit Review
          </button>
        </form>

        {/* Display all reviews in a grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {allReviews.map((r, i) => (
            <div
              key={i}
              className="bg-[#0F1E13] p-6 rounded-lg shadow-md text-left"
            >
              {/* Display star rating */}
              <div className="flex mb-3">
                {[...Array(r.rating)].map(( j) => (
                  <span key={j} className="text-[#D4AF37] text-lg">
                    ★
                  </span>
                ))}
              </div>
              {/* Review comment */}
              <p className="text-[#F5F5F5] italic mb-3">"{r.comment}"</p>
              {/* Reviewer's name */}
              <h3 className="text-[#D4AF37] font-semibold">— {r.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
