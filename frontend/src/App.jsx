import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import FarmDashboard from './components/FarmDashboard';
import UserDashboard from './components/UserDashboard';
import './App.css';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserAddress(accounts[0]);
        setWalletConnected(true);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

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
  );
}

export default App;
