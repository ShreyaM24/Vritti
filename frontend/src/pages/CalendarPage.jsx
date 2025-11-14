// src/pages/CalendarPage.jsx
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { apiFetch } from "../api";

const CalendarPage = () => {
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    async function loadMoods() {
      try {
        const res = await apiFetch("/mood");
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error("❌ Failed to load moods", err);
      }
    }
    loadMoods();
  }, []);

  useEffect(() => {
    const entry = entries.find(
      (e) => new Date(e.date).toDateString() === selectedDate.toDateString()
    );
    setSelectedEntry(entry || null);
  }, [selectedDate, entries]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const hasEntry = entries.some(
        (e) => new Date(e.date).toDateString() === date.toDateString()
      );
      if (hasEntry) return "entry-day";
    }
    return null;
  };

  return (
    <div className="flex min-h-screen bg-[#e9e9d1] dark:bg-gray-900 transition-colors duration-300">
  {/* Sidebar */}
  <aside className="w-64 fixed bg-[#05330d] dark:bg-gray-800 h-full text-[#e9e9d1] transition-colors duration-300">
    <Sidebar />
  </aside>

  <div className="ml-64 flex-1 flex flex-col">
    <Topbar title="Calendar & Reflections" />

    <motion.div className="p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-3xl font-bold mb-6 text-[#05330d] dark:text-white text-center">
        Calendar View of Your Entries
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Calendar Card */}
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors duration-300">
    <h3 className="text-lg font-semibold mb-4 text-[#05330d] dark:text-gray-100">
      Select a Date
    </h3>
    <Calendar
      onChange={setSelectedDate}
      value={selectedDate}
      tileClassName={tileClassName}
    />
  </div>

  {/* Entry Details Card */}
  <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md transition-colors duration-300">
    <h3 className="text-lg font-semibold mb-4 text-[#05330d] dark:text-white">
      Entry Details
    </h3>
    {selectedEntry ? (
      <div className="space-y-2 text-[#05330d] dark:text-gray-100">
        <p><strong>Date:</strong> {new Date(selectedEntry.date).toLocaleDateString()}</p>
        <p><strong>Mood:</strong> {selectedEntry.mood}</p>
        <p><strong>Sleep:</strong> {selectedEntry.sleep || "Not recorded"}</p>
        <p><strong>Energy:</strong> {selectedEntry.energy || "Not recorded"}</p>
        <p><strong>Habits:</strong> {selectedEntry.habits?.length > 0 ? selectedEntry.habits.join(", ") : "None"}</p>
        <p><strong>Affirmations:</strong> {selectedEntry.affirmations?.length > 0 ? selectedEntry.affirmations.join(", ") : "None"}</p>
        <p><strong>Notes:</strong> {selectedEntry.notes || "No notes"}</p>
      </div>
    ) : (
      <p className="text-gray-500 dark:text-gray-300">No entry for this date.</p>
    )}
  </div>
</div>

    </motion.div>
  </div>

<style jsx global>{`
  /* Calendar base */
  .react-calendar {
    width: 100%;
    border: none;
    font-family: inherit;
    background: inherit;
    color: inherit;
  }

  /* Tile styles */
  .react-calendar__tile {
    border-radius: 0.5rem;
    transition: all 0.2s;
    color: #1f2937; /* dark text for light mode */
  }

  .dark .react-calendar__tile {
    color: #d1fae5; /* light text for dark mode */
  }

  .react-calendar__tile:hover {
    background-color: #d1fae5;
    color: #065f46;
  }

  .dark .react-calendar__tile:hover {
    background-color: #256d5b;
    color: #ffffff;
  }

  /* Highlight days with entries */
  .entry-day {
    background-color: #bbf7d0 !important;
    border-radius: 50%;
    font-weight: 600;
    color: #065f46;
  }

  .dark .entry-day {
    background-color: #22c55e !important;
    color: #ffffff;
  }

  /* Today */
  .react-calendar__tile--now {
    border: 2px solid #16a34a;
    font-weight: 700;
  }

  .dark .react-calendar__tile--now {
    border: 2px solid #22c55e;
    color: #ffffff;
  }

  /* Weekdays */
  .react-calendar__month-view__weekdays {
    font-weight: 600;
    color: #1f2937;
  }

  .dark .react-calendar__month-view__weekdays {
    color: #d1fae5;
  }

  /* Navigation buttons */
  .react-calendar__navigation button {
    color: inherit;
  }

  .dark .react-calendar__navigation button {
    color: #d1fae5;
  }

  .dark .react-calendar__navigation button:hover {
    background-color: #115e59;
  }
`}</style>

</div>


  );
};

export default CalendarPage;
