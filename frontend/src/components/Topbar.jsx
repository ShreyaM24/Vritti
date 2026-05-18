// src/components/Topbar.jsx
import React, { useContext } from "react";
import { Bell, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";

const Topbar = ({ title, showMenu, onMenuClick }) => {
  const { i18n } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);

  const changeLanguage = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("language", selectedLang);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 15 }}
      className="flex items-center justify-between p-4 
                 bg-[#f7f6d5] dark:bg-gray-950 
                 shadow-md rounded-tr-2xl rounded-tl-2xl ml-[1px] gap-4 transition-colors duration-300"
    >
      <div className="flex items-center gap-3">
        {showMenu && (
          <button
            onClick={onMenuClick}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-green-900 text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-green-300 transition"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
        )}
        {title && (
          <h1 className="text-lg font-semibold text-green-900 dark:text-white">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.2, boxShadow: "0 0 15px rgba(0,255,0,0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer w-10 h-10 flex items-center justify-center 
                     bg-green-900 text-white rounded-full shadow-lg transition-all"
        >
          <Bell color="white" />
        </motion.div>

        <div
          onClick={toggleTheme}
          className={`w-12 h-6 rounded-full p-1 cursor-pointer flex items-center transition-colors duration-300 
            ${theme === "dark" ? "bg-green-900" : "bg-gray-300"}`}
        >
          <motion.div
            layout
            animate={{ x: theme === "dark" ? 24 : 0 }}
            className="w-4 h-4 bg-white rounded-full shadow-md"
            transition={{ type: "spring", stiffness: 700, damping: 30 }}
          />
        </div>

        <select
          onChange={changeLanguage}
          defaultValue={localStorage.getItem("language") || "en"}
          className="px-3 py-1 border border-green-900 rounded-lg 
                     bg-white dark:bg-gray-800 
                     text-green-900 dark:text-green-300 
                     font-medium shadow hover:bg-green-50 dark:hover:bg-gray-700 transition-colors"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="bn">বাংলা</option>
          <option value="ta">தமிழ்</option>
          <option value="te">తెలుగు</option>
          <option value="ml">മലയാളം</option>
          <option value="mr">मराठी</option>
          <option value="gu">ગુજરાતી</option>
        </select>
      </div>
    </motion.div>
  );
};

export default Topbar;
