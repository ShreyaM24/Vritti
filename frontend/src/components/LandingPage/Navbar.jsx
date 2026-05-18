// src/components/Navbar.jsx
import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const links = ["Home", "About", "Features", "Contact"];

  const [activeLink, setActiveLink] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const { theme, setTheme } = useContext(ThemeContext);

  // Active section on scroll
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;

      links.forEach((link) => {
        const section = document.getElementById(
          link.toLowerCase().replace(" ", "")
        );

        if (section) {
          if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
          ) {
            setActiveLink(link);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Smooth scroll
  const handleSmoothScroll = (e, id) => {
    if (location.pathname === "/") {
      e.preventDefault();

      const section = document.getElementById(id.replace(" ", ""));

      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: "smooth",
        });

        setMenuOpen(false);
      }
    }
  };

  // Theme toggle
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full 
                 bg-green-900 text-white 
                 dark:bg-gray-950 dark:text-gray-100 
                 shadow-md"
    >
      <div className="flex justify-between items-center px-6 md:px-12 py-4">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            type: "spring",
          }}
          className="text-2xl font-extrabold cursor-pointer text-white dark:text-green-200"
          onClick={(e) => handleSmoothScroll(e, "home")}
        >
          Vritti
        </motion.div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 font-medium">
          {links.map((link, index) => (
            <motion.li
              key={link}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + index * 0.2,
                duration: 0.5,
              }}
              className="relative group"
            >
              <a
                href={`/#${link.toLowerCase().replace(" ", "")}`}
                onClick={(e) =>
                  handleSmoothScroll(
                    e,
                    link.toLowerCase().replace(" ", "")
                  )
                }
                className={`transition ${
                  activeLink === link && location.pathname === "/"
                    ? "font-semibold underline text-green-300 dark:text-green-400"
                    : "hover:underline hover:text-green-200 dark:hover:text-green-300"
                }`}
              >
                {link}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Desktop Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="hidden md:flex items-center gap-4"
        >
          {/* Theme Toggle */}
          <div
            onClick={toggleTheme}
            className={`w-12 h-6 rounded-full p-1 cursor-pointer flex items-center transition-colors ${
              theme === "dark" ? "bg-green-700" : "bg-gray-300"
            }`}
          >
            <motion.div
              layout
              className="w-4 h-4 bg-white rounded-full shadow"
              transition={{
                type: "spring",
                stiffness: 700,
                damping: 30,
              }}
              style={{
                transform:
                  theme === "dark"
                    ? "translateX(24px)"
                    : "translateX(0px)",
              }}
            />
          </div>

          {/* Login */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="px-5 py-2 rounded-full font-medium 
                         bg-[#f3f0df] text-green-900 hover:bg-[#e6e2d0] 
                         dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 
                         transition-all duration-300"
            >
              Login
            </Link>
          </motion.div>

          {/* Signup */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/signup"
              className="px-5 py-2 rounded-full font-medium 
                         bg-[#f3f0df] text-green-900 hover:bg-[#e6e2d0] 
                         dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 
                         transition-all duration-300"
            >
              Sign up
            </Link>
          </motion.div>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 pb-6 bg-green-900 dark:bg-gray-950"
          >
            <ul className="flex flex-col gap-5 font-medium mb-6">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href={`/#${link.toLowerCase().replace(" ", "")}`}
                    onClick={(e) =>
                      handleSmoothScroll(
                        e,
                        link.toLowerCase().replace(" ", "")
                      )
                    }
                    className={`transition ${
                      activeLink === link &&
                      location.pathname === "/"
                        ? "font-semibold text-green-300"
                        : "hover:text-green-200"
                    }`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Bottom */}
            <div className="flex flex-col gap-4">
              {/* Theme Toggle */}
              <div
                onClick={toggleTheme}
                className={`w-12 h-6 rounded-full p-1 cursor-pointer flex items-center transition-colors ${
                  theme === "dark"
                    ? "bg-green-700"
                    : "bg-gray-300"
                }`}
              >
                <motion.div
                  layout
                  className="w-4 h-4 bg-white rounded-full shadow"
                  transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 30,
                  }}
                  style={{
                    transform:
                      theme === "dark"
                        ? "translateX(24px)"
                        : "translateX(0px)",
                  }}
                />
              </div>

              {/* Login */}
              <Link
                to="/login"
                className="px-5 py-3 rounded-full text-center font-medium 
                           bg-[#f3f0df] text-green-900 hover:bg-[#e6e2d0] 
                           dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 
                           transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              {/* Signup */}
              <Link
                to="/signup"
                className="px-5 py-3 rounded-full text-center font-medium 
                           bg-[#f3f0df] text-green-900 hover:bg-[#e6e2d0] 
                           dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 
                           transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;