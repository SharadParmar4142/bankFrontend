import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Welcome, you are logged in!</h2>
      <p>You can now access user-specific features.</p>
      <div className="bank-buttons">
        <Link to="/login/bank/add">Add Bank Account</Link>
        <Link to="/login/bank/view">View Bank Info</Link>
        <Link to="/login/bank/edit">Edit Bank Info</Link>
        <Link to="/login/bank/remove">Remove Bank Account</Link>
      </div>

      <style>{`
        .dashboard-container {
          width: 400px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        h2 {
          font-size: 24px;
          margin-bottom: 20px;
        }

        p {
          font-size: 16px;
          margin-bottom: 20px;
        }

        .bank-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .bank-buttons a {
          padding: 10px;
          background-color: #28a745;
          color: white;
          border-radius: 4px;
          text-decoration: none;
        }

        .bank-buttons a:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
