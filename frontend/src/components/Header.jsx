import React from 'react';
import { Link } from 'react-router-dom';
import {UserTypes} from '../common'

const Header = ({ walletConnected, userAddress, connectWallet, disconnectWallet, isScrolled, hnyBalance, userType }) => {
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo">
        <div className="logo-icon">🍯</div>
        StableHoney
      </Link>

      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link
          to="/about"
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            backgroundColor: 'rgba(255,255,255,0.1)',
          }}
        >
          About
        </Link>

        {walletConnected && (
          <>
           {userType == UserTypes.CONSUMER ? (
             <>
              <Link
                to="/user"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }}
              >
              User Dashboard
              </Link>
            <Link
              to="/apply-beekeeper"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
            >
              Become a Beekeeper
            </Link>
             </>
           ) : 
             (
               <>
            <Link
              to="/farm"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
            >
              Farm Dashboard
            </Link>
               </>
             )}

            {/* 👇 HNY Balance badge */}
            <span
              style={{
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.12)',
                padding: '0.35rem 0.6rem',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
              }}
              title="HNY Token Balance"
            >
              {(Number(hnyBalance || 0)).toFixed(2)} HNY
            </span>
          </>
        )}

        {walletConnected ? (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              className="connect-wallet-btn connected"
              type="button"
              disabled
            >
              Connected: {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
            </button>
            <button
              className="disconnect-wallet-btn"
              onClick={disconnectWallet}
              type="button"
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            className="connect-wallet-btn"
            onClick={connectWallet}
            type="button"
          >
            Connect Wallet
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
