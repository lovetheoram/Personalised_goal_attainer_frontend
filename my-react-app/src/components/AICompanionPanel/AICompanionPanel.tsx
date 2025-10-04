import React, { useEffect, useState } from "react";

const AICompanionPanel = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchMessage = async () => {
    setLoading(true);
    try {
      // Replace with your real API endpoint
      const res = await fetch("/api/ai/companion/");
      if (!res.ok) throw new Error("Failed to fetch AI message");
      const data = await res.json();
      setMessage(data);
    } catch (err) {
      console.error(err);
      // fallback message
      setMessage({
        motivation: "Stay consistent! Small steps daily lead to mastery.",
        tip: "Pick one weak concept today and revise it for 20 minutes.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div className="shadow-lg rounded-2xl p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-800">AI Companion</h2>
        <button
          onClick={fetchMessage}
          disabled={loading}
          className="flex items-center gap-1 text-sm px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          {loading ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <span>🔄</span>
          )}
          Refresh
        </button>
      </div>

      {message ? (
        <div className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-xl">
            <p className="text-gray-700 italic">💡 {message.motivation}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-xl">
            <p className="text-gray-700">📘 Study Tip: {message.tip}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic">Loading suggestions...</p>
      )}
    </div>
  );
};

export default AICompanionPanel;
