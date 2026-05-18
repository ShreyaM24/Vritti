import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const DashboardCard = ({ title, image }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 15,
      }}
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: "0px 12px 28px rgba(13,148,136,0.18)",
      }}
      whileTap={{ scale: 0.98 }}
      className="
        w-full

        bg-white dark:bg-gray-900

        rounded-2xl
        shadow-md dark:shadow-xl

        p-4 sm:p-5 md:p-6

        flex flex-col
        items-center
        justify-center

        text-center

        transition-all duration-300

        min-h-[170px]
        sm:min-h-[190px]
        md:min-h-[220px]

        overflow-hidden
      "
    >
      {/* Icon/Image */}
      <motion.div
        whileHover={{
          rotate: 6,
          scale: 1.06,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 12,
        }}
        className="flex items-center justify-center"
      >
        <img
          src={image}
          alt={t(title)}
          className="
            w-14 h-14
            sm:w-16 sm:h-16
            md:w-20 md:h-20

            object-contain

            mb-3 sm:mb-4

            select-none
          "
        />
      </motion.div>

      {/* Title */}
      <motion.h3
        whileHover={{
          color: "#0d9488",
        }}
        className="
          text-sm sm:text-base md:text-lg

          font-semibold

          text-gray-800 dark:text-white

          leading-snug

          break-words

          max-w-full

          transition-colors duration-300
        "
      >
        {t(title)}
      </motion.h3>
    </motion.div>
  );
};

export default DashboardCard;