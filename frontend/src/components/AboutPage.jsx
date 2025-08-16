import React from 'react';

const AboutPage = () => {
  return (
    <div className="main-content">
      <div className="hero-section">
        <h1 className="hero-title">About HoneyToken</h1>
        <p className="hero-description">
          Learn more about our honey-backed stablecoin and how it works.
        </p>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-title">Why Choose HoneyToken?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🍯</div>
            <h3>Real Asset Backing</h3>
            <p>Every HNY token is backed by actual honey from verified local beekeepers</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Sustainable Farming</h3>
            <p>Support sustainable beekeeping practices and local agriculture</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Transparent</h3>
            <p>Blockchain technology ensures transparency and security</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Easy Redemption</h3>
            <p>Redeem your tokens for real honey with simple delivery options</p>
          </div>
        </div>
      </div>



      {/* How It Works Section */}
      <div className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Buy HNY Tokens</h3>
            <p>Purchase HNY tokens using PayPal USD or other supported currencies</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Honey Production</h3>
            <p>Local beekeepers produce honey and mint corresponding tokens</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Submit Redemption</h3>
            <p>Request to redeem your tokens for real honey with delivery details</p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Receive Honey</h3>
            <p>Get your fresh honey delivered or pick it up from local farms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
