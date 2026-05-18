import React, { useEffect, useState } from "react";
import CounsellorSidebar from "../components/CounsellorSidebar";
import Topbar from "../components/Topbar";
import axios from "axios";

const CounsellorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://vritti-piny.onrender.com/api/appointments/counsellor", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Error fetching counsellor appointments:", err));
  }, [token]);

  return (
    <div className="flex min-h-screen bg-[#fdf6e3] dark:bg-gray-950 overflow-x-hidden">
      <CounsellorSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col lg:ml-64 overflow-y-auto h-screen">
        <div className="sticky top-0 z-20 bg-[#fdf6e3] dark:bg-gray-900 shadow">
          <Topbar
            showMenu={true}
            onMenuClick={() => setSidebarOpen((prev) => !prev)}
          />
        </div>

        <div className="pt-20 lg:pt-6 p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl font-bold text-green-900 dark:text-white mb-6">
            My Appointment Schedule
          </h1>

          <div className="bg-green-900 dark:bg-green-800 text-white p-6 rounded-3xl shadow-md">
            {appointments.length > 0 ? (
              <ul className="space-y-3">
                {appointments.map((appt) => (
                  <li
                    key={appt._id}
                    className="bg-green-800 dark:bg-green-700 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div>
                      <p className="font-semibold dark:text-white">{appt.student?.username}</p>
                      <p className="text-sm text-gray-200 dark:text-gray-300">
                        {appt.date}, {appt.time} ({appt.mode})
                      </p>
                    </div>
                    <span className="text-sm dark:text-white">{appt.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dark:text-white">No appointments assigned yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorAppointments;
