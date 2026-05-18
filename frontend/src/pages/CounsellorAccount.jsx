// src/pages/CounsellorAccount.jsx

import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  User,
  Shield,
} from "lucide-react";

import { useTranslation } from "react-i18next";

import CounsellorSidebar from "../components/CounsellorSidebar";
import Topbar from "../components/Topbar";

import axios from "axios";

const CounsellorAccount = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [counsellor, setCounsellor] =
    useState(null);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  useEffect(() => {
    const fetchCounsellor =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await axios.get(
              "https://vritti-piny.onrender.com/api/counsellors/me",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          setCounsellor(res.data);
        } catch (err) {
          console.error(
            "❌ Error fetching counsellor:",
            err
          );
        }
      };

    fetchCounsellor();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

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
      <CounsellorSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div
        className="
          flex-1
          flex
          flex-col

          lg:ml-64

          overflow-y-auto
          h-screen
        "
      >
        {/* Topbar */}
        <Topbar
          showMenu
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        {/* Account Section */}
        <div
          className="
            pt-20
            lg:pt-6

            flex-1

            p-4
            sm:p-6
            xl:p-8

            overflow-y-auto
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="
              bg-[#fdf6e3]
              dark:bg-gray-800

              w-full

              rounded-2xl
              shadow-xl

              p-6
              sm:p-8
              md:p-10

              border
              border-green-200
              dark:border-gray-700
            "
          >
            {/* Heading */}
            <h2
              className="
                text-2xl
                sm:text-3xl

                font-extrabold

                text-green-900
                dark:text-gray-100

                mb-8

                text-center
              "
            >
              Account Details
            </h2>

            {/* Account Info */}
            {counsellor && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 0.6,
                }}
                className="
                  flex
                  flex-col

                  gap-6
                "
              >
                {/* Name */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  className="
                    flex
                    items-center

                    gap-4

                    p-5

                    rounded-xl
                    shadow-md

                    bg-green-900
                    dark:bg-green-800

                    text-white
                  "
                >
                  <User
                    className="
                      text-yellow-300

                      w-7
                      h-7

                      flex-shrink-0
                    "
                  />

                  <div className="min-w-0">
                    <h3
                      className="
                        text-sm
                        text-gray-200
                      "
                    >
                      Name
                    </h3>

                    <p
                      className="
                        text-lg
                        font-semibold

                        break-words
                      "
                    >
                      {counsellor?.name ||
                        "Loading..."}
                    </p>
                  </div>
                </motion.div>

                {/* Role */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  className="
                    flex
                    items-center

                    gap-4

                    p-5

                    rounded-xl
                    shadow-md

                    bg-green-900
                    dark:bg-green-800

                    text-white
                  "
                >
                  <Shield
                    className="
                      text-yellow-300

                      w-7
                      h-7

                      flex-shrink-0
                    "
                  />

                  <div>
                    <h3
                      className="
                        text-sm
                        text-gray-200
                      "
                    >
                      Role
                    </h3>

                    <p
                      className="
                        text-lg
                        font-semibold

                        capitalize
                      "
                    >
                      {counsellor?.role ||
                        "Counsellor"}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Buttons */}
            <div
              className="
                mt-10

                flex
                flex-col

                gap-4
              "
            >
              {/* Logout */}
              <motion.button
                whileHover={{
                  scale: 1.03,
                  backgroundColor:
                    "#dc2626",
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={handleLogout}
                className="
                  w-full

                  bg-red-500

                  text-white

                  py-3

                  rounded-xl

                  font-semibold

                  shadow-md

                  transition
                "
              >
                Log Out
              </motion.button>

              {/* Dashboard */}
              <motion.button
                whileHover={{
                  scale: 1.03,
                  backgroundColor:
                    "#14532d",
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={() =>
                  navigate(
                    "/counsellor-dashboard"
                  )
                }
                className="
                  w-full

                  bg-green-900
                  dark:bg-green-700

                  text-white

                  py-3

                  rounded-xl

                  font-semibold

                  shadow-md

                  transition
                "
              >
                Go to Dashboard
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorAccount;