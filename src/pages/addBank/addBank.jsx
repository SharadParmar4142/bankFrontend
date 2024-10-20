import React, { useState } from 'react';

const AddBank = () => {
  const [formData, setFormData] = useState({
    bankName: '',
    holderName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    branchName: '', // Added branchName to the state
  });

  const [message, setMessage] = useState(''); // State for success/error messages
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { bankName, holderName, accountNumber, confirmAccountNumber, ifscCode, branchName } = formData;

    // Basic validation
    if (!bankName || !holderName || !accountNumber || !confirmAccountNumber || !ifscCode || !branchName) {
      setError('All fields are mandatory');
      setMessage('');
      return;
    }

    if (accountNumber !== confirmAccountNumber) {
      setError('Account numbers do not match');
      setMessage('');
      return;
    }

    // Get the token from localStorage
    const token = localStorage.getItem('token'); // Ensure you store the token on successful login

    // Call API to add bank account
    try {
      const response = await fetch('http://localhost:4995/api/user/login/bank/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in Authorization header
        },
        body: JSON.stringify({
          bankName,
          accountHolderName: holderName, // Make sure this matches backend
          accountNumber,
          ifscCode,
          branchName, // Include branchName in the request body
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Bank account added successfully');
        setError(''); // Clear any previous errors
        // Reset form
        setFormData({
          bankName: '',
          holderName: '',
          accountNumber: '',
          confirmAccountNumber: '',
          ifscCode: '',
          branchName: '', // Reset branchName
        });
      } else {
        setError(data.message || 'Error adding bank account');
        setMessage(''); // Clear message if there’s an error
      }
    } catch (err) {
      setError('Error adding bank account');
      setMessage(''); // Clear message if there’s an error
    }
  };

  return (
    <div className="container">
      <h2>Add New Bank</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>} {/* Display success message */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          value={formData.bankName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="holderName"
          placeholder="Holder Name"
          value={formData.holderName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          value={formData.accountNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="confirmAccountNumber"
          placeholder="Confirm Account Number"
          value={formData.confirmAccountNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ifscCode"
          placeholder="IFSC Code"
          value={formData.ifscCode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="branchName" // New field for branch name
          placeholder="Branch Name"
          value={formData.branchName}
          onChange={handleChange}
        />
        <button type="submit">Add Bank</button>
      </form>

      <style jsx>{`
        .container {
          max-width: 400px;
          margin: auto;
          padding: 1rem;
          text-align: center;
          background: #f9f9f9;
          border-radius: 8px;
        }
        input {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 10px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .error {
          color: red;
        }
        .success {
          color: green; // Styling for success messages
        }
        button:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
};

export default AddBank;
