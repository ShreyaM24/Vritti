// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import WelcomeCard from "../components/WelcomeCard";
import FeatureGrid from "../components/FeatureGrid";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div
      className="
        flex min-h-screen
        bg-[#f7f6d5] text-green-900
        dark:bg-gray-900 dark:text-gray-100
        transition-colors duration-300
      "
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="
          flex-1 flex flex-col
          w-full
          lg:ml-64
          min-h-screen
          bg-[#f7f6d5]
          dark:bg-gray-900
          transition-colors duration-300
        "
      >
        {/* Topbar */}
        <div className="sticky top-0 z-30">
          <Topbar />
        </div>

        {/* Main Area */}
        <main
          className="
            flex-1
            pt-24 lg:pt-6
            px-4 sm:px-6 md:px-8
            pb-6
            overflow-x-hidden
          "
        >
          {/* Welcome Card */}
          <div className="mb-6">
            <WelcomeCard
              title={t("dashboard.welcomeCard.title")}
              subtitle={t("dashboard.welcomeCard.subtitle")}
            />
          </div>

          {/* Features */}
          <div className="w-full">
            <FeatureGrid
              features={{
                moodTracker: t("dashboard.features.items.moodTracker"),
                habitTracker: t("dashboard.features.items.habitTracker"),
                affirmations: t("dashboard.features.items.affirmations"),
                sleepEnergy: t("dashboard.features.items.sleepEnergy"),
                calendar: t("dashboard.features.items.calendar"),
                insights: t("dashboard.features.items.insights"),
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;