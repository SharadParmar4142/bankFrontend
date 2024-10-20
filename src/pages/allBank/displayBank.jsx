import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BankAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch bank accounts from the backend API
    const fetchBankAccounts = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Check if token is missing
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        };

        // Make API request to fetch bank accounts
        const response = await axios.get('http://localhost:4995/api/user/login/bank/view', config);
        setAccounts(response.data);
        setLoading(false);
      } catch (err) {
        // Handle unauthorized or other errors
        if (err.response && err.response.status === 401) {
          setError('Unauthorized: Invalid or expired token. Please log in again.');
        } else {
          setError('Error fetching bank accounts');
        }
        setLoading(false);
      }
    };

    fetchBankAccounts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container}>
      {accounts.length > 0 ? (
        accounts.map((account) => (
          <div key={account._id} style={styles.card}>
            <div style={styles.header}>
              <span>{account.bankName}</span>
              <span style={styles.bankType}>Bank</span>
            </div>
            <div style={styles.details}>
              <p><strong>A/C No:</strong> {`******${account.accountNumber.slice(-4)}`}</p>
              <p><strong>IFSC:</strong> {`******${account.ifscCode.slice(-4)}`}</p>
              <p><strong>{account.accountHolderName}</strong></p>
            </div>
          </div>
        ))
      ) : (
        <div>No bank accounts found</div>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '16px',
    margin: '10px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    marginBottom: '10px',
  },
  bankType: {
    backgroundColor: '#0066cc',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '5px',
  },
  details: {
    fontSize: '14px',
  },
  p: {
    margin: '4px 0',
  },
};

export default BankAccounts;
