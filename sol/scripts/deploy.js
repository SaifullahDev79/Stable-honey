const { USDC_ADDRESS } = require('./common.js');

const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const HoneyToken = await ethers.deployContract("HoneyToken");
  console.log("HoneyToken deployed at:", await HoneyToken.getAddress());
  const HoneyMarketplace = await ethers.deployContract("HoneyMarketplace", [await HoneyToken.getAddress(), USDC_ADDRESS]);
  console.log("HoneyMarketplace deployed at:", await HoneyMarketplace.getAddress());
};

main();
