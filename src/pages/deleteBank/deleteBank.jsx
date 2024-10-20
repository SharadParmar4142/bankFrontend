import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteBankAccount = () => {
  const [step, setStep] = useState(1); // Step 1: Enter account number, Step 2: Confirm deletion
  const [accountNumber, setAccountNumber] = useState('');
  const [bankDetails, setBankDetails] = useState(null); // Set bankDetails to null initially
  const navigate = useNavigate();

  // Handle input of account number and fetch account details
  const handleAccountNumberSubmit = (e) => {
    e.preventDefault();
    if (accountNumber.trim() === '') {
      alert('Please enter a valid account number');
      return;
    }

    // Fetch bank details based on account number to check if it exists
    fetch(`http://localhost:4995/api/user/login/bank/${accountNumber}`, { // Use GET method
      method: 'GET',
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
        setBankDetails(data.bankAccount); // Set bank details if account is found
        setStep(2); // Proceed to the deletion confirmation step
      })
      .catch(error => {
        alert('Error: ' + error.message);
        console.log(error);
      });
  };

  // Handle bank account deletion
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4995/api/user/login/bank/remove/${accountNumber}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert('Bank account deleted successfully');
        navigate('/dashboard'); // Redirect to dashboard after successful deletion
      } else {
        alert(data.message || 'Error deleting account');
      }
    } catch (error) {
      console.error('Error deleting bank account:', error);
      alert('Failed to delete the bank account');
    }
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
          <h2 style={styles.heading}>Delete Bank Account</h2>
          {bankDetails ? (
            <>
              <p><strong>Bank Name:</strong> {bankDetails.bankName}</p>
              <p><strong>Account Holder:</strong> {bankDetails.accountHolderName}</p>
              <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
              <p><strong>IFSC Code:</strong> {bankDetails.ifscCode}</p>
              <p><strong>Branch Name:</strong> {bankDetails.branchName}</p>

              <button onClick={handleDelete} style={styles.deleteButton}>
                Confirm Deletion
              </button>
              <button onClick={() => setStep(1)} style={styles.cancelButton}>
                Cancel
              </button>
            </>
          ) : (
            <p>Loading bank details...</p>
          )}
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
  deleteButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginTop: '10px',
    cursor: 'pointer',
  },
};

export default DeleteBankAccount;
