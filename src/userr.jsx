import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // For registration
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message
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
      const response = await axios.post('http://localhost:4995/api/user/login', { email, password });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.accessToken);
        setIsLoggedIn(true);
        setErrorMessage('');
        console.log('Login successful, Token:', response.data.accessToken);
        navigate('/dashboard'); // Navigate to the dashboard after successful login
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
      const response = await axios.post('http://localhost:4995/api/user/register', { username, email, password });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setErrorMessage('');
        setSuccessMessage('User has been created successfully!'); // Set success message
        console.log('Registration successful:', response.data.message);
        navigate('/dashboard'); // Navigate to the dashboard after registration
      }
    } catch (error) {
      setErrorMessage('Registration failed.User already Exists.');
    }
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
    setErrorMessage(''); // Clear any previous error messages when toggling
    setSuccessMessage(''); // Clear success message when toggling
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

        .success-message {
          color: green; /* Style for success message */
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

        .bank-buttons {
          margin-top: 20px;
          text-align: center;
        }

        .bank-buttons a {
          display: block;
          width: 100%;
          padding: 10px;
          background-color: #28a745;
          color: white;
          border-radius: 4px;
          font-size: 14px;
          text-align: center;
          text-decoration: none;
          margin-bottom: 10px;
        }

        .bank-buttons a:hover {
          background-color: #218838;
        }
      `}</style>

      <div className="login-container">
        {!isLoggedIn ? (
          isRegistering ? (
            <div>
              <h2>User Registration</h2>
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
                {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
                <button type="submit" className="login-button">Register</button>
              </form>
              <button className="toggle-button" onClick={toggleRegister}>Already have an account? Login</button>
            </div>
          ) : (
            <div>
              <h2>User Login</h2>
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
              <button className="toggle-button" onClick={toggleRegister}>New user? Register</button>
            </div>
          )
        ) : (
          <div>
            <h2>Welcome, you are logged in!</h2>
            <p>You can now access user-specific features.</p>
            <div className="bank-buttons">
              <Link to="/login/bank/add">Add Bank Account</Link>
              <Link to="/login/bank/view">View Bank Info</Link>
              <Link to="/login/bank/edit">Edit Bank Info</Link>
              <Link to="/login/bank/remove">Remove Bank Account</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserLogin;
