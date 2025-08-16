import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ walletConnected, userAddress, connectWallet, isScrolled }) => {
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo">
        <div className="logo-icon">🐝</div>
        HoneyCoin
      </Link>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
          About
        </Link>
        {walletConnected && (
          <>
            <Link to="/user" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
              User Dashboard
            </Link>
            <Link to="/farm" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
              Farm Dashboard
            </Link>
          </>
        )}
        <button 
          className={`connect-wallet-btn ${walletConnected ? 'connected' : ''}`}
          onClick={connectWallet}
        >
          {walletConnected ? `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : 'Connect Wallet'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
