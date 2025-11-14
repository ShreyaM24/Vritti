// src/components/Chat.jsx
import React, { useState, useEffect, useRef } from "react";
import { apiFetch } from "../api";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botTyping]);

  async function sendMessage() {
    if (!input.trim()) return;
    const text = input.trim();

    setMessages((m) => [...m, { who: "you", text }]);
    setInput("");
    setLoading(true);
    setBotTyping(true);

    try {
      const res = await apiFetch("/chat", {
        method: "POST",
        body: JSON.stringify({ message: text }),
      });

      const raw = await res.text();
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        data = { text: raw };
      }

      const reply = data?.text || "[no response]";

      // Delay for typing effect
      setTimeout(() => {
        setMessages((m) => [...m, { who: "bot", text: reply }]);
        setBotTyping(false);
        setLoading(false);
      }, 600);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { who: "bot", text: "Error: " + (err.message || err) },
      ]);
      setBotTyping(false);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto p-6 rounded-3xl
                    shadow-2xl bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950
                    transition-colors duration-300">
      {/* Chat messages */}
      <div className="flex-1 min-h-[250px] max-h-[400px] overflow-y-auto mb-4 space-y-3 px-2">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className={`flex ${m.who === "you" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`inline-block p-4 rounded-2xl max-w-[75%] break-words
                  ${m.who === "you"
                    ? "bg-gradient-to-br from-green-100 to-green-200 text-green-900 dark:from-green-700 dark:to-green-600 dark:text-white shadow-md"
                    : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 dark:from-gray-800 dark:to-gray-700 dark:text-gray-100 shadow-md"} 
                  transition-all`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}

          {/* Bot typing indicator */}
          {botTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div className="inline-flex p-3 rounded-2xl max-w-[50%] bg-gray-200 dark:bg-gray-800 shadow-md">
                <span className="animate-pulse text-gray-500 dark:text-gray-300">Typing...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {/* Input section */}
      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-700
                     bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-sm"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-5 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white 
                     disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md transition-all"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
