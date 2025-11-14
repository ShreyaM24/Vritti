import React from "react";
import { useTranslation } from "react-i18next";
import VolunteerSidebar from "../components/VolunteerSidebar";
import Topbar from "../components/Topbar";

const VolunteerDashboard = () => {
  const { t } = useTranslation();

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
    <div className="flex min-h-screen bg-[#fdf6e3] dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64">
        <VolunteerSidebar />
      </div>

      {/* Main Section */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Topbar */}
        <div className="sticky top-0 z-20 bg-[#fdf6e3] dark:bg-gray-800 shadow">
          <Topbar />
        </div>
        <div className="p-8 space-y-8">
          {/* 📚 Learning Resources Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-green-900 dark:text-white mb-4">
              Learning Resources for Volunteers
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Here are some helpful articles, research papers, and videos to
              help you better support students with mental health concerns.
            </p>
            <ul className="space-y-4">
              {resources.map((res, idx) => (
                <li
                  key={idx}
                  className="p-4 bg-green-100 dark:bg-gray-700 rounded-lg shadow flex justify-between items-center"
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
