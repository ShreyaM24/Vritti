import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Calendar,
  MessageSquare,
  Settings,
  User,
  LogOut,
  HelpCircle,
  PhoneCall,
  Users,
  Menu,
  X,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar automatically on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: t("sidebar.dashboard"),
      path: "/dashboard",
    },
    {
      icon: <BarChart3 size={20} />,
      label: t("sidebar.analytics"),
      path: "/analytics",
    },
    {
      icon: <Calendar size={20} />,
      label: t("sidebar.calendar"),
      path: "/calendar",
    },
    {
      icon: <MessageSquare size={20} />,
      label: t("sidebar.feedback"),
      path: "/feedback",
    },
    {
      icon: <Settings size={20} />,
      label: t("sidebar.settings"),
      path: "/settings",
    },
    {
      icon: <Users size={20} />,
      label: t("sidebar.psychologist_connect"),
      path: "/doctor",
    },
    {
      icon: <PhoneCall size={20} />,
      label: t("sidebar.emergency_helpline"),
      path: "/emergency-helpline",
    },
  ];

  const bottomMenu = [
    {
      icon: <User size={20} />,
      label: t("sidebar.my_account"),
      path: "/account",
    },
    {
      icon: <LogOut size={20} />,
      label: t("sidebar.sign_out"),
      path: "/login",
    },
  ];

  return (
    <>
      {/* Mobile Navbar */}
      <div
        className="
          lg:hidden
          fixed top-0 left-0 right-0
          h-16
          z-40
          bg-green-900 dark:bg-gray-950
          flex items-center justify-between
          px-4
          shadow-lg
        "
      >
        <h1 className="text-2xl font-serif tracking-widest text-green-300">
          VRITTI
        </h1>

        <button
          onClick={() => setIsOpen(true)}
          className="text-white"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{
          x: isOpen ? 0 : -320,
        }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 18,
        }}
        className="
          fixed top-0 left-0
          z-50 lg:z-30
          
          w-[280px] sm:w-64
          h-screen

          bg-green-900
          dark:bg-gray-950

          text-white dark:text-gray-100

          flex flex-col justify-between

          px-4 py-5

          shadow-2xl
          transition-colors duration-300

          lg:translate-x-0
        "
      >
        {/* Mobile Close */}
        <div className="lg:hidden flex justify-end mb-2">
          <button onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <h1
            className="
              text-3xl
              font-serif
              tracking-widest
              text-green-300 dark:text-green-400
            "
          >
            VRITTI
          </h1>
        </div>

        {/* Menu */}
        <div
          className="
            flex-1
            overflow-y-auto
            pr-1

            flex flex-col
            gap-3
          "
        >
          {menuItems.map((item, i) => (
            <SidebarItem
              key={i}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
            />
          ))}
        </div>

        {/* Bottom */}
        <div
          className="
            border-t border-gray-700
            pt-5 mt-5

            flex flex-col
            gap-3
          "
        >
          {bottomMenu.map((item, i) => (
            <SidebarItem
              key={i}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
            />
          ))}

          <SidebarItem
            icon={<HelpCircle size={20} />}
            label={t("sidebar.help")}
            active={location.pathname === "/help"}
            onClick={() => {
              navigate("/help");
              setIsOpen(false);
            }}
          />
        </div>
      </motion.aside>

      {/* Desktop Sidebar Spacer */}
      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 12px rgba(0,0,0,0.35)",
      }}
      whileTap={{ scale: 0.97 }}
      className={`
        flex items-center gap-3

        px-4 py-3

        rounded-2xl
        cursor-pointer

        text-sm sm:text-base
        font-medium

        transition-all duration-300

        ${
          active
            ? "bg-green-600 text-white dark:bg-green-500"
            : "text-gray-200 hover:bg-green-700 hover:text-white dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-300"
        }
      `}
    >
      <div className="min-w-[20px] flex justify-center">
        {icon}
      </div>

      <span className="leading-snug break-words">
        {label}
      </span>
    </motion.div>
  );
};

export default Sidebar;