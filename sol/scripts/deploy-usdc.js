const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const USDC = await ethers.deployContract("USDC");
  console.log("USDC deployed at:", await USDC.getAddress());
};

main();

