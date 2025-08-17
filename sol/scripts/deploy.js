const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const HoneyToken = await ethers.deployContract("HoneyToken");
  console.log("HoneyToken deployed at:", await HoneyToken.getAddress());
  const HoneyMarketplace = await ethers.deployContract("HoneyMarketplace", [await HoneyToken.getAddress(), '0x0000000000000000000000000000000000000000']);
  console.log("HoneyMarketplace deployed at:", await HoneyMarketplace.getAddress());
};

main();
