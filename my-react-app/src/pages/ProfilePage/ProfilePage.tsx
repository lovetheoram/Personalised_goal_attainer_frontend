import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

const ProfilePage = () => {
  const { logout } = useAuth();
  const [editing, setEditing] = useState(false);

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Profile Page</h1>

      <div className="flex flex-col items-center gap-6">
        {editing ? (
          <>
            <ProfileForm onSaved={() => setEditing(false)} />
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <ProfileForm onSaved={() => {}} /> {/* just to display current data in read-only mode */}
            <div className="flex gap-4">
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
