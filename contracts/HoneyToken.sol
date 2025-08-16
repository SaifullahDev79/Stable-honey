// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract HoneyToken is ERC20, Ownable, ReentrancyGuard {
    struct RedemptionRequest {
        address user;
        uint256 amount;
        uint256 timestamp;
        bool fulfilled;
        string deliveryDetails;
        string pickupDetails;
    }
    
    struct HoneyBatch {
        uint256 batchId;
        uint256 amount;
        string qrCodeHash;
        uint256 timestamp;
        bool redeemed;
    }
    
    mapping(uint256 => RedemptionRequest) public redemptionRequests;
    mapping(uint256 => HoneyBatch) public honeyBatches;
    mapping(address => bool) public authorizedFarms;
    
    uint256 public redemptionRequestCounter;
    uint256 public honeyBatchCounter;
    
    event HoneyMinted(uint256 batchId, uint256 amount, string qrCodeHash, address farm);
    event RedemptionRequested(uint256 requestId, address user, uint256 amount, string deliveryDetails, string pickupDetails);
    event RedemptionFulfilled(uint256 requestId, uint256 batchId, string qrCodeHash, address farm);
    event FarmAuthorized(address farm);
    event FarmDeauthorized(address farm);
    
    constructor() ERC20("HoneyToken", "HNY") {
        _mint(msg.sender, 1000000 * 10**decimals()); // Initial supply
    }
    
    modifier onlyFarm() {
        require(authorizedFarms[msg.sender], "Only authorized farms can call this function");
        _;
    }
    
    function authorizeFarm(address farm) external onlyOwner {
        authorizedFarms[farm] = true;
        emit FarmAuthorized(farm);
    }
    
    function deauthorizeFarm(address farm) external onlyOwner {
        authorizedFarms[farm] = false;
        emit FarmDeauthorized(farm);
    }
    
    function mintHoney(uint256 amount, string memory qrCodeHash) external onlyFarm {
        require(amount > 0, "Amount must be greater than 0");
        
        honeyBatchCounter++;
        honeyBatches[honeyBatchCounter] = HoneyBatch({
            batchId: honeyBatchCounter,
            amount: amount,
            qrCodeHash: qrCodeHash,
            timestamp: block.timestamp,
            redeemed: false
        });
        
        _mint(msg.sender, amount);
        emit HoneyMinted(honeyBatchCounter, amount, qrCodeHash, msg.sender);
    }
    
    function submitRedeem(uint256 amount, string memory deliveryDetails, string memory pickupDetails) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        redemptionRequestCounter++;
        redemptionRequests[redemptionRequestCounter] = RedemptionRequest({
            user: msg.sender,
            amount: amount,
            timestamp: block.timestamp,
            fulfilled: false,
            deliveryDetails: deliveryDetails,
            pickupDetails: pickupDetails
        });
        
        _burn(msg.sender, amount);
        emit RedemptionRequested(redemptionRequestCounter, msg.sender, amount, deliveryDetails, pickupDetails);
    }
    
    function fulfillRedeem(uint256 requestId, uint256 batchId, string memory qrCodeHash) external onlyFarm {
        RedemptionRequest storage request = redemptionRequests[requestId];
        require(!request.fulfilled, "Request already fulfilled");
        require(request.amount > 0, "Invalid request");
        
        HoneyBatch storage batch = honeyBatches[batchId];
        require(!batch.redeemed, "Batch already redeemed");
        require(batch.amount >= request.amount, "Insufficient batch amount");
        
        request.fulfilled = true;
        batch.redeemed = true;
        
        emit RedemptionFulfilled(requestId, batchId, qrCodeHash, msg.sender);
    }
    
    function getRedemptionRequest(uint256 requestId) external view returns (
        address user,
        uint256 amount,
        uint256 timestamp,
        bool fulfilled,
        string memory deliveryDetails,
        string memory pickupDetails
    ) {
        RedemptionRequest storage request = redemptionRequests[requestId];
        return (
            request.user,
            request.amount,
            request.timestamp,
            request.fulfilled,
            request.deliveryDetails,
            request.pickupDetails
        );
    }
    
    function getHoneyBatch(uint256 batchId) external view returns (
        uint256 amount,
        string memory qrCodeHash,
        uint256 timestamp,
        bool redeemed
    ) {
        HoneyBatch storage batch = honeyBatches[batchId];
        return (
            batch.amount,
            batch.qrCodeHash,
            batch.timestamp,
            batch.redeemed
        );
    }
}
