# HoneyToken - Stablecoin Backed by Honey

A decentralized application (dApp) that allows users to invest in honey-backed tokens (HNY) and redeem them for real honey from local beekeepers. Built with modern Web3 technologies including **Flow blockchain**, **PayPal USD integration**, and **Privy authentication**.

**Token Price: 1 HNY = $10 PYUSD**

## 🌟 Key Integrations

### 🔗 Flow Blockchain Integration
- **Flow Contract Address**: `0xf2694ea70eeb79c761ad123869e741b828d96323f263acbdea56c811483db4c6`
- **Transaction Explorer**: [View on Flowscan](https://evm.flowscan.io/tx/0xf2694ea70eeb79c761ad123869e741b828d96323f263acbdea56c811483db4c6)
- **Smart Contracts**: Deployed on Flow mainnet for secure token operations
- **Cross-Chain Compatibility**: Support for both Ethereum and Flow networks

### 💳 PayPal USD (PYUSD) Integration
- **Stablecoin Backing**: HNY tokens are backed by PayPal USD (PYUSD)
- **Fixed Exchange Rate**: 1 HNY = $10 PYUSD
- **Payment Processing**: Seamless PayPal integration for token purchases
- **Price Stability**: PYUSD provides stable value backing for honey tokens

### 🔐 Privy Authentication
- **Web3 Wallet Integration**: Seamless wallet connection with Privy
- **Multi-Chain Support**: Connect wallets from Ethereum, Flow, and other networks
- **User Experience**: Embedded wallet solution for easy onboarding
- **Security**: Enterprise-grade authentication and wallet management

## 🏗️ Architecture Overview

```
Stable-honey/
├── contracts/          # Smart contracts (Solidity + Flow)
├── backend/           # Node.js/Express API server
├── frontend/          # React frontend with Privy integration
└── README.md
```

## 🚀 Technology Stack

### Frontend
- **React 18+** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Privy** - Web3 authentication and wallet management
- **Ethers.js v6** - Ethereum blockchain interactions
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Blockchain
- **Flow Blockchain** - Primary blockchain for smart contracts
- **Ethereum** - Secondary blockchain support
- **Solidity** - Smart contract language
- **Cadence** - Flow smart contract language

## 📱 Application Features

### 🏠 Landing Page (`/`)
- **Hero Section**: "Stablecoin Backed by Honey" with call-to-action
- **Interactive US Map**: Shows beehive locations across America with green pins
- **Info Boxes**: PYUSD pricing, Beekeeper rates, and Authentication details
- **Features Section**: Why choose HoneyToken with 4 feature cards
- **Statistics Section**: Key metrics and achievements
- **How It Works**: 4-step process explanation
- **Call-to-Action Section**: Final conversion section with dual buttons

### 👤 User Dashboard (`/user`)
- **Buy HNY Tokens**: Purchase interface with PayPal USD integration
- **Solana Payment**: Alternative payment method via Solana (devnet)
- **Submit Redemption Request**: Form with delivery/pickup details
- **My Redemption Requests**: List of user's redemption history
- **Available Honey Batches**: View all available honey batches

### 🐝 Farm Dashboard (`/farm`)
- **Mint Honey Tokens**: Form to mint new tokens with QR code verification
- **Fulfill Redemption Request**: Interface to fulfill user requests
- **Honey Batches Management**: List all created batches
- **Redemption Requests**: View and manage incoming requests

### 🔗 Navigation
- **Header**: Fixed full-width header with Privy wallet connection
- **Navigation Links**: User Dashboard and Farm Dashboard (when wallet connected)
- **Responsive Design**: Mobile-friendly layout

## 🔧 Smart Contract Details

### Flow Contract Information
- **Contract Address**: `0xf2694ea70eeb79c761ad123869e741b828d96323f263acbdea56c811483db4c6`
- **Network**: Flow Mainnet
- **Transaction**: [View Transaction](https://evm.flowscan.io/tx/0xf2694ea70eeb79c761ad123869e741b828d96323f263acbdea56c811483db4c6)

### HoneyToken Features
- **ERC20 Token**: Standard ERC20 implementation
- **PYUSD Backing**: Each HNY token backed by $10 PYUSD
- **Farm Authorization**: Only authorized farms can mint tokens
- **Honey Batch Management**: Track honey batches with QR codes
- **Redemption System**: Handle redemption requests and fulfillment

### Key Functions
- `mintHoney(uint256 amount, string qrCodeHash)` - Mint tokens for honey batch
- `submitRedeem(uint256 amount, string deliveryDetails, string pickupDetails)` - Submit redemption request
- `fulfillRedeem(uint256 requestId, uint256 batchId, string qrCodeHash)` - Fulfill redemption request
- `getTokenPrice()` - Get current token price (1 HNY = $10 PYUSD)
- `calculateUSDValue(uint256 hnyAmount)` - Calculate USD value for HNY amount

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MetaMask or other Web3 wallet
- Privy account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Stable-honey
   ```

2. **Install dependencies for all components**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   
   # Install smart contract dependencies
   cd ../contracts
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Frontend environment
   cd frontend
   echo "VITE_DEMO_MODE=true" > .env.local
   echo "VITE_CHAIN_ID=11155111" >> .env.local
   ```

4. **Start the servers**
   ```bash
   # Start backend server (from backend directory)
   cd backend
   node server.js
   
   # Start frontend server (from frontend directory, in a new terminal)
   cd frontend
   npm run dev
   ```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/health

## 💳 Payment Integration

### PayPal USD (PYUSD)
- **Integration Status**: ✅ Implemented
- **Exchange Rate**: 1 HNY = $10 PYUSD
- **Payment Flow**: Direct PYUSD to HNY token conversion
- **Security**: Enterprise-grade PayPal security

### Solana Payment
- **Integration Status**: ✅ Implemented (Demo Mode)
- **Network**: Solana Devnet
- **Features**: QR code generation, payment status tracking
- **API Endpoints**: `/api/solana/payment-intent`, `/api/solana/payment-status`

### Privy Authentication
- **Integration Status**: ✅ Implemented
- **Features**: 
  - Multi-wallet support
  - Embedded wallet solution
  - Cross-chain compatibility
  - Seamless user onboarding

## 🔌 API Endpoints

### Backend API (http://localhost:3001/api)

#### Health Check
- `GET /health` - Check API status

#### Solana Payment
- `POST /solana/payment-intent` - Create Solana payment intent
- `GET /solana/payment-status` - Check payment status
- `POST /solana/confirm-payment` - Mock payment confirmation

#### Redemption Requests
- `GET /redemption-requests` - Get all redemption requests
- `POST /redemption-requests` - Submit new redemption request
- `PUT /redemption-requests/:id/fulfill` - Fulfill redemption request
- `GET /redemption-requests/:id` - Get specific redemption request

#### Honey Batches
- `GET /honey-batches` - Get all honey batches
- `POST /honey-batches` - Create new honey batch
- `GET /honey-batches/:id` - Get specific honey batch

#### Farms
- `GET /farms` - Get all farms
- `POST /farms` - Register new farm
- `GET /farms/:id` - Get specific farm

## 🎯 Usage Guide

### For Users:
1. **Connect Wallet**: Use Privy to connect your Web3 wallet
2. **Navigate to User Dashboard**: Access token purchase and redemption features
3. **Buy HNY Tokens**: Purchase tokens using PayPal USD or Solana
4. **Submit Redemption Requests**: Request real honey with delivery details
5. **Track Requests**: Monitor your redemption request status

### For Farms:
1. **Connect Wallet**: Use Privy to connect your authorized farm wallet
2. **Navigate to Farm Dashboard**: Access minting and fulfillment features
3. **Mint Honey Tokens**: Create tokens for verified honey batches
4. **Fulfill Requests**: Process user redemption requests
5. **Manage Batches**: Track honey batches and QR codes

## 🔗 Blockchain Integration

### Flow Network
- **Contract Address**: `0xf2694ea70eeb79c761ad123869e741b828d96323f263acbdea56c811483db4c6`
- **Network**: Flow Mainnet
- **Transaction Explorer**: [Flowscan](https://evm.flowscan.io/tx/0xf2694ea70eeb79c761ad123869e741b828d96323f263acbdea56c811483db4c6)
- **Features**: High throughput, low fees, developer-friendly

### Ethereum Network
- **Contract Address**: `0xa2DC60D5d3A7a977787365C5815Ae5F2DEeF4D22`
- **Network**: Sepolia Testnet
- **Features**: ERC20 standard, wide compatibility

## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Beige background with dark grey accents
- **Typography**: Clear hierarchy with proper font weights
- **Interactive Elements**: Hover effects and smooth transitions
- **Responsive Design**: Mobile-first approach with breakpoints

### Interactive Map
- **US Map**: SVG-based map of the United States
- **Beehive Locations**: Green pins showing farm locations
- **Hover Effects**: Interactive pin animations
- **Responsive**: Scales properly on all devices

## 🔮 Future Roadmap

### Phase 2 Features
- **Full Flow Integration**: Complete Flow blockchain deployment
- **Advanced PayPal Features**: Recurring payments, subscription models
- **Multi-Chain Support**: Additional blockchain networks
- **Mobile App**: Native iOS and Android applications

### Phase 3 Features
- **DeFi Integration**: Yield farming and liquidity pools
- **NFT Marketplace**: Honey-themed NFT collections
- **DAO Governance**: Community-driven decision making
- **International Expansion**: Global beekeeper network

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the project wiki for detailed guides
- **Issues**: Report bugs and request features via GitHub Issues
- **Discord**: Join our community for real-time support
- **Email**: Contact us at support@honeytoken.com

## 🔗 Links

- **Website**: [https://honeytoken.com](https://honeytoken.com)
- **Flow Contract**: [0xf2694ea70eeb79c761ad123869e741b828d96323f263acbdea56c811483db4c6](https://evm.flowscan.io/tx/0xf2694ea70eeb79c761ad123869e741b828d96323f263acbdea56c811483db4c6)
- **Flowscan**: [https://evm.flowscan.io](https://evm.flowscan.io)
- **Privy**: [https://privy.io](https://privy.io)
- **PayPal USD**: [https://www.paypal.com/pyusd](https://www.paypal.com/pyusd)

---

**Built with ❤️ by the HoneyToken Team**
