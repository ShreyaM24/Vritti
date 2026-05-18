import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import VolunteerSidebar from "../components/VolunteerSidebar";
import Topbar from "../components/Topbar";

const VolunteerDashboard = () => {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const resources = [
    {
      title: "WHO: Mental Health Overview",
      type: "Article",
      link: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
    },
    {
      title: "NIMH: Depression Basics",
      type: "Article",
      link: "https://www.nimh.nih.gov/health/topics/depression",
    },
    {
      title: "Mental Health in College Students",
      type: "Research Paper",
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4955594/",
    },
    {
      title: "Understanding Anxiety Disorders",
      type: "Research Paper",
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5573566/",
    },
    {
      title: "TED Talk: The Power of Vulnerability by Brené Brown",
      type: "Video",
      link: "https://www.youtube.com/watch?v=iCvmsMzlF7o",
    },
    {
      title: "YouTube: How to Support Someone Struggling",
      type: "Video",
      link: "https://www.youtube.com/watch?v=wIUcc8g17wg",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#fdf6e3] dark:bg-gray-900 overflow-x-hidden">
      {/* Sidebar */}
      <VolunteerSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col lg:ml-64 overflow-y-auto h-screen">
        {/* Topbar */}
        <div className="sticky top-0 z-20 bg-[#fdf6e3] dark:bg-gray-800 shadow">
          <Topbar showMenu onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        </div>
        <div className="pt-20 lg:pt-6 p-4 sm:p-6 lg:p-8 space-y-8">
          {/* 📚 Learning Resources Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-green-900 dark:text-white mb-4">
              Learning Resources for Volunteers
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Here are some helpful articles, research papers, and videos to
              help you better support students with mental health concerns.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {resources.map((res, idx) => (
                <li
                  key={idx}
                  className="p-4 bg-green-100 dark:bg-gray-700 rounded-lg shadow flex flex-col justify-between"
                >
                  <div>
                    <p className="font-semibold text-green-900 dark:text-white">
                      {res.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {res.type}
                    </p>
                  </div>
                  <a
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-green-700 dark:text-green-400 hover:underline"
                  >
                    View →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
