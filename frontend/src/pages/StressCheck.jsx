// src/pages/StressCheck.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const phq9Questions = [
  { qKey: "q1", text: "Little interest or pleasure in doing things" },
  { qKey: "q2", text: "Feeling down, depressed, or hopeless" },
  { qKey: "q3", text: "Trouble falling or staying asleep, or sleeping too much" },
  { qKey: "q4", text: "Feeling tired or having little energy" },
  { qKey: "q5", text: "Poor appetite or overeating" },
  { qKey: "q6", text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down" },
  { qKey: "q7", text: "Trouble concentrating on things, such as reading or watching television" },
  { qKey: "q8", text: "Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving a lot more than usual" },
  { qKey: "q9", text: "Thoughts that you would be better off dead, or thoughts of hurting yourself" },
];

const options = [
  { key: "notAtAll", label: "Not at all", value: 0 },
  { key: "severalDays", label: "Several days", value: 1 },
  { key: "moreThanHalf", label: "More than half the days", value: 2 },
  { key: "nearlyEveryDay", label: "Nearly every day", value: 3 },
];

const StressCheck = () => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  // Load saved answers
  useEffect(() => {
    const saved = localStorage.getItem("phq9Answers");
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  // Save answers to localStorage
  useEffect(() => {
    localStorage.setItem("phq9Answers", JSON.stringify(answers));
  }, [answers]);

  const handleSelect = (qIdx, optKey) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: optKey }));
  };

  const handleSubmit = async () => {
    // Map answers into numeric values
    const answersArray = phq9Questions.map((_, idx) => {
      const selected = answers[idx];
      const opt = options.find((o) => o.key === selected);
      return opt ? opt.value : 0;
    });

    const totalScore = answersArray.reduce((a, b) => a + b, 0);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/api/phq9", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers: answersArray, totalScore }),
      });

      if (res.ok) {
        navigate("/analytics"); // ✅ redirect after save
      } else {
        alert("❌ Failed to save assessment");
      }
    } catch (err) {
      console.error("❌ Error submitting PHQ-9", err);
      alert("❌ Error submitting assessment");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fdf6e3] dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 flex-shrink-0 h-screen fixed">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-64 overflow-y-auto h-screen">
        {/* Topbar */}
        <div className="sticky top-0 z-10">
          <Topbar title="Stress Check (PHQ-9)" />
        </div>

        {/* Stress Check Section */}
        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-green-900 dark:text-gray-100 mb-6">
            PHQ-9 Questionnaire
          </h1>

          {/* Questions */}
          <div className="space-y-6">
            {phq9Questions.map((item, idx) => (
              <div
                key={idx}
                className="bg-green-900 dark:bg-green-800 text-white rounded-2xl p-6 shadow-lg transition-colors"
              >
                <h2 className="text-lg font-semibold mb-4">
                  {idx + 1}. {item.text}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {options.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => handleSelect(idx, opt.key)}
                      className={`px-4 py-2 rounded-xl transition-colors ${
                        answers[idx] === opt.key
                          ? "bg-yellow-400 text-black font-semibold"
                          : "bg-green-800 hover:bg-green-700 text-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800"
            >
              Submit
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StressCheck;
