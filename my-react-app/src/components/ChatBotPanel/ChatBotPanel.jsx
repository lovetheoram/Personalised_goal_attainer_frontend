// src/components/ChatBotPanel/ChatBotPanel.jsx
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";

const API_BASE = "http://localhost:8000"; // Change to your backend URL

const ChatBotPanel = () => {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });

  const fetchHistory = async (session) => {
    try {
      const res = await fetch(`${API_BASE}/auth/chat/history/?session_id=${session}`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Optimistic UI: show user message immediately
    const newMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const res = await fetch(`${API_BASE}/auth/chat/send/`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ message: input, session_id: sessionId }),
      });
      const data = await res.json();
      if (data.session_id) setSessionId(data.session_id);

      const botMessage = { role: "bot", text: data.payload?.message || JSON.stringify(data.payload) };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Oops! Something went wrong. Try again." },
      ]);
    }
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        🤖
      </button>

      {/* Chat panel */}
      {open && (
        <div className="mt-2 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-2 font-bold flex justify-between items-center">
            <span>AI Companion</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md ${
                  msg.role === "user" ? "bg-blue-100 self-end text-right" : "bg-gray-100 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex p-2 border-t border-gray-300">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l-md focus:outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotPanel;
