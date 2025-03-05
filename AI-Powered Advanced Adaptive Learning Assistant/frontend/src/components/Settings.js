import { useState, useEffect } from "react";
import "./common.css";

function Settings() {
  const [showSettings, setShowSettings] = useState(false);
  const [title, setTitle] = useState("Default Title");
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleTitleEdit = () => {
    setEditingTitle(true);
  };

  const saveTitle = () => {
    setTitle(newTitle);
    setEditingTitle(false);
  };

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="settings-container">
      <h1>{title}</h1>

      <button
        onClick={() => setShowSettings(!showSettings)}
        className="settings-button"
      >
        {showSettings ? "Close Settings" : "Open Settings"}
      </button>

      {showSettings && (
        <div className="settings-panel">
          <h2>Page Settings</h2>
          <ul>
            <li>
              <button className="edit-button" onClick={handleTitleEdit}>
                Edit name
              </button>
            </li>
            <li>
              <button className="edit-button" onClick={toggleTheme}>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </li>
          </ul>

          {editingTitle && (
            <div className="edit-title-container">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="edit-input"
              />
              <button className="save-button" onClick={saveTitle}>
                Save
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Settings;