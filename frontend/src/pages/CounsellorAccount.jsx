// src/pages/CounsellorAccount.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Shield } from "lucide-react";
import CounsellorSidebar from "../components/CounsellorSidebar";
import Topbar from "../components/Topbar";
import axios from "axios";

const CounsellorAccount = () => {
  const navigate = useNavigate();
  const [counsellor, setCounsellor] = useState(null);

  useEffect(() => {
    const fetchCounsellor = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/counsellors/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCounsellor(res.data);
      } catch (err) {
        console.error("❌ Error fetching counsellor:", err);
      }
    };
    fetchCounsellor();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64">
        <CounsellorSidebar />
      </div>

      {/* Main content */}
      <div className="ml-64 flex-1 flex flex-col">
        <Topbar />

        <div className="flex justify-center items-center flex-1 p-6">
          <div className="bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-3xl">
            <h1 className="text-3xl font-bold text-white text-center mb-8">
              Account Details
            </h1>

            {/* Name */}
            <div className="bg-green-800 text-white p-6 rounded-lg flex items-center gap-4 mb-6">
              <User size={28} className="text-yellow-300" />
              <div>
                <p className="text-sm">Name</p>
                <p className="text-lg font-bold">{counsellor?.name || "Loading..."}</p>
              </div>
            </div>

            {/* Role */}
            <div className="bg-green-800 text-white p-6 rounded-lg flex items-center gap-4 mb-6">
              <Shield size={28} className="text-yellow-300" />
              <div>
                <p className="text-sm">Role</p>
                <p className="text-lg font-bold">{counsellor?.role || "counsellor"}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg"
              >
                Log Out
              </button>
              <button
                onClick={() => navigate("/counsellor-dashboard")}
                className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorAccount;
