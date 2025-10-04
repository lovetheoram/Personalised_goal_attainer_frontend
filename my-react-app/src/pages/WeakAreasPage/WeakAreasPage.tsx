import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const API_BASE = "/api/progress";

async function fetchWeakConcepts() {
  const res = await fetch(`${API_BASE}/user-progress/weak_concepts/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await res.json();
}

const WeakAreasPage = () => {
  const [weakConcepts, setWeakConcepts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWeakConcepts() {
      const data = await fetchWeakConcepts();
      setWeakConcepts(data);
      setLoading(false);
    }
    loadWeakConcepts();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading weak areas...</p>;

  if (!weakConcepts.length)
    return <p className="text-center mt-10 text-gray-600">No weak areas found!</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Weak Areas</h1>

      <div className="space-y-6">
        {weakConcepts.map((concept, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:justify-between items-start md:items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{concept.name}</h2>
              <p className="text-gray-500 mt-1">{concept.description || "No description"}</p>
            </div>

            <div className="w-full md:w-1/3 mt-4 md:mt-0">
              <div className="bg-gray-200 h-4 rounded overflow-hidden">
                <div
                  className="bg-red-500 h-4 rounded"
                  style={{ width: `${concept.weakness_score * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Weakness: {(concept.weakness_score * 100).toFixed(1)}%
              </p>
            </div>

            <button
              className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => alert(`Start focused quiz for ${concept.name}`)}
            >
              Focus Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeakAreasPage;
