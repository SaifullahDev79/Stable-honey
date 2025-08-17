# Stable-honey

Version 1 MVP:
* HoneyToken is an ERC20token
* When HoneyToken is minted (by farm), hash/QR is emitted linked to the actual honey produced
* User buys HoneyToken
* User can redeem for Honey by submitting submitRedeem() function onchain
* Farm sees redemption request, fulfillRedeem() function emitting hash/QRcode of the honey, timestamped via transaction, assumed it is sent/picked up (sending/pickup details happen off-chian for now)

Farm has two actions (minting HNY, fulfilling redemption)
User has two actions (buying HNY, submitting redemption request)
1. Front-end should work out all 4 actions and flows. Note that the submitting redemption should hold delivery/pickup fields
2. Smart Contract: ERC20Token
3. Backend handles the delivery/pickup info 

Additional Integrations:
* PaypalUSD (for buying the HoneyToken)
* Walrus (for storing the image)

## Smart Contracts

Run `npx hardhat verify --network sepolia [addr]` to verify on Etherscan, requires config
