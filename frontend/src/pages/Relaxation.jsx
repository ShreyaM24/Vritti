// src/pages/Relaxation.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

// 🔹 Helper function to convert normal YouTube link to embed link
const getEmbedUrl = (url) => {
  if (!url) return "";
  const urlObj = new URL(url);
  const videoId = urlObj.searchParams.get("v");
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

// 🔹 Reusable Video Card component
const VideoCard = ({ url, title }) => (
  <div className="rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-800">
    <iframe
      className="w-full h-64"
      src={getEmbedUrl(url)}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

const Relaxation = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-[#fdf6e3] dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 fixed h-screen">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-64 overflow-y-auto h-screen">
        <Topbar title={t("relaxation.title")} />

        <main className="p-6 space-y-10">
          <h1 className="text-3xl font-bold text-green-900 dark:text-gray-100">
            {t("relaxation.title")}
          </h1>

          {/* 1. Motivational Videos */}
          <section>
            <h2 className="text-xl font-semibold text-green-800 dark:text-gray-200 mb-4">
              Release Your Stress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VideoCard
                url="https://www.youtube.com/watch?v=AXqX9ekoVnw"
                title={t("relaxation.video1")}
              />
              <VideoCard
                url="https://www.youtube.com/watch?v=CscxGprl1yw"
                title={t("relaxation.video2")}
              />
            </div>
          </section>

          {/* 2. Breathing & Meditation Exercises */}
          <section>
            <h2 className="text-xl font-semibold text-green-800 dark:text-gray-200 mb-4">
              Help From Online Therapists
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VideoCard
                url="https://www.youtube.com/watch?v=MK0rESk_oW0"
                title={t("relaxation.breathing1")}
              />
              <VideoCard
                url="https://www.youtube.com/watch?v=EyC5yJVLlUM"
                title={t("relaxation.breathing2")}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Relaxation;
