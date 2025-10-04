import React from "react";
import AchievementsPanel from "../../components/AchievementsPanel/AchievementsPanel";

const AchievementsPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6">
        Achievements
      </h1>

      <div className="max-w-6xl mx-auto">
        {/* Achievements Panel */}
        <AchievementsPanel />
      </div>
    </div>
  );
};

export default AchievementsPage;
