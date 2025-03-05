import React from 'react';
import { useNavigate } from 'react-router-dom';
import './common.css';

const Welcome = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome</h1>
      <button className="welcome-button" onClick={handleSignupClick}>Students</button>
    </div>
  );
};

export default Welcome;