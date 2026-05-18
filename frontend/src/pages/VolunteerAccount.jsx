import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import VolunteerSidebar from "../components/VolunteerSidebar";
import Topbar from "../components/Topbar";
import { User, Shield } from "lucide-react";

const VolunteerAccount = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert(t("account.logoutSuccess"));
    navigate("/login");
  };

  if (!user) {
    return (
      <p className="text-center mt-20 dark:text-white">
        {t("account.loading", "Loading account...")}
      </p>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#fdf6e3] dark:bg-gray-900 overflow-x-hidden transition-colors duration-300">
      <VolunteerSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col lg:ml-64 overflow-y-auto h-screen">
        <Topbar
          showMenu={true}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="pt-20 lg:pt-6 flex-1 p-4 sm:p-6 xl:p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-[#fdf6e3] dark:bg-gray-800 w-full rounded-2xl shadow-xl p-10 border border-green-200 dark:border-gray-700"
          >
            <h2 className="text-3xl font-extrabold text-green-900 dark:text-gray-100 mb-8 text-center">
              {t("account.details")}
            </h2>

            {user && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-col gap-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-5 rounded-xl shadow-md bg-green-900 dark:bg-green-800 text-white"
                >
                  <User className="text-yellow-300 w-7 h-7" />
                  <div>
                    <h3 className="text-sm text-gray-200">{t("account.name")}</h3>
                    <p className="text-lg font-semibold">
                      {user.name || t("account.notProvided")}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-5 rounded-xl shadow-md bg-green-900 dark:bg-green-800 text-white"
                >
                  <Shield className="text-yellow-300 w-7 h-7" />
                  <div>
                    <h3 className="text-sm text-gray-200">{t("account.role")}</h3>
                    <p className="text-lg font-semibold">
                      {user.role || t("account.defaultRole")}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            <div className="mt-10 flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold shadow-md transition"
              >
                {t("account.logout")}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#14532d" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/volunteer-dashboard")}
                className="w-full bg-green-900 dark:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-md transition"
              >
                {t("account.goDashboard")}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerAccount;
