import React from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import DailyTargetPanel from "../../components/DailyTargetPanel/DailyTargetPanel";
import ProgressVisuals from "../../components/ProgressVisuals/ProgressVisuals";
import AICompanionPanel from "../../components/AICompanionPanel/AICompanionPanel";
import TruePicture from "../../components/TruePicture/TruePicture";
import AchievementsPanel from "../../components/AchievementsPanel/AchievementsPanel";

const DashboardPage = () => {
  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DailyTargetPanel />
        <ProgressVisuals />
        <AICompanionPanel />
        <TruePicture />
        <AchievementsPanel />
      </div>
    </AuthLayout>
  );
};

export default DashboardPage;
