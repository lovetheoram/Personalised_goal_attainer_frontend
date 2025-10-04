import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup({ onClose }) {
  const [form, setForm] = useState({ username: '', password: '', email: '', exam_year: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
  e.preventDefault();
  const res = await signup(form);
  if (res.success) {
    setMsg('Signup successful! Please login to continue.');
    setTimeout(() => {
      onClose(); // triggers closing signup and opening login
    }, 1000);
  } else {
    setMsg(res.message);
  }
};


  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto text-gray-800">
      <button
        onClick={onClose}
        className="float-right text-gray-500 hover:text-gray-700 font-bold"
      >
        ✕
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="exam_year"
          type="number"
          placeholder="Exam_target"
          value={form.exam_year}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Sign Up
        </button>
      </form>

      {msg && <div className="text-red-500 mt-2 text-center">{msg}</div>}
    </div>
  );
}
