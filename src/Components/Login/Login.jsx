import React from 'react';
import './Login.css'
export default function Login()  {
    return (
        <div className="container">
            <div className="form-container">
                <h1 className="heading">Login</h1>
                <form>
                    <label htmlFor="username" className="label">Username</label>
                    <input type="text" id="username" name="username" required className="input" />
                    
                    <label htmlFor="password" className="label">Password</label>
                    <input type="password" id="password" name="password" required className="input" />
                    
                    <button type="submit" className="button">Login</button>
                </form>
            </div>
        </div>
    );
};






