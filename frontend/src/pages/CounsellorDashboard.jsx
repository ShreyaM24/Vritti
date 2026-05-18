import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CounsellorSidebar from "../components/CounsellorSidebar";
import Topbar from "../components/Topbar";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
  Minimal: "#22c55e",            // green
  Mild: "#a3e635",               // lime
  Moderate: "#f59e0b",           // amber
  "Moderately Severe": "#f97316", // orange
  Severe: "#dc2626",             // red
};

const CounsellorDashboard = () => {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState([]);

  // ✅ Fetch PHQ-9 stats (same as admin)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://vritti-piny.onrender.com/api/phq9/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch PHQ-9 stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("❌ Error fetching PHQ-9 stats:", error);
      }
    };

    fetchStats();
  }, []);

  // ✅ Calculate totals
  const total = stats.reduce((a, b) => a + b.value, 0);
  const stressed = stats
    .filter((s) => ["Moderate", "Moderately Severe", "Severe"].includes(s.name))
    .reduce((a, b) => a + b.value, 0);
  const highlyStressed = stats
    .filter((s) => ["Moderately Severe", "Severe"].includes(s.name))
    .reduce((a, b) => a + b.value, 0);

  // ✅ Date info for the calendar card
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("default", { month: "long" });

  return (
    <div className="flex min-h-screen bg-[#fdf6e3] dark:bg-gray-950 overflow-x-hidden">
      {/* Sidebar */}
      <CounsellorSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col lg:ml-64 overflow-y-auto h-screen">
        {/* Topbar */}
        <div className="sticky top-0 z-20 bg-[#fdf6e3] dark:bg-gray-900 shadow">
          <Topbar showMenu onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        </div>

        {/* Dashboard Content */}
        <div className="pt-20 lg:pt-6 p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Welcome */}
          <h1 className="text-3xl font-bold text-green-900 dark:text-white mb-8">
            {t("welcomeMessage", { name: "MR Psychologist" })}
          </h1>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Appointment Overview */}
            <div className="bg-green-900 dark:bg-green-800 text-white p-6 rounded-2xl shadow-lg text-center">
              <h2 className="text-xl font-semibold mb-3 dark:text-white">{t("overview")}</h2>
              <p>{t("upcomingAppointments")}</p>
              <p className="mt-2 text-sm text-gray-200 dark:text-gray-300">{t("shortDetails")}</p>
            </div>

            {/* Community Overview */}
            <div className="bg-green-900 dark:bg-green-800 text-white p-6 rounded-2xl shadow-lg text-center">
              <h2 className="text-xl font-semibold mb-3 dark:text-white">{t("overview")}</h2>
              <p>{t("upcomingCommunityChats")}</p>
              <p className="mt-2 text-sm text-gray-200 dark:text-gray-300">{t("shortDetails")}</p>
            </div>

            {/* Calendar */}
            <div className="bg-green-900 dark:bg-green-800 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
              <div className="bg-white dark:bg-gray-100 text-green-900 px-6 py-4 rounded-2xl shadow-lg text-center">
                <p className="text-lg font-bold text-red-600">{month}</p>
                <p className="text-4xl font-extrabold">{day}</p>
              </div>
            </div>
          </div>

          {/* Stress Levels PieChart (from AdminDashboard) */}
          <div className="bg-green-900 dark:bg-green-800 text-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Students' Stress Levels</h2>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="w-full lg:w-1/2 min-w-0 h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      label
                    >
                      {stats.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[entry.name] || "#999"}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        color: "#fff",
                        borderRadius: "8px",
                        border: "none",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="mt-6 lg:mt-0 lg:ml-10 space-y-2 text-gray-200 dark:text-white">
                {stats.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className="inline-block w-4 h-4 rounded-sm"
                      style={{ backgroundColor: COLORS[item.name] }}
                    ></span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-900 dark:bg-green-800 text-white p-6 rounded-2xl shadow-lg text-center">
              <h3 className="text-lg font-semibold dark:text-white">Stressed Students</h3>
              <p className="text-4xl font-bold mt-2">{stressed}</p>
              <p className="text-sm mt-1">out of {total} students</p>
            </div>

            <div className="bg-green-900 dark:bg-green-800 text-white p-6 rounded-2xl shadow-lg text-center">
              <h3 className="text-lg font-semibold dark:text-white">Highly Stressed Students</h3>
              <p className="text-4xl font-bold mt-2">{highlyStressed}</p>
              <p className="text-sm mt-1">out of {total} students</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorDashboard;
