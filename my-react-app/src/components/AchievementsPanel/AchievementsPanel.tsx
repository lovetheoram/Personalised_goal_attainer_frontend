import React, { useEffect, useState } from "react";

const AchievementsPanel = () => {
  const [loading, setLoading] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [totalAchievements, setTotalAchievements] = useState(0);

  // Fetch both unlocked and all achievements
  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const unlockedRes = await fetch("/api/achievements/unlocked/");
      const unlocked = unlockedRes.ok ? await unlockedRes.json() : [];

      const allRes = await fetch("/api/achievements/");
      const all = allRes.ok ? await allRes.json() : [];

      setAchievements(unlocked);
      setTotalAchievements(all.length);
    } catch (err) {
      console.error(err);

      // fallback dummy data
      setAchievements([
        {
          id: 1,
          achievement: {
            name: "7-Day Streak",
            description: "You studied consistently for 7 days!",
            icon: "https://img.icons8.com/color/96/medal.png",
          },
          earned_at: "2025-09-25T10:00:00Z",
        },
        {
          id: 2,
          achievement: {
            name: "Mastery Milestone",
            description: "Reached 80% mastery in at least one concept.",
            icon: "https://img.icons8.com/color/96/trophy.png",
          },
          earned_at: "2025-09-28T14:00:00Z",
        },
      ]);
      setTotalAchievements(10);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const unlockedCount = achievements.length;
  const progressPercent =
    totalAchievements > 0
      ? Math.round((unlockedCount / totalAchievements) * 100)
      : 0;

  return (
    <div className="shadow-lg rounded-2xl p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        🏆 Achievements
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-yellow-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Progress summary */}
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-1">
              {unlockedCount} / {totalAchievements} achievements unlocked
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-yellow-500 h-3 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Achievements grid */}
          {achievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((ua) => (
                <div
                  key={ua.id}
                  className="p-4 rounded-lg border bg-gray-50 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    {ua.achievement.icon ? (
                      <img
                        src={ua.achievement.icon}
                        alt={ua.achievement.name}
                        className="w-12 h-12"
                      />
                    ) : (
                      <span className="text-3xl">🏅</span>
                    )}
                    <div>
                      <h3 className="font-bold text-gray-700">
                        {ua.achievement.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {ua.achievement.description}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Earned on {new Date(ua.earned_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No achievements unlocked yet. Keep going! 🚀
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AchievementsPanel;
