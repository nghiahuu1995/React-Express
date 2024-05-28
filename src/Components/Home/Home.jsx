import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.css";

export default function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <div className="container">
      <div className="content-container">
        <h1 className="heading">Car Management System</h1>
        <p>Welcome to the Car Management System. Manage your car inventory efficiently and effortlessly.</p>
        
        

        <div className="info-container">
          <h2 className="subHeading">Features</h2>
          <ul>
            <li>View all cars in your inventory.</li>
            <li>Add new cars to the system.</li>
            <li>Edit car details.</li>
            <li>Delete cars from the inventory.</li>
          </ul>

          <h2 className="subHeading">How It Works</h2>
          <p>To get started, sign up for an account or log in if you already have one. Once logged in, you can access all the car management features.</p>
        </div>
        <div className="buttons-container">
          <button className="button" onClick={handleLoginClick}>
            Login
          </button>
          <button className="button" onClick={handleSignUpClick}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
