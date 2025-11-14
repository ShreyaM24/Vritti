import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = {
  Minimal: "#22c55e",
  Mild: "#a3e635",
  Moderate: "#f59e0b",
  "Moderately Severe": "#f97316",
  Severe: "#dc2626",
};

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:4000/api/phq9/stats", {
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

  const total = stats.reduce((a, b) => a + b.value, 0);
  const stressed = stats
    .filter((s) => ["Moderate", "Moderately Severe", "Severe"].includes(s.name))
    .reduce((a, b) => a + b.value, 0);
  const highlyStressed = stats
    .filter((s) => ["Moderately Severe", "Severe"].includes(s.name))
    .reduce((a, b) => a + b.value, 0);

  const cardBaseClasses =
    "p-6 rounded-2xl shadow-lg text-center transition-colors duration-300";

  return (
    <div className="flex min-h-screen bg-[#fdf6e3] dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Topbar */}
        <div className="sticky top-0 z-20 bg-[#fdf6e3] dark:bg-gray-950 shadow transition-colors">
          <Topbar />
        </div>

        {/* Page Content */}
        <div className="p-8 space-y-8">
          {/* Top Chart Section */}
          <div
            className={`${cardBaseClasses} bg-green-600 dark:bg-green-800 text-white`}
          >
            <h2 className="text-xl font-bold mb-4">Stress Levels Overview</h2>
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <PieChart width={350} height={350}>
                <Pie
                  data={stats}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label
                >
                  {stats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#999"} />
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

              {/* Legend */}
              <div className="mt-6 lg:mt-0 lg:ml-10 space-y-2 text-gray-900 dark:text-gray-200">
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

          {/* Bottom Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Stressed */}
            <div
              className={`${cardBaseClasses} bg-green-600 dark:bg-green-800 text-white`}
            >
              <h3 className="text-lg font-semibold">Stressed</h3>
              <p className="text-4xl font-bold mt-2">{stressed}</p>
              <p className="text-sm mt-1">out of {total} students</p>
            </div>

            {/* Card 2 - Highly Stressed */}
            <div
              className={`${cardBaseClasses} bg-green-600 dark:bg-green-800 text-white`}
            >
              <h3 className="text-lg font-semibold">Highly Stressed</h3>
              <p className="text-4xl font-bold mt-2">{highlyStressed}</p>
              <p className="text-sm mt-1">out of {total} students</p>
            </div>

            {/* Card 3 - Severity Breakdown */}
            <div
              className={`${cardBaseClasses} bg-green-600 dark:bg-green-800 text-white`}
            >
              <h3 className="text-lg font-semibold mb-3">Severity Breakdown</h3>
              <ul className="space-y-2">
                {stats.map((s, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{s.name}</span>
                    <span className="font-bold">
                      {s.value} ({s.percent}%)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Extra Info Section */}
          <div
            className={`${cardBaseClasses} bg-green-600 dark:bg-green-800 text-white`}
          >
            <h3 className="text-lg font-semibold mb-4">Insights</h3>
            <p>
              A total of <strong>{total}</strong> assessments have been submitted.
              Among them, <strong>{stressed}</strong> students are showing signs
              of stress, and <strong>{highlyStressed}</strong> are in highly stressed
              conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
