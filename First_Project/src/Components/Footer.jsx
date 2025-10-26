import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-[#0F1E13] text-[#F5F5F5] text-center py-4 mt-12">
      <div class="w-full max-w-7xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="/src/Images/Logo.png" class="h-8" alt="Amalfi Logo" />
            <span class="self-center text-2xl font-semibold ">
              <h1 className="text-2xl font-serif text-[#D4AF37]">Amalfi</h1>
            </span>
          </div>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="./about" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link to="./reviews" className="hover:underline me-4 md:me-6">
                Reviews
              </Link>
            </li>
            <li>
              <Link to="./contact" className="hover:underline me-4 md:me-6">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025 Amalfi. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
//This footer will be displayed at the bottom of every page.
export default Footer;
