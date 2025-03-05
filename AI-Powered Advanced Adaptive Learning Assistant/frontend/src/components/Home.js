import React, { useState } from "react";
import Dashboard from "./Dashboard";
import CourseModules from "./CourseModules";
import AITutor from "./AITutor";
import GamifiedLearning from "./GamifiedLearning";
import NotesResources from "./NotesResources";
import Settings from "./Settings";

const Home = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "courses", label: "Courses" },
    { id: "tutor", label: "AI Tutor" },
    { id: "games", label: "Gamified" },
    { id: "notes", label: "Notes" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="p-4 bg-gray-800 flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI Learning Assistant</h1>
        <div className="space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-2 rounded transition duration-300 ${
                activeTab === tab.id ? "bg-green-600" : "bg-green-500 hover:bg-green-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Dynamic Content */}
      <div className="p-6">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "courses" && <CourseModules />}
        {activeTab === "tutor" && <AITutor />}
        {activeTab === "games" && <GamifiedLearning />}
        {activeTab === "notes" && <NotesResources />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  );
};

export default Home;
