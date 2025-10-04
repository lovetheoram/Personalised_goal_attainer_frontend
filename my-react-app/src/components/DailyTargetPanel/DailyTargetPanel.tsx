import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8000"; // change if needed

export default function DailyTargetPanel() {
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch today's targets
  const fetchTargets = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/daily_targets/`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load daily targets");
      const data = await res.json();
      setTargets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Generate new targets for today
  const generateTargets = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/daily_targets/generate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ study_date: new Date().toISOString().split("T")[0] }),
      });
      if (!res.ok) throw new Error("Failed to generate targets");
      await fetchTargets();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTargets();
  }, []);

  if (loading) return <div className="p-4 bg-white rounded shadow">Loading daily targets...</div>;
  if (error) return <div className="p-4 bg-red-100 text-red-600 rounded">{error}</div>;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Daily Targets</h2>
        <button
          onClick={generateTargets}
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Generate
        </button>
      </div>

      {targets.length === 0 ? (
        <p className="text-gray-500">No daily targets yet. Click "Generate".</p>
      ) : (
        <ul className="space-y-3">
          {targets.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center border p-3 rounded-lg hover:shadow transition"
            >
              <div>
                <p className="font-medium">{t.concept_name}</p>
                <p className="text-sm text-gray-500">{t.topic_name}</p>
              </div>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                {t.allocated_time} min
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
