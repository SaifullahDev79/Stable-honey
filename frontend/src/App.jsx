import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import FarmDashboard from './components/FarmDashboard'
import UserDashboard from './components/UserDashboard'
import BeekeeperApplicationForm from './components/BeekeeperApplicationForm'
import './App.css'
import {UserTypes, HONEYTOKEN_ADDRESS, HONEYTOKEN_ABI} from './common'


// 👇 NEW: Privy + ethers
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { ethers } from 'ethers'

// If Vite env var VITE_CHAIN_ID is not set, default to Sepolia (11155111).
const CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID || 11155111)

// HNY Token Contract ABI (minimal for balance checking)
const HNY_TOKEN_ABI = HONEYTOKEN_ABI;

// HNY Token Contract Address
const HNY_TOKEN_ADDRESS = HONEYTOKEN_ADDRESS;

function App() {
  const [userAddress, setUserAddress] = useState('')
  const [walletConnected, setWalletConnected] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hnyBalance, setHnyBalance] = useState('0')

  const [userType, setUserType] = useState(UserTypes.BEEKEEPER);

  // 👇 NEW: Privy hooks
  const { ready, authenticated, login, logout } = usePrivy()
  const { wallets, ready: walletsReady } = useWallets()

  // Keep your scroll logic
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 👇 NEW: derive address/connection state from Privy
  useEffect(() => {
    (async () => {
      if (!ready || !walletsReady) return

      const w = wallets[0]
      if (!authenticated || !w) {
        setUserAddress('')
        setWalletConnected(false)
        setHnyBalance('0')
        return
      }

      // Try switching to your target chain (optional but recommended)
      try {
        await w.switchChain(`eip155:${CHAIN_ID}`)
      } catch {
        // ignore if user rejects or chain already set
      }

      // Turn Privy wallet into an ethers v6 signer to read address
      const eip1193 = await w.getEthereumProvider()
      const provider = new ethers.BrowserProvider(eip1193)
      const signer = await provider.getSigner()
      const addr = await signer.getAddress()

      setUserAddress(addr)
      setWalletConnected(true)

      // Fetch HNY token balance
      const hnyContract = new ethers.Contract(HNY_TOKEN_ADDRESS, HNY_TOKEN_ABI, provider)
      try {
        const balance = await hnyContract.balanceOf(addr)
        console.log(`BALANCE ${balance}`)
        setHnyBalance(balance)
      } catch (error) {
        console.log('Could not fetch HNY balance (contract may not be deployed):', error.message)
        setHnyBalance('0')
      }

      const isBeekeeper = await hnyContract.beekeepers(addr);
      console.log(`ARE YOU A BEEKEEPER?? ${isBeekeeper}`)
      isBeekeeper ? setUserType(UserTypes.BEEKEEPER) : setUserType(UserTypes.CONSUMER);
    })()
  }, [ready, authenticated, walletsReady, wallets])

  /*Need to make this rely on a tx var for this to work*/
  useEffect(() => {
    (async () => {
      if (!ready || !walletsReady) return

      const w = wallets[0]
      if (!authenticated || !w) {
        setUserAddress('')
        setWalletConnected(false)
        setHnyBalance('0')
        return
      }

      // Try switching to your target chain (optional but recommended)
      try {
        await w.switchChain(`eip155:${CHAIN_ID}`)
      } catch {
        // ignore if user rejects or chain already set
      }

      // Turn Privy wallet into an ethers v6 signer to read address
      const eip1193 = await w.getEthereumProvider()
      const provider = new ethers.BrowserProvider(eip1193)
      const signer = await provider.getSigner()
      const addr = await signer.getAddress()

      // Fetch HNY token balance
      const hnyContract = new ethers.Contract(HNY_TOKEN_ADDRESS, HNY_TOKEN_ABI, provider)
      try {
        const balance = await hnyContract.balanceOf(addr)
        setHnyBalance(balance)
      } catch (error) {
        console.log('Could not fetch HNY balance (contract may not be deployed):', error.message)
        setHnyBalance('0')
      }
    })()
  });

  // 👇 Replace your old MetaMask connect with Privy login
  const connectWallet = async () => {
    // This opens Privy's login/embedded wallet flow
    await login()
  }

  // 👇 NEW: Disconnect wallet function
  const disconnectWallet = async () => {
    await logout()
    setUserAddress('')
    setWalletConnected(false)
    setHnyBalance('0')
  }

/**
 * Added functionality
 */

  const [mintHoneyTxAttQ, setMintHoneyTxQ] = useState('');
  const [mintHoneyTx, setMintHoneyTx] = useState('');
  const [mintHoneyAmount, setMintHoneyAmount] = useState('');
  const [mintHoneyId, setMintHoneyId] = useState('');

  const mintHoney = async (amount, honeyId) => {
    if (!authenticated) {
      console.log("privy not initialized yet");
      return;
    }
    const provider = new ethers.BrowserProvider(await wallets[0].getEthereumProvider());
    const signer = await provider.getSigner();
  
    const contract = new ethers.Contract(HNY_TOKEN_ADDRESS, HNY_TOKEN_ABI, signer);
  
    // Send a transaction to smart contract to update the value
    const tx = await contract.mint(amount, honeyId);
    console.log(tx.hash);
    setMintHoneyTx(tx.hash);
  };
  
  React.useEffect(() => {
    mintHoney(mintHoneyAmount, mintHoneyId);
  }, [mintHoneyTxAttQ]);

  const handleMintHoneyClick = (e) => {
    e.preventDefault();
    setMintHoneyTxQ(mintHoneyAmount+mintHoneyId);
  };

  return (
    <Router>
      <div className="App">
        <Header
          walletConnected={walletConnected}
          userAddress={userAddress}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          isScrolled={isScrolled}
          hnyBalance={hnyBalance}
          userType={userType}
        />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/farm" element={<FarmDashboard userAddress={userAddress} handleMintHoneyClick={handleMintHoneyClick} setMintHoneyAmount={setMintHoneyAmount} setMintHoneyId={setMintHoneyId} mintHoneyTx={mintHoneyTx} mintHoneyId={mintHoneyId} mintHoneyAmount={mintHoneyAmount} />} />
          <Route path="/user" element={<UserDashboard userAddress={userAddress} authenticated={authenticated} wallets={wallets} />} />
          <Route path="/apply-beekeeper" element={<BeekeeperApplicationForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
