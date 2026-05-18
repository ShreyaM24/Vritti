// src/components/MoodTracker.jsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSmile,
  FaSadTear,
  FaMeh,
  FaAngry,
  FaHeart,
  FaFrown,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const MoodTracker = ({ moodTracker, setMoodTracker }) => {
  const { t } = useTranslation();

  const moods = [
    { id: "happy", icon: <FaSmile />, label: t("moods.happy") },
    { id: "sad", icon: <FaSadTear />, label: t("moods.sad") },
    { id: "neutral", icon: <FaMeh />, label: t("moods.neutral") },
    { id: "angry", icon: <FaAngry />, label: t("moods.angry") },
    { id: "love", icon: <FaHeart />, label: t("moods.love") },
    { id: "upset", icon: <FaFrown />, label: t("moods.upset") },
  ];

  const [selectedMood, setSelectedMood] = useState(() => {
    return localStorage.getItem("selectedMood") || null;
  });

  useEffect(() => {
    if (selectedMood) {
      localStorage.setItem("selectedMood", selectedMood);

      if (moodTracker?.length) {
        const updated = [...moodTracker];
        updated[updated.length - 1] = selectedMood;
        setMoodTracker(updated);
      }
    }
  }, [selectedMood]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        w-full
        rounded-3xl
        bg-green-900
        dark:bg-gray-800
        text-white
        shadow-xl

        px-4 py-5
        sm:px-6 sm:py-6
        md:px-8 md:py-7

        overflow-hidden
      "
    >
      {/* Header */}
      <div className="mb-5">
        <h1
          className="
            font-bold
            text-lg
            sm:text-xl
            md:text-2xl
            leading-tight
          "
        >
          {t("moodTracker.title")}
        </h1>

        <p
          className="
            mt-2
            text-sm
            sm:text-base
            text-gray-200
            dark:text-gray-400
            leading-relaxed
          "
        >
          {t("moodTracker.subtitle")}
        </p>
      </div>

      {/* Mood Grid */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-6
          gap-2
          sm:gap-3
          md:gap-5
        "
      >
        {moods.map((m) => (
          <div key={m.id} className="flex flex-col items-center gap-2 min-w-0">
            <motion.button
              onClick={() => setSelectedMood(m.id)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className={`
                flex items-center justify-center

                w-12 h-12
                sm:w-14 sm:h-14
                md:w-16 md:h-16
                lg:w-20 lg:h-20

                rounded-full
                border-2

                text-lg
                sm:text-xl
                md:text-2xl

                transition-all duration-300

                ${
                  selectedMood === m.id
                    ? "bg-yellow-300 border-yellow-500 text-green-900 shadow-lg scale-105"
                    : "bg-[#f7f6d5] border-green-900 text-green-900 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-100"
                }
              `}
              title={m.label}
            >
              {m.icon}
            </motion.button>

            <p className="text-[0.65rem] sm:text-xs md:text-sm text-gray-200 capitalize text-center min-w-0 break-words">
              {m.label}
            </p>
          </div>
        ))}
      </div>

      {/* Selected Mood */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            mt-6

            bg-white/10
            dark:bg-gray-700/40

            rounded-2xl
            px-4 py-3

            text-center
            sm:text-left
          "
        >
          <p
            className="
              text-sm
              sm:text-base
              md:text-lg
              text-gray-100
              break-words
            "
          >
            {t("moodTracker.you_feel")}{" "}
            <span className="font-bold capitalize text-yellow-300">
              {t(`moods.${selectedMood}`)}
            </span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MoodTracker;