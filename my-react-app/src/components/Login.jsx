import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login({ onClose }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const res = await login(form);
    setLoading(false);

    if (res.success) {
      setMsg('Login successful!');
      setTimeout(() => {
        navigate('/onboarding');
        if (onClose) onClose();
      }, 1000);
    } else {
      setMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-2xl"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="border p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="border p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {msg && <div className="text-red-500 text-center">{msg}</div>}
        </form>

        <div className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => {
              if (onClose) onClose();
            }}
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
