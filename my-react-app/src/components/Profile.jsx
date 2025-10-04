import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../api';

export default function Profile() {
  const { user, token, logout } = useAuth();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user || {});
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async e => {
    e.preventDefault();
    const res = await updateProfile(token, form);
    setMsg('Profile updated');
    setEdit(false);
    // Optionally, refresh user profile in context
  };

  if (!token) return (
    <div className="max-w-sm mx-auto mt-8 p-4 border rounded shadow">
      <div className="text-red-500">Please login</div>
      <button className="mt-4 bg-blue-500 text-white p-2 rounded" onClick={() => navigate('/login')}>Go to Login</button>
    </div>
  );

  return (
    <div className="max-w-sm mx-auto mt-8 p-4 border rounded shadow">
      {!edit ? (
        <div>
          <h2 className="text-xl font-bold mb-2">Profile</h2>
          <div>Username: {user?.username}</div>
          {/* Add more profile fields as needed */}
          <button className="mt-4 bg-blue-500 text-white p-2 rounded" onClick={() => setEdit(true)}>Edit</button>
          <button className="mt-2 bg-gray-500 text-white p-2 rounded" onClick={logout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input name="username" value={form.username || ''} onChange={handleChange} className="border p-2 rounded" />
          {/* Add more editable fields as needed */}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
        </form>
      )}
      <div className="text-green-500 mt-2">{msg}</div>
    </div>
  );
}
