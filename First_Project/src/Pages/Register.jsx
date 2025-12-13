import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.phone,
      formData.address
    );

    setLoading(false);

    if (result.success) {
      navigate('/menu');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1E13] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-[#1E3B2F] rounded-lg shadow-xl p-8 border border-[#D4AF37]">
        <h2 className="text-3xl font-bold text-center text-[#D4AF37] mb-8">
          Register
        </h2>

        {error && (
          <div className="bg-red-900/30 border border-red-600 text-red-300 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#0F1E13] border border-[#D4AF37] rounded-lg text-[#F5F5F5] focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent placeholder:text-gray-400"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#0F1E13] border border-[#D4AF37] rounded-lg text-[#F5F5F5] focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent placeholder:text-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#0F1E13] border border-[#D4AF37] rounded-lg text-[#F5F5F5] focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent placeholder:text-gray-400"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#0F1E13] border border-[#D4AF37] rounded-lg text-[#F5F5F5] focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent placeholder:text-gray-400"
              placeholder="Confirm your password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0F1E13] border border-[#D4AF37] rounded-lg text-[#F5F5F5] focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent placeholder:text-gray-400"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-2 bg-[#0F1E13] border border-[#D4AF37] rounded-lg text-[#F5F5F5] focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent placeholder:text-gray-400"
              placeholder="Enter your address"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] text-[#0F1E13] py-3 rounded-lg font-semibold hover:bg-[#C5A028] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-[#F5F5F5]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#D4AF37] hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
