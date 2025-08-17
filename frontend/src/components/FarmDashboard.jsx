import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import {HONEYMARKETPLACE_ADDRESS, HONEYMARKETPLACE_ABI, HONEYTOKEN_ADDRESS, HONEYTOKEN_ABI, USDC_ADDRESS, ERC20_ABI} from '../common'

const FarmDashboard = ({ userAddress, handleMintHoneyClick, mintHoneyTx, setMintHoneyId, setMintHoneyAmount, mintHoneyId, mintHoneyAmount, authenticated, wallets}) => {
  const [honeyBatches, setHoneyBatches] = useState([]);
  const [redemptionRequests, setRedemptionRequests] = useState([]);
  const [mintForm, setMintForm] = useState({
    amount: '',
    qrCodeHash: ''
  });
  const [fulfillForm, setFulfillForm] = useState({
    consumerId: '',
    honeyId: '',
  });

  useEffect(() => {
  }, []);


  const handleFulfillRedemption = async (e) => {
    e.preventDefault();
    try {
      /*
      const response = await axios.put(`${API_BASE_URL}/redemption-requests/${fulfillForm.requestId}/fulfill`, {
        batchId: fulfillForm.batchId,
        qrCodeHash: fulfillForm.qrCodeHash
      });
      
      if (response.data.success) {
        setFulfillForm({ requestId: '', batchId: '', qrCodeHash: '' });
        fetchData();
        alert('Redemption request fulfilled successfully!');
      }*/
      if (!authenticated) {
        console.log("privy not initialized yet");
        return;
      }
      const provider = new ethers.BrowserProvider(await wallets[0].getEthereumProvider());
      const signer = await provider.getSigner();
    
      const contract = new ethers.Contract(HONEYMARKETPLACE_ADDRESS, HONEYMARKETPLACE_ABI, signer);
    
      const tx = await contract.fulfillRedemption(fulfillForm.consumerId, fulfillForm.honeyId);
      console.log(tx.hash);
      setFulfillForm({ consumerId: '', honeyId: '' });
      //fetchData();
      alert(`Redemption fulfilled successfully! Tx hash: ${tx}`);

    } catch (error) {
      console.error('Error fulfilling redemption:', error);
      alert('Error fulfilling redemption request');
    }
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
              <label className="form-label">Consumer ID</label>
              <input
                type="number"
                className="form-input"
                value={fulfillForm.consumerId}
                onChange={(e) => setFulfillForm({ ...fulfillForm, consumerId: e.target.value })}
                placeholder="Enter consumer ID"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Honey ID (QR Code/NFC/Identifier)</label>
              <input
                type="text"
                className="form-input"
                value={fulfillForm.honeyId}
                onChange={(e) => setFulfillForm({ ...fulfillForm, honeyId: e.target.value })}
                placeholder="Enter honey ID"
                required
              />
            </div>
            <button type="submit" className="submit-btn">Fulfill Redemption</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default FarmDashboard;
