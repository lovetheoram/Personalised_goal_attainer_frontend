import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getProfile } from "../../api";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

const ProfilePage: React.FC = () => {
  const { logout, user, setUser } = useAuth();

  // ✅ explicitly define types to avoid TS2322
  const [profile, setProfile] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res?.profile || {});
        setUser({ ...user, profile: res?.profile });
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 relative overflow-hidden">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-semibold shadow-md mb-4">
            👤
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            {editing ? "Edit Profile" : "Your Profile"}
          </h1>
          <p className="text-gray-500 text-center mt-2">
            {editing
              ? "Make changes to your profile below."
              : "Here’s what we know about you."}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 shadow-inner mb-6">
          <ProfileForm
            editing={editing}
            profile={profile || {}}
            // ✅ add explicit type for parameter 'updated'
            onSaved={(updated: Record<string, any>) => {
              setProfile(updated);
              setEditing(false);
            }}
          />
        </div>

        <div className="flex justify-center gap-4 mt-6">
          {editing ? (
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-200 text-gray-800 font-semibold px-5 py-2 rounded-xl hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={logout}
                className="bg-red-500 text-white font-semibold px-5 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-b-2xl"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
