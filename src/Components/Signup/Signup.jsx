import  { useState } from 'react';
// import './Signup.css';
import '../styles.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowLeft, faArrowLeftLong, faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';
export default function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const [registerSuccessful,setRegisterSuccessful] = useState(false)
    const navigateLogin = () => {
        navigate('/login')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://192.168.1.32:8000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('User registered successfully:', data);
                setRegisterSuccessful(true)
                // navigate('/login', { state: { message: 'Registered successfully. Please login.' } });
            } else {
                console.log('Registration failed:', data);
            }
        } catch (err) {
            console.error('Registration failed:', err.message);
        }
    };

    return (
        <div className="signup-container">
            <div className="form-container">
                <h1 className="heading">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    {registerSuccessful ? <h3 className='register-message'>Register Successfully</h3> : <>
                    <label htmlFor="username" className="label">Username</label>
                    <input type="text" id="username" onChange={handleUsernameChange} name="username" required className="input" />
                    <label htmlFor="password" className="label">Password</label>
                    <input type="password" id="password" onChange={handlePasswordChange} name="password" required className="input" />
                    <button type="submit" className="button">Create Account</button>
                    <button type="button" onClick={navigateLogin} className="button">Log in</button>
                    </>
                    }
                    <a href="/login" className="circle-button">
                        <FontAwesomeIcon icon={faLongArrowLeft} />
                    </a>
                        
                </form>
            </div>
        </div>
    );
}
