import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/menu');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1E13] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1E3B2F] rounded-lg shadow-xl p-8 border border-[#D4AF37]">
        <h2 className="text-3xl font-bold text-center text-[#D4AF37] mb-8">
          Login
        </h2>

        {error && (
          <div className="bg-red-900/30 border border-red-600 text-red-300 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#0F1E13] border border-[#D4AF37] rounded-lg text-[#F5F5F5] focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent placeholder:text-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#0F1E13] border border-[#D4AF37] rounded-lg text-[#F5F5F5] focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent placeholder:text-gray-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] text-[#0F1E13] py-3 rounded-lg font-semibold hover:bg-[#C5A028] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-[#F5F5F5]">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#D4AF37] hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
