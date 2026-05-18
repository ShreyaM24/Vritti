// src/pages/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";
import { useTranslation } from "react-i18next";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  Minimal: "#22c55e",
  Mild: "#a3e635",
  Moderate: "#f59e0b",
  "Moderately Severe": "#f97316",
  Severe: "#dc2626",
};

const AdminDashboard = () => {
  const { t } = useTranslation();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const res = await fetch(
          "https://vritti-piny.onrender.com/api/phq9/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok)
          throw new Error(
            "Failed to fetch PHQ-9 stats"
          );

        const data = await res.json();

        setStats(data);
      } catch (error) {
        console.error(
          "❌ Error fetching PHQ-9 stats:",
          error
        );
      }
    };

    fetchStats();
  }, []);

  const total = stats.reduce(
    (a, b) => a + b.value,
    0
  );

  const stressed = stats
    .filter((s) =>
      [
        "Moderate",
        "Moderately Severe",
        "Severe",
      ].includes(s.name)
    )
    .reduce((a, b) => a + b.value, 0);

  const highlyStressed = stats
    .filter((s) =>
      ["Moderately Severe", "Severe"].includes(
        s.name
      )
    )
    .reduce((a, b) => a + b.value, 0);

  const cardClasses = `
    rounded-3xl
    shadow-xl

    bg-white
    dark:bg-gray-800

    border border-green-100
    dark:border-gray-700

    transition-all duration-300
  `;

  return (
    <div
      className="
        min-h-screen
        flex

        bg-[#fdf6e3]
        dark:bg-gray-900

        text-green-900
        dark:text-gray-100

        overflow-x-hidden
      "
    >
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Layout */}
      <div
        className={`
          flex-1
          flex flex-col

          w-full
          min-h-screen

          transition-all duration-300

          ${
            sidebarOpen
              ? "overflow-hidden lg:overflow-visible"
              : ""
          }

          lg:ml-64
        `}
      >
        {/* Topbar */}
        <header
          className="
            sticky top-0 z-30

            bg-[#fdf6e3]/90
            dark:bg-gray-900/90

            backdrop-blur-md

            border-b
            border-green-200
            dark:border-gray-800
          "
        >
          <Topbar
            showMenu
            onMenuClick={() =>
              setSidebarOpen(true)
            }
          />
        </header>

        {/* Main Content */}
        <main
          className="
            flex-1

            w-full

            pt-24
            lg:pt-8

            px-4
            sm:px-6
            md:px-8
            lg:px-10

            pb-10

            overflow-x-hidden

            space-y-8
          "
        >
          {/* Overview */}
          <section
            className={`
              ${cardClasses}

              p-5
              sm:p-6
              lg:p-8
            `}
          >
            <div
              className="
                flex flex-col
                xl:flex-row

                gap-8
                items-center
              "
            >
              {/* Chart */}
              <div
                className="
                  w-full
                  xl:w-1/2

                  flex justify-center
                "
              >
                <div
                  className="
                    w-full
                    max-w-[420px]

                    h-[320px]
                    sm:h-[380px]
                  "
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <PieChart>
                      <Pie
                        data={stats}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        dataKey="value"
                        label
                      >
                        {stats.map(
                          (entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                COLORS[
                                  entry.name
                                ] || "#999"
                              }
                            />
                          )
                        )}
                      </Pie>

                      <Tooltip
                        contentStyle={{
                          backgroundColor:
                            "#111827",
                          borderRadius:
                            "12px",
                          border: "none",
                          color: "#fff",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Legend */}
              <div
                className="
                  w-full
                  xl:w-1/2

                  space-y-4
                "
              >
                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  Stress Levels Overview
                </h2>

                <div className="space-y-3">
                  {stats.map((item, index) => (
                    <div
                      key={index}
                      className="
                        flex items-center
                        justify-between

                        bg-green-50
                        dark:bg-gray-700/50

                        rounded-xl

                        px-4 py-3
                      "
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="
                            w-4 h-4
                            rounded-full
                          "
                          style={{
                            backgroundColor:
                              COLORS[item.name],
                          }}
                        />

                        <span className="font-medium">
                          {item.name}
                        </span>
                      </div>

                      <span className="font-bold">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3

              gap-6
            "
          >
            {/* Card 1 */}
            <div
              className={`${cardClasses} p-6`}
            >
              <h3
                className="
                  text-lg
                  font-semibold

                  text-gray-600
                  dark:text-gray-300
                "
              >
                Stressed Students
              </h3>

              <p
                className="
                  mt-3

                  text-5xl
                  font-bold

                  text-green-700
                  dark:text-green-400
                "
              >
                {stressed}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                out of {total} students
              </p>
            </div>

            {/* Card 2 */}
            <div
              className={`${cardClasses} p-6`}
            >
              <h3
                className="
                  text-lg
                  font-semibold

                  text-gray-600
                  dark:text-gray-300
                "
              >
                Highly Stressed
              </h3>

              <p
                className="
                  mt-3

                  text-5xl
                  font-bold

                  text-orange-600
                  dark:text-orange-400
                "
              >
                {highlyStressed}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                out of {total} students
              </p>
            </div>

            {/* Card 3 */}
            <div
              className={`${cardClasses} p-6`}
            >
              <h3
                className="
                  text-lg
                  font-semibold
                  mb-4
                "
              >
                Severity Breakdown
              </h3>

              <div className="space-y-3">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="
                      flex justify-between
                      text-sm
                    "
                  >
                    <span>{s.name}</span>

                    <span className="font-bold">
                      {s.value} ({s.percent}
                      %)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Insights */}
          <section
            className={`
              ${cardClasses}

              p-6
              sm:p-8
            `}
          >
            <h3
              className="
                text-xl
                font-bold
                mb-4
              "
            >
              Insights
            </h3>

            <p
              className="
                text-gray-700
                dark:text-gray-300

                leading-relaxed
              "
            >
              A total of{" "}
              <strong>{total}</strong>{" "}
              assessments have been
              submitted. Among them,{" "}
              <strong>{stressed}</strong>{" "}
              students are showing signs
              of stress, and{" "}
              <strong>
                {highlyStressed}
              </strong>{" "}
              are in highly stressed
              conditions.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;