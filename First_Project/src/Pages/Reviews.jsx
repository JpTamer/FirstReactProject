import React from "react";

const reviews = [
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

const Reviews = () => {
  return (
    <section className="bg-[#1E3B2F] py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-8">
          What Our Customers Say
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#0F1E13] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-[#D4AF37] text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-[#F5F5F5] italic mb-4">"{review.comment}"</p>
              <h3 className="text-[#D4AF37] font-semibold">— {review.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
