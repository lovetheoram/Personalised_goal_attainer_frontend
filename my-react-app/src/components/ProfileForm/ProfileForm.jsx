// components/ProfileForm/ProfileForm.jsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { updateProfile } from "../../api";

const ProfileForm = ({ onSaved }) => {
  const { user, setUser } = useAuth();
  const [dob, setDob] = useState(user?.profile?.dob || "");
  const [bio, setBio] = useState(user?.profile?.bio || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!dob || !bio) {
      alert("Please fill all fields!");
      return;
    }
    setSaving(true);
    try {
      const res = await updateProfile({ profile: { dob, bio } });
      if (res.success) {
        setUser({ ...user, profile: { dob, bio } });
        if (onSaved) onSaved();
      } else {
        alert("Failed to save profile info");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
    setSaving(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block font-medium">Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="border rounded p-1 mt-1 w-full"
        />
      </div>
      <div>
        <label className="block font-medium">Bio:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="border rounded p-2 mt-1 w-full"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save & Continue"}
      </button>
    </div>
  );
};

export default ProfileForm;
