// src/components/AdminSidebar.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Inbox,
  Calendar,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const AdminSidebar = ({
  isOpen: controlledIsOpen,
  setIsOpen: setControlledIsOpen,
}) => {
  const [internalOpen, setInternalOpen] =
    useState(false);

  const isControlled =
    typeof controlledIsOpen === "boolean";

  const isOpen = isControlled
    ? controlledIsOpen
    : internalOpen;

  const setIsOpen =
    setControlledIsOpen || setInternalOpen;

  // FIXED
  const showMobileToggle = true;

  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: t("admin.dashboard"),
      path: "/admin-dashboard",
    },
    {
      icon: <Calendar size={20} />,
      label: t(
        "admin.manageAppointments",
        "Manage Appointments"
      ),
      path: "/manage-appointments",
    },
    {
      icon: <MessageSquare size={20} />,
      label: t(
        "admin.communityForum",
        "Community Forum"
      ),
      path: "/community-forum",
    },
    {
      icon: <Inbox size={20} />,
      label: t("admin.feedbackInbox"),
      path: "/feedback-inbox",
    },
    {
      icon: <User size={20} />,
      label: t(
        "admin.myAccount",
        "My Account"
      ),
      path: "/admin-account",
    },
  ];

  return (
    <>
      {/* Hamburger */}
      {showMobileToggle && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            lg:hidden

            fixed
            top-4
            left-4
            z-[60]

            flex
            items-center
            justify-center

            w-12
            h-12

            rounded-2xl

            bg-green-900
            dark:bg-gray-800

            text-white

            shadow-2xl

            backdrop-blur-md
          "
        >
          <Menu size={24} />
        </button>
      )}

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setIsOpen(false)
            }
            className="
              fixed
              inset-0
              z-40

              bg-black/50
              backdrop-blur-sm

              lg:hidden
            "
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x:
            isOpen ||
            window.innerWidth >= 1024
              ? 0
              : -320,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 25,
        }}
        className="
          fixed
          top-0
          left-0
          z-50

          h-screen
          w-72
          lg:w-64

          bg-green-900
          dark:bg-gray-950

          text-white

          flex
          flex-col

          shadow-2xl
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between

            px-6
            py-5

            border-b
            border-green-800
            dark:border-gray-800
          "
        >
          <h1
            className="
              text-3xl
              font-serif
              tracking-[0.2em]

              text-green-300
            "
          >
            VRITTI
          </h1>

          {/* Close */}
          <button
            onClick={() =>
              setIsOpen(false)
            }
            className="
              lg:hidden

              flex
              items-center
              justify-center

              w-10
              h-10

              rounded-xl

              bg-green-800
              hover:bg-green-700

              transition
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <div
          className="
            flex-1
            overflow-y-auto

            px-4
            py-6

            space-y-2
          "
        >
          {menuItems.map((item, i) => (
            <SidebarItem
              key={i}
              icon={item.icon}
              label={item.label}
              active={
                location.pathname ===
                item.path
              }
              onClick={() => {
                navigate(item.path);

                if (
                  window.innerWidth < 1024
                ) {
                  setIsOpen(false);
                }
              }}
            />
          ))}
        </div>

        {/* Footer */}
        <div
          className="
            px-4
            py-5

            border-t
            border-green-800
            dark:border-gray-800
          "
        >
          <SidebarItem
            icon={<LogOut size={20} />}
            label={t(
              "admin.signOut",
              "Sign Out"
            )}
            onClick={handleSignOut}
            danger
          />
        </div>
      </motion.aside>
    </>
  );
};

const SidebarItem = ({
  icon,
  label,
  active,
  onClick,
  danger,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        w-full

        flex
        items-center
        gap-4

        px-4
        py-3

        rounded-2xl

        transition-all
        duration-300

        text-sm
        sm:text-base

        ${
          active
            ? "bg-green-600 text-white shadow-lg"
            : danger
            ? "text-red-300 hover:bg-red-500/20"
            : "text-gray-200 hover:bg-green-800 hover:text-white"
        }
      `}
    >
      <span className="flex-shrink-0">
        {icon}
      </span>

      <span className="truncate font-medium">
        {label}
      </span>
    </motion.button>
  );
};

export default AdminSidebar;