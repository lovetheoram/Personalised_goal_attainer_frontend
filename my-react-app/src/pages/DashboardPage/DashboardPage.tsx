import React, { useState } from "react";
import AICompanionPanel from "../../components/AICompanionPanel/AICompanionPanel";
import DailyTargetPanel from "../../components/DailyTargetPanel/DailyTargetPanel";
import ProgressVisuals from "../../components/ProgressVisuals/ProgressVisuals";
import AchievementsPanel from "../../components/AchievementsPanel/AchievementsPanel";
import TruePicture from "../../components/TruePicture/TruePicture";
import ChatBotPanel from "../../components/ChatBotPanel/ChatBotPanel";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("AICompanion"); // Default tab
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPanel = () => {
    switch (activeTab) {
      case "AICompanion":
        return <AICompanionPanel />;
      case "DailyTargets":
        return <DailyTargetPanel />;
      case "Progress":
        return <ProgressVisuals />;
      case "Achievements":
        return <AchievementsPanel />;
      case "TruePicture":
        return <TruePicture />;
      default:
        return <AICompanionPanel />;
    }
  };

  const tabs = [
    { label: "AI Companion", value: "AICompanion" },
    { label: "Daily Targets", value: "DailyTargets" },
    { label: "Progress", value: "Progress" },
    { label: "Achievements", value: "Achievements" },
    { label: "True Picture", value: "TruePicture" },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar / Top Nav */}
      <aside
        className={`bg-white shadow-lg p-4 flex flex-col gap-3 transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0 absolute z-40 w-64 h-full" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setActiveTab(tab.value);
              setSidebarOpen(false); // close sidebar on mobile
            }}
            className={`w-full p-3 rounded-lg text-left font-medium transition ${
              activeTab === tab.value
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </aside>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex justify-between items-center bg-white p-4 shadow">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-xl font-bold"
        >
          ☰
        </button>
        <span className="font-bold text-blue-600">Dashboard</span>
      </div>

      {/* Main Panel */}
      <main className="flex-1 p-4 overflow-y-auto">{renderPanel()}</main>

      {/* Floating ChatBot */}
      <ChatBotPanel />
    </div>
  );
};

export default DashboardPage;
