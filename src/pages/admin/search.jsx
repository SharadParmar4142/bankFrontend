import React, { useState } from 'react';
import axios from 'axios';

function SearchFilter() {
  const [email, setEmail] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.get(`http://localhost:4995/api/admin/admin/search`, {
        params: { email },
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      setResults(response.data); // Adjust based on your API response
    } catch (error) {
      setError('Error searching users: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Users by Email</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <ul className="results-list">
        {results.map((account) => (
          <li key={account._id} className="result-item">
            {account.user.username} - {account.user.email} 
            <br />
            Bank Name: {account.bankName} | Account Number: {account.accountNumber}
          </li>
        ))}
      </ul>
      <style>{`
        .search-container {
          max-width: 500px;
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

        .search-form {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .search-input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 16px;
          margin-right: 10px;
        }

        .search-button {
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          background-color: #007bff;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .search-button:hover {
          background-color: #0056b3;
        }

        .results-list {
          list-style-type: none;
          padding: 0;
        }

        .result-item {
          padding: 10px;
          margin: 5px 0;
          background-color: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .result-item:hover {
          background-color: #f1f1f1;
        }

        .error-message {
          color: red;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default SearchFilter;
