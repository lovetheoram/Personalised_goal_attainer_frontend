import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const API_BASE = "http://localhost:8000"; // adjust if needed

export default function ProgressVisuals() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/user-progress/full_progress/`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load progress");
      const data = await res.json();
      setProgress(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Aggregate Data
  const masteryOverTime = progress.map((p, i) => ({
    day: i + 1,
    mastery: Math.round(p.mastery * 100), // convert 0-1 → %
  }));

  const mastered = progress.filter((p) => p.mastery >= 0.8).length;
  const weak = progress.filter((p) => p.mastery < 0.5).length;
  const learning = progress.length - mastered - weak;

  const pieData = [
    { name: "Mastered", value: mastered },
    { name: "Learning", value: learning },
    { name: "Weak", value: weak },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  // 🔹 Streak calculation → take max streak from all concepts
  const streak = Math.max(...progress.map((p) => p.streak || 0), 0);

  if (loading) return <div className="p-4 bg-white rounded shadow">Loading progress...</div>;
  if (error) return <div className="p-4 bg-red-100 text-red-600 rounded">{error}</div>;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Progress Overview</h2>

      {/* 🔹 Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="h-48">
          <h3 className="text-md font-semibold mb-2">Mastery Over Time</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={masteryOverTime}>
              <XAxis dataKey="day" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="mastery" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="h-48">
          <h3 className="text-md font-semibold mb-2">Concepts Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔹 Streak Counter */}
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">🔥 Streak: {streak} days</p>
      </div>
    </div>
  );
}
