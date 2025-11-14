import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Shield } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";

const AdminAccount = () => {
  const navigate = useNavigate();

  // Get stored user details
  const username = localStorage.getItem("username") || "Admin";
  const role = "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login", { replace: true });
  };

  const handleDashboard = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div className="flex min-h-screen bg-[#fdf6e3] dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64">
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="ml-64 flex-1 p-10 flex justify-center items-center">
        <div className="w-full max-w-2xl bg-gray-800 dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Account Details
          </h2>

          {/* Name */}
          <div className="flex items-center gap-4 p-5 mb-6 rounded-xl bg-green-700 text-white">
            <User size={24} />
            <div>
              <p className="text-sm">Name</p>
              <p className="text-lg font-semibold">{username}</p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center gap-4 p-5 mb-6 rounded-xl bg-green-700 text-white">
            <Shield size={24} />
            <div>
              <p className="text-sm">Role</p>
              <p className="text-lg font-semibold">{role}</p>
            </div>
          </div>

          {/* Buttons */}
          <button
            onClick={handleLogout}
            className="w-full py-3 mb-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            Log Out
          </button>

          <button
            onClick={handleDashboard}
            className="w-full py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAccount;
