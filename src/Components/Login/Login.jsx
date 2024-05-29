import React, { useState } from 'react';
// import './Login.css';
import '../styles.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowLeft, faArrowLeftLong, faHome, faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';
export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://192.168.1.32:8000/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/protected');
            } else {
                setErrorMessage(data.error || 'Login failed');
            }
        } catch (err) {
            setErrorMessage('An error occurred. Please try again.');
            console.error('Login failed:', err.message);
        }
    };
    const clearForm = () => {
        setUsername('')
        setPassword('')
    }
    const navigateSignup = () => {
        clearForm()
        navigate('/register');}
        const navigateHome = () => {
            navigate('/')
        }
    return (
        <div className="login-container">
            <div className="form-container">
                <h1 className="heading">Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username" className="label">Username</label>
                    <input type="text" id="username" onChange={handleUsernameChange} name="username" required className="input" />
                    <label htmlFor="password" className="label">Password</label>
                    <input type="password" id="password" onChange={handlePasswordChange} name="password" required className="input" />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" className="button">Login</button>
                    <button type="button" onClick={navigateSignup} className="button">Sign Up</button>
                    <a href="/" className="circle-button">
                        <FontAwesomeIcon icon={faHome} /> 
                    </a>
                </form>
            </div>
        </div>
    );
}
