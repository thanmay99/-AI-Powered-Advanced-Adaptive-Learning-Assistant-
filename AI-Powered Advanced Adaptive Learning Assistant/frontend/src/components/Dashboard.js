import React, { useState } from 'react';
import './common.css';

function Dashboard() {
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email'); // Assuming email is also stored in localStorage
  console.log("Retrieved Email:", email); // Debugging log
  const [score, setScore] = useState('');
  const [attendance, setAttendance] = useState('');
  const [emotionalStatus, setEmotionalStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !score || !attendance || !emotionalStatus) {
      setMessage('All fields are required');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/submitStudentData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, score: Number(score), attendance: Number(attendance), emotionalStatus }),
      });
  
      if (response.ok) {  	
        setMessage('Data submitted successfully');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Submission failed');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };
  

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Hi, {username}</h1>
      <p>Welcome to the Home page</p>
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <div className="dashboard-form-group">
          <label>Score:</label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
            className="dashboard-form-control"
          />
        </div>
        <div className="dashboard-form-group">
          <label>Attendance:</label>
          <input
            type="number"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            required
            className="dashboard-form-control"
          />
        </div>
        <div className="dashboard-form-group">
          <label>Emotional Status:</label>
          <input
            type="text"
            value={emotionalStatus}
            onChange={(e) => setEmotionalStatus(e.target.value)}
            required
            className="dashboard-form-control"
          />
        </div>
        <button type="submit" className="dashboard-submit-button">Submit</button>
      </form>
      {message && <p className="dashboard-message">{message}</p>}
    </div>
  );
}

export default Dashboard;