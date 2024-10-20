import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // For registration
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4995/api/admin/login', { email, password });

      if (response.status === 200) {
        localStorage.setItem('adminToken', response.data.accessToken); // Store admin token
        setIsLoggedIn(true);
        setErrorMessage('');
        console.log('Admin Login successful, Token:', response.data.accessToken);
        navigate('/admin/dashboard'); // Navigate to the admin dashboard after successful login
      }
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setErrorMessage('Please enter username, email, and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4995/api/admin/register', { username, email, password });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setErrorMessage('');
        console.log('Registration successful:', response.data.message);
        navigate('/admin/dashboard'); // Navigate to the dashboard after registration
      }
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
    setErrorMessage(''); // Clear any previous error messages when toggling
  };

  return (
    <>
      <style>{`
        .login-container {
          width: 300px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .input-group {
          margin-bottom: 15px;
        }

        .input-group label {
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
        }

        .input-group input {
          width: 100%;
          padding: 8px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .error-message {
          color: red;
          font-size: 12px;
          margin-bottom: 15px;
        }

        .login-button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }

        .login-button:hover {
          background-color: #0056b3;
        }

        .toggle-button {
          margin-top: 10px;
          background-color: transparent;
          border: none;
          color: #007bff;
          cursor: pointer;
        }

        .toggle-button:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="login-container">
        {!isLoggedIn ? (
          isRegistering ? (
            <div>
              <h2>Admin Registration</h2>
              <form onSubmit={handleRegister}>
                <div className="input-group">
                  <label htmlFor="register-username">Username:</label>
                  <input
                    type="text"
                    id="register-username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="register-email">Email:</label>
                  <input
                    type="email"
                    id="register-email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="register-password">Password:</label>
                  <input
                    type="password"
                    id="register-password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="login-button">Register</button>
              </form>
              <button className="toggle-button" onClick={toggleRegister}>Already have an account? Login</button>
            </div>
          ) : (
            <div>
              <h2>Admin Login</h2>
              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <label htmlFor="login-email">Email:</label>
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="login-password">Password:</label>
                  <input
                    type="password"
                    id="login-password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="login-button">Login</button>
              </form>
              <button className="toggle-button" onClick={toggleRegister}>New admin? Register</button>
            </div>
          )
        ) : (
          <div>
            <h2>Welcome, Admin!</h2>
            <p>You are now logged in.</p>
            <Link to="/admin/dashboard" className="login-button">Go to Dashboard</Link>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminLogin;
