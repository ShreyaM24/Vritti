import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import VolunteerSidebar from "../components/VolunteerSidebar";

const VolunteerAccount = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser({ name: "Unknown", role: "volunteer" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!user) {
    return <p className="text-center mt-20 dark:text-white">Loading account...</p>;
  }

  return (
    <div className="flex min-h-screen bg-[#fdf6e3] dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64">
        <VolunteerSidebar />
      </div>

      {/* Main */}
      <div className="ml-64 flex-1 flex flex-col">
        <div className="sticky top-0 z-20 bg-[#fdf6e3] dark:bg-gray-900 shadow">
          <Topbar />
        </div>

        {/* Account Content */}
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-xl">
            <h1 className="text-2xl font-bold text-center mb-8 dark:text-white">
              Account Details
            </h1>

            {/* Role */}
            <div className="bg-green-700 px-6 py-4 rounded-xl mb-4 flex justify-between items-center text-white">
              <span className="font-semibold">Role</span>
              <span className="capitalize">{user.role}</span>
            </div>

            {/* Buttons */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 dark:bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-600 dark:hover:bg-red-700 transition mb-3"
            >
              Log Out
            </button>
            <a
              href="/volunteer-dashboard"
              className="block text-center w-full bg-green-700 dark:bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-800 dark:hover:bg-green-700 transition"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerAccount;
