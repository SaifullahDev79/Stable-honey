import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import FarmDashboard from './components/FarmDashboard'
import UserDashboard from './components/UserDashboard'
import './App.css'

// 👇 NEW: Privy + ethers
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { ethers } from 'ethers'

// If Vite env var VITE_CHAIN_ID is not set, default to Sepolia (11155111).
const CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID || 11155111)

function App() {
  const [userAddress, setUserAddress] = useState('')
  const [walletConnected, setWalletConnected] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // 👇 NEW: Privy hooks
  const { ready, authenticated, login } = usePrivy()
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
    })()
  }, [ready, authenticated, walletsReady, wallets])

  // 👇 Replace your old MetaMask connect with Privy login
  const connectWallet = async () => {
    // This opens Privy’s login/embedded wallet flow
    await login()
  }

  return (
    <Router>
      <div className="App">
        <Header
          walletConnected={walletConnected}
          userAddress={userAddress}
          connectWallet={connectWallet}
          isScrolled={isScrolled}
        />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/farm" element={<FarmDashboard userAddress={userAddress} />} />
          <Route path="/user" element={<UserDashboard userAddress={userAddress} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
