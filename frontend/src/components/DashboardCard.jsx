import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const DashboardCard = ({ title, image }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 70, damping: 15 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 25px rgba(13,148,136,0.3)",
        backgroundColor: "#f0fdfa",
      }}
      whileTap={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-900 shadow dark:shadow-lg rounded-2xl p-6 
                 text-center cursor-pointer transition-colors duration-300 
                 flex flex-col items-center justify-center min-h-[220px]"
    >
      <motion.img
        src={image}
        alt={t(title)}
        className="w-20 h-20 mb-4 transition-all duration-300"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      />
      <motion.h3
        className="font-semibold text-gray-800 dark:text-white text-lg transition-colors duration-300"
        whileHover={{ color: "#0d9488" }}
      >
        {t(title)}
      </motion.h3>
    </motion.div>
  );
};

export default DashboardCard;
