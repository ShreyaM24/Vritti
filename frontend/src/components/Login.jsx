import React, { useState } from "react";
import loginImg from "../assets/signup.png";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { login, setToken } from "../api";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const username = e.target.username?.value?.trim();
    const email = e.target.email?.value?.trim();
    const password = e.target.password?.value?.trim();

    try {
      // Build request body
      const body =
        role === "student"
          ? { username, password }
          : { email, password };

      const res = await login(body);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token
      if (data.token) {
        setToken(data.token);
      }

      // Save full user object
      localStorage.setItem("user", JSON.stringify(data.user));

      // Save username separately
      localStorage.setItem(
        "username",
        data.user?.name || data.user?.username || "User"
      );

      // Optional callback
      if (onLogin) {
        onLogin(data.user);
      }

      // Navigate based on role
      const actualRole = data.user?.role;

      if (actualRole === "admin") {
        navigate("/admin-dashboard");
      } else if (actualRole === "counsellor") {
        navigate("/counsellor-dashboard");
      } else if (actualRole === "volunteer") {
        navigate("/volunteer-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] dark:bg-gray-950 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row w-full max-w-5xl rounded-3xl shadow-xl overflow-hidden bg-white dark:bg-gray-900"
      >
        {/* Left Section */}
        <div className="relative lg:w-1/2 bg-green-900 dark:bg-green-800 p-8 md:p-10 text-white flex flex-col justify-between items-center">
          <motion.h2
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mt-4 md:mt-10 text-center"
          >
            Welcome Back!
          </motion.h2>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center justify-center flex-1 mt-6"
          >
            <img
              src={loginImg}
              alt="Login"
              className="max-h-56 md:max-h-72 object-contain drop-shadow-xl"
            />
          </motion.div>
        </div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:w-1/2 bg-[#fdf6e3] dark:bg-gray-800 p-6 sm:p-8 md:p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
            Login to Your Account
          </h2>

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            {/* Role */}
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full p-3 rounded-full bg-[#fffaf0] dark:bg-gray-700 border border-[#e6ddc5] dark:border-gray-600 text-sm md:text-base"
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="counsellor">Counsellor</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>

            {/* Username / Email */}
            {role === "student" ? (
              <input
                name="username"
                type="text"
                placeholder="Username"
                required
                className="w-full p-3 rounded-full border border-green-900/30 dark:border-gray-600 text-sm md:text-base"
              />
            ) : (
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                className="w-full p-3 rounded-full border border-green-900/30 dark:border-gray-600 text-sm md:text-base"
              />
            )}

            {/* Password */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full p-3 rounded-full border border-green-900/30 dark:border-gray-600 text-sm md:text-base"
            />

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-green-900 text-white py-3 rounded-full font-semibold shadow-md hover:bg-green-800 transition"
            >
              {loading ? "Logging in..." : "Log In"}
            </motion.button>

            {/* Error */}
            {error && (
              <p className="text-center text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Demo Accounts */}
            <div className="mt-2 p-4 rounded-2xl bg-green-50 dark:bg-gray-700 border border-green-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200">
              <h3 className="font-semibold mb-3 text-center text-base">
                Demo Accounts
              </h3>

              <div className="space-y-2 break-words">
                <p>
                  <strong>Student:</strong> Shreya / 12345
                </p>

                <p>
                  <strong>Admin:</strong> admin@gmail.com / 12345
                </p>

                <p>
                  <strong>Counsellor:</strong> counsellor@gmail.com / 12345
                </p>

                <p>
                  <strong>Volunteer:</strong> volunteer@gmail.com / 12345
                </p>
              </div>
            </div>

            {/* Signup */}
            <p className="text-center text-sm text-gray-700 dark:text-gray-400 mt-2">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-green-700 dark:text-green-400 hover:underline"
              >
                Create one
              </Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;