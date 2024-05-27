import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentContainer}>
        <h1 style={styles.heading}>Car Management System</h1>
        <p>Welcome to the Car Management System. Manage your car inventory efficiently and effortlessly.</p>
        
        <div style={styles.buttonsContainer}>
          <button style={{ ...styles.button, backgroundColor: 'green' }} onClick={handleLoginClick}>
            Login
          </button>
          <button style={{ ...styles.button, backgroundColor: 'blue' }} onClick={handleSignUpClick}>
            Sign Up
          </button>
        </div>

        <div style={styles.infoContainer}>
          <h2 style={styles.subHeading}>Features</h2>
          <ul>
            <li>View all cars in your inventory.</li>
            <li>Add new cars to the system.</li>
            <li>Edit car details.</li>
            <li>Delete cars from the inventory.</li>
          </ul>

          <h2 style={styles.subHeading}>How It Works</h2>
          <p>To get started, sign up for an account or log in if you already have one. Once logged in, you can access all the car management features.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '3px',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
  },
  infoContainer: {
    textAlign: 'left',
    marginTop: '20px',
  },
  subHeading: {
    marginTop: '20px',
    fontSize: '20px',
    color: '#333',
  },

};