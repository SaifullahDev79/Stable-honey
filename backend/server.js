const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// In-memory storage for demo purposes
let redemptionRequests = [];
let honeyBatches = [];
let farms = [];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'HoneyToken Backend is running' });
});

// Get all redemption requests
app.get('/api/redemption-requests', (req, res) => {
  res.json(redemptionRequests);
});

// Get all honey batches
app.get('/api/honey-batches', (req, res) => {
  res.json(honeyBatches);
});

// Get all farms
app.get('/api/farms', (req, res) => {
  res.json(farms);
});

// Submit redemption request
app.post('/api/redemption-requests', (req, res) => {
  const { userId, amount, deliveryDetails, pickupDetails } = req.body;
  
  const redemptionRequest = {
    id: redemptionRequests.length + 1,
    userId,
    amount,
    deliveryDetails,
    pickupDetails,
    timestamp: new Date().toISOString(),
    status: 'pending',
    fulfilled: false
  };
  
  redemptionRequests.push(redemptionRequest);
  
  res.json({
    success: true,
    redemptionRequest,
    message: 'Redemption request submitted successfully'
  });
});

// Fulfill redemption request
app.put('/api/redemption-requests/:id/fulfill', upload.single('qrCode'), (req, res) => {
  const { id } = req.params;
  const { batchId, qrCodeHash } = req.body;
  
  const redemptionRequest = redemptionRequests.find(req => req.id == id);
  if (!redemptionRequest) {
    return res.status(404).json({ error: 'Redemption request not found' });
  }
  
  redemptionRequest.fulfilled = true;
  redemptionRequest.status = 'fulfilled';
  redemptionRequest.fulfillmentTimestamp = new Date().toISOString();
  redemptionRequest.batchId = batchId;
  redemptionRequest.qrCodeHash = qrCodeHash;
  
  if (req.file) {
    redemptionRequest.qrCodeImage = req.file.filename;
  }
  
  res.json({
    success: true,
    redemptionRequest,
    message: 'Redemption request fulfilled successfully'
  });
});

// Create honey batch
app.post('/api/honey-batches', upload.single('honeyImage'), (req, res) => {
  const { farmId, amount, qrCodeHash } = req.body;
  
  const honeyBatch = {
    id: honeyBatches.length + 1,
    farmId,
    amount,
    qrCodeHash,
    timestamp: new Date().toISOString(),
    redeemed: false
  };
  
  if (req.file) {
    honeyBatch.honeyImage = req.file.filename;
  }
  
  honeyBatches.push(honeyBatch);
  
  res.json({
    success: true,
    honeyBatch,
    message: 'Honey batch created successfully'
  });
});

// Register farm
app.post('/api/farms', (req, res) => {
  const { name, address, location } = req.body;
  
  const farm = {
    id: farms.length + 1,
    name,
    address,
    location,
    registeredAt: new Date().toISOString(),
    authorized: true
  };
  
  farms.push(farm);
  
  res.json({
    success: true,
    farm,
    message: 'Farm registered successfully'
  });
});

// Get redemption request by ID
app.get('/api/redemption-requests/:id', (req, res) => {
  const { id } = req.params;
  const redemptionRequest = redemptionRequests.find(req => req.id == id);
  
  if (!redemptionRequest) {
    return res.status(404).json({ error: 'Redemption request not found' });
  }
  
  res.json(redemptionRequest);
});

// Get honey batch by ID
app.get('/api/honey-batches/:id', (req, res) => {
  const { id } = req.params;
  const honeyBatch = honeyBatches.find(batch => batch.id == id);
  
  if (!honeyBatch) {
    return res.status(404).json({ error: 'Honey batch not found' });
  }
  
  res.json(honeyBatch);
});

// Get farm by ID
app.get('/api/farms/:id', (req, res) => {
  const { id } = req.params;
  const farm = farms.find(farm => farm.id == id);
  
  if (!farm) {
    return res.status(404).json({ error: 'Farm not found' });
  }
  
  res.json(farm);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.listen(PORT, () => {
  console.log(`HoneyToken Backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
