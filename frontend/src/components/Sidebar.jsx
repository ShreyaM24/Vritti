import React from "react";
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
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

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
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="fixed top-0 left-0 w-64 
                 bg-green-900 text-white 
                 dark:bg-gray-950 dark:text-gray-100
                 h-screen flex flex-col justify-between 
                 p-5 shadow-xl z-50 transition-colors duration-300"
    >
      {/* Logo */}
      <div className="flex flex-col items-center mb-8 mt-4">
        <h1 className="text-3xl font-serif tracking-widest text-green-300 dark:text-green-400">
          VRITTI
        </h1>
      </div>

      {/* Top Menu Items */}
      <div className="flex-1 flex flex-col justify-start space-y-4 mt-2">
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

      {/* Bottom Menu */}
      <div className="space-y-4 border-t border-gray-800 dark:border-gray-700 pt-6 mt-6">
        {bottomMenu.map((item, i) => (
          <SidebarItem
            key={i}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}

        <SidebarItem
          icon={<HelpCircle size={20} />}
          label={t("sidebar.help")}
          active={location.pathname === "/help"}
          onClick={() => navigate("/help")}
        />
      </div>
    </motion.div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{
        scale: 1.04,
        boxShadow: "0 0 12px rgba(0,0,0,0.35)",
      }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer text-sm font-medium transition-all duration-300
        ${
          active
            ? "bg-green-600 text-white dark:bg-green-500 dark:text-white"
            : "text-gray-200 hover:bg-green-700 hover:text-white dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-300"
        }`}
    >
      {icon}
      <span>{label}</span>
    </motion.div>
  );
};

export default Sidebar;