# HoneyToken - Stablecoin Backed by Honey

A decentralized application (dApp) that allows users to invest in honey-backed tokens (HNY) and redeem them for real honey from local beekeepers.

**Token Price: 1 HNY = $10 PYUSD**

## Project Structure

```
Stable-honey/
├── contracts/          # Smart contracts (Solidity)
├── backend/           # Node.js/Express API server
├── frontend/          # React frontend application
└── README.md
```

## Pages Created

### 🏠 Landing Page (`/`)
- **Hero Section**: "Stablecoin Backed by Honey" with call-to-action
- **Interactive Map**: Shows beehive locations across the US with pins
- **Info Boxes**: USDC pricing, Beekeeper rates, and Authentication details
- **Features Section**: Why choose HoneyToken with 4 feature cards
- **Statistics Section**: Key metrics and achievements
- **How It Works**: 4-step process explanation
- **Call-to-Action Section**: Final conversion section with dual buttons

### 👤 User Dashboard (`/user`)
- **Buy HNY Tokens**: Purchase interface (placeholder for PayPal USD)
- **Submit Redemption Request**: Form with delivery/pickup details
- **My Redemption Requests**: List of user's redemption history
- **Available Honey Batches**: View all available honey batches

### 🐝 Farm Dashboard (`/farm`)
- **Mint Honey Tokens**: Form to mint new tokens with QR code verification
- **Fulfill Redemption Request**: Interface to fulfill user requests
- **Honey Batches Management**: List all created batches
- **Redemption Requests**: View and manage incoming requests

### 🔗 Navigation
- **Header**: Fixed full-width header with logo and wallet connection
- **Navigation Links**: User Dashboard and Farm Dashboard (when wallet connected)
- **Responsive Design**: Mobile-friendly layout

## Features

### Version 1 MVP Features:
- **HoneyToken (HNY)**: ERC20 token backed by real honey (1 HNY = $10 PYUSD)
- **Farm Operations**: 
  - Mint honey tokens with QR code verification
  - Fulfill redemption requests
- **User Operations**:
  - Buy honey tokens (placeholder for PayPal USD integration)
  - Submit redemption requests with delivery/pickup details
- **Beekeeper Application**: Comprehensive application form for new beekeepers
- **Backend API**: Handles delivery/pickup information and file uploads
- **Modern UI**: Clean, responsive design with centered layout and full-width header

### Smart Contract Features:
- ERC20 token implementation
- Farm authorization system
- Honey batch management with QR code hashes
- Redemption request system
- Secure minting and burning operations
- Price management (1 HNY = $10 PYUSD)
- Price calculation functions

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension

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

3. **Start the servers**
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

## Usage

### For Users:
1. Connect your MetaMask wallet
2. Navigate to "User Dashboard"
3. Buy HNY tokens (placeholder for PayPal USD integration)
4. Submit redemption requests with delivery/pickup details
5. Track your redemption requests

### For Farms:
1. Connect your MetaMask wallet
2. Navigate to "Farm Dashboard"
3. Mint honey tokens with QR code verification
4. Fulfill redemption requests from users
5. Manage honey batches and requests

## API Endpoints

### Backend API (http://localhost:3001/api)

#### Health Check
- `GET /health` - Check API status

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

## Smart Contract

### HoneyToken.sol
- **ERC20 Token**: Standard ERC20 implementation
- **Farm Authorization**: Only authorized farms can mint tokens
- **Honey Batch Management**: Track honey batches with QR codes
- **Redemption System**: Handle redemption requests and fulfillment

### Key Functions:
- `mintHoney(uint256 amount, string qrCodeHash)` - Mint tokens for honey batch
- `submitRedeem(uint256 amount, string deliveryDetails, string pickupDetails)` - Submit redemption request
- `fulfillRedeem(uint256 requestId, uint256 batchId, string qrCodeHash)` - Fulfill redemption request
- `getTokenPrice()` - Get current token price (1 HNY = $10 PYUSD)
- `calculateUSDValue(uint256 hnyAmount)` - Calculate USD value for HNY amount

## UI/UX Improvements

### Layout Enhancements:
- **Full-width Header**: Fixed header spanning entire page width
- **Centered Content**: All content properly centered with max-width containers
- **Responsive Design**: Mobile-friendly layout with proper breakpoints
- **Visual Hierarchy**: Clear section organization with proper spacing

### Additional Content Sections:
- **Features Section**: 4 feature cards explaining benefits
- **Statistics Section**: Key metrics display
- **How It Works**: Step-by-step process explanation
- **Call-to-Action**: Final conversion section with multiple CTAs

### Design Elements:
- **Color Scheme**: Consistent beige background with dark grey accents
- **Typography**: Clear hierarchy with proper font weights
- **Interactive Elements**: Hover effects and smooth transitions
- **Cards & Grids**: Modern card-based layout system

## Development

### Frontend Development
- Built with React + Vite
- Uses React Router for navigation
- Axios for API communication
- Modern CSS with responsive design
- Component-based architecture

### Backend Development
- Node.js with Express
- CORS enabled for frontend communication
- File upload support with Multer
- In-memory storage for demo purposes

### Smart Contract Development
- Solidity with OpenZeppelin contracts
- Hardhat for development and testing
- ERC20 standard compliance

## Future Integrations

The following integrations are planned for future versions:
- **PayPal USD**: For purchasing HNY tokens
- **Walrus**: For storing honey images and QR codes
- **Blockchain Integration**: Full smart contract deployment and interaction

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the repository.