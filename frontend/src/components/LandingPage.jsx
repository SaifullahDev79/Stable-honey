import React from 'react';
import { Link } from 'react-router-dom';
import map from '../assets/Selection_2009.png';

const LandingPage = () => {
  return (
    <div className="main-content">
      <div className="hero-section">
        <h1 className="hero-title">Stablecoin Backed by Honey</h1>
        <p className="hero-description">
          Swap USD Stablecoins for HNY coin, backed by real-world honey from local beekeepers.
        </p>
        <Link to="/user">
          <button className="invest-btn">Invest in Beehives</button>
        </Link>
      </div>
      
      <div className="content-grid">
        <div className="map-section">
          <div className="map-container">
            <div className="map-outline">
              {/* Map pins representing beehive locations */}
              <img src={map} width='500px'/>
            </div>
          </div>
          <p className="map-label">Map of beehive farms</p>
        </div>
        
        <div className="info-boxes">
          <div className="info-box">
            <h3 className="info-box-title">USDC</h3>
            <p className="info-box-description">Fixed price for honey</p>
          </div>
          
          <div className="info-box">
            <h3 className="info-box-title">Beekeeper Rate</h3>
            <p className="info-box-description">Fixed pay rate for 10 HNY</p>
          </div>
          
          <div className="info-box">
            <h3 className="info-box-title">Authentication</h3>
            <p className="info-box-description">Photo proof required every 30 days</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Start Your Honey Investment Journey?</h2>
        <p>Join thousands of users who are already benefiting from honey-backed tokens</p>
        <div className="cta-buttons">
          <Link to="/user">
            <button className="cta-btn primary">Start Investing</button>
          </Link>
          <Link to="/about">
            <button className="cta-btn secondary">Learn More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
