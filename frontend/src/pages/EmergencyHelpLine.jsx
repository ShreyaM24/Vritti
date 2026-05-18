import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { motion } from "framer-motion";
import { AlertCircle, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

const EmergencyHelpline = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-[#fdf6e3] dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-green-900 dark:bg-green-800">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Topbar */}
        <Topbar title={t("emergency.title")} />

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Heading Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-900 dark:text-gray-100">
              {t("emergency.heading")}
            </h1>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Immediate Danger Box */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-green-900 dark:bg-green-800 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center"
            >
              <p className="text-lg font-semibold mb-4">
                {t("emergency.immediateDanger")}
              </p>
              <AlertCircle className="text-red-400" size={48} />
            </motion.div>

            {/* National Helplines */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-green-900 dark:bg-green-800 text-white p-6 rounded-2xl shadow-lg"
            >
              <h2 className="text-xl font-bold mb-4">
                {t("emergency.nationalHelplines")}
              </h2>
              <ul className="space-y-3 text-lg">
                <li>▶ {t("emergency.Tele-Manas")}</li>
                <li>▶ {t("emergency.Psycho-social, First-aid & counselling helpline")}</li>
                <li>▶ {t("emergency.collegeHotline")}</li>
                <li>▶ {t("emergency.One Life")}</li>
              </ul>
            </motion.div>

            {/* You Are Not Alone Box */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-red-500 text-white p-6 rounded-2xl shadow-lg text-center font-bold text-2xl"
            >
              {t("emergency.youAreNotAlone")}
            </motion.div>

            {/* Quick Resources */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-green-900 dark:bg-green-800 text-white p-6 rounded-2xl shadow-lg"
            >
              <h2 className="text-xl font-bold mb-4">
                {t("emergency.quickResources")}
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <FileText />
                  <a
                    href="https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {t("emergency.selfHelpToolkit")}
                  </a>
                </li>

                <li className="flex items-center gap-2">
                  <AlertCircle />
                  <a
                    href="https://www.maxhealthcare.in/blogs/mental-health-crisis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {t("emergency.crisisCopingTips")}
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHelpline;