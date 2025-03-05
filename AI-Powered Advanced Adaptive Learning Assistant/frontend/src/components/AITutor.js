import React, { useState } from "react";

const AITutor = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskTutor = async () => {
    if (!input.trim()) return; // Prevent empty input
    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const res = await fetch("http://localhost:5000/api/tutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setResponse(data.answer || "No recommendations found.");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("⚠️ Error fetching recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-green-400">AI Tutor</h2>

      {/* Input Box */}
      <div className="mt-4">
        <textarea
          className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
          rows="3"
          placeholder="Ask me anything about your courses..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {/* Ask Button */}
      <button
        className="mt-3 px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-md"
        onClick={handleAskTutor}
        disabled={loading}
      >
        {loading ? "Processing..." : "Ask Tutor"}
      </button>

      {/* Response Section */}
      <div className="mt-4 p-4 bg-gray-700 rounded-md">
        <h3 className="text-lg font-semibold text-green-300">Response:</h3>
        {loading ? (
          <p className="text-gray-400">⏳ Loading recommendations...</p>
        ) : (
          <p className="mt-2 text-white">{response}</p>
        )}
      </div>
    </div>
  );
};

export default AITutor;