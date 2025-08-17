import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SolanaBuy from './SolanaBuy'; // 👈 add this
import { ethers } from 'ethers'
import {HONEYMARKETPLACE_ADDRESS, HONEYMARKETPLACE_ABI, HONEYTOKEN_ADDRESS, HONEYTOKEN_ABI, USDC_ADDRESS, ERC20_ABI} from '../common'

const UserDashboard = ({ userAddress, authenticated, wallets }) => {
  const [redemptionRequests, setRedemptionRequests] = useState([]);
  const [honeyBatches, setHoneyBatches] = useState([]);
  const [redemptionForm, setRedemptionForm] = useState({
    amount: '',
    deliveryDetails: '',
    beekeeperAddress: ''
  });
  const [purchaseForm, setPurchaseForm] = useState({
    stablecoinAddress: '',
    beekeeperAddress: '',
    honeyAmount: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
/*    try {
      const [requestsRes, batchesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/redemption-requests`),
        axios.get(`${API_BASE_URL}/honey-batches`)
      ]);
      setRedemptionRequests(requestsRes.data);
      setHoneyBatches(batchesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } */
    //For loading in from contract, not applicable atm
  };

  const handleBuyHoney = async (e) => {
    e.preventDefault();
    try {
      if (!authenticated) {
        console.log("privy not initialized yet");
        return;
      }
      const provider = new ethers.BrowserProvider(await wallets[0].getEthereumProvider());
      const signer = await provider.getSigner();
    
      const contract = new ethers.Contract(HONEYMARKETPLACE_ADDRESS, HONEYMARKETPLACE_ABI, signer);
      const stcontract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, signer);
    
      // Send a transaction to smart contract to update the value
      const approvetx = await stcontract.approve(USDC_ADDRESS, purchaseForm.honeyAmount);
      const tx = await contract.buyHoney(purchaseForm.stablecoinAddress, purchaseForm.beekeeperAddress, purchaseForm.honeyAmount);
      console.log(tx.hash);
      setPurchaseForm({ amount: '', deliveryDetails: '', beekeeperAddress: '' });
      //fetchData();
      alert(`Purchase submitted successfully! Tx hash: ${tx}`);

    } catch (error) {
      console.error('Error submitting purchase:', error);
      alert('Error submitting purchase request');
    }
  }

  const handleSubmitRedemption = async (e) => {
    e.preventDefault();
    try {
      if (!authenticated) {
        console.log("privy not initialized yet");
        return;
      }
      const provider = new ethers.BrowserProvider(await wallets[0].getEthereumProvider());
      const signer = await provider.getSigner();
    
      const contract = new ethers.Contract(HONEYMARKETPLACE_ADDRESS, HONEYMARKETPLACE_ABI, signer);
      const tokencontract = new ethers.Contract(HONEYTOKEN_ADDRESS, HONEYTOKEN_ABI, signer);
    
      // Send a transaction to smart contract to update the value
      const approvetx = await tokencontract.approve(HONEYMARKETPLACE_ADDRESS, redemptionForm.amount);
      console.log(redemptionForm.beekeeperAddress);
      console.log(redemptionForm.amount)
      const tx = await contract.submitRedemption(redemptionForm.beekeeperAddress, redemptionForm.amount);
      console.log(tx.hash);
      setRedemptionForm({ amount: '', deliveryDetails: '', beekeeperAddress: '' });
      //fetchData();
      alert(`Redemption request submitted successfully! Tx hash: ${tx}`);

    } catch (error) {
      console.error('Error submitting redemption:', error);
      alert('Error submitting redemption request');
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">User Dashboard</h1>
      
      <div className="dashboard-grid">
        {/* Buy Honey */}
        <div className="dashboard-card">
          <h2 className="card-title">Buy Honey</h2>
          <form onSubmit={handleBuyHoney}>
            <div className="form-group">
              <label className="form-label">Stablecoin Address</label>
              <textarea
                className="form-textarea"
                value={purchaseForm.stablecoinAddress}
                onChange={(e) => setPurchaseForm({ ...purchaseForm, stablecoinAddress: e.target.value })}
                placeholder="Enter stablecoin ETH address (e.g. 0x1939...)"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Beekeeper Address</label>
              <textarea
                className="form-textarea"
                value={purchaseForm.beekeeperAddress}
                onChange={(e) => setPurchaseForm({ ...purchaseForm, beekeeperAddress: e.target.value })}
                placeholder="Enter beekeeper ETH address (e.g. 0xFAF0...)"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Honey Amount</label>
              <input
                type="number"
                className="form-input"
                value={purchaseForm.honeyAmount}
                onChange={(e) => setPurchaseForm({ ...purchaseForm, honeyAmount: e.target.value })}
                placeholder="Enter the amount of honey to purchase"
                required
              />
            </div>
            <button type="submit" className="submit-btn">Buy Honey</button>
          </form>
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
              <label className="form-label">Beekeeper Address</label>
              <textarea
                className="form-textarea"
                value={redemptionForm.beekeeperAddress}
                onChange={(e) => setRedemptionForm({ ...redemptionForm, beekeeperAddress: e.target.value })}
                placeholder="Enter ETH address (e.g. 0xa2DC...) of beekeeper"
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
                    Beekeeper Address: {request.beekeeperAddress}<br />
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
