import React, { useEffect, useState } from "react";
import DailyTargetPanel from "../../components/DailyTargetPanel/DailyTargetPanel";
import { Loader2 } from "lucide-react";

const DailyTargetsPage = () => {
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDailyTargets = async () => {
    setLoading(true);
    try {
      const res = await fetch("target/daily_targets/");
      if (res.ok) {
        const data = await res.json();
        setTargets(data);
      } else {
        console.error("Failed to fetch daily targets");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyTargets();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6">Daily Targets</h1>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      ) : targets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {targets.map((target) => (
            <DailyTargetPanel key={target.id} target={target} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No daily targets available. Generate today’s targets to get started!
        </p>
      )}
    </div>
  );
};

export default DailyTargetsPage;
