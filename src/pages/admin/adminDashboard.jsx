import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin panel!</p>
      <div>
        <Link to="/admin/users">
          <button style={buttonStyle}>List All Users and Their Accounts</button>
        </Link>
        <Link to="/admin/search">
          <button style={buttonStyle}>Search and Filter Users</button>
        </Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default AdminDashboard;
