import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4995/api/admin/admin/bank-info', {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        setUsers(response.data); // Adjust based on your API response
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h2>All Users and Their Accounts</h2>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user.username} className="user-item">
            <div>
              <strong>{user.username}</strong> - {user.email}
            </div>
            <div>
              {/* Display bank accounts associated with the user */}
              <ul>
                {user.accounts.map((account) => (
                  <li key={account._id}>
                    Bank Account Number: {account.accountNumber} {/* Adjust based on your bank account model */}
                    {/* Add more details as needed */}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <style>{`
        .users-container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #343a40;
        }

        .users-list {
          list-style-type: none;
          padding: 0;
        }

        .user-item {
          padding: 10px;
          margin: 5px 0;
          background-color: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .user-item:hover {
          background-color: #f1f1f1;
        }

        ul {
          padding-left: 20px; /* Indent nested lists */
        }
      `}</style>
    </div>
  );
}

export default ListUsers;
