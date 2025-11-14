// src/pages/Analytics.jsx
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { apiFetch } from "../api";

const Analytics = () => {
  const [phq9, setPhq9] = useState([]);

  useEffect(() => {
    async function loadAssessments() {
      try {
        const res = await apiFetch("/phq9");
        if (res.ok) {
          const data = await res.json();
          setPhq9(data);
        }
      } catch (err) {
        console.error("❌ Failed to load PHQ-9 data", err);
      }
    }
    loadAssessments();
  }, []);

  const getSeverity = (score) => {
    if (score <= 4) return "Minimal";
    if (score <= 9) return "Mild";
    if (score <= 14) return "Moderate";
    if (score <= 19) return "Moderately Severe";
    return "Severe";
  };

  // Prepare chart data
  const chartData = phq9.map((entry) => ({
    date: new Date(entry.createdAt).toLocaleDateString(),
    score: entry.totalScore,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
          <p className="font-semibold text-gray-800 dark:text-gray-100">{label}</p>
          <p className="text-green-600 dark:text-green-400 font-semibold">
            Score: {payload[0].value}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {getSeverity(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex min-h-screen bg-[#f7f6d5] text-green-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-green-900 text-white dark:bg-gray-800 transition-colors duration-300">
        <Sidebar />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col ml-64">
        <Topbar title="Analytics" />

        <motion.div className="p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-3xl font-bold mb-6 text-center">PHQ-9 Assessment Results</h2>

          {phq9.length === 0 ? (
            <div className="p-8 rounded-xl shadow-md text-center border bg-white dark:bg-gray-800 border-green-200 dark:border-gray-700 transition-colors duration-300">
              <p className="text-lg text-gray-800 dark:text-gray-100">
                No PHQ-9 assessments submitted yet.
              </p>
              <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                Complete a stress check to see your results here.
              </p>
            </div>
          ) : (
            <>
              {/* Latest Result */}
              <div className="mb-6 p-6 rounded-xl shadow-md border bg-white dark:bg-gray-800 border-green-200 dark:border-gray-700 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Latest Result</h3>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                  Score: {phq9[phq9.length - 1].totalScore} (
                  {getSeverity(phq9[phq9.length - 1].totalScore)})
                </p>
              </div>

              {/* Chart */}
              <div className="p-6 rounded-xl shadow-md border bg-white dark:bg-gray-800 border-green-200 dark:border-gray-700 transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  Progress Over Time
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="date" stroke="currentColor" />
                    <YAxis stroke="currentColor" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="score" fill="#22c55e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
