import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Doctor = () => {
  const { t } = useTranslation();
  const [counsellors, setCounsellors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCounsellors();
    fetchAppointments();
  }, [token]);

  const fetchCounsellors = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/counsellors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCounsellors(res.data);
    } catch (err) {
      console.error("Error fetching counsellors:", err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/appointments/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const handleBook = async (counsellorId) => {
    const mode = window.prompt("Choose: chat, call, video, offline");
    if (!mode || !["chat", "call", "video", "offline"].includes(mode.toLowerCase())) {
      alert("Invalid mode! Please choose chat, call, video, or offline.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:4000/api/appointments",
        { counsellor: counsellorId, mode: mode.toLowerCase() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAppointments();
      alert("Appointment request sent!");
    } catch (err) {
      console.error("Error booking appointment:", err.response?.data || err.message);
      alert("Failed to book appointment: " + (err.response?.data?.error || "Server error"));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (err) {
      console.error("Error deleting appointment:", err);
      alert("Failed to delete appointment");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fdf6e3] dark:bg-gray-900 transition-colors duration-300">
  {/* Sidebar */}
  <aside className="fixed top-0 left-0 h-full w-64 bg-green-900 dark:bg-gray-800 transition-colors duration-300">
    <Sidebar />
  </aside>

  {/* Main Section */}
  <div className="flex-1 flex flex-col ml-64">
    <Topbar title={t("doctor.title", "Book a Session")} />

    <div className="flex flex-1 p-8 gap-8 overflow-y-auto">
      {/* Left: Counsellors */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-green-900 dark:text-white mb-6 transition-colors duration-300">
          Available Counsellors
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {counsellors.map((doc) => (
            <motion.div
              key={doc._id}
              whileHover={{ scale: 1.02 }}
              className="bg-green-900 dark:bg-gray-800 text-white dark:text-white p-6 rounded-2xl shadow-lg flex flex-col transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-full transition-colors duration-300">
                  <User className="text-green-900 dark:text-green-400" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold dark:text-white">{doc.name}</h3>
                  <p className="text-sm italic dark:text-gray-300">{doc.specialization}</p>
                </div>
              </div>

              {/* Contact Info */}
              <p className="text-sm mb-1 dark:text-gray-300">📧 {doc.email}</p>
              <p className="text-sm mb-3 dark:text-gray-300">📞 {doc.phone}</p>

              {/* Book button */}
              <button
                onClick={() => handleBook(doc._id)}
                className="mt-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                {t("doctor.bookSession", "Book Session")}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: My Sessions */}
      <div className="w-80">
        <div className="bg-green-900 dark:bg-gray-800 text-white dark:text-white p-6 rounded-2xl transition-colors duration-300">
          <h2 className="text-xl font-bold mb-4 dark:text-white">
            {t("doctor.mySessions", "My Sessions")}
          </h2>
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <div
                key={appt._id}
                className="mb-4 p-3 rounded-lg bg-green-800 dark:bg-gray-700 transition-colors duration-300"
              >
                <p className="font-semibold dark:text-white">
                  {appt.date ? `${appt.date}, ${appt.time}` : "Pending..."}
                </p>
                <p className="text-sm dark:text-gray-300">{appt.counsellor?.name}</p>
                <p className="text-xs italic dark:text-gray-400">
                  {t("doctor.mode", "Mode")}: {appt.mode}
                </p>
                <button
                  onClick={() => handleDelete(appt._id)}
                  className="mt-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm text-white transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-200 dark:text-gray-300 text-sm">
              {t("doctor.noSessions", "No sessions booked yet")}
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Doctor;
