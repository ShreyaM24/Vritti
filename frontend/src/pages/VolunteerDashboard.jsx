// src/pages/VolunteerDashboard.jsx

import React, {
  useState,
} from "react";

import { useTranslation } from "react-i18next";

import VolunteerSidebar from "../components/VolunteerSidebar";
import Topbar from "../components/Topbar";

import { motion } from "framer-motion";

const VolunteerDashboard = () => {
  const { t } = useTranslation();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const resources = [
    {
      title:
        "WHO: Mental Health Overview",
      type: "Article",
      link: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
    },
    {
      title:
        "NIMH: Depression Basics",
      type: "Article",
      link: "https://www.nimh.nih.gov/health/topics/depression",
    },
    {
      title:
        "Mental Health in College Students",
      type: "Research Paper",
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4955594/",
    },
    {
      title:
        "Understanding Anxiety Disorders",
      type: "Research Paper",
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5573566/",
    },
    {
      title:
        "TED Talk: The Power of Vulnerability by Brené Brown",
      type: "Video",
      link: "https://www.youtube.com/watch?v=iCvmsMzlF7o",
    },
    {
      title:
        "YouTube: How to Support Someone Struggling",
      type: "Video",
      link: "https://www.youtube.com/watch?v=wIUcc8g17wg",
    },
  ];

  return (
    <div
      className="
        flex
        min-h-screen

        bg-[#fdf6e3]
        dark:bg-gray-900

        overflow-x-hidden
        transition-colors duration-300
      "
    >
      {/* Sidebar */}
      <VolunteerSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div
        className="
          flex-1
          flex
          flex-col

          w-full
          min-h-screen

          lg:ml-64
        "
      >
        {/* Topbar */}
        <header
          className="
            sticky
            top-0
            z-30

            bg-[#fdf6e3]/90
            dark:bg-gray-900/90

            backdrop-blur-md

            border-b
            border-green-200
            dark:border-gray-800
          "
        >
          <Topbar
            showMenu
            onMenuClick={() =>
              setSidebarOpen(true)
            }
          />
        </header>

        {/* Dashboard Content */}
        <main
          className="
            flex-1

            w-full
            max-w-screen-2xl

            mx-auto

            pt-24
            lg:pt-8

            px-4
            sm:px-6
            md:px-8
            lg:px-10

            pb-10

            space-y-8
          "
        >
          {/* Heading */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <h1
              className="
                text-3xl
                sm:text-4xl

                font-bold

                text-green-900
                dark:text-white
              "
            >
              Volunteer Learning Hub
            </h1>

            <p
              className="
                mt-3

                text-sm
                sm:text-base

                text-gray-600
                dark:text-gray-300

                max-w-3xl
              "
            >
              Access trusted mental
              health resources, videos,
              and research papers to
              better support students
              and communities.
            </p>
          </motion.div>

          {/* Resources Section */}
          <motion.section
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              rounded-3xl

              bg-white
              dark:bg-gray-800

              border
              border-green-100
              dark:border-gray-700

              shadow-xl

              p-5
              sm:p-6
              lg:p-8
            "
          >
            <div className="mb-6">
              <h2
                className="
                  text-2xl
                  font-bold

                  text-green-900
                  dark:text-white
                "
              >
                Learning Resources
              </h2>

              <p
                className="
                  mt-2

                  text-gray-600
                  dark:text-gray-300

                  text-sm
                  sm:text-base

                  leading-relaxed
                "
              >
                Curated educational
                content for volunteers
                to understand stress,
                anxiety, depression, and
                emotional support
                strategies.
              </p>
            </div>

            {/* Cards */}
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3

                gap-5
              "
            >
              {resources.map(
                (res, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{
                      y: -4,
                      scale: 1.01,
                    }}
                    className="
                      flex
                      flex-col
                      justify-between

                      rounded-2xl

                      bg-green-50
                      dark:bg-gray-700/50

                      border
                      border-green-100
                      dark:border-gray-600

                      p-5

                      shadow-md
                    "
                  >
                    <div>
                      <div
                        className="
                          inline-flex

                          px-3 py-1

                          rounded-full

                          text-xs
                          font-semibold

                          bg-green-200
                          dark:bg-green-700

                          text-green-900
                          dark:text-white

                          mb-4
                        "
                      >
                        {res.type}
                      </div>

                      <h3
                        className="
                          text-lg
                          font-semibold

                          text-green-900
                          dark:text-white

                          leading-snug
                        "
                      >
                        {res.title}
                      </h3>
                    </div>

                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        mt-6

                        inline-flex
                        items-center
                        justify-center

                        rounded-xl

                        bg-green-800
                        hover:bg-green-900

                        dark:bg-green-700
                        dark:hover:bg-green-600

                        text-white

                        py-2.5
                        px-4

                        font-medium

                        transition-all
                        duration-300
                      "
                    >
                      View Resource →
                    </a>
                  </motion.div>
                )
              )}
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
};

export default VolunteerDashboard;