import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
} from "react-icons/fa";

const ContactInfo = () => {
  return (
    <section className="bg-[#1E3B2F] py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#D4AF37] mb-6">Contact Us</h2>
        <p className="text-lg text-[#F5F5F5] mb-12">
          Have a question, want to book a table, or just say hello? We’d love to
          hear from you! Reach out to us using any of the details below.
        </p>

        <div className="grid md:grid-cols-2 gap-10 text-left">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-[#D4AF37] text-2xl" />
              <div>
                <h3 className="text-xl font-semibold text-[#D4AF37]">
                  Address
                </h3>
                <p className="text-[#F5F5F5]">
                  Main Street, Kferhata, North Lebanon
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-[#D4AF37] text-2xl" />
              <div>
                <h3 className="text-xl font-semibold text-[#D4AF37]">Phone</h3>
                <p className="text-[#F5F5F5]">+961 76 435 787</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-[#D4AF37] text-2xl" />
              <div>
                <h3 className="text-xl font-semibold text-[#D4AF37]">Email</h3>
                <p className="text-[#F5F5F5]">info@amalfikferhata.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaClock className="text-[#D4AF37] text-2xl" />
              <div>
                <h3 className="text-xl font-semibold text-[#D4AF37]">
                  Opening Hours
                </h3>
                <p className="text-[#F5F5F5]">Mon – Sun: 12:00 PM – 11:00 PM</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaInstagram className="text-[#D4AF37] text-2xl" />
              <div>
                <h3 className="text-xl font-semibold text-[#D4AF37]">
                  Instagram
                </h3>
                <a
                  href="https://www.instagram.com/amalfi.lb?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  /* When going to a _blank link, use rel="noopener noreferrer" for security reasons to hide where the link is coming from */
                  rel="noopener noreferrer"
                  className="text-[#F5F5F5] hover:underline"
                >
                  @amalfi.lb
                </a>
              </div>
            </div>
          </div>

          {/*I took Google Maps Embed from google maps*/}
          <div className="rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Amalfi Kferhata Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3292.572781059209!2d35.900272099999995!3d34.3867846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1521f784585f013f%3A0x6671a3f9fd3698cb!2sAmalfi%20Zgharta!5e0!3m2!1sen!2slb!4v1761495507826!5m2!1sen!2slb"
              width="100%"
              height="350"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
