import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateBankAccount = () => {
  const [step, setStep] = useState(1); // 1 = enter account number, 2 = update details
  const [accountNumber, setAccountNumber] = useState('');
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    branchName: '',
  });
  const navigate = useNavigate();

  // Handle input of account number
  const handleAccountNumberSubmit = (e) => {
    e.preventDefault();
    if (accountNumber.trim() === '') {
      alert('Please enter a valid account number');
      return;
    }

    // Fetch details based on account number
    fetch(`http://localhost:4995/api/user/login/bank/edit/${accountNumber}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Account not found');
        }
        return response.json();
      })
      .then(data => {
        setBankDetails(data.bankAccount); // Ensure the data is extracted correctly
        setStep(2); // Move to the second step
      })
      .catch(error => {
        alert('Error: ' + error.message);
        console.log(error);
      });
  };

  // Handle updating of bank details
  const handleBankDetailsSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4995/api/user/login/bank/edit/${accountNumber}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(bankDetails),
    })
      .then(response => response.json())
      .then(data => {
        alert('Bank details updated successfully');
        navigate('/dashboard'); // Redirect to dashboard after success
      })
      .catch(error => console.log(error));
  };

  const handleChange = (e) => {
    setBankDetails({
      ...bankDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={styles.container}>
      {step === 1 ? (
        <>
          <h2 style={styles.heading}>Enter Account Number</h2>
          <form onSubmit={handleAccountNumberSubmit}>
            <input
              type="text"
              placeholder="Enter Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Proceed</button>
          </form>
        </>
      ) : (
        <>
          <h2 style={styles.heading}>Update Bank Details</h2>
          <form onSubmit={handleBankDetailsSubmit}>
            <input
              type="text"
              name="bankName"
              value={bankDetails.bankName}
              onChange={handleChange}
              placeholder="Bank Name"
              style={styles.input}
            />
            <input
              type="text"
              name="accountHolderName"
              value={bankDetails.accountHolderName}
              onChange={handleChange}
              placeholder="Account Holder Name"
              style={styles.input}
            />
            <input
              type="text"
              name="branchName"
              value={bankDetails.branchName}
              onChange={handleChange}
              placeholder="Branch Name"
              style={styles.input}
            />
            <input
              type="text"
              name="accountNumber"
              value={bankDetails.accountNumber}
              disabled // Account number should not be editable
              style={styles.input}
            />
            <input
              type="text"
              name="ifscCode"
              value={bankDetails.ifscCode}
              onChange={handleChange}
              placeholder="IFSC Code"
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Update Bank</button>
          </form>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default UpdateBankAccount;
