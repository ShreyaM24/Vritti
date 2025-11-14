// src/components/AdminSidebar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  MessageSquare,
  Inbox,
  Calendar,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: t("admin.dashboard"), path: "/admin-dashboard" },
    { icon: <Calendar size={20} />, label: t("admin.manageAppointments", "Manage Appointments"), path: "/manage-appointments" },
    { icon: <MessageSquare size={20} />, label: t("admin.communityForum", "Community Forum"), path: "/community-forum" },
    { icon: <Inbox size={20} />, label: t("admin.feedbackInbox"), path: "/feedback-inbox" },
    { icon: <User size={20} />, label: t("admin.myAccount", "My Account"), path: "/admin-account" },
    { icon: <Settings size={20} />, label: t("admin.settings", "Settings"), path: "/admin-settings" },
  ];

  const bottomMenu = [
    { icon: <LogOut size={20} />, label: t("admin.signOut", "Sign Out"), onClick: handleSignOut },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="fixed top-0 left-0 w-64 
                 bg-green-900 text-white 
                 dark:bg-gray-950 dark:text-gray-100
                 h-screen flex flex-col justify-between 
                 p-4 shadow-xl z-50 transition-colors duration-300"
    >
      {/* Logo */}
      <div className="flex flex-col items-center mb-6 mt-4">
        <h1 className="text-3xl font-serif tracking-widest text-green-300 dark:text-green-400">
          VRITTI
        </h1>
      </div>

      {/* Menu items */}
      <div className="flex-1 flex flex-col justify-start space-y-2">
        {menuItems.map((item, i) => (
          <SidebarItem
            key={i}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>

      {/* Bottom menu */}
      <div className="space-y-2 border-t border-gray-800 dark:border-gray-700 pt-4">
        {bottomMenu.map((item, i) => (
          <SidebarItem
            key={i}
            icon={item.icon}
            label={item.label}
            active={false}
            onClick={item.onClick}
          />
        ))}
      </div>
    </motion.div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(0,0,0,0.4)" }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ type: "spring", stiffness: 120, damping: 15 }}
    className={`flex items-center gap-3 px-4 py-2 rounded-2xl cursor-pointer text-sm transition
      ${active
        ? "bg-green-600 text-white dark:bg-green-500 dark:text-white"
        : "text-gray-200 hover:bg-green-700 hover:text-white dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-300"
      }`}
  >
    {icon}
    <span>{label}</span>
  </motion.div>
);

export default AdminSidebar;
