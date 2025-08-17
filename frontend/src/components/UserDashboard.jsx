import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SolanaBuy from './SolanaBuy'; // 👈 add this

const UserDashboard = ({ userAddress }) => {
  const [redemptionRequests, setRedemptionRequests] = useState([]);
  const [honeyBatches, setHoneyBatches] = useState([]);
  const [redemptionForm, setRedemptionForm] = useState({
    amount: '',
    deliveryDetails: '',
    pickupDetails: ''
  });

  // keep your current base; if you add a Vite proxy later, you can switch this to '/api'
  const API_BASE_URL = 'http://localhost:3001/api';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [requestsRes, batchesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/redemption-requests`),
        axios.get(`${API_BASE_URL}/honey-batches`)
      ]);
      setRedemptionRequests(requestsRes.data);
      setHoneyBatches(batchesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmitRedemption = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/redemption-requests`, {
        userId: userAddress,
        amount: parseInt(redemptionForm.amount),
        deliveryDetails: redemptionForm.deliveryDetails,
        pickupDetails: redemptionForm.pickupDetails
      });
      
      if (response.data.success) {
        setRedemptionForm({ amount: '', deliveryDetails: '', pickupDetails: '' });
        fetchData();
        alert('Redemption request submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting redemption:', error);
      alert('Error submitting redemption request');
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">User Dashboard</h1>
      
      <div className="dashboard-grid">
        {/* Buy with Solana (devnet) */}
        <div className="dashboard-card">
          <h2 className="card-title">Buy HNY — Solana (devnet)</h2>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            Pay on Solana (devnet). After confirmation, HNY is minted to your connected EVM wallet.
          </p>
          <SolanaBuy userAddress={userAddress} />
          <div className="info-box" style={{ marginTop: '1rem' }}>
            <h3 className="info-box-title">Current Rate</h3>
            <p className="info-box-description">1 HNY = 1 USDC (devnet) <span style={{opacity:.7}}>(example)</span></p>
          </div>
        </div>

        {/* Submit Redemption Section */}
        <div className="dashboard-card">
          <h2 className="card-title">Submit Redemption Request</h2>
          <form onSubmit={handleSubmitRedemption}>
            <div className="form-group">
              <label className="form-label">Amount (HNY)</label>
              <input
                type="number"
                className="form-input"
                value={redemptionForm.amount}
                onChange={(e) => setRedemptionForm({ ...redemptionForm, amount: e.target.value })}
                placeholder="Enter amount to redeem"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Delivery Details</label>
              <textarea
                className="form-textarea"
                value={redemptionForm.deliveryDetails}
                onChange={(e) => setRedemptionForm({ ...redemptionForm, deliveryDetails: e.target.value })}
                placeholder="Enter delivery address and preferences"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Pickup Details</label>
              <textarea
                className="form-textarea"
                value={redemptionForm.pickupDetails}
                onChange={(e) => setRedemptionForm({ ...redemptionForm, pickupDetails: e.target.value })}
                placeholder="Enter pickup location and preferences"
                required
              />
            </div>
            <button type="submit" className="submit-btn">Submit Redemption Request</button>
          </form>
        </div>

        {/* My Redemption Requests */}
        <div className="dashboard-card">
          <h2 className="card-title">My Redemption Requests</h2>
          {redemptionRequests.filter(req => req.userId === userAddress).length === 0 ? (
            <p>No redemption requests found</p>
          ) : (
            redemptionRequests
              .filter(req => req.userId === userAddress)
              .map((request) => (
                <div key={request.id} className="list-item">
                  <div className="list-item-title">
                    Request #{request.id}
                    <span className={`status-badge ${request.fulfilled ? 'status-fulfilled' : 'status-pending'}`}>
                      {request.fulfilled ? 'Fulfilled' : 'Pending'}
                    </span>
                  </div>
                  <div className="list-item-details">
                    Amount: {request.amount} HNY<br />
                    Delivery: {request.deliveryDetails}<br />
                    Pickup: {request.pickupDetails}<br />
                    Requested: {new Date(request.timestamp).toLocaleDateString()}
                    {request.fulfilled && (
                      <>
                        <br />Fulfilled: {new Date(request.fulfillmentTimestamp).toLocaleDateString()}
                        {request.qrCodeHash && <><br />QR Code: {request.qrCodeHash}</>}
                      </>
                    )}
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Available Honey Batches */}
        <div className="dashboard-card">
          <h2 className="card-title">Available Honey Batches</h2>
          {honeyBatches.filter(batch => !batch.redeemed).length === 0 ? (
            <p>No available honey batches</p>
          ) : (
            honeyBatches
              .filter(batch => !batch.redeemed)
              .map((batch) => (
                <div key={batch.id} className="list-item">
                  <div className="list-item-title">
                    Batch #{batch.id}
                    <span className="status-badge status-pending">Available</span>
                  </div>
                  <div className="list-item-details">
                    Amount: {batch.amount} HNY<br />
                    QR Hash: {batch.qrCodeHash}<br />
                    Created: {new Date(batch.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
