import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { updateProfile } from "../../api";

const ProfileForm = ({ profile = {}, editing = false, onSaved }) => {
  const { user, setUser } = useAuth();
  const [dob, setDob] = useState(profile?.dob || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDob(profile?.dob || "");
    setBio(profile?.bio || "");
  }, [profile]);

  const handleSave = async () => {
    if (!dob || !bio) {
      alert("Please fill all fields!");
      return;
    }
    setSaving(true);
    try {
      const res = await updateProfile({ profile: { dob, bio } });
      if (res.success) {
        const updated = { ...profile, dob, bio };
        setUser({ ...user, profile: updated });
        if (onSaved) onSaved(updated);
      } else {
        alert("Failed to save profile info");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block font-semibold text-gray-700">Date of Birth:</label>
        {editing ? (
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="border rounded-lg p-2 mt-1 w-full focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p className="text-gray-700 mt-1 border-b pb-1">{dob || "—"}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold text-gray-700">Bio:</label>
        {editing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="border rounded-lg p-2 mt-1 w-full focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p className="text-gray-700 mt-1 border-b pb-2 whitespace-pre-line">
            {bio || "No bio added yet."}
          </p>
        )}
      </div>

      {editing && (
        <button
          onClick={handleSave}
          disabled={saving}
          className={`${
            saving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-semibold px-4 py-2 rounded-lg transition`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      )}
    </div>
  );
};

export default ProfileForm;
