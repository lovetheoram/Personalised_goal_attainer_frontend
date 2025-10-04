import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { getUserProgress, getFullProgress, getWeakConcepts } from "../../api";

const ProgressTrackerPage = () => {
  const { user } = useAuth();

  const [dailyProgress, setDailyProgress] = useState([]);
  const [fullProgress, setFullProgress] = useState({});
  const [weakConcepts, setWeakConcepts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [daily, full, weak] = await Promise.all([
          getUserProgress(),
          getFullProgress(),
          getWeakConcepts(),
        ]);

        setDailyProgress(daily); // Array of daily progress objects
        setFullProgress(full); // Overall stats: tasksCompleted, streak, avgProgress
        setWeakConcepts(weak); // Array of weak concepts
      } catch (err) {
        console.error("Failed to fetch progress data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading progress...</p>;

  const chartData = {
    labels: dailyProgress.map((d) => d.date),
    datasets: [
      {
        label: "Daily Progress %",
        data: dailyProgress.map((d) => d.percentage),
        fill: false,
        borderColor: "rgb(59, 130, 246)",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Progress Tracker</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-white rounded shadow text-center">
          <h2 className="text-lg font-semibold">Tasks Completed</h2>
          <p className="text-2xl font-bold">{fullProgress.tasksCompleted || 0}</p>
        </div>
        <div className="p-4 bg-white rounded shadow text-center">
          <h2 className="text-lg font-semibold">Current Streak</h2>
          <p className="text-2xl font-bold">{fullProgress.streak || 0} days</p>
        </div>
        <div className="p-4 bg-white rounded shadow text-center">
          <h2 className="text-lg font-semibold">Average Progress</h2>
          <p className="text-2xl font-bold">{fullProgress.avgProgress || 0}%</p>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Daily Progress Chart</h2>
        <Line data={chartData} />
      </div>

      {/* Weak Concepts */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Weak Concepts</h2>
        {weakConcepts.length ? (
          <ul className="list-disc list-inside">
            {weakConcepts.map((concept, idx) => (
              <li key={idx}>
                {concept.name} - {concept.mastery ? `${(concept.mastery * 100).toFixed(1)}%` : "0%"} mastered
              </li>
            ))}
          </ul>
        ) : (
          <p>No weak concepts! Great job 💪</p>
        )}
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <ul className="divide-y divide-gray-200">
          {dailyProgress.slice(-5).map((d, idx) => (
            <li key={idx} className="py-2 flex justify-between">
              <span>{d.date}</span>
              <span>{d.percentage}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProgressTrackerPage;
