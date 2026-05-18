import React from "react";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  MessageCircle,
  User,
  LogOut,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VolunteerSidebar = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => setIsOpen(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    handleClose();
  };

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: t("volunteer.dashboard"),
      path: "/volunteer-dashboard",
    },
    {
      icon: <MessageCircle size={20} />,
      label: t("volunteer.communityChat"),
      path: "/volunteer-community-chat",
    },
  ];

  const bottomMenu = [
    {
      icon: <User size={20} />,
      label: t("myAccount", "My Account"),
      onClick: () => navigate("/volunteer-account"),
    },
    {
      icon: <LogOut size={20} />,
      label: t("logout", "Sign Out"),
      onClick: handleSignOut,
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="fixed top-0 left-0 h-full w-72 lg:w-64 z-50 bg-green-900 text-white dark:bg-gray-950 flex flex-col justify-between p-4 shadow-xl"
      >
        {/* Header (mobile close) */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <h1 className="text-2xl font-serif tracking-widest text-green-300">
            VRITTI
          </h1>

          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-green-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Logo desktop */}
        <div className="hidden lg:flex justify-center mb-6 mt-4">
          <h1 className="text-3xl font-serif tracking-widest text-green-300">
            VRITTI
          </h1>
        </div>

        {/* Menu */}
        <div className="flex-1 space-y-2">
          {menuItems.map((item, i) => (
            <SidebarItem
              key={i}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                handleClose();
              }}
            />
          ))}
        </div>

        {/* Bottom menu */}
        <div className="space-y-2 border-t border-gray-800 pt-4">
          {bottomMenu.map((item, i) => (
            <SidebarItem
              key={i}
              icon={item.icon}
              label={item.label}
              onClick={() => {
                item.onClick();
                handleClose();
              }}
            />
          ))}
        </div>
      </motion.aside>
    </>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center gap-3 px-4 py-2 rounded-2xl cursor-pointer text-sm transition
      ${
        active
          ? "bg-green-600 text-white"
          : "text-gray-200 hover:bg-green-700 hover:text-white"
      }`}
  >
    {icon}
    <span>{label}</span>
  </motion.div>
);

export default VolunteerSidebar;