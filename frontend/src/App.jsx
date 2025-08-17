import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import FarmDashboard from './components/FarmDashboard'
import UserDashboard from './components/UserDashboard'
import BeekeeperApplicationForm from './components/BeekeeperApplicationForm'
import './App.css'

// 👇 NEW: Privy + ethers
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { ethers } from 'ethers'

// If Vite env var VITE_CHAIN_ID is not set, default to Sepolia (11155111).
const CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID || 11155111)

// HNY Token Contract ABI (minimal for balance checking)
const HNY_TOKEN_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
]

// HNY Token Contract Address (you'll need to deploy and update this)
const HNY_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000" // Placeholder - update with actual deployed address

function App() {
  const [userAddress, setUserAddress] = useState('')
  const [walletConnected, setWalletConnected] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hnyBalance, setHnyBalance] = useState('0')

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
      try {
        const hnyContract = new ethers.Contract(HNY_TOKEN_ADDRESS, HNY_TOKEN_ABI, provider)
        const balance = await hnyContract.balanceOf(addr)
        const decimals = await hnyContract.decimals()
        const formattedBalance = ethers.formatUnits(balance, decimals)
        setHnyBalance(formattedBalance)
      } catch (error) {
        console.log('Could not fetch HNY balance (contract may not be deployed):', error.message)
        setHnyBalance('0')
      }
    })()
  }, [ready, authenticated, walletsReady, wallets])

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
        />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/farm" element={<FarmDashboard userAddress={userAddress} />} />
          <Route path="/user" element={<UserDashboard userAddress={userAddress} />} />
          <Route path="/apply-beekeeper" element={<BeekeeperApplicationForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
