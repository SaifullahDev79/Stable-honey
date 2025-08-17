import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FarmDashboard = ({ userAddress, handleMintHoneyClick, mintHoneyTx, setMintHoneyId, setMintHoneyAmount, mintHoneyId, mintHoneyAmount }) => {
  const [honeyBatches, setHoneyBatches] = useState([]);
  const [redemptionRequests, setRedemptionRequests] = useState([]);
  const [mintForm, setMintForm] = useState({
    amount: '',
    qrCodeHash: ''
  });
  const [fulfillForm, setFulfillForm] = useState({
    requestId: '',
    batchId: '',
    qrCodeHash: ''
  });

  useEffect(() => {
  }, []);


  const handleMintHoney = async (e) => {
/*
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/honey-batches`, {
        farmId: userAddress,
        amount: parseInt(mintForm.amount),
        qrCodeHash: mintForm.qrCodeHash
      });
      
      if (response.data.success) {
        setMintForm({ amount: '', qrCodeHash: '' });
        fetchData();
        alert('Honey batch created successfully!');
      }
    } catch (error) {
      console.error('Error minting honey:', error);
      alert('Error creating honey batch');
    }*/
  };

  const handleFulfillRedemption = async (e) => {
    e.preventDefault();
/*
    try {
      const response = await axios.put(`${API_BASE_URL}/redemption-requests/${fulfillForm.requestId}/fulfill`, {
        batchId: fulfillForm.batchId,
        qrCodeHash: fulfillForm.qrCodeHash
      });
      
      if (response.data.success) {
        setFulfillForm({ requestId: '', batchId: '', qrCodeHash: '' });
        fetchData();
        alert('Redemption request fulfilled successfully!');
      }
    } catch (error) {
      console.error('Error fulfilling redemption:', error);
      alert('Error fulfilling redemption request');
    }*/
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Farm Dashboard</h1>
      
      <div className="dashboard-grid">
        {/* Mint Honey Section */}
        <div className="dashboard-card">
          <h2 className="card-title">Mint Honey Tokens</h2>
          <form onSubmit={handleMintHoneyClick}>
            <div className="form-group">
              <label className="form-label">Amount (HNY)</label>
              <input
                type="number"
                className="form-input"
                value={mintHoneyAmount}
                onChange={(e) => setMintHoneyAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">QR Code Hash</label>
              <input
                type="text"
                className="form-input"
                value={mintHoneyId}
                onChange={(e) => setMintHoneyId(e.target.value)}
                placeholder="Enter QR code hash"
                required
              />
            </div>
            <button type="submit" className="submit-btn">Mint Honey Tokens</button>
          </form>
          { mintHoneyTx &&
            ( 
              <a href={`https://sepolia.etherscan.io/tx/${mintHoneyTx}`}>Tx: {mintHoneyTx.substring(0,16)}...</a> )}
        </div>

        {/* Fulfill Redemption Section */}
        <div className="dashboard-card">
          <h2 className="card-title">Fulfill Redemption Request</h2>
          <form onSubmit={handleFulfillRedemption}>
            <div className="form-group">
              <label className="form-label">Request ID</label>
              <input
                type="number"
                className="form-input"
                value={fulfillForm.requestId}
                onChange={(e) => setFulfillForm({ ...fulfillForm, requestId: e.target.value })}
                placeholder="Enter request ID"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Batch ID</label>
              <input
                type="number"
                className="form-input"
                value={fulfillForm.batchId}
                onChange={(e) => setFulfillForm({ ...fulfillForm, batchId: e.target.value })}
                placeholder="Enter batch ID"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">QR Code Hash</label>
              <input
                type="text"
                className="form-input"
                value={fulfillForm.qrCodeHash}
                onChange={(e) => setFulfillForm({ ...fulfillForm, qrCodeHash: e.target.value })}
                placeholder="Enter QR code hash"
                required
              />
            </div>
            <button type="submit" className="submit-btn">Fulfill Redemption</button>
          </form>
        </div>

        {/* Honey Batches List */}
        <div className="dashboard-card">
          <h2 className="card-title">Honey Batches</h2>
          {honeyBatches.length === 0 ? (
            <p>No honey batches found</p>
          ) : (
            honeyBatches.map((batch) => (
              <div key={batch.id} className="list-item">
                <div className="list-item-title">
                  Batch #{batch.id}
                  <span className={`status-badge ${batch.redeemed ? 'status-fulfilled' : 'status-pending'}`}>
                    {batch.redeemed ? 'Redeemed' : 'Available'}
                  </span>
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

        {/* Redemption Requests List */}
        <div className="dashboard-card">
          <h2 className="card-title">Redemption Requests</h2>
          {redemptionRequests.length === 0 ? (
            <p>No redemption requests found</p>
          ) : (
            redemptionRequests.map((request) => (
              <div key={request.id} className="list-item">
                <div className="list-item-title">
                  Request #{request.id}
                  <span className={`status-badge ${request.fulfilled ? 'status-fulfilled' : 'status-pending'}`}>
                    {request.fulfilled ? 'Fulfilled' : 'Pending'}
                  </span>
                </div>
                <div className="list-item-details">
                  User: {request.userId}<br />
                  Amount: {request.amount} HNY<br />
                  Delivery: {request.deliveryDetails}<br />
                  Pickup: {request.pickupDetails}<br />
                  Requested: {new Date(request.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmDashboard;
