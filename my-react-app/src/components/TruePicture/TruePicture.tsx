import React, { useEffect, useState } from "react";

const TruePicture = () => {
  const [loading, setLoading] = useState(false);
  const [snapshot, setSnapshot] = useState(null);

  const fetchSnapshot = async () => {
    setLoading(true);
    try {
      // Replace this with your real backend endpoint
      const res = await fetch("/api/true-picture/");
      if (!res.ok) throw new Error("Failed to fetch snapshot");
      const data = await res.json();
      setSnapshot(data);
    } catch (err) {
      console.error(err);
      // Fallback dummy data
      setSnapshot({
        chapters_left: 24,
        predicted_completion: "2025-12-15",
        daily_required: 2,
        current_pace: 1.2,
        confidence: "Moderate",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnapshot();
  }, []);

  return (
    <div className="shadow-lg rounded-2xl p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        📊 True Picture
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : snapshot ? (
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-gray-700">📚 Chapters Left</p>
            <p className="text-lg font-bold text-blue-600">
              {snapshot.chapters_left}
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-medium text-gray-700">⏳ Predicted Completion</p>
            <p className="text-lg font-bold text-green-600">
              {snapshot.predicted_completion}
            </p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="font-medium text-gray-700">🎯 Daily Required</p>
            <p className="text-lg font-bold text-yellow-600">
              {snapshot.daily_required}
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-medium text-gray-700">⚡ Current Pace</p>
            <p className="text-lg font-bold text-purple-600">
              {snapshot.current_pace}
            </p>
          </div>
          <div className="col-span-2 p-3 bg-indigo-50 rounded-lg">
            <p className="font-medium text-gray-700">📈 Confidence</p>
            <p className="text-lg font-bold text-indigo-600">
              {snapshot.confidence}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic">
          No snapshot data available yet.
        </p>
      )}
    </div>
  );
};

export default TruePicture;
