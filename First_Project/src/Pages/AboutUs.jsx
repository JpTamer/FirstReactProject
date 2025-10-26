import React from "react";
//This component provides information about the Amalfi restaurant.
const AboutUs = () => {
  return (
    <section className="bg-[#1E3B2F] py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#D4AF37] mb-6">
          About Amalfi
        </h2>
        <p className="text-lg text-[#F5F5F5] mb-8">
          Welcome to{" "}
          <span className="text-[#D4AF37]">Amalfi</span> —
          a cozy Italian-inspired restaurant nestled in the heart of North
          Lebanon. We bring the authentic taste of Italy right to your table,
          offering freshly made pizzas, creamy pastas, and a variety of
          Mediterranean dishes prepared with love.
        </p>

        <p className="text-[#F5F5F5] mb-8">
          At Amalfi, we believe that food is not just about flavor — it's about
          experience. From our warm and inviting atmosphere to our dedicated
          staff, we aim to make every visit memorable. Whether you're dining
          with family, friends, or celebrating a special moment, our mission is
          to deliver comfort and joy in every bite.
        </p>

        <p className="text-[#F5F5F5] mb-8">
          Located in the peaceful village of Kferhata, Amalfi is more than just
          a restaurant — it's a destination for food lovers. Come and enjoy our
          signature dishes and feel the spirit of Italy in every flavor.
        </p>

        <h3 className="text-2xl text-[#D4AF37] mt-10 mb-4">
          Our Values
        </h3>
        <ul className="text-[#F5F5F5] space-y-3">
          <li>
            🍕 Authentic Italian recipes made from the freshest ingredients.
          </li>
          <li>🤝 Friendly service and a welcoming atmosphere.</li>
          <li>🌿 Commitment to quality, freshness, and sustainability.</li>
        </ul>
      </div>
    </section>
  );
};

export default AboutUs;
