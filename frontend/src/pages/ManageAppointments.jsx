import React, { useEffect, useState } from "react";
import Sidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";
import axios from "axios";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [counsellors, setCounsellors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", specialization: "", email: "", phone: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAppointments();
    fetchCounsellors();
  }, [token]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

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

  const handleAddCounsellor = async () => {
    try {
      await axios.post("http://localhost:4000/api/counsellors", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      setForm({ name: "", specialization: "", email: "", phone: "" });
      fetchCounsellors();
    } catch (err) {
      console.error("Error adding counsellor:", err);
    }
  };

  const updateAppointment = async (id, date, time) => {
    try {
      await axios.put(
        `http://localhost:4000/api/appointments/${id}`,
        { date, time, status: "scheduled" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAppointments();
    } catch (err) {
      console.error("Error updating appointment:", err);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Error deleting appointment:", err);
    }
  };

  const getAppointmentCount = (counsellorId) =>
    appointments.filter((appt) => appt.counsellor?._id === counsellorId).length;

  return (
    <div className="flex min-h-screen bg-[#fdf6e3] dark:bg-gray-950 transition-colors">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col ml-64">
        {/* Topbar */}
        <Topbar title="Manage Appointments" />

        <div className="p-8 space-y-12">
          {/* Counsellors Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-green-900 dark:text-white">
                Counsellors
              </h1>
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                + Add Counsellor
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {counsellors.map((c) => (
                <div
                  key={c._id}
                  className="bg-green-600 dark:bg-green-800 text-white rounded-2xl p-6 flex flex-col items-center shadow-lg transition"
                >
                  <h3 className="text-xl font-bold">{c.name}</h3>
                  <p className="text-sm italic">{c.specialization}</p>
                  <p className="text-xs mt-1">{c.email}</p>
                  <p className="text-xs">{c.phone}</p>

                  <div className="flex gap-3 mt-4">
                    <button className="relative bg-green-200 dark:bg-green-700 text-green-900 dark:text-white px-4 py-2 rounded-full font-semibold hover:bg-green-300 dark:hover:bg-green-600 transition">
                      Appointments
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {getAppointmentCount(c._id)}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appointments Section */}
          <div>
            <h2 className="text-2xl font-bold text-green-900 dark:text-white mb-6">
              All Appointments
            </h2>
            <div className="space-y-4">
              {appointments.map((appt) => (
                <div
                  key={appt._id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center transition"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Student: {appt.student?.username}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Counsellor: {appt.counsellor?.name}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">Mode: {appt.mode}</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {appt.status === "scheduled"
                        ? `${appt.date}, ${appt.time}`
                        : "Pending..."}
                    </p>
                  </div>

                  {appt.status === "pending" ? (
                    <div className="flex gap-2 items-center">
                      <input
                        type="date"
                        className="border px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        onChange={(e) =>
                          setAppointments((prev) =>
                            prev.map((a) =>
                              a._id === appt._id ? { ...a, tempDate: e.target.value } : a
                            )
                          )
                        }
                      />
                      <input
                        type="time"
                        className="border px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        onChange={(e) =>
                          setAppointments((prev) =>
                            prev.map((a) =>
                              a._id === appt._id ? { ...a, tempTime: e.target.value } : a
                            )
                          )
                        }
                      />
                      <button
                        onClick={() =>
                          updateAppointment(appt._id, appt.tempDate, appt.tempTime)
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="text-green-700 dark:text-green-300 font-semibold">
                      Status: Scheduled
                    </p>
                  )}

                  <button
                    onClick={() => deleteAppointment(appt._id)}
                    className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Counsellor Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-green-900 dark:text-white">
              Add Counsellor
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 mb-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Specialization"
              value={form.specialization}
              onChange={(e) => setForm({ ...form, specialization: e.target.value })}
              className="w-full p-2 mb-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 mb-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-2 mb-4 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCounsellor}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAppointments;
